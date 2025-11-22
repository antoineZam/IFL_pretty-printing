import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { countries } from '../utils/countries';
import { Swords, RotateCcw, Minus, Plus } from 'lucide-react';

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
        <div className="bg-[#0a0e27] min-h-screen p-4 md:p-8 text-white font-archivo">
            <div className="max-w-4xl mx-auto bg-[#1a1f3a] p-6 rounded-xl shadow-2xl border-2 border-[#3a4167]">
                <h1 className="text-3xl font-bold text-center text-[#DAA520] uppercase tracking-wider mb-6">
                    IFL Match Control
                </h1>

                {/* Score Controls */}
                <div className="bg-[#252b47] p-6 rounded-lg mb-8 border-2 border-[#3a4167]">
                    <h2 className="text-xl font-bold text-center text-[#DAA520] uppercase tracking-wider mb-6">Score Controls</h2>
                    <div className="flex justify-around items-center">
                        {['p1', 'p2'].map((p, index) => (
                            <div key={p} className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Player {index + 1} Score</h3>
                                <div className="text-5xl font-bold text-[#DAA520] mb-4">{data[`${p}Score` as keyof PlayerData]}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => updateScore(p as 'p1' | 'p2', 1)} className="bg-[#DAA520] text-[#0a0e27] p-3 rounded-md hover:bg-[#F0C350] transition-transform hover:scale-105"><Plus /></button>
                                    <button onClick={() => updateScore(p as 'p1' | 'p2', -1)} className="bg-[#DAA520] text-[#0a0e27] p-3 rounded-md hover:bg-[#F0C350] transition-transform hover:scale-105"><Minus /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <button onClick={resetScores} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto">
                            <RotateCcw size={18} /> Reset Scores
                        </button>
                    </div>
                </div>

                {/* Player Controls */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {['p1', 'p2'].map((p, index) => (
                        <div key={p} className="bg-[#252b47] p-6 rounded-lg border-2 border-[#3a4167]">
                            <h3 className="text-lg font-bold text-center text-[#DAA520] uppercase mb-6">Player {index + 1}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor={`${p}Flag`} className="block mb-1 font-semibold">Flag</label>
                                    <select id={`${p}Flag`} value={data[`${p}Flag` as keyof PlayerData] as string} onChange={handleInputChange} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]">
                                        {Object.entries(countries).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor={`${p}Team`} className="block mb-1 font-semibold">Team</label>
                                    <input type="text" id={`${p}Team`} value={data[`${p}Team` as keyof PlayerData] as string} onChange={handleInputChange} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]" />
                                </div>
                                <div>
                                    <label htmlFor={`${p}Name`} className="block mb-1 font-semibold">Name</label>
                                    <input type="text" id={`${p}Name`} value={data[`${p}Name` as keyof PlayerData] as string} onChange={handleInputChange} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                 {/* Global Controls */}
                <div className="bg-[#252b47] p-6 rounded-lg mb-8 border-2 border-[#3a4167]">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="round" className="block mb-1 font-semibold">Round</label>
                            <input type="text" id="round" value={data.round} onChange={handleInputChange} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]" />
                        </div>
                        <div>
                            <label htmlFor="eventNumber" className="block mb-1 font-semibold">Event Number</label>
                            <input type="text" id="eventNumber" value={data.eventNumber} onChange={handleInputChange} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]" />
                        </div>
                    </div>
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={swapPlayers} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <Swords size={20} /> Swap Players
                    </button>
                    <button onClick={updateAllInfo} className="flex-1 bg-[#DAA520] text-[#0a0e27] px-6 py-3 rounded-md hover:bg-[#F0C350] font-bold uppercase tracking-wider transition-colors">
                        Update All Information
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IFLMatchControlPage;
