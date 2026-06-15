// Shared types for the IFF9 event (1v1 match overlay + match-card lineup).

export type IFF9MatchType = 'masters' | 'challengers';

export type IFF9DisplayMode = 'idle' | 'match' | 'match-cards';

// A single match in a week's lineup. Mirrors the iff9_matches table.
export interface IFF9Match {
    id?: number;
    week_id?: number;
    match_order: number;
    match_number: number;
    match_type: IFF9MatchType;
    round_name: string;
    player_1_name: string;
    player_1_info: string;
    player_1_character: string;
    player_1_score: number;
    player_2_name: string;
    player_2_info: string;
    player_2_character: string;
    player_2_score: number;
    win_score: number;
    is_complete: boolean;
    is_active: boolean;
}

// A week / event. Mirrors the iff9_weeks table.
export interface IFF9Week {
    id?: number;
    name: string;
    week_number: number | null;
    event_date: string | null;
    status: string;
    matches?: IFF9Match[];
    match_count?: number;
}

// The flat shape pushed live to the in-game overlay (active match + week context).
export interface IFF9MatchData {
    week_name: string;
    week_number: number | null;
    event_date: string | null;
    match_number: number;
    match_type: IFF9MatchType;
    round_name: string;
    player_1_name: string;
    player_1_info: string;
    player_1_character: string;
    player_1_score: number;
    player_2_name: string;
    player_2_info: string;
    player_2_character: string;
    player_2_score: number;
    win_score: number;
}

// The lineup pushed live to the match-cards page.
export interface IFF9Lineup {
    week_name: string;
    week_number: number | null;
    event_date: string | null;
    matches: IFF9Match[];
}

export interface IFF9DisplayState {
    mode: IFF9DisplayMode;
    visible: boolean;
}

export const defaultIFF9Match: IFF9Match = {
    match_order: 1,
    match_number: 1,
    match_type: 'challengers',
    round_name: '',
    player_1_name: 'Player 1',
    player_1_info: '',
    player_1_character: '',
    player_1_score: 0,
    player_2_name: 'Player 2',
    player_2_info: '',
    player_2_character: '',
    player_2_score: 0,
    win_score: 3,
    is_complete: false,
    is_active: false,
};

export const defaultIFF9MatchData: IFF9MatchData = {
    week_name: 'IFF9 Qualifiers',
    week_number: 1,
    event_date: null,
    match_number: 1,
    match_type: 'challengers',
    round_name: '',
    player_1_name: 'Player 1',
    player_1_info: '',
    player_1_character: '',
    player_1_score: 0,
    player_2_name: 'Player 2',
    player_2_info: '',
    player_2_character: '',
    player_2_score: 0,
    win_score: 3,
};
