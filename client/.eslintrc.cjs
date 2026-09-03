/**
 * ESLint configuration.
 *
 * `npm run lint` was in package.json and five eslint packages were installed,
 * but no config file was ever committed -- so the script exited 2 with
 * "couldn't find a configuration file" and had never run. react-hooks is the
 * ruleset that would have caught the stale closures and wrong dependency arrays
 * behind three of the broadcast-time bugs.
 *
 * .eslintrc.cjs (not flat config) because eslint 8 is what is installed;
 * eslint.config.js would need eslint 9.
 */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', '*.timestamp-*.mjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],

        // The rule that matters most here: a missing dependency is how a socket
        // handler ends up holding first-render state forever.
        'react-hooks/exhaustive-deps': 'warn',

        // Off deliberately. The 26 sites are socket payload handlers, the
        // dotted-path state helpers and synthetic-event casts -- all places where
        // `any` is the honest type. Leaving this on as a warning made
        // `npm run lint --max-warnings 0` permanently red, which is how a lint
        // script ends up ignored. Typing those payloads properly is worth doing;
        // it is a separate piece of work, not a gate on every commit.
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
    },
};
