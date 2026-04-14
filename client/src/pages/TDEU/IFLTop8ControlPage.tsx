import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { RefreshCw, Eye, Search, Trophy, LayoutGrid, List, Zap, Upload, Users } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { CyberInput } from '../../components/ui/CyberInput';
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
    endAt: number;
    numAttendees: number;
}

interface EventInfo {
    id: number;
    name: string;
    slug: string;
    numEntrants?: number;
}

interface Standing {
    placement: number;
    entrant_id: number;
    username: string;
    sponsor: string | null;
    country: string | null;
}

interface Player {
    id: number;
    name: string;
    sponsor: string | null;
    score: number | null;
}

interface BracketSet {
    id: number;
    round: number;
    roundText: string;
    displayScore: string | null;
    state: number;
    winnerId: number | null;
    player1: Player | null;
    player2: Player | null;
}

interface BracketData {
    id: number;
    name: string;
    state: string;
    numEntrants: number;
    sets: BracketSet[];
}

interface Top8Player {
    placement: number;
    name: string;
    sponsor: string | null;
    country: string | null;
    twitter: string;
    character: string;
}

const IFLTop8ControlPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [socket, setSocket] = useState<Socket | null>(null);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const [events, setEvents] = useState<EventInfo[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
    const [standings, setStandings] = useState<Standing[]>([]);
    const [bracket, setBracket] = useState<BracketData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tournamentSlug, setTournamentSlug] = useState('');
    const [pushed, setPushed] = useState(false);
    const [viewMode, setViewMode] = useState<'standings' | 'bracket' | 'standingsEdit'>('standings');
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

        newSocket.on('connect', () => {
            console.log('[Top8 Control] Socket connected');
        });

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
            const response = await fetch('/api/startgg/ifl/tournaments');
            const data = await response.json();
            setTournaments(data || []);
        } catch (err) {
            console.error('Error loading tournaments:', err);
            setError('Failed to load IFL tournaments');
        } finally {
            setLoading(false);
        }
    };

    const loadTournamentBySlug = async () => {
        if (!tournamentSlug.trim()) return;

        try {
            setLoading(true);
            setError(null);
            
            // Clean up slug (remove tournament/ prefix if present)
            const cleanSlug = tournamentSlug.trim().replace(/^tournament\//, '');
            
            const response = await fetch(`/api/startgg/tournament/${encodeURIComponent(cleanSlug)}`);
            
            if (!response.ok) {
                throw new Error('Tournament not found');
            }
            
            const data = await response.json();
            
            if (data.tournament) {
                const tournament = data.tournament;
                setSelectedTournament({
                    id: tournament.id,
                    name: tournament.name,
                    slug: tournament.slug,
                    startAt: tournament.startAt,
                    endAt: tournament.endAt,
                    numAttendees: 0
                });
                
                // Load events for this tournament
                if (tournament.events) {
                    setEvents(tournament.events.map((e: any) => ({
                        id: e.id,
                        name: e.name,
                        slug: e.slug,
                        numEntrants: e.numEntrants
                    })));
                }
            }
        } catch (err) {
            console.error('Error loading tournament:', err);
            setError(err instanceof Error ? err.message : 'Failed to load tournament');
        } finally {
            setLoading(false);
        }
    };

    const selectTournament = async (tournament: Tournament) => {
        setSelectedTournament(tournament);
        setSelectedEvent(null);
        setStandings([]);
        
        try {
            setLoading(true);
            const response = await fetch(`/api/startgg/tournament/${encodeURIComponent(tournament.slug)}`);
            const data = await response.json();
            
            if (data.tournament?.events) {
                setEvents(data.tournament.events.map((e: any) => ({
                    id: e.id,
                    name: e.name,
                    slug: e.slug,
                    numEntrants: e.numEntrants
                })));
            }
        } catch (err) {
            console.error('Error loading events:', err);
        } finally {
            setLoading(false);
        }
    };

    const selectEvent = async (event: EventInfo) => {
        setSelectedEvent(event);
        await fetchEventData(event.slug);
    };

    const fetchEventData = async (eventSlug: string) => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch standings first (this endpoint is known to work)
            const standingsRes = await fetch(`/api/startgg/event/${encodeURIComponent(eventSlug)}/standings?limit=8`);
            if (standingsRes.ok) {
                const contentType = standingsRes.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await standingsRes.json();
                    setStandings(data.standings || []);
                }
            }
            
            // Try to fetch bracket data - fetch multiple pages to get all top 8 matches
            try {
                let allSets: BracketSet[] = [];
                let bracketData: BracketData | null = null;
                let page = 1;
                let hasMore = true;
                
                // Fetch up to 5 pages (125 sets) to get all matches
                while (hasMore && page <= 5) {
                    const bracketRes = await fetch(`/api/startgg/event/${encodeURIComponent(eventSlug)}/bracket?perPage=25&page=${page}`);
                    if (bracketRes.ok) {
                        const contentType = bracketRes.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const data = await bracketRes.json();
                            if (page === 1) {
                                bracketData = data;
                            }
                            if (data.sets && data.sets.length > 0) {
                                allSets = [...allSets, ...data.sets];
                                hasMore = data.pageInfo?.totalPages > page;
                                page++;
                            } else {
                                hasMore = false;
                            }
                        } else {
                            hasMore = false;
                        }
                    } else {
                        hasMore = false;
                    }
                }
                
                if (bracketData) {
                    bracketData.sets = allSets;
                    setBracket(bracketData);
                    // Auto-switch to bracket view if event is active or completed
                    if (bracketData.state === 'ACTIVE' || bracketData.state === 'COMPLETED') {
                        setViewMode('bracket');
                    }
                }
            } catch (bracketErr) {
                console.warn('Bracket data not available:', bracketErr);
            }
        } catch (err) {
            console.error('Error fetching event data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch event data');
        } finally {
            setLoading(false);
        }
    };

    const pushToOverlay = () => {
        if (!socket || !selectedEvent) return;

        socket.emit('top8-data', {
            eventSlug: selectedEvent.slug,
            tournamentName: selectedTournament?.name || 'Iron Fist League',
            eventName: selectedEvent.name,
            standings,
            bracket,
            lastUpdated: new Date().toISOString()
        });

        // Also send the view mode
        socket.emit('top8-mode', viewMode);

        setPushed(true);
        setTimeout(() => setPushed(false), 2000);
    };

    // Push Top 8 Standings to overlay
    const pushStandingsToOverlay = () => {
        if (!socket) {
            console.error('[Top8] No socket connection!');
            return;
        }

        const data = {
            weekNumber,
            tournamentName: selectedTournament?.name || 'IFL Tournament',
            players: top8Players,
            lastUpdated: new Date().toISOString()
        };
        
        console.log('[Top8] Pushing standings data:', data);
        socket.emit('top8-standings-data', data);

        setPushed(true);
        setTimeout(() => setPushed(false), 2000);
    };

    // Populate top 8 from standings
    const populateTop8FromStandings = () => {
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
        
        // Extract week number from tournament name
        const weekMatch = selectedTournament?.name.match(/#(\d+)/);
        if (weekMatch) {
            setWeekNumber(weekMatch[1].padStart(2, '0'));
        }
    };

    // Update individual player field
    const updateTop8Player = (index: number, field: keyof Top8Player, value: string) => {
        setTop8Players(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const getCharacterImagePath = (character: string, isFirst: boolean) => {
        if (!character) return '';
        const folder = isFirst ? 'stat_screen' : 'P1_icon';
        return `/source/overlay/characters/${folder}/${character.toLowerCase()}.png`;
    };

    const refreshData = () => {
        if (selectedEvent) {
            fetchEventData(selectedEvent.slug);
        }
    };

    const getPlacementColor = (placement: number) => {
        switch (placement) {
            case 1: return 'text-amber-400';
            case 2: return 'text-slate-300';
            case 3: return 'text-amber-600';
            default: return 'text-blue-400';
        }
    };

    return (
        <div className="min-h-screen p-6 pb-24 max-w-[1600px] mx-auto text-white">
            <TDEUBurgerMenu />
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-archivo-expanded-bold text-white/80">TOP 8 STANDINGS</h1>
                    <p className="text-sm text-gray-500">Fetch and display tournament standings</p>
                </div>
                <Link
                    to={`/tdeu/ifl/top8/overlay?key=${key}${selectedEvent ? `&event=${encodeURIComponent(selectedEvent.slug)}` : ''}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                    <Eye size={18} />
                    Open Overlay
                </Link>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Tournament Selection */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    {/* Manual Slug Input */}
                    <GlassCard className="p-4">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-3">Load by Slug</h3>
                        <div className="flex gap-2">
                            <CyberInput
                                id="tournamentSlug"
                                label=""
                                placeholder="e.g., iron-fist-league-2-week-1"
                                value={tournamentSlug}
                                onChange={(e) => setTournamentSlug(e.target.value)}
                                className="flex-1"
                            />
                            <NeonButton onClick={loadTournamentBySlug} disabled={loading}>
                                <Search size={18} />
                            </NeonButton>
                        </div>
                    </GlassCard>

                    {/* IFL Tournaments */}
                    <GlassCard className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold uppercase text-gray-400">IFL Tournaments</h3>
                            <NeonButton variant="ghost" onClick={loadIFLTournaments} disabled={loading}>
                                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            </NeonButton>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto space-y-2">
                            {tournaments.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => selectTournament(t)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                                        selectedTournament?.id === t.id
                                            ? 'bg-blue-600/30 border border-blue-500'
                                            : 'bg-surfaceHighlight/50 hover:bg-surfaceHighlight'
                                    }`}
                                >
                                    <p className="font-semibold text-white truncate">{t.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(t.startAt * 1000).toLocaleDateString()}
                                    </p>
                                </button>
                            ))}
                            {tournaments.length === 0 && !loading && (
                                <p className="text-center text-gray-500 py-4">No tournaments found</p>
                            )}
                        </div>
                    </GlassCard>

                    {/* Events */}
                    {selectedTournament && events.length > 0 && (
                        <GlassCard className="p-4">
                            <h3 className="text-sm font-bold uppercase text-gray-400 mb-3">Events</h3>
                            <div className="space-y-2">
                                {events.map(e => (
                                    <button
                                        key={e.id}
                                        onClick={() => selectEvent(e)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            selectedEvent?.id === e.id
                                                ? 'bg-green-600/30 border border-green-500'
                                                : 'bg-surfaceHighlight/50 hover:bg-surfaceHighlight'
                                        }`}
                                    >
                                        <p className="font-semibold text-white">{e.name}</p>
                                        {e.numEntrants && (
                                            <p className="text-xs text-gray-400">{e.numEntrants} entrants</p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    )}
                </div>

                {/* Right Column - Data */}
                <div className="col-span-12 lg:col-span-8">
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Trophy className="text-amber-400" size={24} />
                                <div>
                                    <h2 className="text-xl font-bold">
                                        {selectedEvent ? selectedEvent.name : 'Select an Event'}
                                    </h2>
                                    {selectedTournament && (
                                        <p className="text-sm text-gray-400">
                                            {selectedTournament.name}
                                            {bracket?.state && (
                                                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                                                    bracket.state === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                                    bracket.state === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                    {bracket.state === 'ACTIVE' && <Zap size={10} className="inline mr-1" />}
                                                    {bracket.state}
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {selectedEvent && (
                                    <>
                                        {/* View Mode Toggle */}
                                        <div className="flex rounded-lg overflow-hidden border border-white/10">
                                            <button
                                                onClick={() => setViewMode('standings')}
                                                className={`px-3 py-2 flex items-center gap-1 text-sm ${
                                                    viewMode === 'standings' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-surfaceHighlight/50 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <List size={14} />
                                                Standings
                                            </button>
                                            <button
                                                onClick={() => setViewMode('bracket')}
                                                className={`px-3 py-2 flex items-center gap-1 text-sm ${
                                                    viewMode === 'bracket' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-surfaceHighlight/50 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <LayoutGrid size={14} />
                                                Bracket
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setViewMode('standingsEdit');
                                                    if (standings.length > 0) {
                                                        populateTop8FromStandings();
                                                    }
                                                }}
                                                className={`px-3 py-2 flex items-center gap-1 text-sm ${
                                                    viewMode === 'standingsEdit' 
                                                        ? 'bg-yellow-600 text-white' 
                                                        : 'bg-surfaceHighlight/50 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <Users size={14} />
                                                Top 8 Edit
                                            </button>
                                        </div>
                                        
                                        <NeonButton variant="ghost" onClick={refreshData} disabled={loading}>
                                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                            Refresh
                                        </NeonButton>
                                        {viewMode === 'standingsEdit' ? (
                                            <NeonButton 
                                                onClick={pushStandingsToOverlay} 
                                                disabled={!socket}
                                                className={pushed ? 'bg-green-600' : 'bg-yellow-600 hover:bg-yellow-500'}
                                            >
                                                <Upload size={16} className="mr-1" />
                                                {pushed ? 'Pushed!' : 'Push Top 8'}
                                            </NeonButton>
                                        ) : (
                                            <NeonButton 
                                                onClick={pushToOverlay} 
                                                disabled={standings.length === 0 && !bracket}
                                                className={pushed ? 'bg-green-600' : ''}
                                            >
                                                {pushed ? 'Pushed!' : 'Push to Overlay'}
                                            </NeonButton>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}

                        {viewMode === 'standings' ? (
                            /* Standings View */
                            standings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {standings.map(s => {
                                        const countryCode = getCountryCode(s.country);
                                        return (
                                            <div
                                                key={s.entrant_id}
                                                className="flex items-center gap-4 p-4 bg-surfaceHighlight/50 rounded-lg"
                                            >
                                                <div className={`text-3xl font-black w-12 text-center ${getPlacementColor(s.placement)}`}>
                                                    {s.placement}
                                                </div>
                                                {countryCode && (
                                                    <img
                                                        src={`https://flagcdn.com/w40/${countryCode}.png`}
                                                        alt={s.country || ''}
                                                        className="w-8 h-auto"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-bold text-white">
                                                        {s.sponsor && <span className="text-gray-400">{s.sponsor} | </span>}
                                                        {s.username}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Trophy className="mx-auto text-gray-600 mb-4" size={48} />
                                    <p className="text-gray-500">
                                        {selectedEvent 
                                            ? 'No standings available yet' 
                                            : 'Select a tournament and event to view standings'
                                        }
                                    </p>
                                </div>
                            )
                        ) : viewMode === 'standingsEdit' ? (
                            /* Top 8 Standings Editor */
                            <div className="space-y-4">
                                {/* Week Number */}
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                                    <span className="text-gray-400">Week Number:</span>
                                    <input
                                        type="text"
                                        value={weekNumber}
                                        onChange={(e) => setWeekNumber(e.target.value)}
                                        className="w-20 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-center"
                                    />
                                    <NeonButton 
                                        variant="ghost" 
                                        onClick={populateTop8FromStandings}
                                        disabled={standings.length === 0}
                                    >
                                        <RefreshCw size={14} className="mr-1" />
                                        Reload from Standings
                                    </NeonButton>
                                </div>

                                {/* Top 8 Player Editor */}
                                <div className="space-y-2">
                                    {top8Players.map((player, idx) => (
                                        <div 
                                            key={idx}
                                            className={`grid grid-cols-12 gap-3 items-center p-3 rounded-lg ${
                                                idx === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-surfaceHighlight/30'
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
                                                    onChange={(e) => updateTop8Player(idx, 'name', e.target.value)}
                                                    placeholder="Player Name"
                                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                                                />
                                            </div>

                                            {/* Twitter Handle */}
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    value={player.twitter}
                                                    onChange={(e) => updateTop8Player(idx, 'twitter', e.target.value)}
                                                    placeholder="@twitter"
                                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                                                />
                                            </div>

                                            {/* Character Select */}
                                            <div className="col-span-3">
                                                <select
                                                    value={player.character}
                                                    onChange={(e) => updateTop8Player(idx, 'character', e.target.value)}
                                                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm capitalize"
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

                                {/* Standings Overlay URL */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-sm text-gray-400 mb-2">Top 8 Standings Overlay URL:</p>
                                    <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                                        <code className="flex-1 text-xs text-yellow-400 break-all">
                                            {window.location.origin}/tdeu/ifl/top8/standings/overlay?key={key}
                                        </code>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    `${window.location.origin}/tdeu/ifl/top8/standings/overlay?key=${key}`
                                                );
                                            }}
                                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-sm"
                                        >
                                            Copy
                                        </button>
                                        <Link
                                            to={`/tdeu/ifl/top8/standings/overlay?key=${key}`}
                                            target="_blank"
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm flex items-center gap-1"
                                        >
                                            <Eye size={14} />
                                            Open
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Top 8 Matches View */
                            bracket && bracket.sets.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                        <span>{bracket.numEntrants} entrants</span>
                                        <span>{bracket.sets.filter(s => s.state === 3).length} / {bracket.sets.length} matches completed</span>
                                    </div>
                                    
                                    {/* Top 8 Match Results */}
                                    <div className="space-y-2">
                                        {bracket.sets
                                            .filter(s => {
                                                const rt = s.roundText.toLowerCase();
                                                return rt.includes('final') || 
                                                       rt.includes('semi') || 
                                                       rt.includes('quarter') ||
                                                       (rt.includes('loser') && (rt.includes('round 5') || rt.includes('round 6') || rt.includes('round 7') || rt.includes('round 8')));
                                            })
                                            .sort((a, b) => {
                                                // Sort order: Winners QF -> SF -> F, then Losers, then Grand Finals
                                                const getOrder = (rt: string) => {
                                                    const r = rt.toLowerCase();
                                                    if (r.includes('grand')) return 100;
                                                    if (r.includes('winner')) {
                                                        if (r.includes('quarter')) return 10;
                                                        if (r.includes('semi')) return 20;
                                                        if (r.includes('final')) return 30;
                                                    }
                                                    if (r.includes('loser')) {
                                                        if (r.includes('final')) return 90;
                                                        if (r.includes('semi')) return 80;
                                                        if (r.includes('quarter')) return 70;
                                                        return 50 + (parseInt(r.match(/round\s*(\d+)/)?.[1] || '0'));
                                                    }
                                                    return 50;
                                                };
                                                return getOrder(a.roundText) - getOrder(b.roundText);
                                            })
                                            .map(set => {
                                                const isCompleted = set.state === 3;
                                                const isLive = set.state === 2;
                                                const p1Won = isCompleted && set.winnerId === set.player1?.id;
                                                const p2Won = isCompleted && set.winnerId === set.player2?.id;
                                                const isGrandFinals = set.roundText.toLowerCase().includes('grand');
                                                const isWinners = set.roundText.toLowerCase().includes('winner');
                                                
                                                return (
                                                    <div 
                                                        key={set.id} 
                                                        className={`flex items-center gap-4 p-3 rounded-lg border ${
                                                            isGrandFinals ? 'border-amber-500/50 bg-amber-500/10' :
                                                            isLive ? 'border-yellow-500 bg-yellow-500/10' :
                                                            isCompleted ? 'border-white/10 bg-surfaceHighlight/30' :
                                                            'border-white/5 bg-black/20'
                                                        }`}
                                                    >
                                                        {/* Round Label */}
                                                        <div className={`w-40 shrink-0 text-xs font-semibold uppercase tracking-wide ${
                                                            isGrandFinals ? 'text-amber-400' :
                                                            isWinners ? 'text-blue-400' :
                                                            'text-red-400'
                                                        }`}>
                                                            {set.roundText}
                                                            {isLive && <span className="ml-2 text-yellow-400 animate-pulse">LIVE</span>}
                                                        </div>
                                                        
                                                        {/* Player 1 */}
                                                        <div className={`flex-1 flex items-center gap-2 ${p1Won ? 'text-green-400 font-semibold' : 'text-white'}`}>
                                                            {p1Won && <span className="text-green-500">✓</span>}
                                                            <span className="truncate">{set.player1?.name || 'TBD'}</span>
                                                        </div>
                                                        
                                                        {/* Score */}
                                                        <div className="flex items-center gap-2 font-mono text-lg font-bold">
                                                            <span className={p1Won ? 'text-green-400' : 'text-white/60'}>
                                                                {set.player1?.score != null ? Math.abs(set.player1.score) : '-'}
                                                            </span>
                                                            <span className="text-white/30">-</span>
                                                            <span className={p2Won ? 'text-green-400' : 'text-white/60'}>
                                                                {set.player2?.score != null ? Math.abs(set.player2.score) : '-'}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* Player 2 */}
                                                        <div className={`flex-1 flex items-center justify-end gap-2 ${p2Won ? 'text-green-400 font-semibold' : 'text-white'}`}>
                                                            <span className="truncate text-right">{set.player2?.name || 'TBD'}</span>
                                                            {p2Won && <span className="text-green-500">✓</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    
                                    {bracket.sets.filter(s => {
                                        const rt = s.roundText.toLowerCase();
                                        return rt.includes('final') || rt.includes('semi') || rt.includes('quarter');
                                    }).length === 0 && (
                                        <p className="text-center text-gray-500 py-4">
                                            No top 8 matches found. The tournament may still be in pools.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <LayoutGrid className="mx-auto text-gray-600 mb-4" size={48} />
                                    <p className="text-gray-500">
                                        {selectedEvent 
                                            ? 'No bracket data available yet' 
                                            : 'Select a tournament and event to view bracket'
                                        }
                                    </p>
                                </div>
                            )
                        )}

                        {/* Overlay Link */}
                        {selectedEvent && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-sm text-gray-400 mb-2">Overlay URL (add to OBS as Browser Source):</p>
                                <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                                    <code className="flex-1 text-xs text-blue-400 break-all">
                                        {window.location.origin}/tdeu/ifl/top8/overlay?key={key}&event={encodeURIComponent(selectedEvent.slug)}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `${window.location.origin}/tdeu/ifl/top8/overlay?key=${key}&event=${encodeURIComponent(selectedEvent.slug)}`
                                            );
                                        }}
                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default IFLTop8ControlPage;
