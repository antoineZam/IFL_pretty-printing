-- IFF Player Data Tables
-- Run this migration to add IFF player tracking capabilities
--
-- SAFE TO RE-RUN. This file used to open with four DROP TABLE statements,
-- including `DROP TABLE iff_players` -- so an accidental re-run destroyed every
-- IFF player profile. It also could no longer run at all: iff9_matches now
-- carries a foreign key to iff_players, so dropping it failed with errno 3730.
--
-- The three ewgf_* tables that were dropped here were never created by anything
-- and never queried; they are leftovers from an abandoned direction and the
-- drops have simply been removed. To clear them from a database that still has
-- them, run migrations/drop_legacy_ewgf_tables.sql once, deliberately.
CREATE TABLE IF NOT EXISTS iff_players (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Declared inline so this file stays re-runnable: a bare CREATE INDEX
    -- fails on the second run.
    --
    -- There is deliberately no index on polaris_id: it served no query.
    KEY idx_iff_players_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
