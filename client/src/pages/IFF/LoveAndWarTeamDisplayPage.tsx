import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Users } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface LoveAndWarTeam {
    id: number;
    team_name: string;
    player_1_name?: string;
    player_2_name?: string;
    player_1_character?: string;
    player_2_character?: string;
}

const LoveAndWarTeamDisplayPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [teams, setTeams] = useState<LoveAndWarTeam[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        loadTeams();

        // Connect to Socket.IO
        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('[LnW Display] Socket connected');
        });

        newSocket.on('love-and-war-display-update', (state: any) => {
            console.log('[LnW Display] State update:', state);
            if (state.teamId) setSelectedTeamId(state.teamId);
            if (state.visible !== undefined) setIsVisible(state.visible);
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

    const handleSelectTeam = (teamId: number) => {
        setSelectedTeamId(teamId);
        setIsVisible(true);
        
        if (socket) {
            socket.emit('love-and-war-display-select', {
                teamId,
                visible: true
            });
        }
    };

    const handleToggleVisibility = () => {
        const newVisibility = !isVisible;
        setIsVisible(newVisibility);
        
        if (socket) {
            socket.emit('love-and-war-display-select', {
                teamId: selectedTeamId,
                visible: newVisibility
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link to={`/iff/love-and-war?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Love & War Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-red-400">Team Display Control</h1>
                    <p className="text-gray-400 mt-1">Select which team to display on stream</p>
                </div>
                {selectedTeamId && (
                    <button
                        onClick={handleToggleVisibility}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            isVisible 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                    >
                        {isVisible ? (
                            <>
                                <Eye size={18} />
                                Visible on Stream
                            </>
                        ) : (
                            <>
                                <EyeOff size={18} />
                                Hidden
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Current Selection */}
            {selectedTeamId && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-xl">
                    <p className="text-sm text-gray-400 mb-1">Currently Selected:</p>
                    <p className="text-xl font-bold text-white">
                        {teams.find(t => t.id === selectedTeamId)?.team_name || 'Unknown Team'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Status: <span className={isVisible ? 'text-green-400' : 'text-gray-500'}>
                            {isVisible ? 'Visible' : 'Hidden'}
                        </span>
                    </p>
                </div>
            )}

            {/* Teams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <button
                        key={team.id}
                        onClick={() => handleSelectTeam(team.id)}
                        className={`text-left bg-gray-900 rounded-lg p-5 border transition-all ${
                            selectedTeamId === team.id
                                ? 'border-red-500 bg-red-900/20'
                                : 'border-gray-800 hover:border-red-500/50'
                        }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{team.team_name}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Users size={14} />
                                    <span>2 Players</span>
                                </div>
                            </div>
                            {selectedTeamId === team.id && isVisible && (
                                <div className="px-2 py-1 bg-green-600 rounded text-xs font-semibold">
                                    LIVE
                                </div>
                            )}
                        </div>

                        {/* Players */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">{team.player_1_name}</p>
                                    {team.player_1_character && (
                                        <p className="text-xs text-gray-500">{team.player_1_character}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">{team.player_2_name}</p>
                                    {team.player_2_character && (
                                        <p className="text-xs text-gray-500">{team.player_2_character}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}

                {teams.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <Users size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No teams available. Create teams in the Team Management page.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoveAndWarTeamDisplayPage;
