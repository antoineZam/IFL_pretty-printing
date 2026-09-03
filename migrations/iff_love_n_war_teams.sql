-- Love & War Teams table
--
-- SAFE TO RE-RUN: no DROP, CREATE ... IF NOT EXISTS. This file used to open by
-- dropping the table, so an accidental re-run destroyed every registered team.
--
-- Requires migrations/ewgf_tables.sql (iff_players) to have been run first: the
-- player columns are real foreign keys now. The setup doc always claimed they
-- were, but they were bare INT NOT NULL -- so deleting a player silently
-- orphaned team rows, which then LEFT JOINed to NULL and rendered a team with
-- blank players on the overlay.
CREATE TABLE IF NOT EXISTS `iff_love_n_war_teams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `team_name` VARCHAR(255) NOT NULL UNIQUE,
    `player_1_id` INT NOT NULL,
    `player_2_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Declared inline: a trailing CREATE INDEX cannot be re-run. idx_lnw_team_name
    -- is also gone -- the UNIQUE constraint on team_name already indexes it, so
    -- it was a duplicate.
    KEY `idx_lnw_player_1` (`player_1_id`),
    KEY `idx_lnw_player_2` (`player_2_id`),
    CONSTRAINT `fk_lnw_team_player_1` FOREIGN KEY (`player_1_id`)
        REFERENCES `iff_players` (`id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_lnw_team_player_2` FOREIGN KEY (`player_2_id`)
        REFERENCES `iff_players` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
