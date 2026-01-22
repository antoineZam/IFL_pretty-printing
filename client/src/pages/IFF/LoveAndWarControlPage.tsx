import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { Swords, RotateCcw, Users, Plus, Trash2, Edit2, ExternalLink, ChevronLeft, Heart } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { CyberInput } from '../../components/ui/CyberInput';
import { NeonButton } from '../../components/ui/NeonButton';

interface IFFPlayer {
    id: number;
    name: string;
    character_name: string;
    division: string;
    rank_name: string;
}

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

interface LoveAndWarData {
    caster1: string;
    caster2: string;
    team1: Team;
    team2: Team;
}

interface DBTeam {
    id: number;
    team_name: string;
    player_1_id: number;
    player_2_id: number;
    player_1_name: string;
    player_2_name: string;
    player_1_character: string;
    player_2_character: string;
}

const initialData: LoveAndWarData = {
    caster1: 'Caster 1',
    caster2: 'Caster 2',
    team1: { name: 'TEAM 1', p1: { name: 'Player 1', sponsor: 'Sponsor' }, p2: { name: 'Player 2', sponsor: 'Sponsor' }, score: 0, activePlayer: 0 },
    team2: { name: 'TEAM 2', p1: { name: 'Player 3', sponsor: 'Sponsor' }, p2: { name: 'Player 4', sponsor: 'Sponsor' }, score: 0, activePlayer: 0 },
};

const LoveAndWarControlPage = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<LoveAndWarData>(initialData);
    
    // Team management state
    const [dbTeams, setDbTeams] = useState<DBTeam[]>([]);
    const [players, setPlayers] = useState<IFFPlayer[]>([]);
    const [showTeamManager, setShowTeamManager] = useState(false);
    const [editingTeam, setEditingTeam] = useState<DBTeam | null>(null);
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamPlayer1, setNewTeamPlayer1] = useState<number | ''>('');
    const [newTeamPlayer2, setNewTeamPlayer2] = useState<number | ''>('');

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('requestLoveAndWarData');
        });

        newSocket.on('updateLoveAndWarData', (newData: LoveAndWarData) => {
            setData(newData);
        });

        newSocket.on('initialLoveAndWarData', (initialData: LoveAndWarData) => {
            setData(initialData);
        });

        // Load teams and players
        loadTeams();
        loadPlayers();

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const loadTeams = async () => {
        try {
            const res = await fetch('/api/iff/love-and-war/teams');
            const data = await res.json();
            if (data.teams) {
                setDbTeams(data.teams);
            }
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const loadPlayers = async () => {
        try {
            const res = await fetch('/api/iff/players');
            const data = await res.json();
            if (data.players) {
                setPlayers(data.players);
            }
        } catch (error) {
            console.error('Error loading players:', error);
        }
    };

    const sendUpdate = (updatedData: LoveAndWarData) => {
        socket?.emit('updateLoveAndWarData', updatedData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const parts = id.split('.');

        if (parts.length === 1) {
            setData(prev => ({ ...prev, [id]: value }));
        } else if (parts.length === 2) {
            const [team, field] = parts as ['team1' | 'team2', 'name'];
            setData(prev => ({
                ...prev,
                [team]: { ...prev[team], [field]: value }
            }));
        } else if (parts.length === 3) {
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

    // Team Management Functions
    const saveTeam = async () => {
        if (!newTeamName || !newTeamPlayer1 || !newTeamPlayer2) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const teamData = {
                team_name: newTeamName,
                player_1_id: newTeamPlayer1,
                player_2_id: newTeamPlayer2
            };

            let res;
            if (editingTeam) {
                res = await fetch(`/api/iff/love-and-war/team/${editingTeam.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(teamData)
                });
            } else {
                res = await fetch('/api/iff/love-and-war/team', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(teamData)
                });
            }

            if (res.ok) {
                loadTeams();
                clearTeamForm();
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to save team');
            }
        } catch (error) {
            console.error('Error saving team:', error);
            alert('Failed to save team');
        }
    };

    const editTeam = (team: DBTeam) => {
        setEditingTeam(team);
        setNewTeamName(team.team_name);
        setNewTeamPlayer1(team.player_1_id);
        setNewTeamPlayer2(team.player_2_id);
        setShowTeamManager(true);
    };

    const deleteTeam = async (teamId: number) => {
        if (!confirm('Are you sure you want to delete this team?')) return;
        
        try {
            const res = await fetch(`/api/iff/love-and-war/team/${teamId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                loadTeams();
            }
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    const clearTeamForm = () => {
        setEditingTeam(null);
        setNewTeamName('');
        setNewTeamPlayer1('');
        setNewTeamPlayer2('');
    };
    
    return (
        <div className="min-h-screen p-6 pb-24 max-w-[1600px] mx-auto text-white">
            {/* Back Button */}
            <Link to="/dashboard/rib" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors mb-4">
                <ChevronLeft size={18} />
                <span className="text-sm">Back to IFF Dashboard</span>
            </Link>

            {/* Top Bar */}
            <div className="flex justify-between items-end mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <Heart size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-archivo-expanded-bold text-white/80">LOVE & WAR CONTROLLER</h1>
                        <p className="text-pink-400/70 text-sm">Team Tournament Management</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <NeonButton variant="ghost" onClick={() => setShowTeamManager(!showTeamManager)} className="text-sm text-pink-400 hover:text-pink-300">
                        <Users size={16} /> {showTeamManager ? 'Hide' : 'Manage'} Teams
                    </NeonButton>
                    <NeonButton variant="ghost" onClick={resetScores} className="text-sm">
                        <RotateCcw size={16} /> Reset Scores
                    </NeonButton>
                    <NeonButton variant="ghost" onClick={swapTeams} className="text-sm text-blue-400 hover:text-blue-300">
                        <Swords size={16} /> Swap Teams
                    </NeonButton>
                </div>
            </div>

            {/* Team Manager Panel */}
            {showTeamManager && (
                <GlassCard className="p-6 mb-8 border border-pink-500/30">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-pink-400 flex items-center gap-2">
                            <Users size={20} /> Team Database Manager
                        </h2>
                        <button onClick={clearTeamForm} className="text-sm text-gray-400 hover:text-white">
                            Clear Form
                        </button>
                    </div>

                    {/* Add/Edit Team Form */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <CyberInput 
                            label="Team Name" 
                            value={newTeamName} 
                            onChange={(e) => setNewTeamName(e.target.value)}
                            placeholder="e.g., Lunatic Blades"
                        />
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Player 1</label>
                            <select 
                                value={newTeamPlayer1}
                                onChange={(e) => setNewTeamPlayer1(e.target.value ? parseInt(e.target.value) : '')}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-pink-500/50 focus:outline-none"
                            >
                                <option value="">Select Player 1</option>
                                {players.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} ({p.character_name || 'No char'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Player 2</label>
                            <select 
                                value={newTeamPlayer2}
                                onChange={(e) => setNewTeamPlayer2(e.target.value ? parseInt(e.target.value) : '')}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-pink-500/50 focus:outline-none"
                            >
                                <option value="">Select Player 2</option>
                                {players.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} ({p.character_name || 'No char'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <NeonButton onClick={saveTeam} className="w-full h-[50px]">
                                <Plus size={16} /> {editingTeam ? 'Update' : 'Add'} Team
                            </NeonButton>
                        </div>
                    </div>

                    {/* Teams List */}
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {dbTeams.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No teams created yet. Add your first team above!</p>
                        ) : (
                            dbTeams.map(team => (
                                <div 
                                    key={team.id} 
                                    className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5 hover:border-pink-500/30 transition-all"
                                >
                                    <div>
                                        <h3 className="font-bold text-white">{team.team_name}</h3>
                                        <p className="text-sm text-gray-400">
                                            {team.player_1_name} & {team.player_2_name}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link 
                                            to={`/iff/love-and-war/team-stats/${team.id}`}
                                            target="_blank"
                                            className="p-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                        <button 
                                            onClick={() => editTeam(team)}
                                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => deleteTeam(team.id)}
                                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </GlassCard>
            )}

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

export default LoveAndWarControlPage;
