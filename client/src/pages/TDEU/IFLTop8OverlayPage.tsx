import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getCountryCode } from '../../utils/countries';

interface Player {
    id: number;
    name: string;
    sponsor: string | null;
    score: number | null;
    country: string | null;
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

interface Top8Data {
    eventSlug: string;
    tournamentName: string;
    eventName: string;
    standings: { placement: number; entrant_id: number; username: string; sponsor: string | null; country: string | null; }[];
    bracket?: BracketData;
    lastUpdated: string;
}

// Match slot component - scaled and styled for the specific overlay
// Layout offsets (in pixels from left edge of match slot)
const FLAG_OFFSET = -65;      // Distance from left edge to flag
const FLAG_WIDTH = 70;        // Width of flag container
const FLAG_HEIGHT = 69;       // Height of flag container
const FLAG_VERTICAL_OFFSET = 2; // Vertical offset for flags
const NAME_OFFSET = 10;       // Distance from left edge to player name
const SCORE_OFFSET = 247;     // Distance from left edge to score

// Bottom player adjustments (relative to top player)
const BOTTOM_PLAYER_HORIZONTAL_OFFSET = 9; // How much more to the right
const BOTTOM_PLAYER_VERTICAL_OFFSET = -3.2;   // Negative = higher, positive = lower

// Score polygon dimensions (larger than flags)
const SCORE_WIDTH = 75;       // Width of score container
const SCORE_HEIGHT = 69.5;      // Height of score container

// Colors and styles
const NAME_COLOR = '#F0ECEC';
const TEAM_COLOR = '#87CEEB';
const WINNER_GRADIENT = 'linear-gradient(to top, rgba(21, 128, 61, 0.5), rgba(134, 239, 172, 0.15))';  // Dark green to light green, 50% to 15%
const LOSER_GRADIENT = 'linear-gradient(to top, rgba(185, 28, 28, 0.5), rgba(252, 165, 165, 0.15))';   // Dark red to light red, 50% to 15%

// Flag filter for color consistency
const FLAG_FILTER = 'saturate(0.93) hue-rotate(-8deg) brightness(0.97) contrast(.97) saturate(.83)';

// Polygon clip path (same as flags)
const SCORE_CLIP_PATH = 'polygon(0 0, 79% 0, 91% 100%, 12% 100%)';

const AutoFitText = ({ children, maxWidth, className, style }: {
    children: React.ReactNode;
    maxWidth: number;
    className?: string;
    style?: React.CSSProperties;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        if (!ref.current) return;
        ref.current.style.transform = 'scaleX(1)';
        const natural = ref.current.scrollWidth;
        const s = natural > maxWidth ? maxWidth / natural : 1;
        setScale(s);
        ref.current.style.transform = `scaleX(${s})`;
    }, [children, maxWidth]);

    return (
        <span
            ref={ref}
            className={className}
            style={{
                ...style,
                transformOrigin: 'left center',
                transform: `scaleX(${scale})`,
                whiteSpace: 'nowrap',
                display: 'inline-block',
            }}
        >
            {children}
        </span>
    );
};

const MatchSlot = ({ 
    set, 
    left,
    top,
    width = 340,
    height = 152,
}: { 
    set: BracketSet | null;
    left: number;
    top: number;
    width?: number;
    height?: number;
}) => {
    if (!set) return null;

    const isCompleted = set.state === 3;
    const p1Won = isCompleted && set.winnerId === set.player1?.id;
    const p2Won = isCompleted && set.winnerId === set.player2?.id;
    
    // Parse scores - try player.score first, then displayScore
    let p1Score: number | null = set.player1?.score ?? null;
    let p2Score: number | null = set.player2?.score ?? null;
    
    // Fallback: parse from displayScore if scores are missing
    if ((p1Score === null || p2Score === null) && set.displayScore) {
        // displayScore format: "PlayerName 3 - 1 PlayerName" or just "3 - 1"
        const scoreMatch = set.displayScore.match(/(\d+)\s*-\s*(\d+)/);
        if (scoreMatch) {
            p1Score = parseInt(scoreMatch[1]);
            p2Score = parseInt(scoreMatch[2]);
        }
    }
    
    // Debug log for troubleshooting (always log for now)
    console.log(`[Match] ${set.roundText}: ${set.player1?.name} vs ${set.player2?.name} | displayScore: "${set.displayScore}" | p1Score: ${p1Score}, p2Score: ${p2Score}`);

    const renderFlag = (player: Player | null, isBottomPlayer: boolean) => {
        const countryCode = getCountryCode(player?.country);
        const flagUrl = countryCode 
            ? `https://flagcdn.com/h80/${countryCode}.png`
            : '/source/overlay/ifl/no-flag.png';
        
        // Calculate offsets based on top/bottom player
        const flagVerticalOffset = isBottomPlayer ? FLAG_VERTICAL_OFFSET : -FLAG_VERTICAL_OFFSET;
        const horizontalOffset = isBottomPlayer ? BOTTOM_PLAYER_HORIZONTAL_OFFSET : 0;
        const verticalOffset = isBottomPlayer ? BOTTOM_PLAYER_VERTICAL_OFFSET : 0;
        
        return (
            <div 
                className="absolute overflow-hidden"
                style={{ 
                    left: `${FLAG_OFFSET + horizontalOffset}px`,
                    top: `calc(50% - ${FLAG_HEIGHT / 2}px + ${flagVerticalOffset + verticalOffset}px)`,
                    width: `${FLAG_WIDTH}px`,
                    height: `${FLAG_HEIGHT}px`,
                    clipPath: 'polygon(0 0, 79% 0, 91.5% 100%, 13% 100%)'
                }}
            >
                <img 
                    src={flagUrl} 
                    alt={player?.country || 'flag'} 
                    className="w-full h-full object-cover"
                    style={{ filter: FLAG_FILTER }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/source/overlay/ifl/no-flag.png'; }}
                />
            </div>
        );
    };

    const renderPlayer = (player: Player | null, score: number | null | undefined, isWinner: boolean, isBottomPlayer: boolean) => {
        // Calculate offsets for bottom player
        const horizontalOffset = isBottomPlayer ? BOTTOM_PLAYER_HORIZONTAL_OFFSET : 0;
        const verticalOffset = isBottomPlayer ? BOTTOM_PLAYER_VERTICAL_OFFSET : 0;
        
        return (
            <div 
                className="relative w-full h-1/2 flex items-center"
                style={{ transform: `translateY(${verticalOffset}px)` }}
            >
                {/* Flag in polygon container */}
                {renderFlag(player, isBottomPlayer)}
                
                {/* Player name - auto-scales to fit */}
                <AutoFitText
                    maxWidth={SCORE_OFFSET - NAME_OFFSET - 20}
                    className="absolute font-archivo-extra-condensed-medium"
                    style={{ 
                        left: `${NAME_OFFSET + horizontalOffset}px`,
                        color: NAME_COLOR,
                        fontSize: '30.4px',
                        fontWeight: 500,
                        fontStretch: '75%',
                        letterSpacing: '-0.02em',
                        opacity: 0.75
                    }}
                >
                    {player?.sponsor && (
                        <span 
                            className="mr-1.5"
                            style={{ color: TEAM_COLOR, fontSize: '67%' }}
                        >
                            {player.sponsor}
                        </span>
                    )}
                    {player?.name || 'TBD'}
                </AutoFitText>
                
                {/* Score in polygon container with gradient */}
                <div 
                    className="absolute flex items-center justify-center font-archivo-semi-condensed-bold"
                    style={{ 
                        left: `${SCORE_OFFSET + horizontalOffset}px`,
                        top: `calc(50% - ${SCORE_HEIGHT / 2}px + ${(isBottomPlayer ? FLAG_VERTICAL_OFFSET : -FLAG_VERTICAL_OFFSET) + (isBottomPlayer ? BOTTOM_PLAYER_VERTICAL_OFFSET : 0)}px)`,
                        width: `${SCORE_WIDTH}px`,
                        height: `${SCORE_HEIGHT}px`,
                        background: isWinner ? WINNER_GRADIENT : LOSER_GRADIENT,
                        clipPath: SCORE_CLIP_PATH
                    }}
                >
                    <span className="italic text-white font-archivo-semi-condensed-light-italic" style={{ fontSize: '30.4px', fontWeight: 500, fontStretch: '87.5%', marginLeft: '-6px', opacity: 0.75 }}>
                        {score != null ? Math.abs(score) : '-'}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div 
            className="absolute flex flex-col justify-between bg-transparent"
            style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`, padding: '2px 0' }}
        >
            {renderPlayer(set.player1, p1Score, p1Won, false)}
            {renderPlayer(set.player2, p2Score, p2Won, true)}
        </div>
    );
};

const IFLTop8OverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<Top8Data | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch ALL bracket data exactly as you originally had it to prevent missing sets
    const fetchBracket = useCallback(async (eventSlug: string) => {
        try {
            let allSets: BracketSet[] = [];
            let bracketData: BracketData | null = null;
            let page = 1;
            let hasMore = true;
            
            while (hasMore && page <= 5) {
                const response = await fetch(`/api/startgg/event/${encodeURIComponent(eventSlug)}/bracket?perPage=25&page=${page}`);
                if (!response.ok) break;
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) break;
                
                const fetchedData = await response.json();
                if (page === 1) bracketData = fetchedData;
                if (fetchedData.sets && fetchedData.sets.length > 0) {
                    allSets = [...allSets, ...fetchedData.sets];
                    hasMore = fetchedData.pageInfo?.totalPages > page;
                    page++;
                } else {
                    hasMore = false;
                }
            }
            
            if (bracketData) {
                bracketData.sets = allSets;
                console.log(`[Overlay] Loaded ${allSets.length} total sets`);
            }
            return bracketData;
        } catch (err) {
            console.error('Error fetching bracket:', err);
            return null;
        }
    }, []);

    const fetchData = useCallback(async (eventSlug: string) => {
        try {
            setLoading(true);
            const bracket = await fetchBracket(eventSlug);
            
            setData({
                eventSlug,
                tournamentName: bracket?.name || 'Iron Fist League',
                eventName: 'Tekken 8',
                standings: [],
                bracket: bracket || undefined,
                lastUpdated: new Date().toISOString()
            });
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchBracket]);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        const eventSlug = searchParams.get('event');

        if (eventSlug) {
            fetchData(eventSlug);
        }

        if (key) {
            const newSocket = io({ auth: { token: key } });

            newSocket.on('top8-data', (newData: Top8Data) => {
                console.log('[Overlay] Received data via socket:', newData.bracket?.sets?.length, 'sets');
                setData(newData);
                setLoading(false);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [searchParams, fetchData]);

    useEffect(() => {
        const eventSlug = searchParams.get('event');
        if (!eventSlug) return;
        const interval = setInterval(() => {
            fetchData(eventSlug);
        }, 20000);
        return () => clearInterval(interval);
    }, [searchParams, fetchData]);

    if (loading && !data) return <div className="w-[1920px] h-[1080px] bg-transparent" />;
    if (!data?.bracket?.sets) return <div className="w-[1920px] h-[1080px] bg-transparent" />;

    const sets = data.bracket.sets;
    
    // --- Bulletproof Top 8 Logic ---
    // Start.gg is notoriously inconsistent with names. The safest way is to sort by round depth.
    
    // Winners Bracket (Positive Rounds)
    const winnersSets = sets.filter(s => s.roundText.toLowerCase().includes('winner'))
        .sort((a, b) => (a.round || 0) - (b.round || 0) || a.id - b.id);
    const top8Winners = winnersSets.slice(-3); // Extracts the last 3 (WSF 1, WSF 2, WF)

    // Losers Bracket (Negative Rounds)
    const losersSets = sets.filter(s => s.roundText.toLowerCase().includes('loser'))
        .sort((a, b) => Math.abs(a.round || 0) - Math.abs(b.round || 0) || a.id - b.id);
    const top8Losers = losersSets.slice(-6); // Extracts the last 6 (LR1 x2, LQF x2, LSF, LF)

    // Grand Finals
    const grandFinals = sets.filter(s => s.roundText.toLowerCase().includes('grand') || s.roundText.toLowerCase().includes('reset'))
        .sort((a, b) => a.id - b.id);

    // --- Exact 1920x1080 Coordinates based on your layout image ---
    const COL = {
        1: 185,
        2: 640,
        3: 1067,
        4: 1501
    };

    const ROW = {
        WIN_TOP: 135,
        WIN_MID: 243,
        WIN_BOT: 340,
        LOS_TOP: 599,
        LOS_MID: 706,
        LOS_BOT: 803
    };

    return (
        <div className="w-[1920px] h-[1080px] text-white font-archivo-semi-expanded-bold overflow-hidden relative">
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/source/overlay/ifl/top8-bracket-background.png')" }}
            />

            {/* Overlay frame */}
            <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: "url('/source/overlay/ifl/top8-bracket-overlay.png')" }}
            />

            {/* ========== WINNERS BRACKET (TOP) ========== */}
            
            {/* Winners Semis (Col 1) */}
            <MatchSlot set={top8Winners[0]} left={COL[1]} top={ROW.WIN_TOP} />
            <MatchSlot set={top8Winners[1]} left={COL[1]} top={ROW.WIN_BOT} />

            {/* Winners Finals (Col 2) */}
            <MatchSlot set={top8Winners[2]} left={COL[2]} top={ROW.WIN_MID} />

            {/* Grand Finals (Col 3 & 4) */}
            <MatchSlot set={grandFinals[0]} left={COL[3]} top={ROW.WIN_MID} />
            <MatchSlot set={grandFinals[1]} left={COL[4]} top={ROW.WIN_MID} />


            {/* ========== LOSERS BRACKET (BOTTOM) ========== */}
            
            {/* Losers Round 1 (Col 1) */}
            <MatchSlot set={top8Losers[0]} left={COL[1]} top={ROW.LOS_TOP} />
            <MatchSlot set={top8Losers[1]} left={COL[1]} top={ROW.LOS_BOT} />

            {/* Losers Quarters (Col 2) */}
            <MatchSlot set={top8Losers[2]} left={COL[2]} top={ROW.LOS_TOP} />
            <MatchSlot set={top8Losers[3]} left={COL[2]} top={ROW.LOS_BOT} />

            {/* Losers Semis (Col 3) */}
            <MatchSlot set={top8Losers[4]} left={COL[3]} top={ROW.LOS_MID} />

            {/* Losers Finals (Col 4) */}
            <MatchSlot set={top8Losers[5]} left={COL[4]} top={ROW.LOS_MID} />

            {/* Date & Week # */}
            <div 
                className="absolute bottom-8 flex items-baseline justify-between font-archivo-semi-condensed-extrabold-italic text-white italic"
                style={{ opacity: 0.33, fontSize: '23px', left: '1461px', right: `${1916 - (COL[4] + SCORE_OFFSET + SCORE_WIDTH)}px` }}
            >
                <span>
                    {(() => {
                        const d = new Date();
                        const day = d.getDate();
                        const suffix = [11,12,13].includes(day) ? 'TH' : { 1:'ST',2:'ND',3:'RD' }[day % 10] || 'TH';
                        return `${d.toLocaleDateString('en-US', { weekday: 'long' })} ${d.toLocaleDateString('en-US', { month: 'long' })} ${day}${suffix}`.toUpperCase();
                    })()}
                </span>
                <span>
                    {(() => {
                        const weekMatch = data.tournamentName.match(/#(\d+)/)
                            || data.tournamentName.match(/week\s*(\d+)/i)
                            || data.tournamentName.match(/\[week\s*(\d+)\]/i)
                            || data.eventSlug.match(/-week-(\d+)/i)
                            || data.eventSlug.match(/(?:week|w)-?(\d+)/i);
                        return weekMatch ? `WEEK #${weekMatch[1]}` : '';
                    })()}
                </span>
            </div>
        </div>
    );
};

export default IFLTop8OverlayPage;