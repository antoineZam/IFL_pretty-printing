import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Repeat, Minus, Plus } from 'lucide-react';

interface Player {
    name: string;
    sponsor: string;
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

const TagTeamControlPage = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<TagTeamData | null>(null);

    useEffect(() => {
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) {
            window.location.href = '/auth';
            return;
        }

        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);

        newSocket.on('connect_error', () => {
            alert('Authentication failed.');
            window.location.href = '/auth';
        });

        newSocket.on('tag-team-data', (serverData: TagTeamData) => {
            setData(serverData);
        });

        return () => newSocket.disconnect();
    }, [searchParams]);

    const sendUpdate = (updatedData: TagTeamData) => {
        socket?.emit('tag-team-update', updatedData);
    };

    const handleTeamInfoChange = (team: 'team1' | 'team2', field: 'name' | 'tag', value: string) => {
        if (!data) return;
        const updatedData = { ...data, [team]: { ...data[team], [field]: value } };
        setData(updatedData);
    };

    const handlePlayerInfoChange = (team: 'team1' | 'team2', playerIndex: number, field: 'name' | 'sponsor', value: string) => {
        if (!data) return;
        const updatedPlayers = [...data[team].players];
        updatedPlayers[playerIndex] = { ...updatedPlayers[playerIndex], [field]: value };
        const updatedData = { ...data, [team]: { ...data[team], players: updatedPlayers } };
        setData(updatedData);
    };
    
    const setActivePlayer = (team: 'team1' | 'team2', playerIndex: number) => {
        if (!data) return;
        const updatedPlayers = data[team].players.map((p, i) => ({ ...p, active: i === playerIndex }));
        const updatedData = { ...data, [team]: { ...data[team], players: updatedPlayers } };
        setData(updatedData);
        sendUpdate(updatedData);
    };

    const updateScore = (team: 'team1' | 'team2', change: number) => {
        if (!data) return;
        const currentScore = data[team].score;
        const newScore = Math.max(0, currentScore + change);
        const updatedData = { ...data, [team]: { ...data[team], score: newScore } };
        setData(updatedData);
        sendUpdate(updatedData);
    };
    
    const resetScores = () => {
        if (!data) return;
        const updatedData = {
            ...data,
            team1: { ...data.team1, score: 0 },
            team2: { ...data.team2, score: 0 },
        };
        setData(updatedData);
        sendUpdate(updatedData);
    };

    const swapTeams = () => {
        if (!data) return;
        setData({ ...data, team1: data.team2, team2: data.team1 });
    };

    const updateAllInfo = () => {
        if (!data) return;
        sendUpdate(data);
    };

    if (!data) return <div className="bg-[#0a0e27] min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="bg-[#0a0e27] min-h-screen p-4 md:p-8 text-white font-archivo">
            <div className="max-w-5xl mx-auto bg-[#1a1f3a] p-6 rounded-xl shadow-2xl border-2 border-[#3a4167]">
                <h1 className="text-3xl font-bold text-center text-[#DAA520] uppercase tracking-wider mb-6">Tag Team Control</h1>
                {/* Global and Score Controls */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Score Controls */}
                    <div className="bg-[#252b47] p-6 rounded-lg border-2 border-[#3a4167]">
                        <h2 className="text-xl font-bold text-center text-[#DAA520] uppercase tracking-wider mb-4">Scores</h2>
                        <div className="flex justify-around items-start">
                            {['team1', 'team2'].map((t) => (
                                <div key={t} className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">{data[t as keyof TagTeamData].name || t}</h3>
                                    <div className="text-5xl font-bold text-[#DAA520] mb-3">{data[t as keyof TagTeamData].score}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => updateScore(t as 'team1' | 'team2', 1)} className="bg-[#DAA520] text-[#0a0e27] p-3 rounded-md hover:bg-[#F0C350] transition-transform hover:scale-105"><Plus /></button>
                                        <button onClick={() => updateScore(t as 'team1' | 'team2', -1)} className="bg-[#DAA520] text-[#0a0e27] p-3 rounded-md hover:bg-[#F0C350] transition-transform hover:scale-105"><Minus /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="text-center mt-4">
                            <button onClick={resetScores} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm flex items-center gap-2 mx-auto">
                                <Repeat size={16} /> Reset
                            </button>
                        </div>
                    </div>
                    {/* Round Info */}
                     <div className="bg-[#252b47] p-6 rounded-lg border-2 border-[#3a4167]">
                        <h2 className="text-xl font-bold text-center text-[#DAA520] uppercase tracking-wider mb-4">Round Info</h2>
                        <label htmlFor="round" className="block mb-1 font-semibold">Round Name</label>
                        <input type="text" id="round" value={data.round} onChange={(e) => setData({ ...data, round: e.target.value })} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md focus:outline-none focus:border-[#DAA520]" />
                    </div>
                </div>

                {/* Team Configuration */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {(['team1', 'team2'] as const).map((teamKey) => (
                        <div key={teamKey} className="bg-[#252b47] p-6 rounded-lg border-2 border-[#3a4167]">
                            <h3 className="text-lg font-bold text-center text-[#DAA520] uppercase mb-4">{teamKey === 'team1' ? 'Team 1' : 'Team 2'}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor={`${teamKey}-name`} className="block mb-1 font-semibold">Name</label>
                                    <input type="text" id={`${teamKey}-name`} value={data[teamKey].name} onChange={(e) => handleTeamInfoChange(teamKey, 'name', e.target.value)} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md"/>
                                </div>
                                 <div>
                                    <label htmlFor={`${teamKey}-tag`} className="block mb-1 font-semibold">Tag</label>
                                    <input type="text" id={`${teamKey}-tag`} value={data[teamKey].tag} onChange={(e) => handleTeamInfoChange(teamKey, 'tag', e.target.value)} className="w-full p-2 bg-[#1a1f3a] border-2 border-[#3a4167] rounded-md"/>
                                </div>
                                <div className="space-y-3">
                                    <label className="block font-semibold">Players</label>
                                    {data[teamKey].players.map((player, index) => (
                                        <div key={index} className={`p-3 rounded-lg transition-colors ${player.active ? 'bg-[#DAA520]/20 border-2 border-[#DAA520]' : 'bg-[#1a1f3a] border-2 border-[#3a4167]'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <input type="text" placeholder={`Player ${index + 1}`} value={player.name} onChange={(e) => handlePlayerInfoChange(teamKey, index, 'name', e.target.value)} className="w-full p-2 bg-[#0a0e27] border-2 border-[#3a4167] rounded-md"/>
                                                    <input type="text" placeholder="Sponsor" value={player.sponsor} onChange={(e) => handlePlayerInfoChange(teamKey, index, 'sponsor', e.target.value)} className="w-full p-2 bg-[#0a0e27] border-2 border-[#3a4167] rounded-md"/>
                                                </div>
                                                 <button onClick={() => setActivePlayer(teamKey, index)} className={`px-3 py-1 text-sm rounded-md ${player.active ? 'bg-[#DAA520] text-black' : 'bg-gray-500'}`}>
                                                    {player.active ? 'Active' : 'Set Active'}
                                                 </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={swapTeams} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <Repeat size={20} /> Swap Teams
                    </button>
                    <button onClick={updateAllInfo} className="flex-1 bg-[#DAA520] text-[#0a0e27] px-6 py-3 rounded-md hover:bg-[#F0C350] font-bold uppercase tracking-wider transition-colors">
                        Update All Information
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagTeamControlPage;
