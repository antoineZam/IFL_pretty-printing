import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore: number;
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

    // Get match from matches array using selectedMatchIndex
    // All matches are now in the matches array (including main event at index 0)
    const selectedIndex = overlayState?.selectedMatchIndex ?? 0;
    const match = matchCards.matches[selectedIndex] || matchCards.matches[0];
    
    if (!match) {
        return <div className="w-[1920px] h-[1080px]" />;
    }
    
    const p1CharImg = `/source/overlay/run_it_back/characters/P1/${match.p1Character.toLowerCase()}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/P2/${match.p2Character.toLowerCase()}.png`;
    
    // Format display based on winScore
    const winScore = matchCards.winScore || 3;
    const format = `First to ${winScore}`;
    
    // Check for victory condition
    const p1Victory = (match.p1Score ?? 0) >= winScore;
    const p2Victory = (match.p2Score ?? 0) >= winScore;
    const hasVictory = p1Victory || p2Victory;

    // Adaptive font size calculation for player names
    // Names should fit within 20% of screen width (384px at 1920px)
    const getAdaptiveFontSize = (name: string, baseSize: number = 120) => {
        const maxWidth = 354; // 20% of 1920px
        const charWidthRatio = 0.25; // Approximate character width as percentage of font size for Crook font
        const estimatedWidth = name.length * baseSize * charWidthRatio;
        if (estimatedWidth <= maxWidth) return baseSize;
        return Math.floor(maxWidth / (name.length * charWidthRatio));
    };

    const p1NameFontSize = getAdaptiveFontSize(match.p1Name);
    const p2NameFontSize = getAdaptiveFontSize(match.p2Name);

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
                    className="text-[#1e3637] text-[36px] font-black tracking-[0.05em] uppercase"
                    style={{ fontFamily: 'D-DIN Exp Bold, D-DIN, sans-serif' }}
                >
                    {match.matchTitle}
                </h1>
                <p
                    className="text-[#7a8080] text-[28px] tracking-[0.1em] uppercase -mt-[10px] font-normal"
                    style={{ fontFamily: 'D-DIN Exp Bold, sans-serif' }}
                >
                    {format}
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
                style={{ clipPath: greenClipPolyBlur, overflow: 'visible' }}
            >
                <div 
                    key={`p1name-blur-${animKey}`}
                    className="absolute bottom-[-40px]"
                    style={{ 
                        right: '57%',
                        textAlign: 'right',
                        opacity: 0.3,
                        filter: 'blur(8px)',
                        animation: `fadeIn 1s ease-out 0.1s both`,
                    }}
                >
                    <span
                        className="font-black uppercase whitespace-nowrap"
                        style={{ 
                            fontSize: '580px',
                            fontFamily: 'Crook, Crook, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block',
                            background: (hasVictory && p2Victory) 
                                ? 'linear-gradient(to bottom, #888888, #444444)' 
                                : 'linear-gradient(to bottom, #DE4725, #A21D17)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {match.p1Name}
                    </span>
                </div>
            </div>

            {/* P1 SHARP LAYER (Inside/Right of Green Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: greenClipPolySharp, overflow: 'visible' }}
            >
                <div 
                    key={`p1name-sharp-${animKey}`}
                    className="absolute bottom-[-40px]"
                    style={{ 
                        right: '57%',
                        textAlign: 'right',
                        animation: `fadeIn 1s ease-out 0.1s both`,
                    }}
                >
                    <span
                        className="font-black uppercase whitespace-nowrap"
                        style={{ 
                            fontSize: '580px',
                            fontFamily: 'Crook, Crook, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block',
                            background: (hasVictory && p2Victory) 
                                ? 'linear-gradient(to bottom, #888888, #444444)' 
                                : 'linear-gradient(to bottom, #DE4725, #A21D17)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
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
                style={{ clipPath: cyanClipPolySharp, overflow: 'visible' }}
            >
                <div
                    key={`p2name-sharp-${animKey}`}
                    className="absolute bottom-[-40px]"
                    style={{ 
                        left: '52%',
                        textAlign: 'left',
                        animation: `fadeIn 0.5s ease-out 0.1s both`,
                    }}
                >
                    <span 
                        className="font-black uppercase whitespace-nowrap"
                        style={{ 
                            fontSize: '580px',
                            fontFamily: 'Crook, Crook, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block',
                            background: (hasVictory && p1Victory) 
                                ? 'linear-gradient(to bottom, #888888, #444444)' 
                                : 'linear-gradient(to bottom, #DE4725, #A21D17)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {match.p2Name}
                    </span>
                </div>
            </div>

            {/* P2 BLURRED LAYER (Outside/Right of Cyan Line) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: cyanClipPolyBlur, overflow: 'visible' }}
            >
                <div
                    key={`p2name-blur-${animKey}`}
                    className="absolute bottom-[-40px]"
                    style={{
                        left: '52%',
                        textAlign: 'left',
                        opacity: 0.3,
                        filter: 'blur(8px)',
                        animation: `fadeIn 0.5s ease-out 0.1s both`,
                    }}
                >
                    <span 
                        className="font-black uppercase whitespace-nowrap"
                        style={{
                            fontSize: '580px',
                            fontFamily: 'Crook, Crook, sans-serif',
                            letterSpacing: '-0.03em',
                            lineHeight: '0.8',
                            transform: 'scaleX(0.7)',
                            display: 'inline-block',
                            background: (hasVictory && p1Victory) 
                                ? 'linear-gradient(to bottom, #888888, #444444)' 
                                : 'linear-gradient(to bottom, #DE4725, #A21D17)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {match.p2Name}
                    </span>
                </div>
            </div>

            {/* Player 1 Character - Flipped, on left edge */}
            <div 
                key={`p1-${animKey}`}
                className="absolute"
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
                        filter: (hasVictory && p2Victory) 
                            ? 'grayscale(100%) drop-shadow(25px -15px 25px rgba(0, 0, 0, 0.27))' 
                            : 'drop-shadow(25px -15px 25px rgba(0, 0, 0, 0.27)) drop-shadow(12px -8px 10px rgba(0, 0, 0, 0.17))',
                        transition: 'filter 0.5s ease-out'
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Player 2 Character - On right edge */}
            <div 
                key={`p2-${animKey}`}
                className="absolute"
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
                        filter: (hasVictory && p1Victory) 
                            ? 'grayscale(100%) drop-shadow(25px -15px 25px rgba(0, 0, 0, 0.27))' 
                            : 'drop-shadow(25px -15px 25px rgba(0, 0, 0, 0.27)) drop-shadow(12px -8px 10px rgba(0, 0, 0, 0.17))',
                        transition: 'filter 0.5s ease-out'
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Player Info - P1 Side - spans from 55% to 75% */}
            <div 
                key={`p1info-${animKey}`}
                className="absolute top-[300px] flex flex-col items-center"
                style={{ 
                    right: '56%',
                    width: '20%',
                    animation: `fadeIn 0.6s ease-out 0.3s both`,
                    zIndex: 3,
                    transition: 'filter 0.5s ease-out, opacity 0.5s ease-out',
                    filter: (hasVictory && p2Victory) ? 'grayscale(100%)' : 'none',
                    opacity: (hasVictory && p2Victory) ? 0.5 : 1
                }}
            >
                <p 
                    className="text-[28px] tracking-[0.02em] font-bold mb-[-15px]"
                    style={{ 
                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                        color: (hasVictory && p2Victory) ? '#888888' : '#7a8080'
                    }}
                >
                    {match.p1Title}
                </p>
                <h3 
                    className="font-bold tracking-tight leading-none whitespace-nowrap"
                    style={{ 
                        fontFamily: 'Crook, Crook, sans-serif',
                        fontSize: `${p1NameFontSize}px`,
                        color: (hasVictory && p2Victory) ? '#888888' : '#e63030'
                    }}
                >
                    {match.p1Name.toUpperCase()}
                </h3>
            </div>

            {/* Player Info - P2 Side - spans from 55% to 75% */}
            <div 
                key={`p2info-${animKey}`}
                className="absolute top-[300px] flex flex-col items-center"
                style={{ 
                    left: '56%',
                    width: '20%',
                    animation: `fadeIn 0.6s ease-out 0.3s both`,
                    zIndex: 3,
                    transition: 'filter 0.5s ease-out, opacity 0.5s ease-out',
                    filter: (hasVictory && p1Victory) ? 'grayscale(100%)' : 'none',
                    opacity: (hasVictory && p1Victory) ? 0.5 : 1
                }}
            >
                <p 
                    className="text-[28px] tracking-[0.02em] font-bold mb-[-15px]"
                    style={{ 
                        fontFamily: 'Gotham Bold, Gotham, sans-serif',
                        color: (hasVictory && p1Victory) ? '#888888' : '#7a8080'
                    }}
                >
                    {match.p2Title}
                </p>
                <h3
                    className="font-bold tracking-tight leading-none whitespace-nowrap"
                    style={{ 
                        fontFamily: 'Crook, Crook, sans-serif',
                        fontSize: `${p2NameFontSize}px`,
                        color: (hasVictory && p1Victory) ? '#888888' : '#e63030'
                    }}
                >
                    {match.p2Name.toUpperCase()}
                </h3>
            </div>

            <div className="absolute top-[400px] flex flex-col items-center"></div>

            {/* Part Number - Bottom Center */}
            <div 
                key={`partnum-${animKey}`}
                className="absolute bottom-[129px] left-[425px] right-0 text-center"
                style={{ 
                    animation: `fadeIn 0.6s ease-out 0.4s both`,
                    zIndex: 3
                }}
            >
                <span
                    className="text-[#1e3637] text-[80px] font-black tracking-[0.002em] uppercase"
                    style={{ fontFamily: 'Crook, Crook, sans-serif' }}
                >
                    {matchCards.partNumber}
                </span>
            </div>

            {/* Victory Overlay */}
            {hasVictory && (
                <div 
                    key={`victory-${animKey}`}
                    className="absolute inset-0 pointer-events-none"
                    style={{ 
                        animation: `fadeIn 0.5s ease-out both`,
                        zIndex: 4
                    }}
                >
                    {/* Victory Background Image */}
                    <img 
                        src={p1Victory 
                            ? '/source/overlay/run_it_back/player_vs/p1_victory.png' 
                            : '/source/overlay/run_it_back/player_vs/p2_victory.png'
                        }
                        alt="Victory"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* VICTORY Text - Positioned under winner's name */}
                    <div 
                        className="absolute top-[490px] flex items-center justify-center"
                        style={{ 
                            right: p1Victory ? '56.7%' : undefined,
                            left: p2Victory ? '55.3%' : undefined,
                            width: '20%',
                            animation: `victoryPulse 0.8s ease-out 0.2s both`
                        }}
                    >
                        <h1 
                            className="text-white text-[20px] font-bold tracking-[0.2em] uppercase"
                            style={{ 
                                fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                textShadow: '0 0 30px rgba(0,0,0,0.4)',
                                animation: `victoryTextGlow 2s ease-in-out infinite`
                            }}
                        >
                            VICTORY
                        </h1>
                    </div>
                    
                    {/* DEFEAT Text - Positioned under loser's name */}
                    <div 
                        className="absolute top-[490px] flex items-center justify-center"
                        style={{ 
                            right: p2Victory ? '56.7%' : undefined,
                            left: p1Victory ? '55.5%' : undefined,
                            width: '20%',
                            animation: `fadeIn 0.8s ease-out 0.3s both`
                        }}
                    >
                        <h1 
                            className="text-[#888888] text-[20px] font-bold tracking-[0.2em] uppercase"
                            style={{ 
                                fontFamily: 'Gotham Bold, Gotham, sans-serif',
                                textShadow: '0 0 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            DEFEAT
                        </h1>
                    </div>
                </div>
            )}

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
                @keyframes victoryPulse {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes victoryTextGlow {
                    0%, 100% { text-shadow: 0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.2); }
                    50% { text-shadow: 0 0 60px rgba(255,255,255,0.5), 0 0 120px rgba(255,255,255,0.3); }
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}