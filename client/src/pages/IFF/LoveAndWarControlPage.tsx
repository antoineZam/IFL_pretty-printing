import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit3, Trash2, Users, Eye, X } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { AvailableTeam, PlayerInfo } from '../../types/loveAndWar';

// Extended team type for this page (includes editing fields)
interface LoveAndWarTeam {
    id: number;
    team_name: string;
    player_1_id: number;
    player_2_id: number;
    player_1_name?: string;
    player_2_name?: string;
    player_1_character?: string;
    player_2_character?: string;
}

const LoveAndWarControlPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [teams, setTeams] = useState<LoveAndWarTeam[]>([]);
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<LoveAndWarTeam | null>(null);
    const [formData, setFormData] = useState({
        team_name: '',
        player_1_id: '',
        player_2_id: ''
    });

    useEffect(() => {
        loadTeams();
        loadPlayers();
    }, []);

    const loadTeams = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/iff/love-and-war/teams');
            const data = await response.json();
            setTeams(data.teams || []);
        } catch (error) {
            console.error('Error loading teams:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadPlayers = async () => {
        try {
            const response = await fetch('/api/iff/players');
            const data = await response.json();
            setPlayers(data.players || []);
        } catch (error) {
            console.error('Error loading players:', error);
        }
    };

    const handleOpenModal = (team?: LoveAndWarTeam) => {
        if (team) {
            setEditingTeam(team);
            setFormData({
                team_name: team.team_name,
                player_1_id: team.player_1_id.toString(),
                player_2_id: team.player_2_id.toString()
            });
        } else {
            setEditingTeam(null);
            setFormData({ team_name: '', player_1_id: '', player_2_id: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTeam(null);
        setFormData({ team_name: '', player_1_id: '', player_2_id: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.team_name || !formData.player_1_id || !formData.player_2_id) {
            alert('Please fill all fields');
            return;
        }

        if (formData.player_1_id === formData.player_2_id) {
            alert('Please select different players');
            return;
        }

        try {
            const url = editingTeam 
                ? `/api/iff/love-and-war/team/${editingTeam.id}`
                : '/api/iff/love-and-war/team';
            
            const method = editingTeam ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    team_name: formData.team_name,
                    player_1_id: parseInt(formData.player_1_id),
                    player_2_id: parseInt(formData.player_2_id)
                })
            });

            if (response.ok) {
                await loadTeams();
                handleCloseModal();
            } else {
                const error = await response.json();
                alert('Error: ' + (error.error || 'Failed to save team'));
            }
        } catch (error) {
            console.error('Error saving team:', error);
            alert('Failed to save team');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this team?')) return;

        try {
            const response = await fetch(`/api/iff/love-and-war/team/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadTeams();
            }
        } catch (error) {
            console.error('Error deleting team:', error);
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
                    <h1 className="text-3xl font-bold text-red-400">Love & War Team Management</h1>
                    <p className="text-gray-400 mt-1">Create and manage tournament teams</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Create Team
                </button>
            </div>

            {/* Teams Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <LoadingSpinner size="lg" message="Loading teams..." />
                </div>
            ) : teams.length === 0 ? (
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8 text-center">
                    <Users size={48} className="mx-auto mb-4 text-gray-600" />
                    <h3 className="text-lg font-bold text-white mb-2">No Teams Created</h3>
                    <p className="text-gray-400 mb-4">Create your first team to get started with Love & War.</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Create Team
                    </button>
                </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <div key={team.id} className="bg-gray-900 rounded-lg p-5 border border-gray-800 hover:border-red-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{team.team_name}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Users size={14} />
                                    <span>2 Players</span>
                                </div>
                            </div>
                        </div>

                        {/* Players */}
                        <div className="space-y-2 mb-4">
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

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Link
                                to={`/iff/love-and-war/overlay?key=${key}&teamId=${team.id}`}
                                target="_blank"
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm"
                            >
                                <Eye size={14} />
                                View
                            </Link>
                            <button
                                onClick={() => handleOpenModal(team)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
                            >
                                <Edit3 size={14} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(team.id)}
                                className="px-3 py-2 bg-red-600/20 hover:bg-red-600 rounded transition-colors text-sm"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editingTeam ? 'Edit Team' : 'Create New Team'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.team_name}
                                    onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                    placeholder="Enter team name..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Player 1
                                </label>
                                <select
                                    value={formData.player_1_id}
                                    onChange={(e) => setFormData({ ...formData, player_1_id: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select player...</option>
                                    {players.map((player) => (
                                        <option key={player.id} value={player.id}>
                                            {player.name} {player.character_name && `(${player.character_name})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Player 2
                                </label>
                                <select
                                    value={formData.player_2_id}
                                    onChange={(e) => setFormData({ ...formData, player_2_id: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select player...</option>
                                    {players.map((player) => (
                                        <option key={player.id} value={player.id}>
                                            {player.name} {player.character_name && `(${player.character_name})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
                                >
                                    {editingTeam ? 'Save Changes' : 'Create Team'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoveAndWarControlPage;
