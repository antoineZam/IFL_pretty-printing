-- ============================================================
-- Core tournament tables: users, tournaments, matches
--
-- These three tables carry roughly thirty queries across server.js, dbHelpers.js
-- and startggSync.js, but were created by hand outside this repository and had
-- no schema definition committed anywhere -- so a fresh clone could not provision
-- a working database and no column could be verified against a definition.
--
-- This file reconstructs them from every query in the codebase that reads or
-- writes them. Column types are chosen to fit the data the application actually
-- stores (start.gg gamer tags, ISO country codes, Tekken character names).
--
-- Safe to run against an existing database: every statement uses IF NOT EXISTS
-- and there is no DROP anywhere in this file. Run it BEFORE the other
-- migrations -- the iff_* tables reference users.
--
--   mysql -u <user> -p <database> < migrations/core_tables.sql
--
-- Then, for the indexes on these tables:
--   mysql -u <user> -p <database> < migrations/performance_indexes.sql
-- ============================================================

-- users -------------------------------------------------------------------
-- One row per competitor. `username` is the bare gamer tag; the sponsor/team
-- prefix lives in its own column and is joined for display as "SPONSOR | tag".
-- Do not store the prefix inside `username` -- /api/db/players/cleanup exists
-- to undo exactly that mistake.
CREATE TABLE IF NOT EXISTS `users` (
    `user_id`        INT AUTO_INCREMENT PRIMARY KEY,
    `username`       VARCHAR(255) NOT NULL,           -- bare gamer tag, no sponsor prefix
    `sponsor`        VARCHAR(255) NULL,               -- team/sponsor prefix, displayed as "sponsor | username"
    `country`        VARCHAR(8)   NULL,               -- ISO 3166-1 alpha-2/3 country code for the overlay flag
    `main_character` VARCHAR(100) NULL,               -- Tekken 8 character name
    `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `idx_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- tournaments -------------------------------------------------------------
-- One row per tournament. `status` drives getOrCreateCurrentTournament(), which
-- selects the newest row WHERE status = 'active' as the target of live
-- scoreboard writes -- so exactly one row should carry that status at a time.
CREATE TABLE IF NOT EXISTS `tournaments` (
    `tournament_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(255) NOT NULL,
    -- The start.gg slug, e.g. 'iron-fist-league-2-week-7'. Stable and unique on
    -- start.gg; the display name is neither, so two different tournaments
    -- sharing a name used to collapse into one row.
    `startgg_slug`  VARCHAR(255) NULL,
    `season`        VARCHAR(100) NULL,                          -- e.g. 'Season 1'
    `start_date`    DATE         NULL,                          -- sort key for /api/db/tournaments
    `status`        VARCHAR(50)  NOT NULL DEFAULT 'active',     -- 'registration' | 'active' | 'completed'
    `game_version`  VARCHAR(100) NULL DEFAULT 'Tekken 8',
    `created_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `idx_tournaments_status` (`status`, `tournament_id`),
    -- The start.gg sync looks tournaments up by name, once per sync.
    KEY `idx_tournaments_name` (`name`),
    KEY `idx_tournaments_startgg_slug` (`startgg_slug`),
    KEY `idx_tournaments_start_date` (`start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- matches -----------------------------------------------------------------
-- One row per set. Written both by the live scoreboard (which keeps updating a
-- single row for the match currently on screen) and by the start.gg sync.
--
-- winner_id is NULL for a match in progress. The score columns are the set
-- score in games, not points.
--
-- ON DELETE CASCADE on the player columns matches what /api/db/player/:id does
-- by hand today (deletes the player's matches first); the constraint makes that
-- guaranteed rather than remembered.
CREATE TABLE IF NOT EXISTS `matches` (
    `match_id`      INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
    `player1_id`    INT NOT NULL,
    `player2_id`    INT NOT NULL,
    `winner_id`     INT NULL,                                   -- NULL while the match is in progress
    `score_p1`      INT NOT NULL DEFAULT 0,
    `score_p2`      INT NOT NULL DEFAULT 0,
    `round_name`    VARCHAR(255) NULL,                           -- e.g. 'Winners Round 1'
    -- Which event of the tournament this set belongs to. Part of the sync's
    -- dedupe key: without it, the same pair meeting in a same-named round of a
    -- second event was mistaken for a duplicate and dropped.
    `event_name`    VARCHAR(255) NULL,
    `match_time`    DATETIME NULL,
    `created_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `idx_matches_tournament` (`tournament_id`, `match_id`),
    KEY `idx_matches_player1` (`player1_id`),
    KEY `idx_matches_player2` (`player2_id`),
    KEY `idx_matches_winner` (`winner_id`),
    KEY `idx_matches_time` (`match_time`),
    -- Covers the per-set dedupe lookup in the start.gg sync, which runs once per
    -- set and previously scanned every match of the tournament each time.
    KEY `idx_matches_dedupe_event` (`tournament_id`, `event_name`, `player1_id`, `player2_id`, `round_name`),
    CONSTRAINT `fk_matches_tournament` FOREIGN KEY (`tournament_id`)
        REFERENCES `tournaments` (`tournament_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_matches_player1` FOREIGN KEY (`player1_id`)
        REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_matches_player2` FOREIGN KEY (`player2_id`)
        REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_matches_winner` FOREIGN KEY (`winner_id`)
        REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
