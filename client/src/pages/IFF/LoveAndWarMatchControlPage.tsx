import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Minus, Plus, RotateCcw, Eye, Send, Tv, Image, PlayCircle } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { AvailableTeam } from '../../types/loveAndWar';

interface Player {
    name: string;
    active: boolean;
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
        
        // If display mode is match or match-card, re-emit the data
        if (displayMode === 'match' || displayMode === 'match-card') {
            if (socket) {
                socket.emit('lnw-match-update', matchData);
            }
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
                { name: selectedTeam.player_1_name, active: true },
                { name: selectedTeam.player_2_name, active: false }
            ]
        });
    };

    const adjustScore = (teamKey: 'team1' | 'team2', delta: number) => {
        const newScore = Math.max(0, matchData[teamKey].score + delta);
        updateTeam(teamKey, { score: newScore });
    };

    const togglePlayerActive = (teamKey: 'team1' | 'team2', playerIndex: number) => {
        // Only one player can be active per team - toggle between players
        setMatchData(prev => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                players: prev[teamKey].players.map((p, i) => ({
                    ...p,
                    active: i === playerIndex // Only the clicked player becomes active
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
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link to={`/iff/love-and-war?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Love & War Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-red-400">Match Control</h1>
                    <p className="text-gray-400 mt-1">Control the stream overlay for Love & War matches</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to={`/iff/love-and-war/unified-overlay?key=${key}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Eye size={18} />
                        Open Unified Overlay
                    </Link>
                </div>
            </div>

            {/* Centralized Update & Display Mode Controls */}
            <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl border border-red-500/30 p-4 mb-6">
                <div className="flex items-center justify-between">
                    {/* Display Mode Buttons */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 mr-2">Display Mode:</span>
                        <button
                            onClick={() => updateDisplayMode('idle')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                                displayMode === 'idle' 
                                    ? 'bg-gray-600 text-white' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            <Image size={16} />
                            Idle
                        </button>
                        <button
                            onClick={() => updateDisplayMode('match')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                                displayMode === 'match' 
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            <PlayCircle size={16} />
                            Match
                        </button>
                        <button
                            onClick={() => updateDisplayMode('match-card')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                                displayMode === 'match-card' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            <Tv size={16} />
                            Match Card
                        </button>
                        
                        {/* Team Stats Dropdown */}
                        <div className="relative">
                            <select
                                value={displayMode === 'team-stats' ? (selectedTeamForStats ?? '') : ''}
                                onChange={(e) => {
                                    const teamId = e.target.value ? parseInt(e.target.value) : null;
                                    if (teamId) {
                                        updateDisplayMode('team-stats', teamId);
                                    }
                                }}
                                className={`px-3 py-2 rounded-lg text-sm appearance-none pr-8 ${
                                    displayMode === 'team-stats' 
                                        ? 'bg-yellow-600 text-white' 
                                        : 'bg-gray-800 text-gray-400'
                                }`}
                            >
                                <option value="">Team Stats...</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.team_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Centralized Update Button */}
                    <button
                        onClick={centralizedUpdate}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-lg font-bold ${
                            saved 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg shadow-red-500/30'
                        }`}
                    >
                        <Send size={20} />
                        {saved ? 'Updated!' : 'Update Overlay'}
                    </button>
                </div>
            </div>

            {/* Round Selector */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Round / Match Info</label>
                <input
                    type="text"
                    value={matchData.round}
                    onChange={(e) => setMatchData(prev => ({ ...prev, round: e.target.value }))}
                    placeholder="e.g., Grand Finals, Winners R1, Losers Finals"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                />
            </div>

            {/* Teams Control Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Team 1 */}
                <TeamControl
                    teamKey="team1"
                    team={matchData.team1}
                    teams={teams}
                    label="Team 1 (Left)"
                    accentColor="blue"
                    onSelectTeam={(t) => selectTeam('team1', t)}
                    onUpdateTeam={(updates) => updateTeam('team1', updates)}
                    onUpdatePlayer={(idx, updates) => updatePlayer('team1', idx, updates)}
                    onTogglePlayer={(idx) => togglePlayerActive('team1', idx)}
                    onAdjustScore={(delta) => adjustScore('team1', delta)}
                />

                {/* Team 2 */}
                <TeamControl
                    teamKey="team2"
                    team={matchData.team2}
                    teams={teams}
                    label="Team 2 (Right)"
                    accentColor="red"
                    onSelectTeam={(t) => selectTeam('team2', t)}
                    onUpdateTeam={(updates) => updateTeam('team2', updates)}
                    onUpdatePlayer={(idx, updates) => updatePlayer('team2', idx, updates)}
                    onTogglePlayer={(idx) => togglePlayerActive('team2', idx)}
                    onAdjustScore={(delta) => adjustScore('team2', delta)}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={swapTeams}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                        <RotateCcw size={18} />
                        Swap Teams
                    </button>
                    <button
                        onClick={resetScores}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <RotateCcw size={18} />
                        Reset Scores
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Preview</h3>
                <div className="bg-black rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-xs text-red-400 uppercase tracking-wider">{matchData.team1.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                                {matchData.team1.players.map((p, i) => (
                                    <span 
                                        key={i} 
                                        className={`text-lg font-bold ${p.active ? 'text-white' : 'text-gray-500'}`}
                                    >
                                        {p.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-4xl font-bold">{matchData.team1.score}</span>
                            <div className="text-center">
                                <p className="text-xs text-gray-500 uppercase">{matchData.round}</p>
                                <p className="text-lg text-red-500 font-bold">VS</p>
                            </div>
                            <span className="text-4xl font-bold">{matchData.team2.score}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-red-400 uppercase tracking-wider">{matchData.team2.name}</p>
                            <div className="flex items-center justify-end gap-3 mt-1">
                                {matchData.team2.players.map((p, i) => (
                                    <span 
                                        key={i} 
                                        className={`text-lg font-bold ${p.active ? 'text-white' : 'text-gray-500'}`}
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
    );
};

// Team Control Component
interface TeamControlProps {
    teamKey: string;
    team: Team;
    teams: AvailableTeam[];
    label: string;
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
    accentColor,
    onSelectTeam,
    onUpdateTeam,
    onUpdatePlayer,
    onTogglePlayer,
    onAdjustScore
}: TeamControlProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    
    const colorClasses = accentColor === 'blue' 
        ? 'border-blue-500/30 bg-blue-900/10'
        : 'border-red-500/30 bg-red-900/10';

    return (
        <div className={`bg-gray-900 rounded-xl border p-4 ${colorClasses}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{label}</h3>
                <button
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                >
                    <Users size={16} />
                    Select Team
                </button>
            </div>

            {/* Team Selection Dropdown */}
            {isSelectOpen && (
                <div className="mb-4 bg-gray-800 rounded-lg p-3 border border-gray-700 max-h-[200px] overflow-y-auto">
                    {teams.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                onSelectTeam(t);
                                setIsSelectOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                            <p className="font-semibold text-white">{t.team_name}</p>
                            <p className="text-xs text-gray-400">{t.player_1_name} & {t.player_2_name}</p>
                        </button>
                    ))}
                    {teams.length === 0 && (
                        <p className="text-center text-gray-500 py-2">No teams available</p>
                    )}
                </div>
            )}

            {/* Team Name */}
            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Team Name</label>
                <input
                    type="text"
                    value={team.name}
                    onChange={(e) => onUpdateTeam({ name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none text-sm"
                />
            </div>

            {/* Players */}
            <div className="space-y-2 mb-4">
                {team.players.map((player, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <button
                            onClick={() => onTogglePlayer(index)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                player.active 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-700 text-gray-400'
                            }`}
                            title={player.active ? 'Active (click to toggle)' : 'Inactive (click to toggle)'}
                        >
                            {index + 1}
                        </button>
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => onUpdatePlayer(index, { name: e.target.value })}
                            className={`flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-red-500 focus:outline-none ${
                                player.active ? 'text-white' : 'text-gray-500'
                            }`}
                        />
                    </div>
                ))}
            </div>

            {/* Score Control */}
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Score</label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onAdjustScore(-1)}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                        <Minus size={20} />
                    </button>
                    <div className="flex-1 text-center">
                        <span className="text-4xl font-bold">{team.score}</span>
                    </div>
                    <button
                        onClick={() => onAdjustScore(1)}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoveAndWarMatchControlPage;
