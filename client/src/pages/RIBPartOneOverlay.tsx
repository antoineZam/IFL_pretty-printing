import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore?: number;
    matches: Array<{
        id: number;
        matchTitle: string;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p1Flag?: string;
        p1Score?: number;
        p2Name: string;
        p2Title: string;
        p2Character: string;
        p2Flag?: string;
        p2Score?: number;
        winner?: string | null;
        completed?: boolean;
        isMainEvent?: boolean;
    }>;
    sponsors: {
        presenter: string;
        association: string;
    };
}

interface OverlayState {
    showMatchCard: boolean;
    showPlayerStats: boolean;
    showPartOne: boolean;
    showStreamOverlay: boolean;
    selectedMatchIndex: number;
    selectedPlayerIndex: number;
    animationTrigger: number;
}

interface Props {
    forceShow?: boolean;
    externalData?: MatchCardData | null;
    externalOverlayState?: OverlayState;
}

export default function RIBPartOneOverlay({ forceShow = false, externalData, externalOverlayState }: Props) {
    const [searchParams] = useSearchParams();
    const [internalMatchCards, setInternalMatchCards] = useState<MatchCardData | null>(null);
    const [internalOverlayState, setInternalOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    const isManaged = externalData !== undefined;
    const matchCards = isManaged ? externalData : internalMatchCards;
    const overlayState = isManaged && externalOverlayState ? externalOverlayState : internalOverlayState;

    const prevAnimTrigger = useRef(overlayState?.animationTrigger);
    useEffect(() => {
        if (overlayState?.animationTrigger !== prevAnimTrigger.current) {
            setAnimKey(k => k + 1);
            prevAnimTrigger.current = overlayState?.animationTrigger;
        }
    }, [overlayState?.animationTrigger]);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        if (isManaged) return;

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => setInternalMatchCards(data));
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            setInternalOverlayState(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [isManaged, searchParams]);

    const shouldShow = forceShow || (overlayState && overlayState.showPartOne);
    
    if (!matchCards || !shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    // Use matches array directly - isMainEvent flag determines which is the main event
    const allMatches = matchCards.matches.map(m => ({ ...m, isMainEvent: m.isMainEvent || false }));
    
    // Total cards count for animation timing (main event + regular matches)
    const totalCards = allMatches.length;

    // The card images are 1920x1080 with the visible card bar in the center
    const GUEST_CARD_BAR_HEIGHT = 140;
    const REGULAR_CARD_BAR_HEIGHT = 140;
    
    // Adjust gap and vertical offset based on number of cards
    // If 5 or more cards, reduce gap and start higher
    const CARD_GAP = totalCards >= 5 ? 32 : 64;
    const verticalOffset = totalCards >= 5 ? -40 : 0; // Move cards up when 5+
    
    // Calculate total height needed for all cards
    const totalCardsHeight = allMatches.reduce((acc, match, idx) => {
        const barHeight = match.isMainEvent ? GUEST_CARD_BAR_HEIGHT : REGULAR_CARD_BAR_HEIGHT;
        return acc + barHeight + (idx > 0 ? CARD_GAP : 0);
    }, 0);
    
    // Starting Y position to center all cards vertically (with offset for 5+ cards)
    const startY = (1180 - totalCardsHeight) / 2 + verticalOffset;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background Image */}
            <img 
                key={`bg-${animKey}`}
                src="/source/overlay/run_it_back/match_card/background.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: `fadeIn 0.4s ease-out` }}
            />
            {/* Part Number Label */}
            <div className="absolute top-[450px] left-[17%] transform -translate-x-1/2 text-center">
                <span
                    className="text-[#1e3637] text-[76px] font-black tracking-[0.002em] uppercase"
                    style={{ fontFamily: 'Crook, Crook, sans-serif' }}
                >
                   PART{matchCards.partNumber}
                </span>
            </div>

            {/* Match Cards - Each positioned absolutely */}
            {allMatches.map((match, index) => {
                const p1CharImg = `/source/overlay/run_it_back/characters/P1_icon/${match.p1Character.toLowerCase()}.png`;
                const p2CharImg = `/source/overlay/run_it_back/characters/P2_icon/${match.p2Character.toLowerCase()}.png`;
                const isMainEvent = match.isMainEvent;
                const isActiveMatch = index === (overlayState?.selectedMatchIndex ?? 0);
                
                // Active match uses active_match.png, main event uses guest_match.png, others use regular_match.png
                const cardBg = isActiveMatch
                    ? '/source/overlay/run_it_back/match_card/active_match.png'
                    : isMainEvent 
                        ? '/source/overlay/run_it_back/match_card/guest_match.png'
                        : '/source/overlay/run_it_back/match_card/regular_match.png';
                
                // Active match and main event both use the "featured" styling (white text)
                const useFeaturedStyle = isActiveMatch || isMainEvent;

                // Animation delay: bottom cards animate first (reverse order)
                const animDelay = (totalCards - 1 - index) * 0.12;
                
                // Calculate the Y position for this card's visible bar
                let cardBarY = startY;
                for (let i = 0; i < index; i++) {
                    const prevBarHeight = allMatches[i].isMainEvent ? GUEST_CARD_BAR_HEIGHT : REGULAR_CARD_BAR_HEIGHT;
                    cardBarY += prevBarHeight + CARD_GAP;
                }
                
                const currentBarHeight = isMainEvent ? GUEST_CARD_BAR_HEIGHT : REGULAR_CARD_BAR_HEIGHT;
                
                // The card image center should align with where we want the bar
                const imageOffsetY = cardBarY - 580 + currentBarHeight / 2;

                return (
                    <div 
                        key={`card-${match.id}-${animKey}`}
                        className="absolute w-[1920px] h-[1080px] pointer-events-none"
                        style={{ 
                            top: `${imageOffsetY}px`,
                            left: 0,
                            animation: `slideUpFade 0.5s ease-out ${animDelay}s both`
                        }}
                    >
                        {/* Card Background Image - Full 1920x1080 */}
                        <img 
                            src={cardBg}
                            alt="Card Background"
                            className="absolute inset-0 w-full h-full"
                        />


                        {/* P1 Character - Full 1920x1080 layer */}
                        <img 
                            src={p1CharImg}
                            alt={match.p1Character}
                            className="absolute inset-0 w-[1920px] h-[1080px]"
                            style={{
                                filter: (!useFeaturedStyle && match.completed && match.winner === 'p2')
                                    ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) grayscale(100%)'
                                    : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                                opacity: (match.completed && match.winner === 'p2') ? 0.4 : 1
                            }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />

                        {/* P2 Character - Full 1920x1080 layer */}
                        <img 
                            src={p2CharImg}
                            alt={match.p2Character}
                            className="absolute inset-0 w-[1920px] h-[1080px]"
                            style={{
                                filter: (!useFeaturedStyle && match.completed && match.winner === 'p1')
                                    ? 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.3)) grayscale(100%)'
                                    : 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.3))',
                                opacity: (match.completed && match.winner === 'p1') ? 0.4 : 1
                            }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />

                        {/* Card Content Overlay */}
                        <div 
                            className="absolute flex items-center justify-end"
                            style={{
                                top: '50%',
                                transform: 'translateY(calc(-50% - 4px))',
                                left: 0,
                                right: 0,
                                height: `${currentBarHeight}px`,
                                paddingRight: '100px',
                                paddingLeft: '500px'
                            }}
                        >
                            {/* P1 Info - Left aligned */}
                            <div 
                                className="flex-1 flex flex-col items-start justify-center" 
                                style={{ 
                                    paddingLeft: '425px',
                                    opacity: (match.completed && match.winner === 'p2') ? 0.55 : 1,
                                    filter: (!useFeaturedStyle && match.completed && match.winner === 'p2') ? 'grayscale(100%)' : 'none'
                                }}
                            >
                                <h3 
                                    className={`font-bold tracking-tight ${useFeaturedStyle ? 'text-white' : 'text-[#3a3530]'}`}
                                    style={{ 
                                        fontSize: '38px',
                                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                        textShadow: useFeaturedStyle ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none'
                                    }}
                                >
                                    {match.p1Name}
                                </h3>
                                <p 
                                    className={`tracking-wider font-medium ${useFeaturedStyle ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                    style={{
                                        fontFamily: 'Crook Bold, Crook, sans-serif',
                                        fontSize: '28px',
                                        marginTop: '-15px'
                                     }}
                                >
                                    {match.p1Title}
                                </p>
                            </div>

                            {/* VS / Center Section */}
                            <div 
                                className="w-[80px] flex items-center justify-center" 
                                style={{ 
                                    marginRight: '8px'
                                }}
                            >
                                <span 
                                    className={`font-black ${useFeaturedStyle ? 'text-white/70' : 'text-[#8a8070]/70'}`}
                                    style={{ 
                                        fontSize: '28px',
                                        fontFamily: 'Gotham, sans-serif' }}
                                >
                                    {match.p1Score} - {match.p2Score}
                                </span>
                            </div>

                            {/* P2 Info - Right aligned */}
                            <div 
                                className="flex-1 flex flex-col items-end justify-center" 
                                style={{ 
                                    paddingRight: '315px',
                                    opacity: (match.completed && match.winner === 'p1') ? 0.55 : 1,
                                    filter: (!useFeaturedStyle && match.completed && match.winner === 'p1') ? 'grayscale(100%)' : 'none'
                                }}
                            >
                                <h3 
                                    className={`font-bold tracking-tight text-right ${useFeaturedStyle ? 'text-white' : 'text-[#3a3530]'}`}
                                    style={{ 
                                        fontSize: '38px',
                                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                        textShadow: useFeaturedStyle ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none'
                                    }}
                                >
                                    {match.p2Name}
                                </h3>
                                <p 
                                    className={`tracking-wider font-medium text-right ${useFeaturedStyle ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                    style={{
                                        fontFamily: 'Crook Bold, Crook, sans-serif',
                                        fontSize: '28px',
                                        marginTop: '-15px'
                                    }}
                                >
                                    {match.p2Title}
                                </p>
                            </div>
                        </div>

                        {/* Match Title Label - shown for all cards */}
                        {match.matchTitle && (
                            <div
                                className={`absolute text-[32px] font-bold tracking-[0.02em] uppercase text-white text-center`}
                                style={{ 
                                    top: `${506- currentBarHeight / 2}px`,
                                    left: '55%',
                                    width: '300px',
                                    animation: `fadeIn 0.3s ease-out ${animDelay + 0.3}s both`, 
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                                    fontFamily: 'Crook Bold, Crook, sans-serif'
                                }}
                            >
                                {match.matchTitle}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUpFade {
                    from { 
                        transform: translateY(80px); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateY(0); 
                        opacity: 1; 
                    }
                }
            `}</style>
        </div>
    );
}