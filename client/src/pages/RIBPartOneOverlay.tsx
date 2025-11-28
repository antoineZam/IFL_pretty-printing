import { useState, useEffect } from 'react';
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

export default function RIBPartOneOverlay() {
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        const connectionKey = localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => setMatchCards(data));
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            setOverlayState(prev => {
                if (prev && data.animationTrigger !== prev.animationTrigger) {
                    setAnimKey(k => k + 1);
                }
                return data;
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    if (!matchCards || !overlayState || !overlayState.showPartOne) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const mainEvent = matchCards.mainEvent;
    const allMatches = [
        { ...mainEvent, id: 0, isMainEvent: true },
        ...matchCards.matches.map(m => ({ ...m, isMainEvent: false }))
    ];
    
    // Total cards count for animation timing (main event + regular matches)
    const totalCards = allMatches.length;

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

            {/* Match Cards Container - Centered on right side */}
            <div 
                className="absolute top-1/2 right-[100px] -translate-y-1/2 flex flex-col gap-3"
                style={{ width: '1000px' }}
            >
                {allMatches.map((match, index) => {
                    const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
                    const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;
                    const isMainEvent = match.isMainEvent;
                    const cardBg = isMainEvent 
                        ? '/source/overlay/run_it_back/match_card/guest_match.png'
                        : '/source/overlay/run_it_back/match_card/regular_match.png';
                    
                    // Animation delay: bottom cards animate first (reverse order)
                    const animDelay = (totalCards - 1 - index) * 0.12;
                    const cardHeight = isMainEvent ? 140 : 110;

                    return (
                        <div 
                            key={`card-${match.id}-${animKey}`}
                            className="relative"
                            style={{ 
                                height: `${cardHeight}px`,
                                animation: `slideUpFade 0.5s ease-out ${animDelay}s both`
                            }}
                        >
                            {/* Card Background Image */}
                            <img 
                                src={cardBg}
                                alt="Card Background"
                                className="absolute inset-0 w-full h-full object-contain object-center"
                            />

                            {/* Card Content Overlay */}
                            <div className="absolute inset-0 flex items-center">
                                {/* P1 Character */}
                                <div 
                                    className="h-full relative overflow-hidden"
                                    style={{ width: isMainEvent ? '200px' : '160px' }}
                                >
                                    <img 
                                        src={p1CharImg}
                                        alt={match.p1Character}
                                        className="absolute bottom-0 left-[20px] object-contain"
                                        style={{ 
                                            height: isMainEvent ? '160px' : '130px',
                                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                                        }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                                
                                {/* P1 Info */}
                                <div 
                                    className="flex-1 px-4"
                                    style={{ marginLeft: isMainEvent ? '40px' : '20px' }}
                                >
                                    <h3 
                                        className={`font-bold tracking-tight ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                        style={{ 
                                            fontSize: isMainEvent ? '32px' : '26px',
                                            fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                            textShadow: isMainEvent ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none'
                                        }}
                                    >
                                        {match.p1Name}
                                    </h3>
                                    <p 
                                        className={`tracking-wider font-medium ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                        style={{ fontSize: isMainEvent ? '14px' : '12px' }}
                                    >
                                        {match.p1Title}
                                    </p>
                                </div>

                                {/* VS / Center Section */}
                                <div className="w-[80px] flex items-center justify-center">
                                    <span 
                                        className={`font-black ${isMainEvent ? 'text-white/60' : 'text-[#8a8070]/60'}`}
                                        style={{ fontSize: '20px' }}
                                    >
                                        VS
                                    </span>
                                </div>

                                {/* P2 Info */}
                                <div 
                                    className="flex-1 px-4 text-right"
                                    style={{ marginRight: isMainEvent ? '40px' : '20px' }}
                                >
                                    <h3 
                                        className={`font-bold tracking-tight ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                        style={{ 
                                            fontSize: isMainEvent ? '32px' : '26px',
                                            fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                            textShadow: isMainEvent ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none'
                                        }}
                                    >
                                        {match.p2Name}
                                    </h3>
                                    <p 
                                        className={`tracking-wider font-medium ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`}
                                        style={{ fontSize: isMainEvent ? '14px' : '12px' }}
                                    >
                                        {match.p2Title}
                                    </p>
                                </div>

                                {/* P2 Character */}
                                <div 
                                    className="h-full relative overflow-hidden"
                                    style={{ width: isMainEvent ? '200px' : '160px' }}
                                >
                                    <img 
                                        src={p2CharImg}
                                        alt={match.p2Character}
                                        className="absolute bottom-0 right-[20px] object-contain"
                                        style={{ 
                                            height: isMainEvent ? '160px' : '130px',
                                            filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.3))',
                                            transform: 'scaleX(-1)'
                                        }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                            </div>

                            {/* Main Event Label */}
                            {isMainEvent && (
                                <div 
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#8b3a3a] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1 rounded-b"
                                    style={{ animation: `fadeIn 0.3s ease-out ${animDelay + 0.3}s both` }}
                                >
                                    MAIN EVENT
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

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
