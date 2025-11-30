import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    mainEvent: {
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
    };
    matches: Array<{
        id: number;
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
    singleMatch: {
        matchTitle: string;
        format: string;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p2Name: string;
        p2Title: string;
        p2Character: string;
    };
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
    const CARD_GAP = 64;
    
    // Calculate total height needed for all cards
    const totalCardsHeight = allMatches.reduce((acc, match, idx) => {
        const barHeight = match.isMainEvent ? GUEST_CARD_BAR_HEIGHT : REGULAR_CARD_BAR_HEIGHT;
        return acc + barHeight + (idx > 0 ? CARD_GAP : 0);
    }, 0);
    
    // Starting Y position to center all cards vertically
    const startY = (1180 - totalCardsHeight) / 2;

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

            {/* Match Cards - Each positioned absolutely */}
            {allMatches.map((match, index) => {
                const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}_icon.png`;
                const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}_icon.png`;
                const isMainEvent = match.isMainEvent;
                const cardBg = isMainEvent 
                    ? '/source/overlay/run_it_back/match_card/guest_match.png'
                    : '/source/overlay/run_it_back/match_card/regular_match.png';
                
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
                            {/* P1 Character */}
                            <div 
                                className="relative overflow-visible"
                                style={{ width: '700px', height: '100%' }}
                            >
                                <img 
                                    src={p1CharImg}
                                    alt={match.p1Character}
                                    className="absolute"
                                    style={{
                                        height: '170px',
                                        left: '120px',
                                        bottom: '7px',
                                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                                    }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                            
                            {/* P1 Info */}
                            <div className="flex-1 px-4 flex flex-col items-center justify-center">
                                <h3 
                                    className={`font-bold tracking-tight text-center ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                    style={{ 
                                        fontSize: isMainEvent ? '32px' : '24px',
                                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                        textShadow: isMainEvent ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none',
                                        marginRight: '-550px'
                                    }}
                                >
                                    {match.p1Name}
                                </h3>
                                <p 
                                    className={`tracking-wider font-medium text-center ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                    style={{
                                        fontSize: isMainEvent ? '14px' : '11px',
                                        marginRight: '-550px'
                                     }}
                                >
                                    {match.p1Title}
                                </p>
                            </div>

                            {/* VS / Center Section */}
                            <div className="w-[80px] flex items-center justify-center" style={{ marginRight: '-100px' }}>
                                <span 
                                    className={`font-black ${isMainEvent ? 'text-white/50' : 'text-[#8a8070]/50'}`}
                                    style={{ fontSize: '20px' }}
                                >
                                    VS
                                </span>
                            </div>

                            {/* P2 Info */}
                            <div className="flex-1 px-4 flex flex-col items-center justify-center">
                                <h3 
                                    className={`font-bold tracking-tight text-center ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                    style={{ 
                                        fontSize: isMainEvent ? '32px' : '24px',
                                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                        textShadow: isMainEvent ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none',
                                        marginLeft: '-335px'
                                    }}
                                >
                                    {match.p2Name}
                                </h3>
                                <p 
                                    className={`tracking-wider font-medium text-center ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                    style={{ fontSize: isMainEvent ? '14px' : '11px',
                                        marginLeft: '-335px'
                                     }}
                                >
                                    {match.p2Title}
                                </p>
                            </div>

                            {/* P2 Character */}
                            <div 
                                className="relative overflow-visible"
                                style={{ width: '700px', height: '100%' }}
                            >
                                <img 
                                    src={p2CharImg}
                                    alt={match.p2Character}
                                    className="absolute"
                                    style={{ 
                                        height: '170px',
                                        right: '-35px',
                                        bottom: '7px',
                                        filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.3))'
                                    }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                        </div>

                        {/* Match Title Label */}
                        {isMainEvent && (
                            <div
                                className="absolute text-white text-[18px] font-bold tracking-[0.2em] uppercase"
                                style={{ 
                                    top: `${520 - currentBarHeight / 2}px`,
                                    left: '59%',
                                    animation: `fadeIn 0.3s ease-out ${animDelay + 0.3}s both`, 
                                    fontFamily: 'Gotham Book, Gotham, sans-serif'
                                }}
                            >
                                {matchCards.eventTitle}
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