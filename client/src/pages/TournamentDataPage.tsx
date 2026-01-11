import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Download, Database, Trophy, Users, Swords, RefreshCw, ArrowLeft, Calendar, CheckCircle, XCircle, Edit2, X, Save } from 'lucide-react';

interface Tournament {
    tournament_id: number;
    name: string;
    season: string;
    edition: number;
    start_date: string;
    status: string;
    game_version: string;
}

interface Match {
    match_id: number;
    tournament_id: number;
    player1_id: number;
    player2_id: number;
    p1Name: string;
    p1Flag: string;
    p2Name: string;
    p2Flag: string;
    winner_id: number | null;
    round_name: string;
    score_p1: number;
    score_p2: number;
    match_time: string;
    tournamentName?: string;
}

interface StartGGTournament {
    id: number;
    name: string;
    slug: string;
    startAt: number | string | null;
    endAt: number | string | null;
    events?: { id: number; name: string; slug: string }[];
}

interface Player {
    user_id: number;
    username: string;
    sponsor?: string;
    country?: string;
    main_character?: string;
    total_matches?: number;
    wins?: number;
}

interface TournamentStanding {
    user_id: number;
    username: string;
    sponsor?: string;
    country?: string;
    wins: number;
    losses: number;
    total_matches: number;
    placement: number;
}

interface PlayerRanking {
    tournament_id: number;
    tournament_name: string;
    start_date: string;
    wins: number;
    losses: number;
    total_matches: number;
}

const TournamentDataPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'database' | 'startgg' | 'players'>('database');
    
    // Database state
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const [tournamentMatches, setTournamentMatches] = useState<Match[]>([]);
    const [loadingTournaments, setLoadingTournaments] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    
    // start.gg state
    const [searchTerm, setSearchTerm] = useState('iron-fist-league');
    const [startggResults, setStartggResults] = useState<StartGGTournament[]>([]);
    const [searchingStartgg, setSearchingStartgg] = useState(false);
    const [syncingSlug, setSyncingSlug] = useState<string | null>(null);
    const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
    
    // Players state
    const [players, setPlayers] = useState<Player[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [playerMatches, setPlayerMatches] = useState<Match[]>([]);
    
    // Player editing state
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [editForm, setEditForm] = useState({ username: '', sponsor: '', country: '', main_character: '' });
    const [savingPlayer, setSavingPlayer] = useState(false);
    const [playerSearch, setPlayerSearch] = useState('');
    
    // Tournament standings state
    const [tournamentStandings, setTournamentStandings] = useState<TournamentStanding[]>([]);
    const [loadingStandings, setLoadingStandings] = useState(false);
    
    // Player rankings state
    const [playerRankings, setPlayerRankings] = useState<PlayerRanking[]>([]);
    const [loadingRankings, setLoadingRankings] = useState(false);

    useEffect(() => {
        const connectionKey = localStorage.getItem('connectionKey');
        if (!connectionKey) {
            navigate('/auth');
        }
    }, [navigate]);

    useEffect(() => {
        loadTournaments();
    }, []);

    const loadTournaments = async () => {
        setLoadingTournaments(true);
        try {
            const res = await fetch('/api/db/tournaments');
            const data = await res.json();
            setTournaments(data.tournaments || []);
        } catch (error) {
            console.error('Error loading tournaments:', error);
        } finally {
            setLoadingTournaments(false);
        }
    };

    const loadTournamentMatches = async (tournamentId: number) => {
        setLoadingMatches(true);
        try {
            const res = await fetch(`/api/db/tournament/${tournamentId}/matches`);
            const data = await res.json();
            setTournamentMatches(data.matches || []);
        } catch (error) {
            console.error('Error loading matches:', error);
        } finally {
            setLoadingMatches(false);
        }
    };

    const loadTournamentStandings = async (tournamentId: number) => {
        setLoadingStandings(true);
        try {
            const res = await fetch(`/api/db/tournament/${tournamentId}/standings?limit=8`);
            const data = await res.json();
            setTournamentStandings(data.standings || []);
        } catch (error) {
            console.error('Error loading standings:', error);
        } finally {
            setLoadingStandings(false);
        }
    };

    const loadPlayerRankings = async (playerId: number) => {
        setLoadingRankings(true);
        try {
            const res = await fetch(`/api/db/player/${playerId}/rankings`);
            const data = await res.json();
            setPlayerRankings(data.rankings || []);
        } catch (error) {
            console.error('Error loading rankings:', error);
        } finally {
            setLoadingRankings(false);
        }
    };

    const searchStartGG = async () => {
        if (!searchTerm.trim()) return;
        setSearchingStartgg(true);
        setSyncResult(null);
        try {
            const res = await fetch(`/api/startgg/search?term=${encodeURIComponent(searchTerm)}`);
            const data = await res.json();
            setStartggResults(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error searching start.gg:', error);
            setStartggResults([]);
        } finally {
            setSearchingStartgg(false);
        }
    };

    const syncTournament = async (slug: string) => {
        // Strip "tournament/" prefix if present - start.gg returns full path slugs
        const cleanSlug = slug.replace(/^tournament\//, '');
        console.log('[syncTournament] Original slug:', slug);
        console.log('[syncTournament] Clean slug:', cleanSlug);
        console.log('[syncTournament] API URL:', `/api/startgg/sync/tournament/${cleanSlug}`);
        
        setSyncingSlug(slug);
        setSyncResult(null);
        try {
            const res = await fetch(`/api/startgg/sync/tournament/${cleanSlug}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('[syncTournament] Response status:', res.status, res.statusText);
            const data = await res.json();
            console.log('[syncTournament] Response data:', data);
            
            if (data.success) {
                const playerUpdatedMsg = data.playersUpdated ? ` (${data.playersUpdated} updated)` : '';
                const matchUpdatedMsg = data.matchesUpdated ? `, ${data.matchesUpdated} updated` : '';
                setSyncResult({ success: true, message: `${data.playersSynced} players${playerUpdatedMsg}, ${data.matchesSynced} matches added${matchUpdatedMsg}` });
                loadTournaments();
            } else {
                setSyncResult({ success: false, message: data.error || 'Sync failed' });
            }
        } catch (error) {
            console.error('[syncTournament] Error:', error);
            setSyncResult({ success: false, message: 'Failed to sync tournament' });
        } finally {
            setSyncingSlug(null);
        }
    };

    const loadPlayers = async () => {
        setLoadingPlayers(true);
        try {
            const res = await fetch('/api/startgg/players');
            const data = await res.json();
            setPlayers(data.players || []);
        } catch (error) {
            console.error('Error loading players:', error);
        } finally {
            setLoadingPlayers(false);
        }
    };

    const loadPlayerMatches = async (playerId: number) => {
        try {
            const res = await fetch(`/api/startgg/player/${playerId}/matches`);
            const data = await res.json();
            setPlayerMatches(data.matches || []);
        } catch (error) {
            console.error('Error loading player matches:', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'players') {
            loadPlayers();
        }
    }, [activeTab]);

    const openEditPlayer = (player: Player) => {
        setEditingPlayer(player);
        setEditForm({
            username: player.username || '',
            sponsor: player.sponsor || '',
            country: player.country || '',
            main_character: player.main_character || ''
        });
    };

    const savePlayer = async () => {
        if (!editingPlayer) return;
        setSavingPlayer(true);
        try {
            const res = await fetch(`/api/db/player/${editingPlayer.user_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            const data = await res.json();
            if (data.success) {
                // Update player in list
                setPlayers(prev => prev.map(p => 
                    p.user_id === editingPlayer.user_id ? { ...p, ...editForm } : p
                ));
                if (selectedPlayer?.user_id === editingPlayer.user_id) {
                    setSelectedPlayer({ ...selectedPlayer, ...editForm });
                }
                setEditingPlayer(null);
            }
        } catch (error) {
            console.error('Error saving player:', error);
        } finally {
            setSavingPlayer(false);
        }
    };

    // Filter players by search
    const filteredPlayers = players.filter(p => 
        p.username.toLowerCase().includes(playerSearch.toLowerCase())
    );

    const formatDate = (dateInput: string | number) => {
        if (!dateInput) return 'N/A';
        let date: Date;
        if (typeof dateInput === 'number') {
            date = new Date(dateInput * 1000);
        } else if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
            date = new Date(parseInt(dateInput) * 1000);
        } else {
            date = new Date(dateInput);
        }
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            registration: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    };

    const TabButton = ({ id, label, icon, count }: { id: string; label: string; icon: React.ReactNode; count?: number }) => (
        <button
            onClick={() => setActiveTab(id as 'database' | 'startgg' | 'players')}
            className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${activeTab === id 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }
            `}
        >
            {icon}
            {label}
            {count !== undefined && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-white/10">{count}</span>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Background accent */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 0%, rgba(218,165,32,0.3) 0%, transparent 50%)`
                }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/" 
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-semibold text-white">Tournament Data</h1>
                            <p className="text-gray-500 text-sm">Manage and sync tournament information</p>
                        </div>
                    </div>
                    <button 
                        onClick={loadTournaments}
                        disabled={loadingTournaments}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        <RefreshCw size={14} className={loadingTournaments ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </header>

                {/* Tab Navigation */}
                <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit mb-8">
                    <TabButton id="database" label="Tournaments" icon={<Trophy size={16} />} count={tournaments.length} />
                    <TabButton id="startgg" label="Import" icon={<Download size={16} />} />
                    <TabButton id="players" label="Players" icon={<Users size={16} />} count={players.length || undefined} />
                </div>

                {/* Database Tab */}
                {activeTab === 'database' && (
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                        {/* Tournaments List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5">
                                    <h2 className="font-medium text-white text-sm">Saved Tournaments</h2>
                                </div>
                                
                                {loadingTournaments ? (
                                    <div className="flex items-center justify-center py-16">
                                        <RefreshCw className="animate-spin text-gray-600" size={24} />
                                    </div>
                                ) : tournaments.length === 0 ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Database size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">No tournaments found</p>
                                    </div>
                                ) : (
                                    <div className="max-h-[600px] overflow-y-auto">
                                        {tournaments.map((tournament) => (
                                            <button
                                                key={tournament.tournament_id}
                                                onClick={() => {
                                                    setSelectedTournament(tournament);
                                                    loadTournamentMatches(tournament.tournament_id);
                                                    loadTournamentStandings(tournament.tournament_id);
                                                }}
                                                className={`
                                                    w-full text-left p-4 border-b border-white/5 transition-all
                                                    ${selectedTournament?.tournament_id === tournament.tournament_id
                                                        ? 'bg-primary/10'
                                                        : 'hover:bg-white/[0.03]'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-medium text-white text-sm truncate">{tournament.name}</h3>
                                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                                            <Calendar size={11} />
                                                            {formatDate(tournament.start_date)}
                                                        </p>
                                                    </div>
                                                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusBadge(tournament.status)}`}>
                                                        {tournament.status?.toUpperCase()}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Match History */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                    <h2 className="font-medium text-white text-sm">Match History</h2>
                                    {selectedTournament && (
                                        <span className="text-xs text-gray-500">{tournamentMatches.length} matches</span>
                                    )}
                                </div>

                                {!selectedTournament ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Swords size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">Select a tournament</p>
                                    </div>
                                ) : loadingMatches ? (
                                    <div className="flex items-center justify-center py-16">
                                        <RefreshCw className="animate-spin text-gray-600" size={24} />
                                    </div>
                                ) : tournamentMatches.length === 0 ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Swords size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">No matches found</p>
                                    </div>
                                ) : (
                                    <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5">
                                        {tournamentMatches.map((match) => (
                                            <div key={match.match_id} className="p-3 hover:bg-white/[0.02]">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 min-w-0 text-right">
                                                        <span className={`text-sm font-medium truncate block ${match.winner_id === match.player1_id ? 'text-emerald-400' : 'text-gray-300'}`}>
                                                            {match.p1Name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 rounded shrink-0">
                                                        <span className="font-bold text-white text-sm w-4 text-center">{match.score_p1}</span>
                                                        <span className="text-gray-600 text-xs">-</span>
                                                        <span className="font-bold text-white text-sm w-4 text-center">{match.score_p2}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className={`text-sm font-medium truncate block ${match.winner_id === match.player2_id ? 'text-emerald-400' : 'text-gray-300'}`}>
                                                            {match.p2Name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                                                        {match.round_name}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tournament Top 8 */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-b from-amber-500/5 to-transparent border border-amber-500/10 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center gap-2">
                                    <Trophy size={16} className="text-amber-400" />
                                    <h2 className="font-medium text-white text-sm">Top 8</h2>
                                </div>

                                {!selectedTournament ? (
                                    <div className="text-center py-12 text-gray-600">
                                        <Trophy size={28} className="mx-auto mb-2 opacity-30" />
                                        <p className="text-xs">Select a tournament</p>
                                    </div>
                                ) : loadingStandings ? (
                                    <div className="flex items-center justify-center py-12">
                                        <RefreshCw className="animate-spin text-gray-600" size={20} />
                                    </div>
                                ) : tournamentStandings.length === 0 ? (
                                    <div className="text-center py-12 text-gray-600">
                                        <Trophy size={28} className="mx-auto mb-2 opacity-30" />
                                        <p className="text-xs">No standings data</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {tournamentStandings.map((player) => (
                                            <div 
                                                key={player.user_id}
                                                className={`px-3 py-2 flex items-center gap-2 ${
                                                    player.placement <= 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''
                                                }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    player.placement === 1 ? 'bg-amber-500 text-black' :
                                                    player.placement === 2 ? 'bg-gray-400 text-black' :
                                                    player.placement === 3 ? 'bg-amber-700 text-white' :
                                                    'bg-white/10 text-gray-400'
                                                }`}>
                                                    {player.placement}
                                                </div>

                                                {player.country ? (
                                                    <img 
                                                        src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                                                        alt={player.country}
                                                        className="w-4 h-auto"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                ) : (
                                                    <div className="w-4" />
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline gap-1 truncate">
                                                        {player.sponsor && (
                                                            <span className="text-[9px] text-gray-500">{player.sponsor}</span>
                                                        )}
                                                        <span className={`text-xs font-medium truncate ${
                                                            player.placement === 1 ? 'text-amber-400' : 'text-white'
                                                        }`}>
                                                            {player.username}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <span className="text-[10px] text-gray-500">
                                                        {player.wins}W-{player.losses}L
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* start.gg Tab */}
                {activeTab === 'startgg' && (
                    <div className="space-y-6">
                        {/* Quick Sync */}
                        <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-amber-400 text-sm">Quick Sync</h3>
                                    <p className="text-gray-500 text-xs mt-1">Find and sync all Iron Fist League tournaments</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            setSearchingStartgg(true);
                                            try {
                                                const res = await fetch('/api/startgg/ifl/tournaments');
                                                const data = await res.json();
                                                setStartggResults(Array.isArray(data) ? data : []);
                                            } catch (error) {
                                                console.error('Error:', error);
                                            } finally {
                                                setSearchingStartgg(false);
                                            }
                                        }}
                                        disabled={searchingStartgg}
                                        className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {searchingStartgg ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
                                        Find All
                                    </button>
                                    <button
                                        onClick={async () => {
                                            setSyncingSlug('all');
                                            setSyncResult(null);
                                            try {
                                                const res = await fetch('/api/startgg/ifl/sync-all', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' }
                                                });
                                                const data = await res.json();
                                                if (!res.ok) {
                                                    setSyncResult({ success: false, message: data.error || 'Sync failed' });
                                                    return;
                                                }
                                                const totalUpdated = data.results
                                                    .filter((r: { success: boolean }) => r.success)
                                                    .reduce((sum: number, r: { matchesUpdated?: number }) => sum + (r.matchesUpdated || 0), 0);
                                                let message = `Synced ${data.synced}/${data.totalFound} tournaments.`;
                                                if (totalUpdated > 0) {
                                                    message += ` ${totalUpdated} matches updated.`;
                                                }
                                                setSyncResult({ success: data.failed === 0, message });
                                                loadTournaments();
                                            } catch (error) {
                                                setSyncResult({ success: false, message: 'Network error' });
                                            } finally {
                                                setSyncingSlug(null);
                                            }
                                        }}
                                        disabled={syncingSlug === 'all'}
                                        className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {syncingSlug === 'all' ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                                        Sync All
                                    </button>
                                    <button
                                        onClick={async () => {
                                            setSyncingSlug('cleanup');
                                            setSyncResult(null);
                                            try {
                                                const res = await fetch('/api/db/players/cleanup', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' }
                                                });
                                                const data = await res.json();
                                                if (!res.ok) {
                                                    setSyncResult({ success: false, message: data.error || 'Cleanup failed' });
                                                    return;
                                                }
                                                setSyncResult({ success: true, message: data.message });
                                                loadPlayers();
                                            } catch (error) {
                                                setSyncResult({ success: false, message: 'Network error' });
                                            } finally {
                                                setSyncingSlug(null);
                                            }
                                        }}
                                        disabled={syncingSlug === 'cleanup'}
                                        className="px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {syncingSlug === 'cleanup' ? <RefreshCw size={14} className="animate-spin" /> : <Users size={14} />}
                                        Fix Player Names
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                            <h3 className="font-medium text-white text-sm mb-4">Search start.gg</h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchStartGG()}
                                    placeholder="Tournament name or slug..."
                                    className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-white/20 focus:outline-none"
                                />
                                <button
                                    onClick={searchStartGG}
                                    disabled={searchingStartgg}
                                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {searchingStartgg ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
                                    Search
                                </button>
                            </div>

                            {syncResult && (
                                <div className={`mt-4 p-3 rounded-lg border flex items-center gap-2 text-sm ${
                                    syncResult.success 
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                    {syncResult.success ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                    {syncResult.message}
                                </div>
                            )}
                        </div>

                        {/* Results */}
                        {startggResults.length > 0 && (
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5">
                                    <h3 className="font-medium text-white text-sm">{startggResults.length} tournaments found</h3>
                                </div>
                                <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                                    {startggResults.map((tournament) => (
                                        <div key={tournament.id} className="p-4 hover:bg-white/[0.02] flex items-center justify-between gap-4">
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-medium text-white text-sm truncate">{tournament.name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                                                    <span>{tournament.startAt ? formatDate(tournament.startAt) : 'Date TBD'}</span>
                                                    <span className="text-gray-700">•</span>
                                                    <span className="truncate">{tournament.slug}</span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => syncTournament(tournament.slug)}
                                                disabled={syncingSlug === tournament.slug}
                                                className="shrink-0 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                                            >
                                                {syncingSlug === tournament.slug ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />}
                                                Sync
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Players Tab */}
                {activeTab === 'players' && (
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                        {/* Players List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5">
                                    <h2 className="font-medium text-white text-sm mb-3">Players</h2>
                                    <input
                                        type="text"
                                        value={playerSearch}
                                        onChange={(e) => setPlayerSearch(e.target.value)}
                                        placeholder="Search players..."
                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-white/20 focus:outline-none"
                                    />
                                </div>
                                
                                {loadingPlayers ? (
                                    <div className="flex items-center justify-center py-16">
                                        <RefreshCw className="animate-spin text-gray-600" size={24} />
                                    </div>
                                ) : filteredPlayers.length === 0 ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Users size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">{playerSearch ? 'No matches' : 'No players found'}</p>
                                    </div>
                                ) : (
                                    <div className="max-h-[550px] overflow-y-auto">
                                        {filteredPlayers.map((player) => (
                                                <div
                                                    key={player.user_id}
                                                    className={`
                                                        p-3 border-b border-white/5 transition-all flex items-center gap-3
                                                        ${selectedPlayer?.user_id === player.user_id
                                                            ? 'bg-purple-500/10'
                                                            : 'hover:bg-white/[0.03]'
                                                        }
                                                    `}
                                                >
                                                    {/* Flag */}
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 shrink-0">
                                                        {player.country ? (
                                                            <img 
                                                                src={`https://flagcdn.com/h80/${player.country.toLowerCase()}.png`}
                                                                alt={player.country}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs font-bold">
                                                                {player.username?.charAt(0)?.toUpperCase() || '?'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Player Info */}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPlayer(player);
                                                            loadPlayerMatches(player.user_id);
                                                            loadPlayerRankings(player.user_id);
                                                        }}
                                                        className="min-w-0 flex-1 text-left"
                                                    >
                                                        <div className="flex items-baseline gap-1.5">
                                                            {player.sponsor && (
                                                                <span className="text-xs text-gray-500">{player.sponsor}</span>
                                                            )}
                                                            <span className="font-medium text-white text-sm truncate">{player.username}</span>
                                                        </div>
                                                        {player.total_matches !== undefined && player.total_matches > 0 && (
                                                            <span className="text-xs text-gray-500">
                                                                {player.wins || 0}W - {(player.total_matches || 0) - (player.wins || 0)}L
                                                            </span>
                                                        )}
                                                    </button>
                                                    
                                                    {/* Edit Button */}
                                                    <button
                                                        onClick={() => openEditPlayer(player)}
                                                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors shrink-0"
                                                        title="Edit player"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Player Matches */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {selectedPlayer?.country && (
                                            <img 
                                                src={`https://flagcdn.com/h80/${selectedPlayer.country.toLowerCase()}.png`}
                                                alt={selectedPlayer.country}
                                                className="w-6 h-4 object-cover rounded-sm"
                                            />
                                        )}
                                        <h2 className="font-medium text-white text-sm">
                                            {selectedPlayer ? (
                                                <>
                                                    {selectedPlayer.sponsor && <span className="text-gray-500 mr-1">{selectedPlayer.sponsor} |</span>}
                                                    {selectedPlayer.username}
                                                </>
                                            ) : 'Match History'}
                                        </h2>
                                    </div>
                                    {selectedPlayer && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">{playerMatches.length} matches</span>
                                            <button
                                                onClick={() => openEditPlayer(selectedPlayer)}
                                                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                                                title="Edit player"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {!selectedPlayer ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Users size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">Select a player</p>
                                    </div>
                                ) : playerMatches.length === 0 ? (
                                    <div className="text-center py-16 text-gray-600">
                                        <Swords size={32} className="mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">No matches found</p>
                                    </div>
                                ) : (
                                    <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5">
                                        {playerMatches.map((match) => (
                                            <div key={match.match_id} className="p-3 hover:bg-white/[0.02]">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-[10px] text-gray-600 truncate">{match.tournamentName}</span>
                                                    <span className="text-[10px] text-gray-600">{match.round_name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 min-w-0 text-right">
                                                        <span className={`text-sm font-medium truncate block ${match.winner_id === match.player1_id ? 'text-emerald-400' : 'text-gray-300'}`}>
                                                            {match.p1Name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 rounded shrink-0">
                                                        <span className={`font-bold text-sm w-4 text-center ${match.winner_id === match.player1_id ? 'text-emerald-400' : 'text-white'}`}>{match.score_p1}</span>
                                                        <span className="text-gray-600 text-xs">-</span>
                                                        <span className={`font-bold text-sm w-4 text-center ${match.winner_id === match.player2_id ? 'text-emerald-400' : 'text-white'}`}>{match.score_p2}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className={`text-sm font-medium truncate block ${match.winner_id === match.player2_id ? 'text-emerald-400' : 'text-gray-300'}`}>
                                                            {match.p2Name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Player Tournament Results */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-b from-purple-500/5 to-transparent border border-purple-500/10 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center gap-2">
                                    <Trophy size={16} className="text-purple-400" />
                                    <h2 className="font-medium text-white text-sm">Tournament Results</h2>
                                </div>

                                {!selectedPlayer ? (
                                    <div className="text-center py-12 text-gray-600">
                                        <Trophy size={28} className="mx-auto mb-2 opacity-30" />
                                        <p className="text-xs">Select a player</p>
                                    </div>
                                ) : loadingRankings ? (
                                    <div className="flex items-center justify-center py-12">
                                        <RefreshCw className="animate-spin text-gray-600" size={20} />
                                    </div>
                                ) : playerRankings.length === 0 ? (
                                    <div className="text-center py-12 text-gray-600">
                                        <Trophy size={28} className="mx-auto mb-2 opacity-30" />
                                        <p className="text-xs">No tournament results</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                                        {playerRankings.map((ranking) => (
                                            <div 
                                                key={ranking.tournament_id}
                                                className="px-3 py-2.5 hover:bg-white/[0.02]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-white truncate">
                                                            {ranking.tournament_name}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                                            {formatDate(ranking.start_date)}
                                                        </p>
                                                    </div>

                                                    <div className="text-right shrink-0">
                                                        <p className={`text-sm font-bold ${ranking.wins > ranking.losses ? 'text-emerald-400' : ranking.wins < ranking.losses ? 'text-red-400' : 'text-gray-300'}`}>
                                                            {ranking.wins}W - {ranking.losses}L
                                                        </p>
                                                        <p className="text-[10px] text-gray-500">
                                                            {ranking.total_matches} sets
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Player Modal */}
                {editingPlayer && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md mx-4">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-white">Edit Player</h3>
                                <button
                                    onClick={() => setEditingPlayer(null)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1.5">GamerTag</label>
                                        <input
                                            type="text"
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                            placeholder="e.g., Keebe Omega"
                                            className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1.5">Sponsor / Team</label>
                                        <input
                                            type="text"
                                            value={editForm.sponsor}
                                            onChange={(e) => setEditForm({ ...editForm, sponsor: e.target.value })}
                                            placeholder="e.g., KRYP, IFF"
                                            className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/50 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5">
                                        Country Code <span className="text-gray-600">(2-letter, e.g., fr, de, us)</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={editForm.country}
                                            onChange={(e) => setEditForm({ ...editForm, country: e.target.value.toLowerCase().slice(0, 2) })}
                                            placeholder="fr"
                                            maxLength={2}
                                            className="flex-1 px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/50 focus:outline-none uppercase"
                                        />
                                        {editForm.country && editForm.country.length === 2 && (
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                                                <img 
                                                    src={`https://flagcdn.com/h80/${editForm.country.toLowerCase()}.png`}
                                                    alt={editForm.country}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.src = '/source/overlay/ifl/no-flag.png'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5">Main Character</label>
                                    <input
                                        type="text"
                                        value={editForm.main_character}
                                        onChange={(e) => setEditForm({ ...editForm, main_character: e.target.value })}
                                        placeholder="e.g., Jin, Kazuya, Law"
                                        className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:border-purple-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setEditingPlayer(null)}
                                    className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={savePlayer}
                                    disabled={savingPlayer || !editForm.username.trim()}
                                    className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {savingPlayer ? (
                                        <RefreshCw size={14} className="animate-spin" />
                                    ) : (
                                        <Save size={14} />
                                    )}
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentDataPage;
