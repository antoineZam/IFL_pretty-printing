import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Minus, Plus, RotateCcw, Eye, Send, Tv, Image, PlayCircle, Zap, ArrowLeftRight } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import IFFBurgerMenu from '../../components/IFFBurgerMenu';
import type { AvailableTeam } from '../../types/loveAndWar';

interface Player {
    name: string;
    active: boolean;
    character?: string;
    iff_history?: string | null;
    division?: string | null;
    iff8_ranking?: string | null;
}

interface Team {
    name: string;
    players: Player[];
    score: number;
}

interface LnWMatchData {
    team1: Team;
    team2: Team;
    round: string;
}

// Display mode for unified overlay
type DisplayMode = 'match' | 'team-stats' | 'match-card' | 'idle';

const defaultMatchData: LnWMatchData = {
    team1: {
        name: 'Team 1',
        players: [
            { name: 'Player 1', active: true },
            { name: 'Player 2', active: false }
        ],
        score: 0
    },
    team2: {
        name: 'Team 2',
        players: [
            { name: 'Player 1', active: true },
            { name: 'Player 2', active: false }
        ],
        score: 0
    },
    round: 'Round 1'
};

const LoveAndWarMatchControlPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [matchData, setMatchData] = useState<LnWMatchData>(defaultMatchData);
    const [teams, setTeams] = useState<AvailableTeam[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [saved, setSaved] = useState(false);
    const [pushed, setPushed] = useState(false);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('idle');
    const [selectedTeamForStats, setSelectedTeamForStats] = useState<number | null>(null);

    useEffect(() => {
        loadTeams();
        loadMatchData();

        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('[LnW Match Control] Socket connected');
        });

        newSocket.on('lnw-match-data', (data: LnWMatchData) => {
            setMatchData(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [key]);

    const loadTeams = async () => {
        try {
            const response = await fetch('/api/iff/love-and-war/teams');
            const data = await response.json();
            setTeams(data.teams || []);
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const loadMatchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/iff/love-and-war/match-data');
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setMatchData(data);
                }
            }
        } catch (error) {
            console.error('Error loading match data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveMatchData = async () => {
        try {
            await fetch('/api/iff/love-and-war/match-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(matchData)
            });
            
            if (socket) {
                socket.emit('lnw-match-update', matchData);
            }
            
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving match data:', error);
        }
    };

    // Update display mode on the unified overlay
    const updateDisplayMode = (mode: DisplayMode, teamId?: number | null) => {
        setDisplayMode(mode);
        if (teamId !== undefined) {
            setSelectedTeamForStats(teamId);
        }
        
        if (socket) {
            socket.emit('lnw-display-mode', {
                mode,
                teamId: mode === 'team-stats' ? (teamId ?? selectedTeamForStats) : null,
                visible: mode !== 'idle'
            });
            
            // Also emit match data when switching to match or match-card mode
            if (mode === 'match' || mode === 'match-card') {
                socket.emit('lnw-match-update', matchData);
            }
        }
    };

    // Centralized update: save data and push to overlay
    const centralizedUpdate = async () => {
        await saveMatchData();
        
        // Always emit the data to the overlay
        if (socket) {
            socket.emit('lnw-match-update', matchData);
            // Also re-emit the current display mode to ensure sync
            socket.emit('lnw-display-mode', {
                mode: displayMode,
                teamId: displayMode === 'team-stats' ? selectedTeamForStats : null,
                visible: displayMode !== 'idle'
            });
        }
    };

    // Push current data to overlay without changing display mode
    const pushToOverlay = () => {
        if (socket) {
            socket.emit('lnw-match-update', matchData);
            
            setPushed(true);
            setTimeout(() => setPushed(false), 1500);
        }
    };

    const updateTeam = (teamKey: 'team1' | 'team2', updates: Partial<Team>) => {
        setMatchData(prev => ({
            ...prev,
            [teamKey]: { ...prev[teamKey], ...updates }
        }));
    };

    const updatePlayer = (teamKey: 'team1' | 'team2', playerIndex: number, updates: Partial<Player>) => {
        setMatchData(prev => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                players: prev[teamKey].players.map((p, i) => 
                    i === playerIndex ? { ...p, ...updates } : p
                )
            }
        }));
    };

    const selectTeam = (teamKey: 'team1' | 'team2', selectedTeam: AvailableTeam) => {
        updateTeam(teamKey, {
            name: selectedTeam.team_name,
            players: [
                { 
                    name: selectedTeam.player_1_name, 
                    active: true,
                    character: selectedTeam.player_1_character || undefined,
                    iff_history: selectedTeam.player_1_iff_history || null,
                    division: selectedTeam.player_1_division || null,
                    iff8_ranking: selectedTeam.player_1_iff_ranking || null
                },
                { 
                    name: selectedTeam.player_2_name, 
                    active: false,
                    character: selectedTeam.player_2_character || undefined,
                    iff_history: selectedTeam.player_2_iff_history || null,
                    division: selectedTeam.player_2_division || null,
                    iff8_ranking: selectedTeam.player_2_iff_ranking || null
                }
            ]
        });
    };

    const adjustScore = (teamKey: 'team1' | 'team2', delta: number) => {
        const newScore = Math.max(0, matchData[teamKey].score + delta);
        updateTeam(teamKey, { score: newScore });
    };

    const togglePlayerActive = (teamKey: 'team1' | 'team2', playerIndex: number) => {
        setMatchData(prev => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                players: prev[teamKey].players.map((p, i) => ({
                    ...p,
                    active: i === playerIndex
                }))
            }
        }));
    };

    const swapTeams = () => {
        setMatchData(prev => ({
            ...prev,
            team1: prev.team2,
            team2: prev.team1
        }));
    };

    const resetScores = () => {
        setMatchData(prev => ({
            ...prev,
            team1: { ...prev.team1, score: 0 },
            team2: { ...prev.team2, score: 0 }
        }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <LoadingSpinner size="lg" message="Loading match data..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
            <IFFBurgerMenu />
            
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link to={`/iff/love-and-war?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                            <ChevronLeft size={18} />
                            <span className="text-sm">Back to Love & War</span>
                        </Link>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            Match Control
                        </h1>
                        <p className="text-gray-500 mt-1">Control the stream overlay for Love & War matches</p>
                    </div>
                    <Link
                        to={`/iff/love-and-war/unified-overlay?key=${key}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 rounded-xl transition-all hover:border-red-500/50"
                    >
                        <Eye size={18} className="text-red-400" />
                        <span className="font-medium">Open Overlay</span>
                    </Link>
                </div>

                {/* Main Push Button - Prominent Center Position */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={pushToOverlay}
                        className={`flex items-center gap-4 px-10 py-5 rounded-2xl transition-all text-xl font-bold shadow-2xl ${
                            pushed 
                                ? 'bg-green-500 text-white scale-105 shadow-green-500/40' 
                                : 'bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-500 hover:via-pink-500 hover:to-red-500 text-white shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50'
                        }`}
                    >
                        <Zap size={28} className={pushed ? '' : 'animate-pulse'} />
                        {pushed ? 'Pushed!' : 'Push to Overlay'}
                    </button>
                </div>

                {/* Display Mode Controls */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Display Mode Buttons */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400 font-medium">Display:</span>
                            <div className="flex bg-gray-800/50 p-1 rounded-xl">
                                <button
                                    onClick={() => updateDisplayMode('idle')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                                        displayMode === 'idle' 
                                            ? 'bg-gray-600 text-white shadow-lg' 
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                                >
                                    <Image size={16} />
                                    Idle
                                </button>
                                <button
                                    onClick={() => updateDisplayMode('match')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                                        displayMode === 'match' 
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                                >
                                    <PlayCircle size={16} />
                                    Match
                                </button>
                                <button
                                    onClick={() => updateDisplayMode('match-card')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                                        displayMode === 'match-card' 
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                                >
                                    <Tv size={16} />
                                    Match Card
                                </button>
                            </div>
                            
                            {/* Team Stats Dropdown */}
                            <select
                                value={displayMode === 'team-stats' ? (selectedTeamForStats ?? '') : ''}
                                onChange={(e) => {
                                    const teamId = e.target.value ? parseInt(e.target.value) : null;
                                    if (teamId) {
                                        updateDisplayMode('team-stats', teamId);
                                    }
                                }}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                                    displayMode === 'team-stats' 
                                        ? 'bg-yellow-600 text-white border-yellow-500' 
                                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                                } border`}
                            >
                                <option value="">Team Stats...</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.team_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Save & Sync Button */}
                            <button
                                onClick={centralizedUpdate}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold ${
                                    saved 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                <Send size={18} />
                                {saved ? 'Saved!' : 'Save & Sync'}
                            </button>

                            {/* Refresh Overlay Button */}
                            <button
                                onClick={() => {
                                    if (socket) {
                                        socket.emit('lnw-refresh-overlay');
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-semibold bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500"
                            >
                                <RotateCcw size={18} />
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Round Input */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-4 mb-6">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Round / Match Info</label>
                    <input
                        type="text"
                        value={matchData.round}
                        onChange={(e) => setMatchData(prev => ({ ...prev, round: e.target.value }))}
                        placeholder="e.g., Grand Finals, Winners R1, Losers Finals"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-lg font-medium focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                </div>

                {/* Teams Control - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <TeamControl
                        team={matchData.team1}
                        teams={teams}
                        label="Team 1"
                        side="left"
                        accentColor="blue"
                        onSelectTeam={(t) => selectTeam('team1', t)}
                        onUpdateTeam={(updates) => updateTeam('team1', updates)}
                        onUpdatePlayer={(idx, updates) => updatePlayer('team1', idx, updates)}
                        onTogglePlayer={(idx) => togglePlayerActive('team1', idx)}
                        onAdjustScore={(delta) => adjustScore('team1', delta)}
                    />

                    <TeamControl
                        team={matchData.team2}
                        teams={teams}
                        label="Team 2"
                        side="right"
                        accentColor="red"
                        onSelectTeam={(t) => selectTeam('team2', t)}
                        onUpdateTeam={(updates) => updateTeam('team2', updates)}
                        onUpdatePlayer={(idx, updates) => updatePlayer('team2', idx, updates)}
                        onTogglePlayer={(idx) => togglePlayerActive('team2', idx)}
                        onAdjustScore={(delta) => adjustScore('team2', delta)}
                    />
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={swapTeams}
                        className="flex items-center gap-2 px-5 py-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-500 rounded-xl transition-all text-purple-300 hover:text-white font-medium"
                    >
                        <ArrowLeftRight size={18} />
                        Swap Teams
                    </button>
                    <button
                        onClick={resetScores}
                        className="flex items-center gap-2 px-5 py-3 bg-gray-700/30 hover:bg-gray-700/60 border border-gray-600/30 hover:border-gray-500 rounded-xl transition-all text-gray-400 hover:text-white font-medium"
                    >
                        <RotateCcw size={18} />
                        Reset Scores
                    </button>
                </div>

                {/* Live Preview */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Preview</h3>
                    <div className="bg-black/80 rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between">
                            {/* Team 1 */}
                            <div className="text-left flex-1">
                                <p className="text-sm text-red-400 uppercase tracking-wider font-semibold mb-2">{matchData.team1.name}</p>
                                <div className="flex items-center gap-4">
                                    {matchData.team1.players.map((p, i) => (
                                        <span 
                                            key={i} 
                                            className={`text-xl font-bold transition-colors ${p.active ? 'text-white' : 'text-gray-600'}`}
                                        >
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Scores & Round */}
                            <div className="flex items-center gap-8 px-8">
                                <span className="text-5xl font-black text-white">{matchData.team1.score}</span>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{matchData.round}</p>
                                    <p className="text-2xl text-red-500 font-black">VS</p>
                                </div>
                                <span className="text-5xl font-black text-white">{matchData.team2.score}</span>
                            </div>
                            
                            {/* Team 2 */}
                            <div className="text-right flex-1">
                                <p className="text-sm text-red-400 uppercase tracking-wider font-semibold mb-2">{matchData.team2.name}</p>
                                <div className="flex items-center justify-end gap-4">
                                    {matchData.team2.players.map((p, i) => (
                                        <span 
                                            key={i} 
                                            className={`text-xl font-bold transition-colors ${p.active ? 'text-white' : 'text-gray-600'}`}
                                        >
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Team Control Component
interface TeamControlProps {
    team: Team;
    teams: AvailableTeam[];
    label: string;
    side: 'left' | 'right';
    accentColor: 'blue' | 'red';
    onSelectTeam: (team: AvailableTeam) => void;
    onUpdateTeam: (updates: Partial<Team>) => void;
    onUpdatePlayer: (index: number, updates: Partial<Player>) => void;
    onTogglePlayer: (index: number) => void;
    onAdjustScore: (delta: number) => void;
}

const TeamControl = ({
    team,
    teams,
    label,
    side,
    accentColor,
    onSelectTeam,
    onUpdateTeam,
    onUpdatePlayer,
    onTogglePlayer,
    onAdjustScore
}: TeamControlProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    
    const borderColor = accentColor === 'blue' ? 'border-blue-500/30' : 'border-red-500/30';
    const bgGradient = accentColor === 'blue' 
        ? 'from-blue-500/5 to-transparent' 
        : 'from-red-500/5 to-transparent';
    const accentTextColor = accentColor === 'blue' ? 'text-blue-400' : 'text-red-400';
    const activeButtonBg = accentColor === 'blue' ? 'bg-blue-600' : 'bg-red-600';

    return (
        <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm rounded-2xl border ${borderColor} p-5`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${accentColor === 'blue' ? 'bg-blue-500' : 'bg-red-500'}`} />
                    <h3 className="text-lg font-bold text-white">{label}</h3>
                    <span className="text-xs text-gray-500 uppercase">({side})</span>
                </div>
                <button
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg transition-all text-sm font-medium"
                >
                    <Users size={14} />
                    Select Team
                </button>
            </div>

            {/* Team Selection Dropdown */}
            {isSelectOpen && (
                <div className="mb-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700 max-h-[200px] overflow-y-auto">
                    {teams.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                onSelectTeam(t);
                                setIsSelectOpen(false);
                            }}
                            className="w-full text-left p-3 hover:bg-gray-700/70 rounded-lg transition-colors mb-1"
                        >
                            <p className="font-semibold text-white">{t.team_name}</p>
                            <p className="text-xs text-gray-400">{t.player_1_name} & {t.player_2_name}</p>
                        </button>
                    ))}
                    {teams.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No teams available</p>
                    )}
                </div>
            )}

            {/* Team Name */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Team Name</label>
                <input
                    type="text"
                    value={team.name}
                    onChange={(e) => onUpdateTeam({ name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white font-medium focus:border-red-500 focus:outline-none transition-all"
                />
            </div>

            {/* Players */}
            <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Players</label>
                <div className="space-y-2">
                    {team.players.map((player, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <button
                                onClick={() => onTogglePlayer(index)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all font-bold text-sm ${
                                    player.active 
                                        ? `${activeButtonBg} text-white shadow-lg` 
                                        : 'bg-gray-800 text-gray-500 border border-gray-700 hover:border-gray-600'
                                }`}
                                title={player.active ? 'Active' : 'Inactive'}
                            >
                                P{index + 1}
                            </button>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) => onUpdatePlayer(index, { name: e.target.value })}
                                className={`flex-1 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl font-medium focus:border-red-500 focus:outline-none transition-all ${
                                    player.active ? 'text-white' : 'text-gray-500'
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Score Control */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Score</label>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => onAdjustScore(-1)}
                        className="w-14 h-14 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-white"
                    >
                        <Minus size={24} />
                    </button>
                    <div className={`w-24 h-20 flex items-center justify-center rounded-xl ${accentColor === 'blue' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'} border`}>
                        <span className={`text-5xl font-black ${accentTextColor}`}>{team.score}</span>
                    </div>
                    <button
                        onClick={() => onAdjustScore(1)}
                        className="w-14 h-14 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-white"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoveAndWarMatchControlPage;
