import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Swords, RotateCcw, Users, Trash2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { CyberInput } from '../../components/ui/CyberInput';
import { NeonButton } from '../../components/ui/NeonButton';
import { countries } from '../../utils/countries';

interface Player {
    name: string;
    sponsor: string;
    flag: string;
    active: boolean;
}

interface Team {
    name: string;
    tag: string;
    players: Player[];
    score: number;
}

interface TagTeamData {
    team1: Team;
    team2: Team;
    round: string;
}

interface PlayerHistoryItem {
    name: string;
    username: string;
    team: string;
    flag: string;
}

const initialData: TagTeamData = {
    team1: { 
        name: 'TEAM 1', 
        tag: 'T1',
        players: [
            { name: 'Player 1', sponsor: 'Sponsor', flag: '', active: true },
            { name: 'Player 2', sponsor: 'Sponsor', flag: '', active: false }
        ],
        score: 0
    },
    team2: { 
        name: 'TEAM 2', 
        tag: 'T2',
        players: [
            { name: 'Player 3', sponsor: 'Sponsor', flag: '', active: true },
            { name: 'Player 4', sponsor: 'Sponsor', flag: '', active: false }
        ],
        score: 0
    },
    round: 'Winners Round 1'
};

type PlayerKey = 'team1.0' | 'team1.1' | 'team2.0' | 'team2.1';

const TagTeamControlPage = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<TagTeamData>(initialData);
    const [playerHistory, setPlayerHistory] = useState<PlayerHistoryItem[]>([]);
    
    // State for autocomplete suggestions (one for each player input)
    const [suggestions, setSuggestions] = useState<Record<PlayerKey, PlayerHistoryItem[]>>({
        'team1.0': [],
        'team1.1': [],
        'team2.0': [],
        'team2.1': [],
    });

    useEffect(() => {
        // Get connection key from URL or localStorage
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) {
            console.warn('No connection key found - socket may not authenticate');
        }

        // Fetch player history from database
        const fetchPlayerHistory = async () => {
            try {
                const response = await fetch('/api/history');
                const historyData = await response.json();
                setPlayerHistory(historyData);
            } catch (error) {
                console.error("Failed to fetch player history:", error);
            }
        };
        fetchPlayerHistory();

        const newSocket = io({ auth: { token: key || '' } });
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('Connected to server (Tag Team)');
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });

        // Listen for tag team data updates from server
        newSocket.on('tag-team-data', (newData: TagTeamData) => {
            if (newData) {
                // Ensure flag field exists on all players (for backwards compatibility)
                const normalizedData = {
                    ...newData,
                    team1: {
                        ...newData.team1,
                        players: newData.team1.players?.map(p => ({ ...p, flag: p.flag || '' })) || initialData.team1.players
                    },
                    team2: {
                        ...newData.team2,
                        players: newData.team2.players?.map(p => ({ ...p, flag: p.flag || '' })) || initialData.team2.players
                    }
                };
                setData(normalizedData);
            }
        });

        newSocket.on('history-update', (updatedHistory: PlayerHistoryItem[]) => {
            setPlayerHistory(updatedHistory);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    const sendUpdate = (updatedData: TagTeamData) => {
        if (socket) {
            console.log('Sending tag-team-update:', updatedData);
            socket.emit('tag-team-update', updatedData);
        } else {
            console.error('Socket not connected - cannot send update');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const parts = id.split('.');

        if (parts.length === 1) { // round
            setData(prev => ({ ...prev, [id]: value }));
        } else if (parts.length === 2) { // team1.name, team1.tag
            const [team, field] = parts as ['team1' | 'team2', 'name' | 'tag'];
            setData(prev => ({
                ...prev,
                [team]: { ...prev[team], [field]: value }
            }));
        } else if (parts.length === 3) { // team1.0.name, team1.0.sponsor, team1.0.flag
            const [team, playerIdx, field] = parts as ['team1' | 'team2', '0' | '1', 'name' | 'sponsor' | 'flag'];
            const idx = parseInt(playerIdx);
            setData(prev => ({
                ...prev,
                [team]: {
                    ...prev[team],
                    players: prev[team].players.map((p, i) => 
                        i === idx ? { ...p, [field]: value } : p
                    )
                }
            }));

            // Handle autocomplete for player name fields
            if (field === 'name' && value) {
                const playerKey = `${team}.${playerIdx}` as PlayerKey;
                const searchTerm = value.toLowerCase();
                const filtered = playerHistory.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) || 
                    (p.username && p.username.toLowerCase().includes(searchTerm))
                );
                setSuggestions(prev => ({ ...prev, [playerKey]: filtered }));
            } else if (field === 'name') {
                const playerKey = `${team}.${playerIdx}` as PlayerKey;
                setSuggestions(prev => ({ ...prev, [playerKey]: [] }));
            }
        }
    };

    const handleSuggestionClick = (playerKey: PlayerKey, suggestion: PlayerHistoryItem) => {
        const [team, playerIdx] = playerKey.split('.') as ['team1' | 'team2', '0' | '1'];
        const idx = parseInt(playerIdx);
        const flag = suggestion.flag ? suggestion.flag.toUpperCase() : '';
        
        setData(prev => ({
            ...prev,
            [team]: {
                ...prev[team],
                players: prev[team].players.map((p, i) => 
                    i === idx ? { ...p, name: suggestion.username, sponsor: suggestion.team, flag: flag } : p
                )
            }
        }));
        setSuggestions(prev => ({ ...prev, [playerKey]: [] }));
    };

    const deleteFromHistory = async (playerName: string) => {
        try {
            const response = await fetch('/api/history', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName }),
            });
            if (response.ok) {
                setPlayerHistory(prev => prev.filter(p => p.name !== playerName));
            } else {
                console.error("Failed to delete player from history");
            }
        } catch (error) {
            console.error("Error deleting player:", error);
        }
    };

    const handleActivePlayerChange = (team: 'team1' | 'team2', playerIndex: number) => {
        setData(prev => ({
            ...prev,
            [team]: {
                ...prev[team],
                players: prev[team].players.map((p, i) => ({
                    ...p,
                    active: i === playerIndex
                }))
            }
        }));
    };

    const updateScore = (team: 'team1' | 'team2', delta: number) => {
        setData(prev => {
            const newScore = Math.max(0, prev[team].score + delta);
            return {
                ...prev,
                [team]: { ...prev[team], score: newScore }
            };
        });
    };

    const swapTeams = () => {
        setData(prev => ({
            ...prev,
            team1: prev.team2,
            team2: prev.team1
        }));
    };

    const updateAllInfo = () => {
        sendUpdate(data);

        // Save all players to history
        const playersToSave = [
            ...data.team1.players.map(p => ({ name: p.name, team: p.sponsor, flag: p.flag })),
            ...data.team2.players.map(p => ({ name: p.name, team: p.sponsor, flag: p.flag })),
        ].filter(p => p.name && p.name.trim() !== '');
        
        if (playersToSave.length > 0) {
            fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playersToSave),
            })
            .then(res => res.json())
            .then(updatedHistory => setPlayerHistory(updatedHistory))
            .catch(err => console.error("Failed to update history:", err));
        }
    };

    const resetScores = () => {
        setData(prev => ({
            ...prev,
            team1: { ...prev.team1, score: 0 },
            team2: { ...prev.team2, score: 0 }
        }));
    };
    
    return (
        <div className="min-h-screen p-6 pb-24 max-w-[1600px] mx-auto text-white">
            {/* Top Bar */}
            <div className="flex justify-between items-end mb-8">
                <h1 className="text-2xl font-archivo-expanded-bold text-white/80">TAG TEAM CONTROLLER</h1>
                <div className="flex gap-4">
                    <NeonButton variant="ghost" onClick={resetScores} className="text-sm">
                        <RotateCcw size={16} /> Reset Scores
                    </NeonButton>
                    <NeonButton variant="ghost" onClick={swapTeams} className="text-sm text-blue-400 hover:text-blue-300">
                        <Swords size={16} /> Swap Teams
                    </NeonButton>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Team 1 Column */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <GlassCard className="p-6 border-l-4 border-l-blue-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-blue-500 pointer-events-none">T1</div>
                        <h2 className="text-blue-500 font-bold mb-6">TEAM 1</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <CyberInput id="team1.name" label="Team Name" value={data.team1.name} onChange={handleInputChange} />
                                <CyberInput id="team1.tag" label="Team Tag" value={data.team1.tag} onChange={handleInputChange} />
                            </div>
                            <hr className="border-white/10 my-4" />
                            {/* Player 1 */}
                            <div className="relative">
                                <CyberInput id="team1.0.name" label="Player 1 Name" value={data.team1.players[0]?.name || ''} onChange={handleInputChange} autoComplete="off" />
                                {suggestions['team1.0'].length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden max-h-48 overflow-y-auto">
                                        {suggestions['team1.0'].map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('team1.0', s)}
                                                className="px-4 py-2 hover:bg-blue-500/20 cursor-pointer flex items-center gap-2"
                                            >
                                                {s.flag && (
                                                    <img src={`https://flagcdn.com/w20/${s.flag.toLowerCase()}.png`} alt={s.flag} className="w-5 h-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                )}
                                                <span>{s.name}</span>
                                                {s.team && <span className="text-xs text-gray-500 ml-auto">{s.team}</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CyberInput id="team1.0.sponsor" label="P1 Sponsor" value={data.team1.players[0]?.sponsor || ''} onChange={handleInputChange} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">P1 Flag</label>
                                    <select id="team1.0.flag" value={data.team1.players[0]?.flag || ''} onChange={handleInputChange} className="bg-gray-900/70 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-blue-500 outline-none h-[50px] backdrop-blur-sm text-sm">
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <hr className="border-white/10 my-4" />
                            {/* Player 2 */}
                            <div className="relative">
                                <CyberInput id="team1.1.name" label="Player 2 Name" value={data.team1.players[1]?.name || ''} onChange={handleInputChange} autoComplete="off" />
                                {suggestions['team1.1'].length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden max-h-48 overflow-y-auto">
                                        {suggestions['team1.1'].map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('team1.1', s)}
                                                className="px-4 py-2 hover:bg-blue-500/20 cursor-pointer flex items-center gap-2"
                                            >
                                                {s.flag && (
                                                    <img src={`https://flagcdn.com/w20/${s.flag.toLowerCase()}.png`} alt={s.flag} className="w-5 h-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                )}
                                                <span>{s.name}</span>
                                                {s.team && <span className="text-xs text-gray-500 ml-auto">{s.team}</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CyberInput id="team1.1.sponsor" label="P2 Sponsor" value={data.team1.players[1]?.sponsor || ''} onChange={handleInputChange} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">P2 Flag</label>
                                    <select id="team1.1.flag" value={data.team1.players[1]?.flag || ''} onChange={handleInputChange} className="bg-gray-900/70 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-blue-500 outline-none h-[50px] backdrop-blur-sm text-sm">
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Active Player</label>
                                <div className="flex gap-4 bg-surface p-2 rounded-md">
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team1.players[0]?.active ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team1_active" checked={data.team1.players[0]?.active || false} onChange={() => handleActivePlayerChange('team1', 0)} className="hidden"/> P1</label>
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team1.players[1]?.active ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team1_active" checked={data.team1.players[1]?.active || false} onChange={() => handleActivePlayerChange('team1', 1)} className="hidden"/> P2</label>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                    <div className="flex items-center gap-4">
                        <button onClick={() => updateScore('team1', -1)} className="h-20 w-20 rounded-xl bg-surfaceHighlight border border-white/5 text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors text-2xl">-</button>
                        <div className="flex-1 h-20 bg-black/40 rounded-xl border border-blue-500/30 flex items-center justify-center text-6xl font-bold text-white font-mono shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">{data.team1.score}</div>
                        <button onClick={() => updateScore('team1', 1)} className="h-20 w-20 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors text-4xl font-bold">+</button>
                    </div>
                </div>

                {/* Center Info Column */}
                <div className="col-span-12 lg:col-span-2 flex flex-col gap-6">
                    <GlassCard className="p-4 flex-1 flex flex-col justify-center gap-4 text-center">
                        <h3 className="text-xs font-bold uppercase text-gray-500">Match Details</h3>
                        <CyberInput id="round" label="Round" value={data.round} onChange={handleInputChange} className="text-center" />
                    </GlassCard>
                    <button onClick={updateAllInfo} className="h-32 w-full bg-white rounded-xl flex flex-col items-center justify-center gap-2 text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:scale-105 transition-all duration-200">
                        <span className="text-2xl">Update</span>
                        <span className="text-xs opacity-60">Push to Stream</span>
                    </button>
                </div>

                {/* Team 2 Column */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                     <GlassCard className="p-6 border-r-4 border-r-red-500 relative overflow-hidden text-right">
                        <div className="absolute top-0 left-0 p-4 opacity-10 text-9xl font-bold text-red-500 pointer-events-none">T2</div>
                        <h2 className="text-red-500 font-bold mb-6 text-right">TEAM 2</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <CyberInput id="team2.tag" label="Team Tag" value={data.team2.tag} onChange={handleInputChange} className="text-right" />
                                <CyberInput id="team2.name" label="Team Name" value={data.team2.name} onChange={handleInputChange} className="text-right" />
                            </div>
                            <hr className="border-white/10 my-4" />
                            {/* Player 1 */}
                            <div className="relative">
                                <CyberInput id="team2.0.name" label="Player 1 Name" value={data.team2.players[0]?.name || ''} onChange={handleInputChange} className="text-right" autoComplete="off" />
                                {suggestions['team2.0'].length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden max-h-48 overflow-y-auto">
                                        {suggestions['team2.0'].map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('team2.0', s)}
                                                className="px-4 py-2 hover:bg-red-500/20 cursor-pointer flex items-center gap-2 justify-end"
                                            >
                                                {s.team && <span className="text-xs text-gray-500 mr-auto">{s.team}</span>}
                                                <span>{s.name}</span>
                                                {s.flag && (
                                                    <img src={`https://flagcdn.com/w20/${s.flag.toLowerCase()}.png`} alt={s.flag} className="w-5 h-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">P1 Flag</label>
                                    <select id="team2.0.flag" value={data.team2.players[0]?.flag || ''} onChange={handleInputChange} className="bg-gray-900/70 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-red-500 outline-none h-[50px] backdrop-blur-sm text-sm">
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                                <CyberInput id="team2.0.sponsor" label="P1 Sponsor" value={data.team2.players[0]?.sponsor || ''} onChange={handleInputChange} className="text-right" />
                            </div>
                            <hr className="border-white/10 my-4" />
                            {/* Player 2 */}
                            <div className="relative">
                                <CyberInput id="team2.1.name" label="Player 2 Name" value={data.team2.players[1]?.name || ''} onChange={handleInputChange} className="text-right" autoComplete="off" />
                                {suggestions['team2.1'].length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden max-h-48 overflow-y-auto">
                                        {suggestions['team2.1'].map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('team2.1', s)}
                                                className="px-4 py-2 hover:bg-red-500/20 cursor-pointer flex items-center gap-2 justify-end"
                                            >
                                                {s.team && <span className="text-xs text-gray-500 mr-auto">{s.team}</span>}
                                                <span>{s.name}</span>
                                                {s.flag && (
                                                    <img src={`https://flagcdn.com/w20/${s.flag.toLowerCase()}.png`} alt={s.flag} className="w-5 h-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">P2 Flag</label>
                                    <select id="team2.1.flag" value={data.team2.players[1]?.flag || ''} onChange={handleInputChange} className="bg-gray-900/70 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-red-500 outline-none h-[50px] backdrop-blur-sm text-sm">
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                                <CyberInput id="team2.1.sponsor" label="P2 Sponsor" value={data.team2.players[1]?.sponsor || ''} onChange={handleInputChange} className="text-right" />
                            </div>
                             <div className="pt-2">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 text-right">Active Player</label>
                                <div className="flex gap-4 bg-surface p-2 rounded-md">
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team2.players[0]?.active ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team2_active" checked={data.team2.players[0]?.active || false} onChange={() => handleActivePlayerChange('team2', 0)} className="hidden"/> P1</label>
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team2.players[1]?.active ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team2_active" checked={data.team2.players[1]?.active || false} onChange={() => handleActivePlayerChange('team2', 1)} className="hidden"/> P2</label>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                    <div className="flex items-center gap-4">
                        <button onClick={() => updateScore('team2', -1)} className="h-20 w-20 rounded-xl bg-surfaceHighlight border border-white/5 text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors text-2xl">-</button>
                        <div className="flex-1 h-20 bg-black/40 rounded-xl border border-red-500/30 flex items-center justify-center text-6xl font-bold text-white font-mono shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]">{data.team2.score}</div>
                        <button onClick={() => updateScore('team2', 1)} className="h-20 w-20 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors text-4xl font-bold">+</button>
                    </div>
                </div>
            </div>

            {/* Player History Section */}
            <div className="col-span-12 mt-12">
                <GlassCard className="p-6 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Users className="text-gray-500" />
                        <h3 className="text-xl font-bold text-white/80">Player History</h3>
                        <span className="text-xs text-gray-500">({playerHistory.length} players)</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                        {playerHistory.length > 0 ? playerHistory
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(p => (
                            <div key={p.name} className="flex items-center justify-between p-3 bg-surfaceHighlight/50 rounded-lg group">
                                <div className="flex items-center gap-4">
                                    {p.flag ? (
                                        <img 
                                            src={`https://flagcdn.com/w40/${p.flag.toLowerCase()}.png`} 
                                            alt={p.flag} 
                                            className="w-8 h-auto"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">?</div>
                                    )}
                                    <div>
                                        <div className="font-bold text-white">{p.name}</div>
                                        <div className="text-xs text-gray-400">{p.team || 'No sponsor'}</div>
                                    </div>
                                </div>
                                <NeonButton 
                                    variant="ghost" 
                                    onClick={() => deleteFromHistory(p.name)} 
                                    className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </NeonButton>
                            </div>
                        )) : (
                            <div className="text-center text-gray-500 py-8">
                                No players in history. Update a match to save players.
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default TagTeamControlPage;
