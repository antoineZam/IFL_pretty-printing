import { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Medal, Crown, Save, Check } from 'lucide-react';

interface TeamRanking {
    id: number;
    tournament_id: number;
    team_id: number;
    team_name: string;
    player_1_name: string;
    player_2_name: string;
    player_1_character: string;
    player_2_character: string;
    seed: number | null;
    placement: number | null;
    wins: number;
    losses: number;
}

interface Tournament {
    id: number;
    name: string;
    format: string;
    status: string;
}

const LoveAndWarRankingsPage = () => {
    const { id: tournamentId } = useParams();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [rankings, setRankings] = useState<TeamRanking[]>([]);
    const [editingPlacements, setEditingPlacements] = useState<{ [teamId: number]: number | null }>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadTournament();
        loadRankings();
    }, [tournamentId]);

    const loadTournament = async () => {
        try {
            const response = await fetch(`/api/iff/love-and-war/tournament/${tournamentId}`);
            const data = await response.json();
            setTournament(data.tournament);
        } catch (error) {
            console.error('Error loading tournament:', error);
        }
    };

    const loadRankings = async () => {
        try {
            const response = await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/rankings`);
            const data = await response.json();
            setRankings(data.rankings || []);
            
            // Initialize editing placements
            const placements: { [teamId: number]: number | null } = {};
            (data.rankings || []).forEach((r: TeamRanking) => {
                placements[r.team_id] = r.placement;
            });
            setEditingPlacements(placements);
        } catch (error) {
            console.error('Error loading rankings:', error);
        }
    };

    const handlePlacementChange = (teamId: number, placement: string) => {
        const value = placement === '' ? null : parseInt(placement);
        setEditingPlacements({
            ...editingPlacements,
            [teamId]: value
        });
    };

    const handleSavePlacements = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/placements`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placements: editingPlacements })
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            await loadRankings();
        } catch (error) {
            console.error('Error saving placements:', error);
        }
        setIsSaving(false);
    };

    const handleCompleteTournament = async () => {
        if (!confirm('Mark this tournament as completed? This will finalize all rankings.')) return;

        try {
            await fetch(`/api/iff/love-and-war/tournament/${tournamentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...tournament, status: 'completed' })
            });
            await loadTournament();
        } catch (error) {
            console.error('Error completing tournament:', error);
        }
    };

    // Sort rankings by placement (if set), then by wins
    const sortedRankings = [...rankings].sort((a, b) => {
        if (a.placement && b.placement) return a.placement - b.placement;
        if (a.placement) return -1;
        if (b.placement) return 1;
        // Sort by win rate if no placement
        const aWinRate = a.wins / (a.wins + a.losses || 1);
        const bWinRate = b.wins / (b.wins + b.losses || 1);
        return bWinRate - aWinRate;
    });

    const getPlacementIcon = (placement: number | null) => {
        if (!placement) return null;
        if (placement === 1) return <Crown className="text-yellow-400" size={24} />;
        if (placement === 2) return <Medal className="text-gray-300" size={22} />;
        if (placement === 3) return <Medal className="text-amber-600" size={20} />;
        return <span className="text-gray-400 font-bold">{placement}</span>;
    };

    if (!tournament) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link to={`/iff/love-and-war/tournament/${tournamentId}/bracket?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Bracket</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-red-400 flex items-center gap-3">
                        <Trophy className="text-yellow-400" />
                        {tournament.name} - Rankings
                    </h1>
                    <span className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        tournament.status === 'completed' 
                            ? 'bg-gray-500/20 text-gray-400' 
                            : 'bg-green-500/20 text-green-400'
                    }`}>
                        {tournament.status.toUpperCase().replace('_', ' ')}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSavePlacements}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg transition-colors"
                    >
                        {saved ? (
                            <>
                                <Check size={18} />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Placements
                            </>
                        )}
                    </button>
                    {tournament.status === 'in_progress' && (
                        <button
                            onClick={handleCompleteTournament}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <Trophy size={18} />
                            Complete Tournament
                        </button>
                    )}
                </div>
            </div>

            {/* Rankings Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800 text-left">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 w-20">Place</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400">Team</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400">Players</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-center">Seed</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-center">Wins</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-center">Losses</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 text-center">Win Rate</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 w-32">Set Place</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {sortedRankings.map((team) => {
                            const totalGames = team.wins + team.losses;
                            const winRate = totalGames > 0 
                                ? Math.round((team.wins / totalGames) * 100) 
                                : 0;

                            return (
                                <tr 
                                    key={team.id}
                                    className={`transition-colors ${
                                        editingPlacements[team.team_id] === 1 ? 'bg-yellow-500/10' :
                                        editingPlacements[team.team_id] === 2 ? 'bg-gray-400/10' :
                                        editingPlacements[team.team_id] === 3 ? 'bg-amber-600/10' :
                                        'hover:bg-gray-800'
                                    }`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center w-10 h-10">
                                            {getPlacementIcon(editingPlacements[team.team_id])}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-white text-lg">
                                            {team.team_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-300">
                                                {team.player_1_name}
                                                <span className="text-gray-500 ml-1">({team.player_1_character})</span>
                                            </span>
                                            <span className="text-sm text-gray-300">
                                                {team.player_2_name}
                                                <span className="text-gray-500 ml-1">({team.player_2_character})</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-gray-400">
                                            #{team.seed || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-green-400 font-bold">
                                            {team.wins}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-red-400 font-bold">
                                            {team.losses}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-semibold ${
                                            winRate >= 70 ? 'text-green-400' :
                                            winRate >= 50 ? 'text-yellow-400' :
                                            'text-gray-400'
                                        }`}>
                                            {winRate}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={editingPlacements[team.team_id] || ''}
                                            onChange={(e) => handlePlacementChange(team.team_id, e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="">Not set</option>
                                            {Array.from({ length: rankings.length }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}{getOrdinalSuffix(i + 1)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Podium Display for Completed Tournaments */}
            {tournament.status === 'completed' && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">Final Standings</h2>
                    <div className="flex justify-center items-end gap-4">
                        {/* 2nd Place */}
                        {sortedRankings.find(r => r.placement === 2) && (
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-700 rounded-t-lg p-4 w-40">
                                    <Medal className="text-gray-300 mx-auto mb-2" size={32} />
                                    <p className="text-center font-bold text-white truncate">
                                        {sortedRankings.find(r => r.placement === 2)?.team_name}
                                    </p>
                                    <p className="text-center text-xs text-gray-400">2nd Place</p>
                                </div>
                                <div className="bg-gray-600 h-24 w-40 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-300">2</span>
                                </div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {sortedRankings.find(r => r.placement === 1) && (
                            <div className="flex flex-col items-center">
                                <div className="bg-yellow-600/30 rounded-t-lg p-4 w-48">
                                    <Crown className="text-yellow-400 mx-auto mb-2" size={40} />
                                    <p className="text-center font-bold text-white text-lg truncate">
                                        {sortedRankings.find(r => r.placement === 1)?.team_name}
                                    </p>
                                    <p className="text-center text-sm text-yellow-400">Champion</p>
                                </div>
                                <div className="bg-yellow-600/50 h-32 w-48 flex items-center justify-center">
                                    <span className="text-5xl font-bold text-yellow-400">1</span>
                                </div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {sortedRankings.find(r => r.placement === 3) && (
                            <div className="flex flex-col items-center">
                                <div className="bg-amber-900/30 rounded-t-lg p-4 w-40">
                                    <Medal className="text-amber-600 mx-auto mb-2" size={28} />
                                    <p className="text-center font-bold text-white truncate">
                                        {sortedRankings.find(r => r.placement === 3)?.team_name}
                                    </p>
                                    <p className="text-center text-xs text-amber-500">3rd Place</p>
                                </div>
                                <div className="bg-amber-900/50 h-16 w-40 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-amber-600">3</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const getOrdinalSuffix = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
};

export default LoveAndWarRankingsPage;
