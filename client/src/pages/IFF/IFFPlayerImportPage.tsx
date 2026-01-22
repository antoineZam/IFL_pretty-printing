import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    ChevronLeft, 
    Users, 
    RefreshCw, 
    Trash2,
    Eye,
    AlertCircle,
    CheckCircle,
    Loader2,
    Database,
    UserPlus,
    Edit3,
    X,
    Save
} from 'lucide-react';

interface IFFPlayer {
    id: number;
    name: string;
    polaris_id: string | null;
    character_name: string;
    division: string;
    rank_name: string;
    tekken_power: number;
    prowess: number;
    iff8_ranking: string;
    iff8_record: string;
    iff8_record_details: string;
    iff_history: string;
    ranked_wins: number;
    ranked_losses: number;
    ranked_wl_rate: string;
    player_wins: number;
    player_losses: number;
    player_wl_rate: string;
    offense_rating: number;
    defense_rating: number;
    consistency_rating: number;
    adaptability_rating: number;
    clutch_rating: number;
    experience_rating: number;
}

// Available Tekken 8 characters
const characters: Record<string, string> = {
    '': '-- Select Character --',
    'alisa': 'Alisa',
    'anna': 'Anna',
    'armor king': 'Armor King',
    'asuka': 'Asuka',
    'azucena': 'Azucena',
    'bryan': 'Bryan',
    'claudio': 'Claudio',
    'devil jin': 'Devil Jin',
    'dragunov': 'Dragunov',
    'eddy': 'Eddy',
    'feng': 'Feng',
    'heihachi': 'Heihachi',
    'hwoarang': 'Hwoarang',
    'jack-8': 'Jack-8',
    'jin': 'Jin',
    'jun': 'Jun',
    'kazuya': 'Kazuya',
    'king': 'King',
    'kuma': 'Kuma',
    'lars': 'Lars',
    'law': 'Law',
    'lee': 'Lee',
    'leo': 'Leo',
    'leroy': 'Leroy',
    'lidia': 'Lidia',
    'lili': 'Lili',
    'nina': 'Nina',
    'panda': 'Panda',
    'paul': 'Paul',
    'raven': 'Raven',
    'reina': 'Reina',
    'shaheen': 'Shaheen',
    'steve': 'Steve',
    'victor': 'Victor',
    'xiaoyu': 'Xiaoyu',
    'yoshimitsu': 'Yoshimitsu',
    'zafina': 'Zafina'
};

const emptyPlayer: Omit<IFFPlayer, 'id'> = {
    name: '',
    polaris_id: null,
    character_name: '',
    division: '',
    rank_name: '',
    tekken_power: 0,
    prowess: 0,
    iff8_ranking: '',
    iff8_record: '',
    iff8_record_details: '',
    iff_history: '',
    ranked_wins: 0,
    ranked_losses: 0,
    ranked_wl_rate: '0%',
    player_wins: 0,
    player_losses: 0,
    player_wl_rate: '0%',
    offense_rating: 50,
    defense_rating: 50,
    consistency_rating: 50,
    adaptability_rating: 50,
    clutch_rating: 50,
    experience_rating: 50
};

export default function IFFPlayerImportPage() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState<IFFPlayer[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<Partial<IFFPlayer> | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        const connectionKey = localStorage.getItem('connectionKey');
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        fetchPlayers();
    }, [navigate]);

    const fetchPlayers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/iff/players');
            const data = await response.json();
            setPlayers(data.players || []);
        } catch (error) {
            console.error('Error fetching players:', error);
            setMessage({ type: 'error', text: 'Failed to fetch players' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingPlayer({ ...emptyPlayer });
        setIsAddingNew(true);
    };

    const handleEdit = (player: IFFPlayer) => {
        setEditingPlayer({ ...player });
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        if (!editingPlayer?.name) {
            setMessage({ type: 'error', text: 'Player name is required' });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            const url = isAddingNew ? '/api/iff/player' : `/api/iff/player/${editingPlayer.id}`;
            const method = isAddingNew ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPlayer)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Save failed');
            }

            setMessage({ type: 'success', text: `Player ${isAddingNew ? 'added' : 'updated'} successfully` });
            setEditingPlayer(null);
            fetchPlayers();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to save player' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (playerId: number) => {
        if (!confirm('Are you sure you want to delete this player?')) return;

        try {
            const response = await fetch(`/api/iff/player/${playerId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            setMessage({ type: 'success', text: 'Player deleted successfully' });
            fetchPlayers();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to delete player' });
        }
    };

    const updateField = (field: string, value: string | number) => {
        if (!editingPlayer) return;
        setEditingPlayer({ ...editingPlayer, [field]: value });
    };

    // Calculate W/L rate helper
    const calcWLRate = (wins: number, losses: number): string => {
        const total = wins + losses;
        if (total === 0) return '0%';
        return `${Math.round((wins / total) * 100)}%`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <Link to="/dashboard/rib" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to IFF Dashboard</span>
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <Database size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">IFF Player Stats</h1>
                                <p className="text-orange-400/70 text-sm">Manage player data for Run It Back</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <UserPlus size={18} />
                            Add Player
                        </button>
                    </div>
                </header>

                {/* Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                        message.type === 'success' 
                            ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                            : 'bg-red-500/20 border border-red-500/30 text-red-400'
                    }`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {message.text}
                    </div>
                )}

                {/* Edit Modal */}
                {editingPlayer && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 max-w-3xl w-full my-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    {isAddingNew ? <UserPlus size={20} /> : <Edit3 size={20} />}
                                    {isAddingNew ? 'Add New Player' : 'Edit Player'}
                                </h2>
                                <button onClick={() => setEditingPlayer(null)} className="p-2 text-gray-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Player Name *</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.name || ''}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Character</label>
                                        <select
                                            value={editingPlayer.character_name || ''}
                                            onChange={(e) => updateField('character_name', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        >
                                            {Object.entries(characters).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Division</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.division || ''}
                                            onChange={(e) => updateField('division', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Rank</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.rank_name || ''}
                                            onChange={(e) => updateField('rank_name', e.target.value)}
                                            placeholder="e.g., Tekken God Supreme"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Prowess</label>
                                        <input
                                            type="number"
                                            value={editingPlayer.prowess || 0}
                                            onChange={(e) => updateField('prowess', parseInt(e.target.value) || 0)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* IFF8 Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-medium mb-4 text-red-400">IFF8 Statistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">IFF8 Ranking</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8_ranking || ''}
                                                onChange={(e) => updateField('iff8_ranking', e.target.value)}
                                                placeholder="e.g., #1, Top 8"
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">IFF8 Record</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8_record || ''}
                                                onChange={(e) => updateField('iff8_record', e.target.value)}
                                                placeholder="e.g., 5-2"
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-400 mb-1">IFF8 Record Details</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.iff8_record_details || ''}
                                            onChange={(e) => updateField('iff8_record_details', e.target.value)}
                                            placeholder="e.g., Beat PlayerA 3-1, Lost to PlayerB 2-3"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-400 mb-1">IFF History</label>
                                        <textarea
                                            value={editingPlayer.iff_history || ''}
                                            onChange={(e) => updateField('iff_history', e.target.value)}
                                            placeholder="Historical tournament performance..."
                                            rows={2}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* Match Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-medium mb-4 text-blue-400">Match Statistics</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Ranked Matches */}
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Ranked Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Wins</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.ranked_wins || 0}
                                                        onChange={(e) => {
                                                            const wins = parseInt(e.target.value) || 0;
                                                            updateField('ranked_wins', wins);
                                                            updateField('ranked_wl_rate', calcWLRate(wins, editingPlayer.ranked_losses || 0));
                                                        }}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Losses</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.ranked_losses || 0}
                                                        onChange={(e) => {
                                                            const losses = parseInt(e.target.value) || 0;
                                                            updateField('ranked_losses', losses);
                                                            updateField('ranked_wl_rate', calcWLRate(editingPlayer.ranked_wins || 0, losses));
                                                        }}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    W/L Rate: <span className="text-white font-medium">{editingPlayer.ranked_wl_rate || '0%'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Player Matches */}
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Player Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Wins</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.player_wins || 0}
                                                        onChange={(e) => {
                                                            const wins = parseInt(e.target.value) || 0;
                                                            updateField('player_wins', wins);
                                                            updateField('player_wl_rate', calcWLRate(wins, editingPlayer.player_losses || 0));
                                                        }}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Losses</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.player_losses || 0}
                                                        onChange={(e) => {
                                                            const losses = parseInt(e.target.value) || 0;
                                                            updateField('player_losses', losses);
                                                            updateField('player_wl_rate', calcWLRate(editingPlayer.player_wins || 0, losses));
                                                        }}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    W/L Rate: <span className="text-white font-medium">{editingPlayer.player_wl_rate || '0%'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Radar Chart Ratings */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-medium mb-4 text-purple-400">Radar Chart Ratings (0-100)</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { key: 'offense_rating', label: 'Offense', color: 'red' },
                                            { key: 'defense_rating', label: 'Defense', color: 'blue' },
                                            { key: 'consistency_rating', label: 'Consistency', color: 'green' },
                                            { key: 'adaptability_rating', label: 'Adaptability', color: 'purple' },
                                            { key: 'clutch_rating', label: 'Clutch', color: 'yellow' },
                                            { key: 'experience_rating', label: 'Experience', color: 'cyan' }
                                        ].map((stat) => (
                                            <div key={stat.key}>
                                                <label className="block text-sm text-gray-400 mb-1">{stat.label}</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={(editingPlayer as any)[stat.key] || 50}
                                                    onChange={(e) => updateField(stat.key, Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={() => setEditingPlayer(null)}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        {isAddingNew ? 'Add Player' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Players List */}
                <div className="rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Users size={20} />
                            Players ({players.length})
                        </h2>
                        <button
                            onClick={fetchPlayers}
                            disabled={loading}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {loading && players.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Loader2 size={32} className="animate-spin mx-auto mb-4" />
                            Loading players...
                        </div>
                    ) : players.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No players yet</p>
                            <p className="text-sm mt-2">Click "Add Player" to create your first player</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-800">
                            {players.map((player) => (
                                <div key={player.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {/* Character Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center overflow-hidden">
                                            {player.character_name ? (
                                                <img
                                                    src={`/source/overlay/characters/P1_icon/${player.character_name.toLowerCase()}.png`}
                                                    alt={player.character_name}
                                                    className="w-12 h-12 object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <Users size={24} className="text-orange-400" />
                                            )}
                                        </div>

                                        {/* Player Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                {player.rank_name && <span>{player.rank_name}</span>}
                                                {player.character_name && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="capitalize">{player.character_name}</span>
                                                    </>
                                                )}
                                                {player.iff8_ranking && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-orange-400">IFF8: {player.iff8_ranking}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">
                                                Ranked: {player.ranked_wins}W - {player.ranked_losses}L
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Player: {player.player_wins}W - {player.player_losses}L
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/iff/player-stats/${player.id}`}
                                                className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                                                title="View Overlay"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleEdit(player)}
                                                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(player.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
