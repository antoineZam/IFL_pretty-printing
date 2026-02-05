import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Trophy, Calendar, Users, X, Target } from 'lucide-react';

import LoadingSpinner from '../../components/ui/LoadingSpinner';
import IFFBurgerMenu from '../../components/IFFBurgerMenu';

// Tournament format type
type TournamentFormat = 'single_elimination' | 'double_elimination' | 'round_robin';

// Tournament list item for display
interface TournamentListItem {
    id: number;
    name: string;
    format: string;
    status: string;
    start_date: string | null;
    team_count: number;
    match_count: number;
}


const LoveAndWarTournamentsPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [tournaments, setTournaments] = useState<TournamentListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        format: TournamentFormat;
        start_date: string;
    }>({
        name: '',
        format: 'single_elimination',
        start_date: ''
    });

    useEffect(() => {
        loadTournaments();
    }, []);

    const loadTournaments = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/iff/love-and-war/tournaments');
            const data = await response.json();
            setTournaments(data.tournaments || []);
        } catch (error) {
            console.error('Error loading tournaments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            alert('Please enter a tournament name');
            return;
        }

        try {
            const response = await fetch('/api/iff/love-and-war/tournament', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await loadTournaments();
                handleCloseModal();
            } else {
                const error = await response.json();
                alert('Error: ' + (error.error || 'Failed to create tournament'));
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
            alert('Failed to create tournament');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', format: 'single_elimination', start_date: '' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'setup': return 'bg-yellow-500/20 text-yellow-400';
            case 'in_progress': return 'bg-green-500/20 text-green-400';
            case 'completed': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getFormatLabel = (format: string) => {
        switch (format) {
            case 'single_elimination': return 'Single Elimination';
            case 'double_elimination': return 'Double Elimination';
            default: return format;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pl-20">
            <IFFBurgerMenu />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link to={`/iff/love-and-war?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Love & War Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-red-400">Tournaments & Brackets</h1>
                    <p className="text-gray-400 mt-1">Create and manage Love & War tournaments</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Create Tournament
                </button>
            </div>

            {/* Tournaments Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <LoadingSpinner size="lg" message="Loading tournaments..." />
                </div>
            ) : tournaments.length === 0 ? (
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8 text-center">
                    <Trophy size={48} className="mx-auto mb-4 text-gray-600" />
                    <h3 className="text-lg font-bold text-white mb-2">No Tournaments Yet</h3>
                    <p className="text-gray-400 mb-4">Create your first Love & War tournament to get started.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Create Tournament
                    </button>
                </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournaments.map((tournament) => (
                    <Link
                        key={tournament.id}
                        to={`/iff/love-and-war/tournament/${tournament.id}/bracket?key=${key}`}
                        className="bg-gray-900 rounded-lg p-5 border border-gray-800 hover:border-red-500/50 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                                    {tournament.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                                        {tournament.status.toUpperCase().replace('_', ' ')}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {getFormatLabel(tournament.format)}
                                    </span>
                                </div>
                            </div>
                            <Trophy className="text-red-400/50 group-hover:text-red-400 transition-colors" size={28} />
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Users size={14} className="text-gray-500" />
                                <span className="text-gray-400">{tournament.team_count} teams</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Target size={14} className="text-gray-500" />
                                <span className="text-gray-400">{tournament.match_count} matches</span>
                            </div>
                            {tournament.start_date && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span className="text-gray-400">
                                        {new Date(tournament.start_date).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            )}

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Create New Tournament</h2>
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
                                    Tournament Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                    placeholder="Enter tournament name..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Format
                                </label>
                                <select
                                    value={formData.format}
                                    onChange={(e) => setFormData({ ...formData, format: e.target.value as TournamentFormat })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                >
                                    <option value="single_elimination">Single Elimination</option>
                                    <option value="double_elimination">Double Elimination</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Start Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                />
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
                                    Create Tournament
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoveAndWarTournamentsPage;
