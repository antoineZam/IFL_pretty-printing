-- Love & War Tournaments and Matches
DROP TABLE IF EXISTS `iff_lnw_matches`;
DROP TABLE IF EXISTS `iff_lnw_tournaments`;

-- Tournaments table
CREATE TABLE `iff_lnw_tournaments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `format` VARCHAR(50) NOT NULL, -- 'single_elimination', 'double_elimination'
    `status` VARCHAR(50) NOT NULL DEFAULT 'setup', -- 'setup', 'in_progress', 'completed'
    `start_date` DATE NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE `iff_lnw_matches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
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
    INDEX idx_tournament (tournament_id),
    INDEX idx_round (tournament_id, round_order)
);

-- Tournament Teams (tracks team participation and rankings)
CREATE TABLE `iff_lnw_tournament_teams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tournament_id` INT NOT NULL,
    `team_id` INT NOT NULL,
    `seed` INT NULL, -- Seeding position
    `placement` INT NULL, -- Final placement (1st, 2nd, 3rd, etc.)
    `wins` INT DEFAULT 0,
    `losses` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tournament (tournament_id),
    INDEX idx_team (team_id),
    UNIQUE KEY unique_tournament_team (tournament_id, team_id)
);

CREATE INDEX idx_lnw_match_tournament ON iff_lnw_matches(tournament_id);
CREATE INDEX idx_lnw_match_teams ON iff_lnw_matches(team_1_id, team_2_id);
CREATE INDEX idx_lnw_tournament_teams ON iff_lnw_tournament_teams(tournament_id, team_id);
