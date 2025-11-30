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
    externalData?: MatchCardData | null;
    externalOverlayState?: OverlayState;
}

export default function RIBSingleMatchOverlay({ forceShow = false, externalData, externalOverlayState }: Props) {
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

    const shouldShow = forceShow || (overlayState && overlayState.showMatchCard);
    
    if (!matchCards || !shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const match = matchCards.singleMatch;
    const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;

    // Geometry Calculations for Clip Paths
    // Green Line: Left 246px, 6deg rotation
    // Cyan Line: Right 450px (x=1470), 5.2deg rotation
    const greenClipPolyBlur = 'polygon(0 0, 359px 0, 246px 1080px, 0 1080px)'; // Left of line
    const greenClipPolySharp = 'polygon(359px 0, 100% 0, 100% 100%, 246px 100%)'; // Right of line
    
    const cyanClipPolySharp = 'polygon(0 0, 1568px 0, 1470px 1080px, 0 1080px)'; // Left of line
    const cyanClipPolyBlur = 'polygon(1568px 0, 100% 0, 100% 100%, 1470px 100%)'; // Right of line

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

            {/* DEBUG LINES - Kept for reference */}
            <div 
                className="absolute pointer-events-none"
                style={{
                    left: '246px',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    background: 'transparent',
                    zIndex: 100,
                    transform: 'rotate(6deg)',
                    transformOrigin: 'bottom center'
                }}
            />
            <div 
                className="absolute pointer-events-none"
                style={{
                    right: '450px',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    background: 'transparent',
                    zIndex: 100,
                    transform: 'rotate(5.2deg)',
                    transformOrigin: 'bottom center'
                }}
            />

            {/* =================================================================================
               PLAYER 1 NAME (LEFT SIDE)
               Using Clip-Path Containers to split the text exactly at the Green Line
               ================================================================================= */}

            {/* P1 BLURRED LAYER (Outside/Left of Green Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: greenClipPolyBlur }}
            >
                <div 
                    key={`p1name-blur-${animKey}`}
                    className="absolute bottom-[-12px] overflow-visible"
                    style={{ 
                        right: '48%',
                        textAlign: 'right',
                        opacity: 0.3, // Reduced opacity
                        filter: 'blur(8px)', // Blur effect
                        animation: `fadeIn 1s ease-out 0.1s both`,
                    }}
                >
                    <span
                        className="font-black uppercase whitespace-nowrap text-[#e63030]"
                        style={{ 
                            fontSize: '450px',
                            fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block'
                        }}
                    >
                        {match.p1Name}
                    </span>
                </div>
            </div>

            {/* P1 SHARP LAYER (Inside/Right of Green Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: greenClipPolySharp }}
            >
                <div 
                    key={`p1name-sharp-${animKey}`}
                    className="absolute bottom-[-12px] overflow-visible"
                    style={{ 
                        right: '48%',
                        textAlign: 'right',
                        animation: `fadeIn 1s ease-out 0.1s both`,
                    }}
                >
                    <span
                        className="font-black uppercase whitespace-nowrap text-[#e63030]"
                        style={{ 
                            fontSize: '450px',
                            fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block'
                        }}
                    >
                        {match.p1Name}
                    </span>
                </div>
            </div>

            {/* =================================================================================
               PLAYER 2 NAME (RIGHT SIDE)
               Using Clip-Path Containers to split the text exactly at the Cyan Line
               ================================================================================= */}

            {/* P2 SHARP LAYER (Inside/Left of Cyan Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: cyanClipPolySharp }}
            >
                <div
                    key={`p2name-sharp-${animKey}`}
                    className="absolute bottom-[-12px] overflow-visible"
                    style={{ 
                        left: '45%',
                        textAlign: 'left',
                        animation: `fadeIn 0.5s ease-out 0.1s both`,
                    }}
                >
                    <span 
                        className="font-black uppercase whitespace-nowrap text-[#e63030]"
                        style={{ 
                            fontSize: '450px',
                            fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block'
                        }}
                    >
                        {match.p2Name}
                    </span>
                </div>
            </div>

            {/* P2 BLURRED LAYER (Outside/Right of Cyan Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: cyanClipPolyBlur }}
            >
                <div
                    key={`p2name-blur-${animKey}`}
                    className="absolute bottom-[-12px] overflow-visible"
                    style={{ 
                        left: '45%',
                        textAlign: 'left',
                        opacity: 0.3, // Reduced opacity
                        filter: 'blur(8px)', // Blur effect
                        animation: `fadeIn 0.5s ease-out 0.1s both`,
                    }}
                >
                    <span 
                        className="font-black uppercase whitespace-nowrap text-[#e63030]"
                        style={{
                            fontSize: '450px',
                            fontFamily: 'D-DIN Exp, D-DIN, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block'
                        }}
                    >
                        {match.p2Name}
                    </span>
                </div>
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
                        filter: 'perspective-shadow(4px 4px 11px rgba(0,0,0,0.4))',
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

            {/* Player Info - P1 Side - anchored left, grows towards center */}
            <div 
                key={`p1info-${animKey}`}
                className="absolute top-[310px] text-right"
                style={{ 
                    right: '57%',
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
                    className="text-[#e63030] text-[92px] font-bold tracking-tight leading-none whitespace-nowrap"
                    style={{ fontFamily: 'D-DIN Condensed, sans-serif' }}
                >
                    {match.p1Name}
                </h3>
            </div>

            {/* Player Info - P2 Side - anchored right, grows towards center */}
            <div 
                key={`p2info-${animKey}`}
                className="absolute top-[310px] text-left"
                style={{ 
                    left: '57%',
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
                    className="text-[#e63030] text-[92px] font-bold tracking-tight leading-none whitespace-nowrap"
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