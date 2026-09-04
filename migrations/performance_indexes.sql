-- ============================================================
-- Performance indexes for the core tournament tables
--
-- The iff_* tables ship their indexes with their own migrations. `users`,
-- `matches` and `tournaments` are now defined in migrations/core_tables.sql,
-- which creates them with these indexes already in place -- this file exists to
-- bring an EXISTING database (created before that file did) up to the same set.
-- These are the columns the application actually filters, joins and sorts on.
--
-- Safe to re-run: each index is added only if it is not already present.
--
--   mysql -u <user> -p <database> < migrations/performance_indexes.sql
-- ============================================================

DELIMITER //

DROP PROCEDURE IF EXISTS add_index_if_missing //
CREATE PROCEDURE add_index_if_missing(
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

-- matches -----------------------------------------------------------------
-- loadIFLData / saveIFLData: newest match for the active tournament.
-- dbRouter /tournament/:id/matches: all matches for one tournament.
CALL add_index_if_missing('matches', 'idx_matches_tournament', 'tournament_id, match_id');

-- "matches this player took part in" -- used by the player match list, the
-- per-player rankings roll-up and the orphaned-user cleanup after every sync.
-- MySQL cannot use one index for an OR across two columns, so both are needed
-- for the index merge.
CALL add_index_if_missing('matches', 'idx_matches_player1', 'player1_id');
CALL add_index_if_missing('matches', 'idx_matches_player2', 'player2_id');

-- Win/loss aggregation in the standings and player queries.
CALL add_index_if_missing('matches', 'idx_matches_winner', 'winner_id');

-- ORDER BY m.match_time DESC on the player match history.
CALL add_index_if_missing('matches', 'idx_matches_time', 'match_time');

-- The start.gg sync's per-set dedupe filters on all four of these columns, once
-- per set. Without this it scans every match of the tournament each time, so the
-- cost of a sync grows with the square of the event size.
CALL add_index_if_missing('matches', 'idx_matches_dedupe', 'tournament_id, player1_id, player2_id, round_name');

-- users -------------------------------------------------------------------
-- getOrCreateUser looks players up by exact username on every scoreboard write
-- that misses the in-process cache; loadPlayerHistory sorts the whole table by it.
CALL add_index_if_missing('users', 'idx_users_username', 'username');

-- tournaments -------------------------------------------------------------
-- getOrCreateCurrentTournament: WHERE status = 'active' ORDER BY tournament_id DESC.
CALL add_index_if_missing('tournaments', 'idx_tournaments_status', 'status, tournament_id');

-- dbRouter /tournaments: ORDER BY start_date DESC.
CALL add_index_if_missing('tournaments', 'idx_tournaments_start_date', 'start_date');

-- The start.gg sync finds or creates a tournament by name on every run.
CALL add_index_if_missing('tournaments', 'idx_tournaments_name', 'name');

DROP PROCEDURE IF EXISTS add_index_if_missing;
