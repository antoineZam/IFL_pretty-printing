import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import IFFBurgerMenu from '../../components/IFFBurgerMenu';
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
    'miary_zo': 'Miary Zo',
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
        setEditingPlayer(prev => prev ? { ...prev, [field]: value } : prev);
    };

    // Update multiple fields at once to avoid race conditions
    const updateFields = (updates: Partial<typeof editingPlayer>) => {
        if (!editingPlayer) return;
        setEditingPlayer(prev => prev ? { ...prev, ...updates } : prev);
    };

    // Calculate W/L rate helper
    const calcWLRate = (wins: number, losses: number): string => {
        const total = wins + losses;
        if (total === 0) return '0%';
        return `${Math.round((wins / total) * 100)}%`;
    };

    return (
        <div className="min-h-screen bg-transparent">
            <IFFBurgerMenu />
            
            <style>
                {`
                    @keyframes cyber-glitch-hover {
                        0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                        20% { clip-path: polygon(0 15%, 100% 15%, 100% 85%, 0 85%); }
                        40% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                        60% { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); }
                        80% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                        100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                    }
                    .cyber-card {
                        position: relative;
                    }
                    .cyber-card::before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: #10b981;
                        opacity: 0;
                        z-index: -1;
                        transition: opacity 0.2s ease;
                    }
                    .cyber-card:hover::before {
                        opacity: 0.1;
                        animation: cyber-glitch-hover 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
                    }
                    .cyber-card:hover {
                        box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
                        border-color: rgba(16, 185, 129, 0.8);
                        transform: translateX(4px);
                    }
                `}
            </style>

            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pl-16 pr-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <Link to="/dashboard/iff" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to IFF Dashboard</span>
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-none border border-[#10b981]/50 bg-gradient-to-br from-[#064e3b] to-[#022c22] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                <Database size={24} className="text-[#10b981]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">IFF Player Stats</h1>
                                <p className="text-[#34d399]/70 text-sm uppercase tracking-widest font-mono">Manage player data for Run It Back</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-4 py-2 bg-[#10b981]/10 hover:bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] rounded-none font-medium transition-all uppercase tracking-widest text-sm font-mono cyber-card"
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
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#020617] rounded-none p-6 border border-[#10b981]/30 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto relative font-mono shadow-[0_0_20px_rgba(16,185,129,0.1)]">
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
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">Player Name *</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.name || ''}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">Character</label>
                                        <select
                                            value={editingPlayer.character_name || ''}
                                            onChange={(e) => updateField('character_name', e.target.value)}
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        >
                                            {Object.entries(characters).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">Division</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.division || ''}
                                            onChange={(e) => updateField('division', e.target.value)}
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">Rank</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.rank_name || ''}
                                            onChange={(e) => updateField('rank_name', e.target.value)}
                                            placeholder="e.g., Tekken God Supreme"
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">Prowess</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            value={editingPlayer.prowess || 0}
                                            onChange={(e) => updateField('prowess', parseInt(e.target.value) || 0)}
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                {/* IFF8 Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-sm font-bold mb-4 text-[#10b981] font-mono tracking-widest uppercase">IFF8 Statistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">IFF8 Ranking</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8_ranking || ''}
                                                onChange={(e) => updateField('iff8_ranking', e.target.value)}
                                                placeholder="e.g., #1, Top 8"
                                                className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">IFF8 Record</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8_record || ''}
                                                onChange={(e) => updateField('iff8_record', e.target.value)}
                                                placeholder="e.g., 5-2"
                                                className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">IFF8 Record Details</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.iff8_record_details || ''}
                                            onChange={(e) => updateField('iff8_record_details', e.target.value)}
                                            placeholder="e.g., Beat PlayerA 3-1, Lost to PlayerB 2-3"
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">IFF History</label>
                                        <textarea
                                            value={editingPlayer.iff_history || ''}
                                            onChange={(e) => updateField('iff_history', e.target.value)}
                                            placeholder="Historical tournament performance..."
                                            rows={2}
                                            className="w-full bg-[#020617]/50 border border-[#10b981]/20 rounded-none px-3 py-2 text-[#34d399] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Match Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-sm font-bold mb-4 text-[#10b981] font-mono tracking-widest uppercase">Match Statistics</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Ranked Matches */}
                                        <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-none p-4 cyber-card">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Ranked Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-[#34d399]/70 w-12 font-mono tracking-widest uppercase">Wins</label>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        value={editingPlayer.ranked_wins ?? ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            const wins = val === '' ? 0 : parseInt(val) || 0;
                                                            const losses = editingPlayer.ranked_losses || 0;
                                                            updateFields({
                                                                ranked_wins: wins,
                                                                ranked_wl_rate: calcWLRate(wins, losses)
                                                            });
                                                        }}
                                                        className="flex-1 bg-[#020617]/80 border border-[#10b981]/30 rounded-none px-2 py-1 text-[#34d399] focus:outline-none focus:border-[#10b981] font-mono text-sm cursor-text"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-[#34d399]/70 w-12 font-mono tracking-widest uppercase">Losses</label>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        value={editingPlayer.ranked_losses ?? ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            const losses = val === '' ? 0 : parseInt(val) || 0;
                                                            const wins = editingPlayer.ranked_wins || 0;
                                                            updateFields({
                                                                ranked_losses: losses,
                                                                ranked_wl_rate: calcWLRate(wins, losses)
                                                            });
                                                        }}
                                                        className="flex-1 bg-[#020617]/80 border border-[#10b981]/30 rounded-none px-2 py-1 text-[#34d399] focus:outline-none focus:border-[#10b981] font-mono text-sm cursor-text"
                                                    />
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    W/L Rate: <span className="text-white font-medium">{editingPlayer.ranked_wl_rate || '0%'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Player Matches */}
                                        <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-none p-4 cyber-card">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Player Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-[#34d399]/70 w-12 font-mono tracking-widest uppercase">Wins</label>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        value={editingPlayer.player_wins ?? ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            const wins = val === '' ? 0 : parseInt(val) || 0;
                                                            const losses = editingPlayer.player_losses || 0;
                                                            updateFields({
                                                                player_wins: wins,
                                                                player_wl_rate: calcWLRate(wins, losses)
                                                            });
                                                        }}
                                                        className="flex-1 bg-[#020617]/80 border border-[#10b981]/30 rounded-none px-2 py-1 text-[#34d399] focus:outline-none focus:border-[#10b981] font-mono text-sm cursor-text"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-[#34d399]/70 w-12 font-mono tracking-widest uppercase">Losses</label>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        value={editingPlayer.player_losses ?? ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            const losses = val === '' ? 0 : parseInt(val) || 0;
                                                            const wins = editingPlayer.player_wins || 0;
                                                            updateFields({
                                                                player_losses: losses,
                                                                player_wl_rate: calcWLRate(wins, losses)
                                                            });
                                                        }}
                                                        className="flex-1 bg-[#020617]/80 border border-[#10b981]/30 rounded-none px-2 py-1 text-[#34d399] focus:outline-none focus:border-[#10b981] font-mono text-sm cursor-text"
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
                                    <h3 className="text-sm font-bold mb-4 text-[#10b981] font-mono tracking-widest uppercase">Radar Chart Ratings (0-100)</h3>
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
                                                <label className="block text-xs text-[#34d399]/70 mb-1 font-mono tracking-widest uppercase">{stat.label}</label>
                                                <input
                                                    type="number"
                                                    inputMode="numeric"
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
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#10b981]/10 border border-[#10b981]/50 text-[#10b981] hover:bg-[#10b981]/20 rounded-none transition-all font-mono uppercase tracking-widest text-sm cyber-card hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#10b981]/20 border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/30 disabled:bg-[#020617] disabled:border-[#10b981]/30 disabled:text-[#10b981]/30 rounded-none transition-all font-mono uppercase tracking-widest text-sm cyber-card hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
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
                <div className="rounded-none bg-[#020617]/80 backdrop-blur-sm border border-[#10b981]/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] overflow-hidden">
                    <div className="p-6 border-b border-[#10b981]/30 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono uppercase tracking-widest">
                            <Users size={20} className="text-[#10b981]" />
                            Players ({players.length})
                        </h2>
                        <button
                            onClick={fetchPlayers}
                            disabled={loading}
                            className="p-2 text-[#34d399]/70 hover:text-[#10b981] transition-colors"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {loading && players.length === 0 ? (
                        <div className="p-12 text-center text-[#34d399]/50 font-mono tracking-widest uppercase text-sm">
                            <Loader2 size={32} className="animate-spin mx-auto mb-4 text-[#10b981]" />
                            Scanning database...
                        </div>
                    ) : players.length === 0 ? (
                        <div className="p-12 text-center text-[#34d399]/50 font-mono tracking-widest uppercase">
                            <Users size={48} className="mx-auto mb-4 opacity-50 text-[#10b981]" />
                            <p>No records found</p>
                            <p className="text-xs mt-2 opacity-70">Initialize a new player profile</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#10b981]/20">
                            {players.map((player) => (
                                <div key={player.id} className="p-4 hover:bg-[#10b981]/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {/* Character Icon */}
                                        <div className="w-14 h-14 rounded-none bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center overflow-hidden cyber-card">
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
                                                <Users size={24} className="text-[#10b981]" />
                                            )}
                                        </div>

                                        {/* Player Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white tracking-widest uppercase font-mono">{player.name}</h3>
                                            <div className="flex items-center gap-4 text-xs text-[#34d399]/70 font-mono">
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
                                                        <span className="text-[#10b981]">IFF8: {player.iff8_ranking}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="text-right font-mono">
                                            <div className="text-xs text-[#34d399]/70">
                                                Ranked: <span className="text-[#10b981]">{player.ranked_wins}W</span> - <span className="text-[#ef4444]">{player.ranked_losses}L</span>
                                            </div>
                                            <div className="text-xs text-[#34d399]/70">
                                                Player: <span className="text-[#10b981]">{player.player_wins}W</span> - <span className="text-[#ef4444]">{player.player_losses}L</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/iff/player-stats/${player.id}`}
                                                className="p-2 text-[#34d399]/50 hover:text-[#10b981] transition-colors"
                                                title="View Overlay"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleEdit(player)}
                                                className="p-2 text-[#34d399]/50 hover:text-[#3b82f6] transition-colors"
                                                title="Edit"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(player.id)}
                                                className="p-2 text-[#34d399]/50 hover:text-[#ef4444] transition-colors"
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
