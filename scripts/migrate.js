#!/usr/bin/env node
/**
 * Migration runner.
 *
 * There was no runner, no version table and no enforced ordering: the migrations
 * were a folder of .sql files you were expected to know the order of, each of
 * which opened by dropping its own tables. Running them in the wrong order
 * failed on a foreign key; running one twice destroyed live tournament data.
 *
 * This applies them in the declared order and records what it applied, so a
 * second run is a no-op and a half-provisioned database can be finished off
 * safely.
 *
 *   npm run migrate            apply everything not yet applied
 *   npm run migrate -- --list  show what would run, change nothing
 *
 * The files themselves are idempotent, so re-applying one by hand is harmless;
 * the ledger exists to make "is this database up to date?" answerable.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Order matters: 4-6 declare foreign keys into tables created by 1-5.
// Keep this list in sync with migrations/README.md.
const MIGRATIONS = [
    'core_tables.sql',
    'app_state.sql',
    'ewgf_tables.sql',
    'iff9.sql',
    'iff_love_n_war_teams.sql',
    'iff_lnw_tournaments.sql',
    'performance_indexes.sql',
    'tournament_event_identity.sql',
];

// Deliberately excluded: destructive, and not part of provisioning.
const EXCLUDED = ['drop_legacy_ewgf_tables.sql'];

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

/**
 * Split a migration file into individual statements, honouring DELIMITER.
 *
 * DELIMITER is a directive of the mysql command-line client, not SQL -- the
 * server has never heard of it. Two migrations use it to declare stored
 * procedures, whose bodies contain semicolons that would otherwise be read as
 * statement ends. Handing such a file to the driver as one string fails with
 * "syntax error near 'DELIMITER //'", so the runner could not apply the very
 * files the project ships. The mysql client splits scripts itself; so do we.
 *
 * Quoted strings, backtick identifiers and comments are stepped over, so a
 * delimiter appearing inside one is not mistaken for the end of a statement.
 */
function splitStatements(sql) {
    const statements = [];
    let delimiter = ';';
    let current = '';
    let i = 0;

    const DIRECTIVE = /^DELIMITER[ \t]+(\S+)/i;

    while (i < sql.length) {
        // Only recognised at the start of a line, as the client does.
        if (i === 0 || sql[i - 1] === '\n') {
            const match = DIRECTIVE.exec(sql.slice(i, i + 64));
            if (match) {
                delimiter = match[1];
                const nl = sql.indexOf('\n', i);
                i = nl === -1 ? sql.length : nl + 1;
                continue;
            }
        }

        const pair = sql.slice(i, i + 2);

        // Line comment: "-- " or "#" through end of line.
        if ((pair === '--' && /[ \t\r\n]/.test(sql[i + 2] ?? '\n')) || sql[i] === '#') {
            const nl = sql.indexOf('\n', i);
            const stop = nl === -1 ? sql.length : nl + 1;
            current += sql.slice(i, stop);
            i = stop;
            continue;
        }

        // Block comment.
        if (pair === '/*') {
            const end = sql.indexOf('*/', i + 2);
            const stop = end === -1 ? sql.length : end + 2;
            current += sql.slice(i, stop);
            i = stop;
            continue;
        }

        // Quoted string or quoted identifier.
        const quote = sql[i];
        if (quote === "'" || quote === '"' || quote === '`') {
            let j = i + 1;
            while (j < sql.length) {
                if (quote !== '`' && sql[j] === '\\') { j += 2; continue; }   // escape
                if (sql[j] === quote) {
                    if (sql[j + 1] === quote) { j += 2; continue; }           // doubled
                    break;
                }
                j++;
            }
            const stop = Math.min(j + 1, sql.length);
            current += sql.slice(i, stop);
            i = stop;
            continue;
        }

        if (sql.startsWith(delimiter, i)) {
            if (current.trim()) statements.push(current.trim());
            current = '';
            i += delimiter.length;
            continue;
        }

        current += sql[i];
        i++;
    }

    if (current.trim()) statements.push(current.trim());

    // Trailing comments after the last statement split off as their own chunk.
    // Drop anything that is only comments and whitespace.
    return statements.filter(hasExecutableSql);
}

/** The first non-comment line of a statement, for error messages. */
function firstLine(statement) {
    const line = statement
        .split('\n')
        .map(l => l.trim())
        .find(l => l && !l.startsWith('--') && !l.startsWith('#')) || statement.trim();
    return line.length > 100 ? `${line.slice(0, 100)}...` : line;
}

/** True if the chunk contains anything beyond comments and whitespace. */
function hasExecutableSql(chunk) {
    const stripped = chunk
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/(^|\n)[ \t]*(--[ \t][^\n]*|#[^\n]*)/g, '$1');
    return stripped.trim().length > 0;
}

async function main() {
    const listOnly = process.argv.includes('--list');

    // Guard against a file being added to the folder and silently never run.
    const onDisk = fs.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql'));
    const unlisted = onDisk.filter(f => !MIGRATIONS.includes(f) && !EXCLUDED.includes(f));
    if (unlisted.length > 0) {
        console.error(`\nERROR: these .sql files are not listed in scripts/migrate.js:\n  ${unlisted.join('\n  ')}`);
        console.error('Add them to MIGRATIONS (in the right order) or to EXCLUDED.\n');
        process.exit(1);
    }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tournament_handler',
        // Off deliberately. Files are split into statements here and sent one
        // at a time, so the server is never asked to find statement boundaries
        // -- which is what it cannot do inside a stored procedure body.
        multipleStatements: false,
    });

    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                filename   VARCHAR(255) NOT NULL PRIMARY KEY,
                applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        const [applied] = await connection.query('SELECT filename FROM schema_migrations');
        const done = new Set(applied.map(r => r.filename));

        const pending = MIGRATIONS.filter(f => !done.has(f));

        if (listOnly) {
            console.log('\nMigrations:');
            for (const file of MIGRATIONS) {
                console.log(`  ${done.has(file) ? '[applied]' : '[pending]'} ${file}`);
            }
            console.log('');
            return;
        }

        if (pending.length === 0) {
            console.log('Database is up to date — nothing to apply.');
            return;
        }

        console.log(`Applying ${pending.length} migration(s)...\n`);
        for (const file of pending) {
            const full = path.join(MIGRATIONS_DIR, file);
            if (!fs.existsSync(full)) {
                throw new Error(`Missing migration file: ${file}`);
            }
            process.stdout.write(`  ${file} ... `);
            const sql = fs.readFileSync(full, 'utf8');
            for (const statement of splitStatements(sql)) {
                try {
                    await connection.query(statement);
                } catch (err) {
                    // Without this the error names the file but not which of its
                    // statements failed, which on a 70-line migration is a hunt.
                    err.message = `${err.message}\n\n  in ${file}, statement:\n    ${firstLine(statement)}`;
                    throw err;
                }
            }
            await connection.query(
                'INSERT INTO schema_migrations (filename) VALUES (?)',
                [file]
            );
            console.log('ok');
        }
        console.log('\nDone.');
    } finally {
        await connection.end();
    }
}

// Guarded so the statement splitter can be exercised without a database.
if (require.main === module) {
    main().catch(err => {
        console.error('\nMigration failed:', err.message);
        console.error('Nothing after the failing file was applied. Fix the cause and re-run.');
        process.exit(1);
    });
}

module.exports = { splitStatements, MIGRATIONS };
