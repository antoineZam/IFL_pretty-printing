-- ============================================================
-- Identity columns for tournaments and matches
--
-- Two distinct problems, both from identifying rows by name alone:
--
--  1. A start.gg tournament was found or created by `name`, so two genuinely
--     different start.gg tournaments that happen to share a name collapsed into
--     one row. `startgg_slug` is the stable identifier start.gg guarantees.
--
--  2. The per-set match dedupe key was (tournament_id, player1_id, player2_id,
--     round_name) with no event column, so the same pair meeting in a
--     same-named round of a SECOND event of the same tournament was treated as
--     a duplicate and dropped. `event_name` completes the key.
--
-- Both columns are nullable and additive: existing rows keep working and are
-- backfilled by the next sync. Safe to re-run.
--
--   mysql -u <user> -p <database> < migrations/tournament_event_identity.sql
-- ============================================================

DELIMITER //

DROP PROCEDURE IF EXISTS add_column_if_missing //
CREATE PROCEDURE add_column_if_missing(
    IN tbl  VARCHAR(64),
    IN col  VARCHAR(64),
    IN spec VARCHAR(255)
)
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = tbl
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = tbl AND column_name = col
    ) THEN
        SET @sql = CONCAT('ALTER TABLE ', tbl, ' ADD COLUMN ', col, ' ', spec);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //

DROP PROCEDURE IF EXISTS add_index_if_missing2 //
CREATE PROCEDURE add_index_if_missing2(
    IN tbl  VARCHAR(64),
    IN idx  VARCHAR(64),
    IN cols VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.statistics
        WHERE table_schema = DATABASE() AND table_name = tbl AND index_name = idx
    ) AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = tbl
    ) THEN
        SET @sql = CONCAT('CREATE INDEX ', idx, ' ON ', tbl, ' (', cols, ')');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //

DELIMITER ;

-- The start.gg slug, e.g. 'iron-fist-league-2-week-7'. Stable and unique on
-- start.gg, unlike the display name.
CALL add_column_if_missing('tournaments', 'startgg_slug', 'VARCHAR(255) NULL');
CALL add_index_if_missing2('tournaments', 'idx_tournaments_startgg_slug', 'startgg_slug');

-- Which event of the tournament this set belongs to. Part of the dedupe key.
CALL add_column_if_missing('matches', 'event_name', 'VARCHAR(255) NULL');

-- Replaces idx_matches_dedupe: the dedupe lookup now filters on the event too.
CALL add_index_if_missing2('matches', 'idx_matches_dedupe_event',
                           'tournament_id, event_name, player1_id, player2_id, round_name');

DROP PROCEDURE IF EXISTS add_column_if_missing;
DROP PROCEDURE IF EXISTS add_index_if_missing2;
