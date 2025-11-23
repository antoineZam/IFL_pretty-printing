import { useState, useEffect, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import { Swords, RotateCcw, Users } from 'lucide-react'; // Added Users icon
import GlassCard from '../components/ui/GlassCard';
import { CyberInput } from '../components/ui/CyberInput';
import { NeonButton } from '../components/ui/NeonButton';

interface Player {
    name: string;
    sponsor: string;
}

interface Team {
    name: string;
    p1: Player;
    p2: Player;
    score: number;
    activePlayer: number;
}

interface TagTeamData {
    caster1: string;
    caster2: string;
    team1: Team;
    team2: Team;
}

const initialData: TagTeamData = {
    caster1: 'Caster 1',
    caster2: 'Caster 2',
    team1: { name: 'TEAM 1', p1: { name: 'Player 1', sponsor: 'Sponsor' }, p2: { name: 'Player 2', sponsor: 'Sponsor' }, score: 0, activePlayer: 0 },
    team2: { name: 'TEAM 2', p1: { name: 'Player 3', sponsor: 'Sponsor' }, p2: { name: 'Player 4', sponsor: 'Sponsor' }, score: 0, activePlayer: 0 },
};

const TagTeamControlPage = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<TagTeamData>(initialData);

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('requestTagTeamData');
        });

        newSocket.on('updateTagTeamData', (newData: TagTeamData) => {
            setData(newData);
        });

        newSocket.on('initialTagTeamData', (initialData: TagTeamData) => {
            setData(initialData);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendUpdate = (updatedData: TagTeamData) => {
        socket?.emit('updateTagTeamData', updatedData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const parts = id.split('.');

        if (parts.length === 1) { // caster1, caster2
            setData(prev => ({ ...prev, [id]: value }));
        } else if (parts.length === 2) { // team1.name
            const [team, field] = parts as ['team1' | 'team2', 'name'];
            setData(prev => ({
                ...prev,
                [team]: { ...prev[team], [field]: value }
            }));
        } else if (parts.length === 3) { // team1.p1.name
            const [team, player, field] = parts as ['team1' | 'team2', 'p1' | 'p2', 'name' | 'sponsor'];
            setData(prev => ({
                ...prev,
                [team]: {
                    ...prev[team],
                    [player]: { ...prev[team][player], [field]: value }
                }
            }));
        }
    };

    const handleActivePlayerChange = (team: 'team1' | 'team2', playerIndex: number) => {
        setData(prev => ({
            ...prev,
            [team]: { ...prev[team], activePlayer: playerIndex }
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
                            <CyberInput id="team1.name" label="Team Name" value={data.team1.name} onChange={handleInputChange} />
                            <hr className="border-white/10 my-4" />
                            <CyberInput id="team1.p1.name" label="Player 1 Name" value={data.team1.p1.name} onChange={handleInputChange} />
                            <CyberInput id="team1.p1.sponsor" label="Player 1 Sponsor" value={data.team1.p1.sponsor} onChange={handleInputChange} />
                            <hr className="border-white/10 my-4" />
                            <CyberInput id="team1.p2.name" label="Player 2 Name" value={data.team1.p2.name} onChange={handleInputChange} />
                            <CyberInput id="team1.p2.sponsor" label="Player 2 Sponsor" value={data.team1.p2.sponsor} onChange={handleInputChange} />
                            <div className="pt-2">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Active Player</label>
                                <div className="flex gap-4 bg-surface p-2 rounded-md">
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team1.activePlayer === 0 ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team1_active" checked={data.team1.activePlayer === 0} onChange={() => handleActivePlayerChange('team1', 0)} className="hidden"/> P1</label>
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team1.activePlayer === 1 ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team1_active" checked={data.team1.activePlayer === 1} onChange={() => handleActivePlayerChange('team1', 1)} className="hidden"/> P2</label>
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
                        <h3 className="text-xs font-bold uppercase text-gray-500">Global Details</h3>
                        <CyberInput id="caster1" label="Caster 1" value={data.caster1} onChange={handleInputChange} className="text-center" />
                        <CyberInput id="caster2" label="Caster 2" value={data.caster2} onChange={handleInputChange} className="text-center" />
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
                            <CyberInput id="team2.name" label="Team Name" value={data.team2.name} onChange={handleInputChange} className="text-right" />
                            <hr className="border-white/10 my-4" />
                            <CyberInput id="team2.p1.name" label="Player 1 Name" value={data.team2.p1.name} onChange={handleInputChange} className="text-right" />
                            <CyberInput id="team2.p1.sponsor" label="Player 1 Sponsor" value={data.team2.p1.sponsor} onChange={handleInputChange} className="text-right" />
                            <hr className="border-white/10 my-4" />
                            <CyberInput id="team2.p2.name" label="Player 2 Name" value={data.team2.p2.name} onChange={handleInputChange} className="text-right" />
                            <CyberInput id="team2.p2.sponsor" label="Player 2 Sponsor" value={data.team2.p2.sponsor} onChange={handleInputChange} className="text-right" />
                             <div className="pt-2">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 text-right">Active Player</label>
                                <div className="flex gap-4 bg-surface p-2 rounded-md">
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team2.activePlayer === 0 ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team2_active" checked={data.team2.activePlayer === 0} onChange={() => handleActivePlayerChange('team2', 0)} className="hidden"/> P1</label>
                                    <label className={`flex-1 text-center cursor-pointer p-2 rounded ${data.team2.activePlayer === 1 ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}><input type="radio" name="team2_active" checked={data.team2.activePlayer === 1} onChange={() => handleActivePlayerChange('team2', 1)} className="hidden"/> P2</label>
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
        </div>
    );
};

export default TagTeamControlPage;
