// Shared types for Love & War tournament system

// Base player info (minimal)
export interface PlayerInfo {
    id: number;
    name: string;
    character_name: string;
}

// Extended player stats for overlays
export interface PlayerStats extends PlayerInfo {
    division: string;
    iff8_ranking: number | null;
    iff8_record: string | null;
    iff_history: string | null;
    tekken_rank: string | null;
    tekken_prowess: number | null;
    ranked_wins: number | null;
    ranked_losses: number | null;
}

// Team in tournament context
export interface LoveAndWarTeam {
    id: number;
    team_id: number;
    team_name: string;
    seed: number | null;
    group_id: number | null;
    group_name: string | null;
    player_1_id: number;
    player_2_id: number;
    player_1_name: string;
    player_2_name: string;
    player_1_character: string;
    player_2_character: string;
    wins: number;
    losses: number;
}

// Team with full player stats (for overlays)
export interface TeamWithStats {
    id: number;
    team_name: string;
    player_1: PlayerStats;
    player_2: PlayerStats;
}

// Available team for selection (includes player stats from DB join)
export interface AvailableTeam {
    id: number;
    team_name: string;
    player_1_name: string;
    player_2_name: string;
    player_1_id?: number;
    player_2_id?: number;
    player_1_character?: string;
    player_2_character?: string;
    player_1_division?: string;
    player_2_division?: string;
    player_1_iff_ranking?: string;
    player_2_iff_ranking?: string;
    player_1_iff_history?: string;
    player_2_iff_history?: string;
}

// Match
export interface Match {
    id: number;
    tournament_id: number;
    group_id: number | null;
    group_name?: string | null;
    round: string;
    round_order: number;
    match_number: number;
    team_1_id: number | null;
    team_2_id: number | null;
    team_1_name: string | null;
    team_2_name: string | null;
    team_1_score: number;
    team_2_score: number;
    winner_team_id: number | null;
    winner_name?: string | null;
    next_match_id: number | null;
    loser_next_match_id?: number | null;
    is_complete: boolean;
    bracket_position: 'upper' | 'lower' | 'grand_finals' | null;
}

// Group/Pool
export interface Group {
    id: number;
    tournament_id: number;
    name: string;
    group_order: number;
    status: 'setup' | 'in_progress' | 'completed';
    team_count?: number;
    match_count?: number;
}

// Tournament
export interface Tournament {
    id: number;
    name: string;
    format: 'single_elimination' | 'double_elimination';
    status: 'setup' | 'in_progress' | 'completed';
    start_date?: string | null;
    groups: Group[];
    teams: LoveAndWarTeam[];
    matches: Match[];
    created_at?: string;
    updated_at?: string;
}

// Tournament list item (for tournaments list page)
export interface TournamentListItem {
    id: number;
    name: string;
    format: 'single_elimination' | 'double_elimination';
    status: 'setup' | 'in_progress' | 'completed';
    start_date: string | null;
    team_count: number;
    group_count: number;
    match_count: number;
}

// Team ranking in tournament
export interface TeamRanking {
    id: number;
    tournament_id: number;
    team_id: number;
    team_name: string;
    player_1_name: string;
    player_2_name: string;
    player_1_character: string;
    player_2_character: string;
    seed: number | null;
    placement: number | null;
    wins: number;
    losses: number;
}

// Display state for overlay
export interface DisplayState {
    team_id: number | null;
    is_visible: boolean;
}

// Bracket position type
export type BracketPosition = 'upper' | 'lower' | 'grand_finals';

// Tournament format type
export type TournamentFormat = 'single_elimination' | 'double_elimination';

// Tournament/Group status type  
export type TournamentStatus = 'setup' | 'in_progress' | 'completed';
