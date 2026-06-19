import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import type { IFF9Lineup, IFF9Match, IFF9MatchType } from '../../types/iff9';

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
    const side = slot === 1 ? 'p1' : 'p2';
    return `/source/overlay/characters/iff_9/${side}/${slug}.png`;
}

// Map match_type to the card background asset
function matchCardFramePath(matchType: IFF9MatchType): string {
    if (matchType === 'masters') return '/source/overlay/iff_9/match_card/master_match.png';
    if (matchType === 'finalboss') return '/source/overlay/iff_9/match_card/finalboss_match.png';
    if (matchType === 'qualifier') return '/source/overlay/iff_9/match_card/qualfier_matchcard.png';
    return '/source/overlay/iff_9/match_card/challenger_match.png';
}

// A single vs-card row. The featured card is rendered larger.
const MatchCard = ({ match, glitch }: { match: IFF9Match; glitch: boolean }) => {
    const cardFrameBg = matchCardFramePath(match.match_type);

    return (
        <div className={`relative w-[1146px] h-[257px] ${glitch ? 'click-glitch' : ''}`}>
            {/* Background frame */}
            <div className="absolute inset-0 z-0">
                <img src={cardFrameBg} className="w-full h-full object-contain opacity-90" alt="" onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }} />
            </div>

            {/* P1 Character - Full size absolute layer */}
            <img
                src={portraitPath(match, 1)}
                alt={match.player_1_name}
                className="absolute inset-0 w-full h-full object-contain z-[1] pointer-events-none"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />

            {/* P2 Character - Full size absolute layer */}
            <img
                src={portraitPath(match, 2)}
                alt={match.player_2_name}
                className="absolute inset-0 w-full h-full object-contain z-[1] pointer-events-none"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />

            {/* Text Overlay */}
            <div className="relative z-10 flex items-stretch w-full h-full pt-[60px] pb-[30px] px-12">
                {/* Player 1 Text */}
                <div className="flex-1 flex items-center justify-start min-w-0 pr-6">
                    <div className="flex flex-col justify-center">
                        <h3 className="absolute left-[50px] top-[97px] text-[32px] font-d-din-bold text-[#D8D7D5] uppercase truncate transform scale-y-150">{match.player_1_name}</h3>
                            <p className="absolute left-[50px] top-[147px] text-[14px] text-[#7C9A79] uppercase tracking-wider truncate transform scale-y-150 font-d-din">{match.player_1_info}</p>
                        </div>
                </div>

                {/* Center: match number, score, round */}
                <div className="w-[300px] shrink-0 flex flex-col items-center justify-center drop-shadow-md">
                    <p className="absolute top-[24px] left-[107px] text-[12.6px] text-[#D8D7D5] uppercase tracking-[0.15em] mb-1 transform scale-y-150 font-d-din">MATCH_{String(match.match_number).padStart(2, '0')}</p>
                    <div className="flex items-center gap-4 text-[40px] text-[#7C9A79] leading-none transform scale-y-150 font-d-din">
                        <span>{match.player_1_score}</span>
                        <span className="text-[#7C9A79] text-[40px] pb-2 font-d-din-bold">-</span>
                        <span>{match.player_2_score}</span>
                    </div>
                    <p className="text-[14px] text-[#D8D7D5]/70 uppercase tracking-widest mt-1 font-d-din-bold">{match.round_name}</p>
                </div>

                {/* Player 2 Text */}
                <div className="flex-1 flex items-center justify-end min-w-0 pl-6 text-right">
                    <div className="flex flex-col justify-center">
                        <h3 className="absolute right-[50px] top-[97px] text-[32px] font-d-din-bold text-[#D8D7D5] uppercase truncate transform scale-y-150">{match.player_2_name}</h3>
                        <p className="absolute right-[50px] top-[147px] text-[14px] text-[#7C9A79] uppercase tracking-wider truncate transform scale-y-150 font-d-din">{match.player_2_info}</p>
                    </div>
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

    const weekLabel = formatWeek(lineup?.week_number ?? null);
    const eventDate = lineup?.event_date || '';

    return (
        <div className={`${containerClass} relative overflow-hidden text-white uppercase`} style={{ backgroundColor: '#0a0f0d' }}>
            {/* Background art */}
            <img
                src="/source/overlay/iff_9/match_card/match_card_background.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />
            {/* Texture overlay */}
            <img
                src="/source/overlay/iff_9/match_card/texture_overlay.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-[15] opacity-100 mix-blend-overlay pointer-events-none"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />

            {/* ===== Left sidebar (Week Number) ===== */}
            {weekLabel && eventDate && (
                <div className="absolute top-0 left-0 h-full w-[400px] z-20 flex flex-col items-center justify-center pl-16">
                    <h1 className="absolute top-[510px] left-[138px] text-[12px] text-[#D8D7D5] leading-none tracking-widest text-center font-d-din-bold">{eventDate}</h1>
                    <h2 className="absolute top-[540px] left-[220px] text-[24px] text-[#7C9A79] leading-none tracking-widest text-center transform scale-y-150 font-d-din-bold">
                        {weekLabel}
                    </h2>
                </div>
            )}

            {/* ===== Main lineup ===== */}
            <div className="absolute top-0 right-[90px] h-full w-[1146px] z-20 flex flex-col justify-center">
                {orderedMatches.length === 0 ? (
                    <div className="text-center text-white/30 text-2xl">No matches in lineup</div>
                ) : (
                    orderedMatches.map((match, i) => {
                        // Calculate dynamic margin top based on total cards to fit within 1080px height
                        let overlapMargin = 0;
                        if (i > 0) {
                            if (orderedMatches.length >= 6) {
                                overlapMargin = -96; // Overlap heavily to fit 6 cards (1062px total height)
                            } else if (orderedMatches.length === 5) {
                                overlapMargin = -60; // Overlap to fit 5 cards (1045px total height)
                            } else if (orderedMatches.length === 4) {
                                overlapMargin = 16; // Small gap to fit 4 cards (1076px total height)
                            } else {
                                overlapMargin = 24; // Default gap-6 for 1-3 cards
                            }
                        }

                        return (
                            <div
                                key={match.id ?? `${match.match_number}-${i}`}
                                className="shrink-0"
                                style={{
                                    marginTop: `${overlapMargin}px`,
                                    opacity: i < visibleCount ? 1 : 0,
                                    transition: 'opacity 0.18s ease-out',
                                }}
                            >
                                <MatchCard match={match} glitch={glitchIndex === i} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default IFF9MatchCardsPage;
