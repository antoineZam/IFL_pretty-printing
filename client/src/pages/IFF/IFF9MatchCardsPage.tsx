import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import type { IFF9Lineup, IFF9Match } from '../../types/iff9';

// NOTE: Fonts and final art are intentionally deferred for IFF9. This page only
// fixes the content disposition; assets (card backgrounds, portraits) load from
// /source/overlay/iff_9/{masters,challengers}/ with graceful text fallbacks.

interface Props {
    socket?: Socket | null;       // If provided, listen on this socket instead of creating one
    embedded?: boolean;           // If true, fill parent instead of fixed 1920x1080
    initialLineup?: IFF9Lineup | null;
    active?: boolean;             // When true (visible), (re)play the staggered glitch-in
}

const REVEAL_INTERVAL_MS = 220;

function formatWeek(weekNumber: number | null): string {
    if (weekNumber == null) return '';
    return `WEEK ${String(weekNumber).padStart(2, '0')}`;
}

function portraitPath(match: IFF9Match, slot: 1 | 2): string {
    const character = slot === 1 ? match.player_1_character : match.player_2_character;
    const slug = (character || '').toLowerCase().trim().replace(/\s+/g, '_');
    return `/source/overlay/iff_9/${match.match_type}/portraits/${slug}.png`;
}

// A single vs-card row. The featured card is rendered larger.
const MatchCard = ({ match, featured, glitch }: { match: IFF9Match; featured: boolean; glitch: boolean }) => {
    const typeLabel = match.match_type === 'masters' ? 'MASTERS' : 'CHALLENGERS';

    if (featured) {
        return (
            <div className={`relative w-full ${glitch ? 'click-glitch' : ''}`}>
                <div className="flex items-stretch w-full border border-white/15 bg-black/50 backdrop-blur-sm overflow-hidden">
                    {/* Player 1 */}
                    <div className="flex-1 flex items-center gap-4 p-4">
                        <img
                            src={portraitPath(match, 1)}
                            alt={match.player_1_name}
                            className="w-20 h-20 object-cover object-top shrink-0 bg-white/5"
                            onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
                        />
                        <div className="min-w-0">
                            <h3 className="text-2xl font-bold text-white uppercase truncate">{match.player_1_name}</h3>
                            <p className="text-[11px] text-white/60 uppercase tracking-wider truncate">{match.player_1_info}</p>
                        </div>
                    </div>

                    {/* Center: match number, score, round */}
                    <div className="w-48 shrink-0 flex flex-col items-center justify-center px-4 border-x border-white/15 bg-black/40">
                        <p className="text-[10px] text-white/50 uppercase tracking-[0.3em]">MATCH_{String(match.match_number).padStart(2, '0')}</p>
                        <div className="flex items-center gap-3 text-4xl font-black text-white">
                            <span>{match.player_1_score}</span>
                            <span className="text-white/40 text-lg">-</span>
                            <span>{match.player_2_score}</span>
                        </div>
                        <p className="text-[11px] text-white/70 uppercase tracking-widest">{match.round_name}</p>
                    </div>

                    {/* Player 2 */}
                    <div className="flex-1 flex items-center justify-end gap-4 p-4 text-right">
                        <div className="min-w-0">
                            <h3 className="text-2xl font-bold text-white uppercase truncate">{match.player_2_name}</h3>
                            <p className="text-[11px] text-white/60 uppercase tracking-wider truncate">{match.player_2_info}</p>
                        </div>
                        <img
                            src={portraitPath(match, 2)}
                            alt={match.player_2_name}
                            className="w-20 h-20 object-cover object-top shrink-0 bg-white/5"
                            onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
                        />
                    </div>
                </div>
                <span className="absolute -top-2 left-4 px-2 py-0.5 text-[9px] uppercase tracking-widest bg-white text-black font-bold">{typeLabel}</span>
            </div>
        );
    }

    // Compact vs-bar for the rest of the lineup.
    return (
        <div className={`relative w-full ${glitch ? 'click-glitch' : ''}`}>
            <div className={`flex items-center w-full h-16 border border-white/10 bg-black/40 ${match.is_complete ? 'opacity-60' : ''}`}>
                <div className="w-24 shrink-0 flex flex-col items-center justify-center border-r border-white/10 h-full">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">MATCH</span>
                    <span className="text-lg font-bold text-white leading-none">{String(match.match_number).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-5 min-w-0">
                    <span className="text-base font-semibold text-white uppercase truncate flex-1">{match.player_1_name}</span>
                    <span className="px-3 text-sm font-black text-white/80 shrink-0">{match.player_1_score} - {match.player_2_score}</span>
                    <span className="text-base font-semibold text-white uppercase truncate flex-1 text-right">{match.player_2_name}</span>
                </div>
                <div className="w-28 shrink-0 flex items-center justify-center border-l border-white/10 h-full">
                    <span className="text-[9px] uppercase tracking-widest text-white/50">{typeLabel}</span>
                </div>
            </div>
        </div>
    );
};

const IFF9MatchCardsPage = ({ socket: propSocket, embedded = false, initialLineup = null, active = true }: Props) => {
    const [searchParams] = useSearchParams();
    const [lineup, setLineup] = useState<IFF9Lineup | null>(initialLineup);
    const [visibleCount, setVisibleCount] = useState(0);
    const [glitchIndex, setGlitchIndex] = useState<number | null>(null);

    // Transparent background (standalone mode only)
    useEffect(() => {
        if (embedded) return;
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, [embedded]);

    // Listen on provided socket (embedded mode)
    useEffect(() => {
        if (!propSocket) return;
        const handler = (data: IFF9Lineup) => setLineup(data);
        propSocket.on('iff9-lineup', handler);
        return () => { propSocket.off('iff9-lineup', handler); };
    }, [propSocket]);

    // Create own socket (standalone mode)
    useEffect(() => {
        if (embedded || propSocket) return;
        const key = searchParams.get('key');
        if (!key) return;
        const socket: Socket = io({ auth: { token: key } });
        socket.on('iff9-lineup', (data: IFF9Lineup) => setLineup(data));
        return () => { socket.disconnect(); };
    }, [searchParams, embedded, propSocket]);

    const matches = useMemo(
        () => (lineup?.matches || []).slice().sort((a, b) => a.match_order - b.match_order),
        [lineup]
    );

    // Featured = the active match (falls back to the first one).
    const featuredIndex = useMemo(() => {
        const idx = matches.findIndex(m => m.is_active);
        return idx >= 0 ? idx : 0;
    }, [matches]);

    // Ordered for display: featured first, then the rest in lineup order.
    const orderedMatches = useMemo(() => {
        if (matches.length === 0) return [];
        const featured = matches[featuredIndex];
        const rest = matches.filter((_, i) => i !== featuredIndex);
        return [featured, ...rest];
    }, [matches, featuredIndex]);

    // Staggered glitch-in reveal whenever the lineup changes or the page becomes active.
    useEffect(() => {
        if (!active) return;
        setVisibleCount(0);
        setGlitchIndex(null);
        if (orderedMatches.length === 0) return;

        let i = 0;
        const timer = setInterval(() => {
            i += 1;
            setVisibleCount(i);
            setGlitchIndex(i - 1);
            if (i >= orderedMatches.length) clearInterval(timer);
        }, REVEAL_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [orderedMatches, active]);

    // Clear the transient glitch class shortly after each reveal.
    useEffect(() => {
        if (glitchIndex == null) return;
        const t = setTimeout(() => setGlitchIndex(null), 400);
        return () => clearTimeout(t);
    }, [glitchIndex]);

    const containerClass = embedded ? 'w-full h-full' : 'w-[1920px] h-[1080px]';

    const eventName = lineup?.week_name || 'IFF9 QUALIFIERS';
    const weekLabel = formatWeek(lineup?.week_number ?? null);
    const eventDate = lineup?.event_date || '';

    return (
        <div className={`${containerClass} relative overflow-hidden text-white uppercase`} style={{ backgroundColor: '#0a0f0d' }}>
            {/* Background art (asset pending) */}
            <img
                src="/source/overlay/iff_9/match_cards_bg.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* ===== Left sidebar ===== */}
            <div className="absolute top-0 left-0 h-full w-[26%] z-20 flex">
                {/* Decorative vertical bars */}
                <div className="w-24 h-full flex flex-col justify-center gap-2 pl-6 opacity-60">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-3 bg-[#34d399]/40"
                            style={{ width: `${30 + ((i * 37) % 70)}%` }}
                        />
                    ))}
                </div>
                <div className="flex-1 flex flex-col justify-center pl-4 pr-8">
                    <h1 className="text-5xl font-black leading-none text-white tracking-tight">{eventName}</h1>
                    {eventDate && <p className="mt-3 text-sm text-[#34d399] tracking-[0.3em]">{eventDate}</p>}
                    {weekLabel && (
                        <div className="mt-6 inline-flex items-center gap-3">
                            <div className="w-10 h-px bg-white/40" />
                            <span className="text-xl font-bold tracking-[0.3em] text-white/90">{weekLabel}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== Main lineup ===== */}
            <div className="absolute top-0 right-0 h-full w-[72%] z-20 flex flex-col justify-center gap-3 pr-16 pl-4">
                {orderedMatches.length === 0 ? (
                    <div className="text-center text-white/30 text-2xl">No matches in lineup</div>
                ) : (
                    orderedMatches.map((match, i) => (
                        <div
                            key={match.id ?? `${match.match_number}-${i}`}
                            style={{
                                opacity: i < visibleCount ? 1 : 0,
                                transition: 'opacity 0.18s ease-out',
                            }}
                        >
                            <MatchCard match={match} featured={i === 0} glitch={glitchIndex === i} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IFF9MatchCardsPage;
