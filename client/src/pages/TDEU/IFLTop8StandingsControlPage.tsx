import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { RefreshCw, Eye, Trophy, Upload } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { getCountryCode } from '../../utils/countries';
import TDEUBurgerMenu from '../../components/TDEUBurgerMenu';

// Available characters for Tekken 8
const CHARACTERS = [
    'alisa', 'anna', 'armor king', 'asuka', 'azucena', 'bryan', 'claudio',
    'devil jin', 'dragunov', 'eddy', 'feng', 'heihachi', 'hwoarang',
    'jack-8', 'jin', 'jun', 'kazuya', 'king', 'kuma', 'lars', 'law',
    'lee', 'leo', 'leroy', 'lidia', 'lili', 'nina', 'panda', 'paul',
    'raven', 'reina', 'shaheen', 'steve', 'victor', 'xiaoyu', 'yoshimitsu', 'zafina'
];

interface Tournament {
    id: number;
    name: string;
    slug: string;
    startAt: number;
}

interface EventInfo {
    id: number;
    name: string;
    slug: string;
}

interface Standing {
    placement: number;
    entrant_id: number;
    username: string;
    sponsor: string | null;
    country: string | null;
}

interface Top8Player {
    placement: number;
    name: string;
    sponsor: string | null;
    country: string | null;
    twitter: string;
    character: string;
}

const IFLTop8StandingsControlPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [socket, setSocket] = useState<Socket | null>(null);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const [, setEvents] = useState<EventInfo[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tournamentSlug, setTournamentSlug] = useState('');
    const [pushed, setPushed] = useState(false);
    const [weekNumber, setWeekNumber] = useState('01');

    // Top 8 player data with manual fields
    const [top8Players, setTop8Players] = useState<Top8Player[]>(
        Array.from({ length: 8 }, (_, i) => ({
            placement: i + 1,
            name: '',
            sponsor: null,
            country: null,
            twitter: '',
            character: ''
        }))
    );

    // Socket connection
    useEffect(() => {
        if (!key) return;

        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [key]);

    // Load IFL tournaments on mount
    useEffect(() => {
        loadIFLTournaments();
    }, []);

    const loadIFLTournaments = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/startgg/league/IFL2/tournaments?limit=20');
            if (res.ok) {
                const data = await res.json();
                setTournaments(data.tournaments || []);
            }
        } catch (err) {
            console.error('Error loading tournaments:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadTournamentEvents = async (slug: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/startgg/tournament/${encodeURIComponent(slug)}/events`);
            if (res.ok) {
                const data = await res.json();
                setEvents(data.events || []);
                if (data.events?.length > 0) {
                    setSelectedEvent(data.events[0]);
                    await loadEventStandings(data.events[0].slug);
                }
            }
        } catch (err) {
            console.error('Error loading events:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadEventStandings = async (eventSlug: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/startgg/event/${encodeURIComponent(eventSlug)}/standings?limit=8`);
            if (res.ok) {
                const data = await res.json();
                const standings: Standing[] = data.standings || [];
                
                // Populate top 8 from standings
                const newTop8 = standings.slice(0, 8).map((s, idx) => ({
                    placement: s.placement,
                    name: s.username,
                    sponsor: s.sponsor,
                    country: s.country,
                    twitter: top8Players[idx]?.twitter || '',
                    character: top8Players[idx]?.character || ''
                }));
                
                // Fill remaining slots if less than 8
                while (newTop8.length < 8) {
                    const idx = newTop8.length;
                    newTop8.push({
                        placement: idx + 1,
                        name: '',
                        sponsor: null,
                        country: null,
                        twitter: '',
                        character: ''
                    });
                }
                
                setTop8Players(newTop8);
            }
        } catch (err) {
            console.error('Error loading standings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTournamentSelect = (tournament: Tournament) => {
        setSelectedTournament(tournament);
        loadTournamentEvents(tournament.slug);
        
        // Extract week number from tournament name
        const weekMatch = tournament.name.match(/#(\d+)/);
        if (weekMatch) {
            setWeekNumber(weekMatch[1].padStart(2, '0'));
        }
    };

    const handleSlugSearch = async () => {
        if (!tournamentSlug) return;
        try {
            setLoading(true);
            setError(null);
            
            // If it's a full URL, extract the slug
            let slug = tournamentSlug;
            if (slug.includes('start.gg/')) {
                slug = slug.split('start.gg/')[1];
            }
            
            await loadTournamentEvents(slug);
            setSelectedTournament({ id: 0, name: slug, slug, startAt: 0 });
        } catch (err) {
            setError('Failed to load tournament');
        } finally {
            setLoading(false);
        }
    };

    const updatePlayer = (index: number, field: keyof Top8Player, value: string) => {
        setTop8Players(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const pushToOverlay = () => {
        if (!socket) return;
        
        socket.emit('top8-standings-data', {
            weekNumber,
            tournamentName: selectedTournament?.name || 'IFL Tournament',
            players: top8Players,
            lastUpdated: new Date().toISOString()
        });
        
        setPushed(true);
        setTimeout(() => setPushed(false), 2000);
    };

    const getCharacterImagePath = (character: string, isFirst: boolean) => {
        if (!character) return '';
        const folder = isFirst ? 'P1' : 'P1_icon';
        return `/source/overlay/characters/${folder}/${character.toLowerCase()}.png`;
    };

    const overlayUrl = `${window.location.origin}/tdeu/ifl/top8/standings/overlay?key=${key}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 pl-16">
            <TDEUBurgerMenu />
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-yellow-400" />
                        <h1 className="text-3xl font-bold text-white">IFL Top 8 Standings</h1>
                    </div>
                    <NeonButton
                        onClick={pushToOverlay}
                        disabled={!socket}
                        className={pushed ? 'bg-green-600' : ''}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {pushed ? 'PUSHED!' : 'PUSH TO OVERLAY'}
                    </NeonButton>
                </div>

                {/* Tournament Selection */}
                <GlassCard>
                    <h2 className="text-xl font-semibold text-white mb-4">Select Tournament</h2>
                    
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            value={tournamentSlug}
                            onChange={(e) => setTournamentSlug(e.target.value)}
                            placeholder="Paste tournament URL or slug..."
                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                        />
                        <NeonButton onClick={handleSlugSearch} disabled={loading}>
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Load
                        </NeonButton>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tournaments.slice(0, 10).map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleTournamentSelect(t)}
                                className={`px-3 py-1.5 rounded text-sm transition-all ${
                                    selectedTournament?.id === t.id
                                        ? 'bg-yellow-500 text-black font-bold'
                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>

                    {selectedTournament && (
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-white">Week Number:</span>
                            <input
                                type="text"
                                value={weekNumber}
                                onChange={(e) => setWeekNumber(e.target.value)}
                                className="w-20 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                            />
                        </div>
                    )}
                </GlassCard>

                {/* Top 8 Player Editor */}
                <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Top 8 Players</h2>
                        {selectedEvent && (
                            <NeonButton onClick={() => loadEventStandings(selectedEvent.slug)} disabled={loading}>
                                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                Refresh from start.gg
                            </NeonButton>
                        )}
                    </div>

                    <div className="space-y-3">
                        {top8Players.map((player, idx) => (
                            <div 
                                key={idx}
                                className={`grid grid-cols-12 gap-3 items-center p-3 rounded-lg ${
                                    idx === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800/50'
                                }`}
                            >
                                {/* Placement */}
                                <div className="col-span-1">
                                    <span className={`text-2xl font-black ${
                                        idx === 0 ? 'text-yellow-400' : 'text-gray-400'
                                    }`}>
                                        {idx + 1}
                                        <sup className="text-sm">{idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'}</sup>
                                    </span>
                                </div>

                                {/* Flag Preview */}
                                <div className="col-span-1">
                                    {player.country && (
                                        <img
                                            src={`https://flagcdn.com/h40/${getCountryCode(player.country)}.png`}
                                            alt={player.country}
                                            className="h-6 w-auto"
                                        />
                                    )}
                                </div>

                                {/* Player Name */}
                                <div className="col-span-3">
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={(e) => updatePlayer(idx, 'name', e.target.value)}
                                        placeholder="Player Name"
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                    />
                                </div>

                                {/* Twitter Handle */}
                                <div className="col-span-2">
                                    <input
                                        type="text"
                                        value={player.twitter}
                                        onChange={(e) => updatePlayer(idx, 'twitter', e.target.value)}
                                        placeholder="@twitter"
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                    />
                                </div>

                                {/* Character Select */}
                                <div className="col-span-3">
                                    <select
                                        value={player.character}
                                        onChange={(e) => updatePlayer(idx, 'character', e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white capitalize"
                                    >
                                        <option value="">Select Character</option>
                                        {CHARACTERS.map(char => (
                                            <option key={char} value={char} className="capitalize">
                                                {char}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Character Preview */}
                                <div className="col-span-2 flex justify-center">
                                    {player.character && (
                                        <img
                                            src={getCharacterImagePath(player.character, idx === 0)}
                                            alt={player.character}
                                            className="h-12 w-auto object-contain"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Overlay URL */}
                <GlassCard>
                    <h2 className="text-xl font-semibold text-white mb-2">Overlay URL</h2>
                    <p className="text-gray-400 text-sm mb-2">Add to OBS as Browser Source (1920x1080)</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={overlayUrl}
                            readOnly
                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-cyan-400 font-mono text-sm"
                        />
                        <NeonButton onClick={() => navigator.clipboard.writeText(overlayUrl)}>
                            Copy
                        </NeonButton>
                        <NeonButton onClick={() => window.open(overlayUrl, '_blank')}>
                            <Eye className="w-4 h-4" />
                        </NeonButton>
                    </div>
                </GlassCard>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-400">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IFLTop8StandingsControlPage;
