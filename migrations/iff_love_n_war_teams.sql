-- Love and War Teams Table
-- Run this migration to add team pairing for Love and War tournament format

-- Drop table if exists (for clean migration)
DROP TABLE IF EXISTS iff_love_n_war_teams;

-- Table for storing Love and War team pairings
CREATE TABLE iff_love_n_war_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    player_1_id INT NOT NULL,
    player_2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraints linking to iff_players
    CONSTRAINT fk_lnw_player_1 FOREIGN KEY (player_1_id) 
        REFERENCES iff_players(id) ON DELETE CASCADE,
    CONSTRAINT fk_lnw_player_2 FOREIGN KEY (player_2_id) 
        REFERENCES iff_players(id) ON DELETE CASCADE
);

-- Create index for team lookups
CREATE INDEX idx_lnw_team_name ON iff_love_n_war_teams(team_name);
