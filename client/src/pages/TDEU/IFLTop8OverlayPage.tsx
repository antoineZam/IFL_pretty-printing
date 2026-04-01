import { useState, useEffect, useCallback } from 'react';
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
// Fixed score offset from column start (in pixels)
const SCORE_OFFSET = 275;

const MatchSlot = ({ 
    set, 
    left,
    top,
    width = 340,
    height = 100,
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

    const renderPlayer = (player: Player | null, score: number | null | undefined, isWinner: boolean, isBottomPlayer: boolean) => {
        const countryCode = getCountryCode(player?.country);
        const flagUrl = countryCode 
            ? `https://flagcdn.com/h40/${countryCode}.png`
            : '/source/overlay/ifl/no-flag.png';
        
        return (
            <div 
                className="relative flex items-center px-2 w-full gap-2"
                style={{ marginLeft: isBottomPlayer ? '8px' : '0' }}
            >
                <img 
                    src={flagUrl} 
                    alt={player?.country || 'flag'} 
                    className="h-5 w-auto object-contain"
                    style={{ filter: 'saturate(0.93) hue-rotate(-8deg) brightness(0.97) contrast(.97) saturate(.83)' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/source/overlay/ifl/no-flag.png'; }}
                />
                <span className={`flex-1 text-lg uppercase italic font-black truncate tracking-tight ${isWinner ? 'text-yellow-400' : 'text-white'}`} style={{ maxWidth: `${SCORE_OFFSET - 80}px` }}>
                    {player?.sponsor && <span className="text-sm opacity-70 mr-1.5 italic font-bold">{player.sponsor}</span>}
                    {player?.name || 'TBD'}
                </span>
                <span 
                    className={`absolute text-xl font-black ${isWinner ? 'text-yellow-400' : 'text-white/60'}`}
                    style={{ left: `${SCORE_OFFSET}px` }}
                >
                    {score ?? '-'}
                </span>
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
        1: 185,   // Leftmost matches
        2: 640,   // Second column
        3: 1065,  // Third column
        4: 1500   // Rightmost column
    };

    const ROW = {
        WIN_TOP: 157,
        WIN_MID: 267, // Perfect middle between 120 and 310
        WIN_BOT: 363,
        LOS_TOP: 622,
        LOS_MID: 730, // Perfect middle between 550 and 740
        LOS_BOT: 826
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
        </div>
    );
};

export default IFLTop8OverlayPage;