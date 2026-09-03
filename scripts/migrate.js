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
        // Migration files contain several statements each.
        multipleStatements: true,
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
            await connection.query(sql);
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

main().catch(err => {
    console.error('\nMigration failed:', err.message);
    console.error('Nothing after the failing file was applied. Fix the cause and re-run.');
    process.exit(1);
});
