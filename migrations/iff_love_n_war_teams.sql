-- Love & War Teams table
DROP TABLE IF EXISTS `iff_love_n_war_teams`;

CREATE TABLE `iff_love_n_war_teams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `team_name` VARCHAR(255) NOT NULL UNIQUE,
    `player_1_id` INT NOT NULL,
    `player_2_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_lnw_team_name ON iff_love_n_war_teams(team_name);
CREATE INDEX idx_lnw_player_1 ON iff_love_n_war_teams(player_1_id);
CREATE INDEX idx_lnw_player_2 ON iff_love_n_war_teams(player_2_id);
