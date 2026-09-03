-- ============================================================
-- app_state: durable key/value store for the JSON-shaped overlay state
--
-- The Run It Back and tag-team persistence functions in dbHelpers.js were left
-- as stubs when the JSON files were migrated to MySQL: the save* functions
-- logged a line and returned, and the load* functions ignored the database and
-- returned hardcoded literals. The API answered 200 with the posted body, so
-- the UI reported a successful save while the data lived only in server memory
-- and reverted to defaults on every restart.
--
-- Their own comments called for "a settings table"; this is it. One row per
-- piece of state, the value stored as JSON.
--
-- Safe to re-run: IF NOT EXISTS, no DROP.
--
--   mysql -u <user> -p <database> < migrations/app_state.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS `app_state` (
    -- Stable identifier, e.g. 'tag_team_data', 'rib_match_cards'.
    `state_key`  VARCHAR(100) NOT NULL PRIMARY KEY,
    -- The full state object. LONGTEXT rather than JSON so the table works on
    -- MariaDB and on MySQL 5.7 installs without the JSON type.
    `value`      LONGTEXT NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
