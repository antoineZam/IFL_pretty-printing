import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { ChevronLeft, Heart, Users, Tv, ExternalLink, Eye, EyeOff, RefreshCw } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';

interface TeamData {
    id: number;
    team_name: string;
    player_1_id: number;
    player_2_id: number;
    player_1_name: string;
    player_1_character: string;
    player_1_division: string;
    player_1_rank: string;
    player_1_prowess: number;
    player_2_name: string;
    player_2_character: string;
    player_2_division: string;
    player_2_rank: string;
    player_2_prowess: number;
}

const LoveAndWarTeamDisplayPage = () => {
    const [searchParams] = useSearchParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        const newSocket = io({
            auth: { token: connectionKey || '' }
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        // Listen for team display state updates
        newSocket.on('love-and-war-display-update', (state: { teamId: number | null; visible: boolean }) => {
            setSelectedTeamId(state.teamId);
            setIsVisible(state.visible);
        });

        loadTeams();

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    const loadTeams = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/iff/love-and-war/teams');
            const data = await res.json();
            if (data.teams) {
                setTeams(data.teams);
            }
        } catch (error) {
            console.error('Error loading teams:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectTeam = (teamId: number) => {
        setSelectedTeamId(teamId);
        // Broadcast the selection to the overlay
        socket?.emit('love-and-war-display-select', { teamId, visible: isVisible });
    };

    const showTeam = (teamId: number) => {
        setSelectedTeamId(teamId);
        setIsVisible(true);
        // Broadcast both selection and visibility
        socket?.emit('love-and-war-display-select', { teamId, visible: true });
    };

    const hideOverlay = () => {
        setIsVisible(false);
        socket?.emit('love-and-war-display-select', { teamId: selectedTeamId, visible: false });
    };

    const selectedTeam = teams.find(t => t.id === selectedTeamId);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black p-6 pb-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <Link to="/dashboard/rib" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors mb-4">
                    <ChevronLeft size={18} />
                    <span className="text-sm">Back to IFF Dashboard</span>
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <Heart size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Team Stats Display</h1>
                            <p className="text-pink-400/70 text-sm">Select a team to show on stream</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <NeonButton variant="ghost" onClick={loadTeams} className="text-gray-400 hover:text-white">
                            <RefreshCw size={16} /> Refresh
                        </NeonButton>
                        <Link 
                            to="/iff/love-and-war/control"
                            className="px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:bg-pink-500/30 transition-colors flex items-center gap-2"
                        >
                            <Users size={16} /> Manage Teams
                        </Link>
                    </div>
                </div>

                {/* Current Selection Panel */}
                <GlassCard className="p-6 mb-8 border border-pink-500/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full ${isVisible ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Currently Displaying</p>
                                <h2 className="text-xl font-bold text-white">
                                    {selectedTeam ? selectedTeam.team_name : 'No team selected'}
                                </h2>
                                {selectedTeam && (
                                    <p className="text-sm text-gray-400">
                                        {selectedTeam.player_1_name} & {selectedTeam.player_2_name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {selectedTeam && (
                                <Link 
                                    to={`/iff/love-and-war/team-stats/${selectedTeam.id}`}
                                    target="_blank"
                                    className="px-4 py-2 rounded-lg bg-gray-800 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2"
                                >
                                    <ExternalLink size={16} /> Open Overlay
                                </Link>
                            )}
                            <button
                                onClick={isVisible ? hideOverlay : () => selectedTeamId && showTeam(selectedTeamId)}
                                disabled={!selectedTeamId}
                                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                                    isVisible 
                                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                                        : selectedTeamId 
                                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isVisible ? (
                                    <>
                                        <EyeOff size={18} /> Hide from Stream
                                    </>
                                ) : (
                                    <>
                                        <Eye size={18} /> Show on Stream
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* Teams Grid */}
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-pink-500 rounded-full" />
                    Available Teams ({teams.length})
                </h3>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 mt-4">Loading teams...</p>
                    </div>
                ) : teams.length === 0 ? (
                    <GlassCard className="p-12 text-center">
                        <Users size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Teams Created</h3>
                        <p className="text-gray-400 mb-6">Create teams in the Love & War Control page first.</p>
                        <Link 
                            to="/iff/love-and-war/control"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:bg-pink-500/30 transition-colors"
                        >
                            <Users size={18} /> Go to Team Manager
                        </Link>
                    </GlassCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer group ${
                                    selectedTeamId === team.id
                                        ? 'border-pink-500 bg-pink-500/10'
                                        : 'border-white/10 bg-white/5 hover:border-pink-500/50 hover:bg-pink-500/5'
                                }`}
                                onClick={() => selectTeam(team.id)}
                            >
                                {/* Selected indicator */}
                                {selectedTeamId === team.id && (
                                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-pink-500" />
                                )}

                                {/* Team Name */}
                                <h3 className="text-lg font-bold text-white mb-3">{team.team_name}</h3>

                                {/* Players */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-black/30">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">P1</div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm">{team.player_1_name}</p>
                                            <p className="text-gray-500 text-xs">{team.player_1_character || 'No character'} • {team.player_1_division || 'No division'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-black/30">
                                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold">P2</div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm">{team.player_2_name}</p>
                                            <p className="text-gray-500 text-xs">{team.player_2_character || 'No character'} • {team.player_2_division || 'No division'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); showTeam(team.id); }}
                                        className="flex-1 px-3 py-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <Tv size={14} /> Show
                                    </button>
                                    <Link
                                        to={`/iff/love-and-war/team-stats/${team.id}`}
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                        className="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-8 p-4 rounded-xl bg-gray-900/50 border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-2">How to Use</h4>
                    <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                        <li>Click on a team card to select it</li>
                        <li>Click "Show on Stream" to display the team stats on the overlay</li>
                        <li>Use the external link button to open the overlay in OBS browser source</li>
                        <li>Click "Hide from Stream" to hide the overlay</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default LoveAndWarTeamDisplayPage;
