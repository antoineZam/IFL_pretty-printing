import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { countries } from '../utils/countries';
import { Swords, RotateCcw} from 'lucide-react';
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

const IFLMatchControlPage = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<PlayerData | null>(null);

    useEffect(() => {
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
        setData({ ...data, [id]: value });
    };

    const sendUpdate = (updatedData: PlayerData) => {
        socket?.emit('update-data', updatedData);
    };

    const updateAllInfo = () => {
        if (!data) return;
        sendUpdate(data);
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
                            <CyberInput id="p1Name" label="Player Name" value={data.p1Name} onChange={handleInputChange} />
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
                            <CyberInput id="p2Name" label="Player Name" value={data.p2Name} onChange={handleInputChange} style={{textAlign: 'right'}} />
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
        </div>
    );
};

export default IFLMatchControlPage;
