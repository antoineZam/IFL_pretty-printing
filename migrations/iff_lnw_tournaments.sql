-- Love & War Tournaments, Groups, and Matches
--
-- SAFE TO RE-RUN: no DROP, every CREATE is IF NOT EXISTS. This file used to open
-- by dropping all four tables, so an accidental re-run wiped every Love & War
-- tournament, group, bracket and standing.
--
-- Requires migrations/iff_love_n_war_teams.sql first: the team columns are real
-- foreign keys now. A helper comment in dbHelpers.js already said "order matters
-- due to foreign key constraints" -- the constraints just did not exist, so the
-- manual cascades standing in for them ran as two to four unrelated statements
-- with no transaction, and a missed one left orphaned rows behind.

-- Tournaments table
CREATE TABLE IF NOT EXISTS `iff_lnw_tournaments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `format` VARCHAR(50) NOT NULL, -- 'single_elimination', 'double_elimination'
    `status` VARCHAR(50) NOT NULL DEFAULT 'setup', -- 'setup', 'in_progress', 'completed'
    `start_date` DATE NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Groups table (pools/divisions within a tournament)
CREATE TABLE IF NOT EXISTS `iff_lnw_groups` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL, -- 'Group A', 'Group B', 'Finals Bracket', etc.
    `group_order` INT NOT NULL DEFAULT 1, -- For display ordering
    `status` VARCHAR(50) NOT NULL DEFAULT 'setup', -- 'setup', 'in_progress', 'completed'
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tournament (tournament_id),
    UNIQUE KEY unique_tournament_group (tournament_id, name),
    CONSTRAINT `fk_lnw_group_tournament` FOREIGN KEY (`tournament_id`)
        REFERENCES `iff_lnw_tournaments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Matches table
CREATE TABLE IF NOT EXISTS `iff_lnw_matches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
    `group_id` INT NULL, -- NULL for ungrouped matches, links to iff_lnw_groups
    `round` VARCHAR(100) NOT NULL, -- 'Round 1', 'Quarter Finals', 'Semi Finals', 'Finals', etc.
    `round_order` INT NOT NULL, -- For sorting within a round
    `match_number` INT NOT NULL, -- Match number in bracket
    `team_1_id` INT NULL, -- NULL if TBD
    `team_2_id` INT NULL, -- NULL if TBD
    `team_1_score` INT DEFAULT 0,
    `team_2_score` INT DEFAULT 0,
    `winner_team_id` INT NULL,
    `next_match_id` INT NULL, -- Points to the next match the winner advances to
    `is_complete` BOOLEAN DEFAULT FALSE,
    `bracket_position` VARCHAR(50) NULL, -- 'upper', 'lower', 'grand_finals' for double elimination
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- idx_round (tournament_id, round_order) already serves lookups on
    -- tournament_id alone, so the separate idx_tournament is redundant. The
    -- trailing CREATE INDEX statements that duplicated these (and an unused
    -- (team_1_id, team_2_id) index, bypassed because those joins resolve through
    -- the teams primary key) have been removed.
    INDEX idx_group (group_id),
    INDEX idx_round (tournament_id, round_order),
    CONSTRAINT `fk_lnw_match_tournament` FOREIGN KEY (`tournament_id`)
        REFERENCES `iff_lnw_tournaments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lnw_match_group` FOREIGN KEY (`group_id`)
        REFERENCES `iff_lnw_groups` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_lnw_match_team_1` FOREIGN KEY (`team_1_id`)
        REFERENCES `iff_love_n_war_teams` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_lnw_match_team_2` FOREIGN KEY (`team_2_id`)
        REFERENCES `iff_love_n_war_teams` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_lnw_match_winner` FOREIGN KEY (`winner_team_id`)
        REFERENCES `iff_love_n_war_teams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tournament Teams (tracks team participation and rankings)
CREATE TABLE IF NOT EXISTS `iff_lnw_tournament_teams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
    `team_id` INT NOT NULL,
    `group_id` INT NULL, -- Which group this team belongs to (NULL = unassigned)
    `seed` INT NULL, -- Seeding position within group
    `placement` INT NULL, -- Final placement (1st, 2nd, 3rd, etc.)
    `wins` INT DEFAULT 0,
    `losses` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- unique_tournament_team (tournament_id, team_id) already indexes
    -- tournament_id, so idx_tournament and idx_team were redundant with it and
    -- with each other; the trailing CREATE INDEX duplicates are gone too.
    INDEX idx_group (group_id),
    UNIQUE KEY unique_tournament_team (tournament_id, team_id),
    CONSTRAINT `fk_lnw_tt_tournament` FOREIGN KEY (`tournament_id`)
        REFERENCES `iff_lnw_tournaments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lnw_tt_team` FOREIGN KEY (`team_id`)
        REFERENCES `iff_love_n_war_teams` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_lnw_tt_group` FOREIGN KEY (`group_id`)
        REFERENCES `iff_lnw_groups` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
