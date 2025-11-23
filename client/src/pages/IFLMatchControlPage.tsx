import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { countries } from '../utils/countries';
import { Swords, RotateCcw, Trash2, Users } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { CyberInput } from '../components/ui/CyberInput';
import { NeonButton } from '../components/ui/NeonButton';

interface PlayerData {
    p1Flag: string;
    p1Team: string;
    p1Name: string;
    p2Flag: string;
    p2Team: string;
    p2Name: string;
    p1Score: number;
    p2Score: number;
    round: string;
    eventNumber: string;
}

interface PlayerHistoryItem {
    name: string;
    team: string;
    flag: string;
}

const IFLMatchControlPage = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<PlayerData | null>(null);
    const [playerHistory, setPlayerHistory] = useState<PlayerHistoryItem[]>([]);
    
    // State for autocomplete suggestions
    const [p1Suggestions, setP1Suggestions] = useState<PlayerHistoryItem[]>([]);
    const [p2Suggestions, setP2Suggestions] = useState<PlayerHistoryItem[]>([]);


    useEffect(() => {
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

        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) {
            window.location.href = '/auth';
            return;
        }

        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);

        newSocket.on('connect_error', () => {
            alert('Authentication failed. Please check your connection key.');
            window.location.href = '/auth';
        });

        newSocket.on('data-update', (serverData: PlayerData) => {
            setData(serverData);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!data) return;
        const { id, value } = e.target;
        
        const newData = { ...data, [id]: value };
        setData(newData);

        // Handle Autocomplete
        if (id === 'p1Name' && value) {
            const filtered = playerHistory.filter(p => p.name.toLowerCase().startsWith(value.toLowerCase()));
            setP1Suggestions(filtered);
        } else {
            setP1Suggestions([]);
        }

        if (id === 'p2Name' && value) {
            const filtered = playerHistory.filter(p => p.name.toLowerCase().startsWith(value.toLowerCase()));
            setP2Suggestions(filtered);
        } else {
            setP2Suggestions([]);
        }
    };

    const handleSuggestionClick = (player: 'p1' | 'p2', suggestion: PlayerHistoryItem) => {
        if (!data) return;
        if (player === 'p1') {
            setData({ ...data, p1Name: suggestion.name, p1Team: suggestion.team, p1Flag: suggestion.flag });
            setP1Suggestions([]);
        } else {
            setData({ ...data, p2Name: suggestion.name, p2Team: suggestion.team, p2Flag: suggestion.flag });
            setP2Suggestions([]);
        }
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

    const sendUpdate = (updatedData: PlayerData) => {
        socket?.emit('update-data', updatedData);
    };

    const updateAllInfo = () => {
        if (!data) return;
        sendUpdate(data);

        // Save players to history
        const playersToSave = [
            { name: data.p1Name, team: data.p1Team, flag: data.p1Flag },
            { name: data.p2Name, team: data.p2Team, flag: data.p2Flag },
        ];
        
        fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playersToSave),
        })
        .then(res => res.json())
        .then(updatedHistory => setPlayerHistory(updatedHistory))
        .catch(err => console.error("Failed to update history:", err));
    };
    
    const updateScore = (player: 'p1' | 'p2', change: number) => {
        if (!data) return;
        const currentScore = data[`${player}Score`];
        const newScore = Math.max(0, currentScore + change);
        const updatedData = { ...data, [`${player}Score`]: newScore };
        setData(updatedData);
        sendUpdate(updatedData);
    };

    const resetScores = () => {
        if (!data) return;
        const updatedData = { ...data, p1Score: 0, p2Score: 0 };
        setData(updatedData);
        sendUpdate(updatedData);
    };

    const swapPlayers = () => {
        if (!data) return;
        const updatedData = {
            ...data,
            p1Flag: data.p2Flag,
            p1Team: data.p2Team,
            p1Name: data.p2Name,
            p1Score: data.p2Score,
            p2Flag: data.p1Flag,
            p2Team: data.p1Team,
            p2Name: data.p1Name,
            p2Score: data.p1Score,
        };
        setData(updatedData);
        sendUpdate(updatedData);
    };


    if (!data) {
        return <div className="bg-[#0a0e27] min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen p-6 pb-24 max-w-[1600px] mx-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-end mb-8">
                <h1 className="text-2xl font-archivo-expanded-bold text-white/80">MATCH CONTROLLER</h1>
                <div className="flex gap-4">
                    <NeonButton variant="ghost" onClick={resetScores} className="text-sm">
                        <RotateCcw size={16} /> Reset Match
                    </NeonButton>
                    <NeonButton variant="ghost" onClick={swapPlayers} className="text-sm text-blue-400 hover:text-blue-300">
                        <Swords size={16} /> Swap Sides
                    </NeonButton>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Player 1 Column */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <GlassCard className="p-6 border-l-4 border-l-blue-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-blue-500 pointer-events-none">P1</div>
                        <h2 className="text-blue-500 font-bold mb-6 flex items-center gap-2">PLAYER 1 <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded">BLUE SIDE</span></h2>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="relative">
                                <CyberInput id="p1Name" label="Player Name" value={data.p1Name} onChange={handleInputChange} autoComplete="off" />
                                {p1Suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden">
                                        {p1Suggestions.map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('p1', s)}
                                                className="px-4 py-2 hover:bg-blue-500/20 cursor-pointer"
                                            >
                                                {s.name} <span className="text-xs text-gray-500 ml-2">{s.team}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CyberInput id="p1Team" label="Team / Tag" value={data.p1Team} onChange={handleInputChange} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">Nationality</label>
                                    <select 
                                        id="p1Flag" 
                                        value={data.p1Flag} 
                                        onChange={handleInputChange}
                                        className="bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none h-[50px] backdrop-blur-sm"
                                    >
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* P1 Score Big Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => updateScore('p1', -1)}
                            className="h-20 w-20 rounded-xl bg-surfaceHighlight border border-white/5 text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors text-2xl"
                        >-</button>
                        <div className="flex-1 h-20 bg-black/40 rounded-xl border border-blue-500/30 flex items-center justify-center text-6xl font-bold text-white font-mono shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                            {data.p1Score}
                        </div>
                        <button 
                            onClick={() => updateScore('p1', 1)}
                            className="h-20 w-20 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors text-4xl font-bold"
                        >+</button>
                    </div>
                </div>

                {/* Center Info Column */}
                <div className="col-span-12 lg:col-span-2 flex flex-col gap-6">
                    <GlassCard className="p-4 flex-1 flex flex-col justify-center gap-4 text-center">
                        <h3 className="text-xs font-bold uppercase text-gray-500">Match Details</h3>
                        <CyberInput id="round" label="Current Round" value={data.round} onChange={handleInputChange} className="text-center" />
                        <CyberInput id="eventNumber" label="Week #" value={data.eventNumber} onChange={handleInputChange} className="text-center" />
                    </GlassCard>

                    {/* Big Update Button */}
                    <button 
                        onClick={updateAllInfo}
                        className="h-32 w-full bg-white rounded-xl flex flex-col items-center justify-center gap-2 text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:scale-105 transition-all duration-200"
                    >
                        <span className="text-2xl">Update</span>
                        <span className="text-xs opacity-60">Push to Stream</span>
                    </button>
                </div>

                {/* Player 2 Column */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <GlassCard className="p-6 border-r-4 border-r-red-500 relative overflow-hidden text-right">
                        <div className="absolute top-0 left-0 p-4 opacity-10 text-9xl font-bold text-red-500 pointer-events-none">P2</div>
                        <h2 className="text-red-500 font-bold mb-6 flex items-center justify-end gap-2"><span className="text-xs bg-red-500/20 px-2 py-0.5 rounded">RED SIDE</span> PLAYER 2</h2>
                        
                        <div className="space-y-4 relative z-10">
                             <div className="relative">
                                <CyberInput id="p2Name" label="Player Name" value={data.p2Name} onChange={handleInputChange} style={{textAlign: 'right'}} autoComplete="off"/>
                                {p2Suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-surfaceHighlight border border-white/10 rounded-lg z-20 overflow-hidden">
                                        {p2Suggestions.map(s => (
                                            <div 
                                                key={s.name} 
                                                onClick={() => handleSuggestionClick('p2', s)}
                                                className="px-4 py-2 hover:bg-red-500/20 cursor-pointer text-right"
                                            >
                                                {s.name} <span className="text-xs text-gray-500 ml-2">{s.team}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase text-gray-500">Nationality</label>
                                    <select 
                                        id="p2Flag" 
                                        value={data.p2Flag} 
                                        onChange={handleInputChange}
                                        className="bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none h-[50px] backdrop-blur-sm"
                                    >
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                                <CyberInput id="p2Team" label="Team / Tag" value={data.p2Team} onChange={handleInputChange} style={{textAlign: 'right'}} />
                            </div>
                        </div>
                    </GlassCard>

                    {/* P2 Score Big Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => updateScore('p2', -1)}
                            className="h-20 w-20 rounded-xl bg-surfaceHighlight border border-white/5 text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors text-2xl"
                        >-</button>
                        <div className="flex-1 h-20 bg-black/40 rounded-xl border border-red-500/30 flex items-center justify-center text-6xl font-bold text-white font-mono shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]">
                            {data.p2Score}
                        </div>
                        <button 
                            onClick={() => updateScore('p2', 1)}
                            className="h-20 w-20 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors text-4xl font-bold"
                        >+</button>
                    </div>
                </div>
            </div>

            {/* History Management Section */}
            <div className="col-span-12 mt-12">
                <GlassCard className="p-6 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Users className="text-gray-500" />
                        <h3 className="text-xl font-bold text-white/80">Player History</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                        {playerHistory.length > 0 ? playerHistory
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(p => (
                            <div key={p.name} className="flex items-center justify-between p-3 bg-surfaceHighlight/50 rounded-lg group">
                                <div className="flex items-center gap-4">
                                    <img src={`https://flagcdn.com/w40/${p.flag.toLowerCase()}.png`} alt={p.flag} className="w-8 h-auto" />
                                    <div>
                                        <div className="font-bold text-white">{p.name}</div>
                                        <div className="text-xs text-gray-400">{p.team}</div>
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
                                No players in history. Update a match to save a player.
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default IFLMatchControlPage;
