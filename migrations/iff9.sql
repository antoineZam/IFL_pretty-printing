-- IFF9 Event: Weeks and Match-card lineup
DROP TABLE IF EXISTS `iff9_matches`;
DROP TABLE IF EXISTS `iff9_weeks`;

-- Weeks table (one row per event/week of the IFF9 season)
CREATE TABLE `iff9_weeks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL, -- e.g. 'IFF9 Qualifiers'
    `week_number` INT NULL, -- e.g. 1 -> 'WEEK 01'
    `event_date` DATE NULL, -- displayed on the match-card sidebar
    `status` VARCHAR(50) NOT NULL DEFAULT 'setup', -- 'setup', 'in_progress', 'completed'
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Matches table (the vs-card lineup for a week)
CREATE TABLE `iff9_matches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `week_id` INT NOT NULL,
    `match_order` INT NOT NULL DEFAULT 1, -- ordering of cards within the week's lineup
    `match_number` INT NOT NULL, -- displayed as 'MATCH_X'
    `match_type` VARCHAR(20) NOT NULL DEFAULT 'challengers', -- 'masters' or 'challengers' (selects asset set)
    `round_name` VARCHAR(100) NULL, -- free-text round/stage label (e.g. 'MISTER')
    
    `player_1_id` INT NULL,
    `player_1_name` VARCHAR(100) NULL,
    `player_1_country` VARCHAR(10) NULL,
    `player_1_rank` INT NULL,
    `player_1_info` VARCHAR(255) NULL, -- accolades, e.g. '2X IFF CHAMPION / 3X FINALIST'
    `player_1_character` VARCHAR(100) NULL,
    `player_1_score` INT DEFAULT 0,
    
    `player_2_id` INT NULL,
    `player_2_name` VARCHAR(100) NULL,
    `player_2_country` VARCHAR(10) NULL,
    `player_2_rank` INT NULL,
    `player_2_info` VARCHAR(255) NULL,
    `player_2_character` VARCHAR(100) NULL,
    `player_2_score` INT DEFAULT 0,
    `win_score` INT DEFAULT 3, -- first to X (1v1 default 3)
    `is_complete` BOOLEAN DEFAULT FALSE,
    `is_active` BOOLEAN DEFAULT FALSE, -- the match currently featured / pushed to the overlay
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_week (week_id),
    INDEX idx_week_order (week_id, match_order),
    FOREIGN KEY (`week_id`) REFERENCES `iff9_weeks`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`player_1_id`) REFERENCES `iff_players`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`player_2_id`) REFERENCES `iff_players`(`id`) ON DELETE SET NULL
);

CREATE INDEX idx_iff9_match_week ON iff9_matches(week_id);
