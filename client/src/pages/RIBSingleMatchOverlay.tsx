import { useState, useEffect } from 'react';
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
        p2Name: string;
        p2Title: string;
        p2Character: string;
    };
    matches: Array<{
        id: number;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p2Name: string;
        p2Title: string;
        p2Character: string;
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
}

export default function RIBSingleMatchOverlay({ forceShow = false }: Props) {
    const [searchParams] = useSearchParams();
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
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

    const shouldShow = forceShow || (overlayState && overlayState.showMatchCard);
    
    if (!matchCards || !shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const match = matchCards.singleMatch;
    const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background - VS Background with branding */}
            <img 
                key={`bg-${animKey}`}
                src="/source/overlay/run_it_back/player_vs/vs_background.png"
                alt="Background"
                className="absolute"
                style={{ 
                    width: '1920px', 
                    height: '1080px',
                    animation: `fadeIn 0.4s ease-out` 
                }}
            />

            {/* Match Title - Centered at top */}
            <div 
                key={`title-${animKey}`}
                className="absolute top-[120px] left-0 right-0 text-center"
                style={{ 
                    animation: `fadeIn 0.5s ease-out 0.2s both`,
                    zIndex: 3
                }}
            >
                <h1
                    className="text-[#3a3530] text-[36px] font-black tracking-[0.05em] uppercase"
                    style={{ fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
                >
                    {match.matchTitle}
                </h1>
                <p 
                    className="text-[#7a8080] text-[28px] tracking-[0.1em] uppercase mt-1 font-normal"
                    style={{ fontFamily: 'D-DIN Exp Bold, sans-serif' }}
                >
                    {match.format}
                </p>
            </div>

            {/* Player 1 Name - Large text at bottom background */}
            <div 
                key={`p1name-bg-${animKey}`}
                className="absolute left-[-1400px] bottom-[-10px] overflow-hidden pointer-events-none"
                style={{ 
                    animation: `fadeIn 0.5s ease-out 0.1s both`,
                    zIndex: 0
                }}
            >
                <span 
                    className="font-black uppercase whitespace-nowrap text-[#e63030]"
                    style={{ 
                        fontSize: '400px',
                        fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                        letterSpacing: '-0.03em',
                        lineHeight: '0.8',
                        transform: 'scaleX(0.7)'
                    }}
                >
                    {match.p1Name}
                </span>
            </div>

            {/* Player 2 Name - Large text at bottom background */}
            <div
                key={`p2name-bg-${animKey}`}
                className="absolute right-[-1050px] bottom-[-10px] overflow-hidden pointer-events-none"
                style={{ 
                    animation: `fadeIn 0.5s ease-out 0.1s both`,
                    zIndex: 0
                }}
            >
                <span 
                    className="font-black uppercase whitespace-nowrap text-[#e63030]"
                    style={{ 
                        fontSize: '400px',
                        fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                        letterSpacing: '-0.03em',
                        lineHeight: '0.8',
                        transform: 'scaleX(0.7)'
                    }}
                >
                    {match.p2Name}
                </span>
            </div>

            {/* Player 1 Character - Flipped, on left edge */}
            <div 
                key={`p1-${animKey}`}
                className="absolute left-[-200px] bottom-[-675px]"
                style={{ 
                    animation: `slideInLeft 0.6s ease-out 0.2s both`,
                    zIndex: 2
                }}
            >
                <img 
                    src={p1CharImg} 
                    alt={match.p1Character}
                    className="object-contain object-bottom"
                    style={{
                        height: '1650px',
                        filter: 'drop-shadow(4px 4px 11px rgba(0,0,0,0.4))',
                        transform: 'scaleX(-1)'
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Player 2 Character - On right edge */}
            <div 
                key={`p2-${animKey}`}
                className="absolute right-[-200px] bottom-[-675px]"
                style={{ 
                    animation: `slideInRight 0.6s ease-out 0.2s both`,
                    zIndex: 2
                }}
            >
                <img 
                    src={p2CharImg} 
                    alt={match.p2Character}
                    className="object-contain object-bottom"
                    style={{ 
                        height: '1650px',
                        filter: 'drop-shadow(-4px 4px 11px rgba(0,0,0,0.4))'
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Player Info - P1 Side */}
            <div 
                key={`p1info-${animKey}`}
                className="absolute top-[310px] left-[500px] text-right"
                style={{ 
                    animation: `fadeIn 0.6s ease-out 0.3s both`,
                    zIndex: 3
                }}
            >
                <p 
                    className="text-[#7a8080] text-[24px] tracking-[0.2em] font-normal mb-2"
                    style={{ fontFamily: 'D-DIN Bold, sans-serif' }}
                >
                    {match.p1Title}
                </p>
                <h3 
                    className="text-[#e63030] text-[92px] font-bold tracking-tight leading-none"
                    style={{ fontFamily: 'D-DIN Condensed, sans-serif' }}
                >
                    {match.p1Name}
                </h3>
            </div>

            {/* Player Info - P2 Side */}
            <div 
                key={`p2info-${animKey}`}
                className="absolute top-[310px] right-[550px] text-left"
                style={{ 
                    animation: `fadeIn 0.6s ease-out 0.3s both`,
                    zIndex: 3
                }}
            >
                <p 
                    className="text-[#7a8080] text-[24px] tracking-[0.2em] font-normal mb-2"
                    style={{ fontFamily: 'D-DIN Condensed Bold, sans-serif' }}
                >
                    {match.p2Title}
                </p>
                <h3 
                    className="text-[#e63030] text-[92px] font-bold tracking-tight leading-none"
                    style={{ fontFamily: 'D-DIN Condensed, sans-serif' }}
                >
                    {match.p2Name}
                </h3>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-150px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(150px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
