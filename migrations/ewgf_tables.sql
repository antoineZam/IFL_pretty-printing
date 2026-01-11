-- IFF Player Data Tables
-- Run this migration to add IFF player tracking capabilities

-- Drop old tables if they exist (for clean migration)
DROP TABLE IF EXISTS ewgf_player_stats;
DROP TABLE IF EXISTS ewgf_battles;
DROP TABLE IF EXISTS ewgf_players;
DROP TABLE IF EXISTS iff_players;

-- Table for storing IFF player profiles with all stats
CREATE TABLE iff_players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    polaris_id VARCHAR(50),
    character_name VARCHAR(50),
    division VARCHAR(100),
    
    -- Tekken Rank Info
    rank_name VARCHAR(50),
    tekken_power INT DEFAULT 0,
    prowess INT DEFAULT 0,
    
    -- IFF Tournament Stats
    iff8_ranking VARCHAR(50),
    iff8_record VARCHAR(50),
    iff8_record_details VARCHAR(255),
    iff_history TEXT,
    
    -- Ranked Match Stats
    ranked_wins INT DEFAULT 0,
    ranked_losses INT DEFAULT 0,
    ranked_wl_rate VARCHAR(10) DEFAULT '0%',
    
    -- Player Match Stats (head-to-head)
    player_wins INT DEFAULT 0,
    player_losses INT DEFAULT 0,
    player_wl_rate VARCHAR(10) DEFAULT '0%',
    
    -- Radar Chart Ratings (0-100 scale)
    offense_rating INT DEFAULT 50,
    defense_rating INT DEFAULT 50,
    consistency_rating INT DEFAULT 50,
    adaptability_rating INT DEFAULT 50,
    clutch_rating INT DEFAULT 50,
    experience_rating INT DEFAULT 50,
    
    -- Link to existing users table (optional, no constraint)
    user_id INT DEFAULT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes separately for better compatibility
CREATE INDEX idx_iff_players_name ON iff_players(name);
CREATE INDEX idx_iff_players_polaris_id ON iff_players(polaris_id);
