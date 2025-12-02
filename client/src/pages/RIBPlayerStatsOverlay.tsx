import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface PlayerStats {
    name: string;
    character: string;
    division: string;
    iff8Ranking: string;
    iff8Record: string;
    iff8RecordDetails: string;
    iffHistory: string;
    rank: string;
    prowess: number;
    rankedMatches: {
        wins: number;
        loses: number;
        wlRate: string;
    };
    playerMatches: {
        wins: number;
        loses: number;
        wlRate: string;
    };
}

interface PlayerStatsData {
    players: PlayerStats[];
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
    externalData?: PlayerStatsData | null;
    externalOverlayState?: OverlayState;
}

export default function RIBPlayerStatsOverlay({ forceShow = false, externalData, externalOverlayState }: Props) {
    const [searchParams] = useSearchParams();
    const [internalPlayerStats, setInternalPlayerStats] = useState<PlayerStatsData | null>(null);
    const [internalOverlayState, setInternalOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    const isManaged = externalData !== undefined;
    const playerStats = isManaged ? externalData : internalPlayerStats;
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

        newSocket.on('rib-player-stats-update', (data: PlayerStatsData) => setInternalPlayerStats(data));
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            setInternalOverlayState(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [isManaged, searchParams]);

    const shouldShow = forceShow || (overlayState && overlayState.showPlayerStats);
    
    if (!playerStats || !shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const player = playerStats.players[overlayState?.selectedPlayerIndex ?? 0];
    if (!player) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    // Use P1 or P2 folder based on selectedPlayerIndex (0 = P1, 1 = P2)
    const playerSide = (overlayState?.selectedPlayerIndex ?? 0) === 0 ? 'P1' : 'P2';
    const charImg = `/source/overlay/run_it_back/characters/${playerSide}/${player.character.toLowerCase()}.png`;

    // Clip paths for the blur effect on the large name
    // Line at 655px top, ~545px bottom (5.8deg rotation)
    // Blur on left side, sharp on right side
    const blurClipPoly = 'polygon(0 0, 655px 0, 545px 1080px, 0 1080px)';
    const sharpClipPoly = 'polygon(655px 0, 100% 0, 100% 100%, 545px 100%)';

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background Image */}
            <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: 'url(/source/overlay/run_it_back/stat_screen/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: `fadeIn 0.5s ease-out`
                }}
            />

            {/* DEBUG: Visible diagonal line for blur transition (CYAN) */}
            <div 
                className="absolute pointer-events-none"
                style={{
                    left: '655px',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    background: 'transparent',
                    zIndex: 100,
                    transform: 'rotate(5.8deg)',
                    transformOrigin: 'top center'
                }}
            />

            {/* Large watermark name - BLURRED LAYER (Left side) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: blurClipPoly }}
            >
                <div 
                    key={`watermark-blur-${animKey}`}
                    className="absolute bottom-[-67px] left-[100px] text-[375px] font-black text-[#e63030] leading-none tracking-tighter select-none"
                    style={{ 
                        animation: `slideUp 0.8s ease-out`,
                        fontFamily: 'D-DIN Condensed, D-DIN, sans-serif',
                        letterSpacing: '-0.03em',
                        opacity: 0.3,
                        filter: 'blur(8px)',
                        transform: 'scaleY(1.4) scaleX(1.3)',
                        transformOrigin: 'bottom'
                    }}
                >
                    {player.name.toUpperCase()}
                </div>
            </div>

            {/* Large watermark name - SHARP LAYER (Right side) */}
            <div 
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ clipPath: sharpClipPoly }}
            >
                <div 
                    key={`watermark-sharp-${animKey}`}
                    className="absolute bottom-[-67px] left-[100px] text-[375px] font-black text-[#e63030] leading-none tracking-tighter select-none"
                    style={{ 
                        animation: `slideUp 0.8s ease-out`,
                        fontFamily: 'D-DIN Condensed, D-DIN, sans-serif',
                        letterSpacing: '-0.03em',
                        transform: 'scaleY(1.4) scaleX(1.3)',
                        transformOrigin: 'bottom'
                    }}
                >
                    {player.name.toUpperCase()}
                </div>
            </div>

            {/* Character Image - Full 1920x1080 */}
            <img 
                key={`char-${animKey}`}
                src={charImg} 
                alt={player.character}
                className="absolute inset-0"
                style={{ 
                    animation: `slideInLeft 0.6s ease-out`,
                    zIndex: 10
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            {/* Stats Panel */}
            <div 
                key={`stats-${animKey}`}
                className="absolute top-[90px] right-[500px] w-[480px] font-bold text-left"
                style={{ animation: `slideInRight 0.7s ease-out`, fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
            >
                {/* All Stats - One per line */}
                <div className="space-y-2 text-[24px]">
                    <div className="flex gap-8">
                        <span className="text-[#5a5248] w-[200px]">DIVISION</span>
                        <span className="text-[#2a2520] font-normal">{player.division}</span>
                    </div>
                    <div className="flex gap-8">
                        <span className="text-[#5a5248] w-[200px]">IFF8 RANKING</span>
                        <span className="text-[#2a2520] font-normal">{player.iff8Ranking}</span>
                    </div>
                    <div className="flex gap-20">
                        <span className="text-[#5a5248] w-[200px] whitespace-nowrap">IFF8 RECORD</span>
                        <span className="text-[#2a2520] font-normal whitespace-nowrap">
                            {player.iff8Record}
                            <span className="text-[#8a8070] text-[18px] ml-2">({player.iff8RecordDetails})</span>
                        </span>
                    </div>
                    <div className="flex gap-8">
                        <span className="text-[#5a5248] w-[200px]">IFF HISTORY</span>
                        <span className="text-[#2a2520] font-normal">{player.iffHistory}</span>
                    </div>
                    
                    {/* Empty line gap */}
                    <div className="h-[24px]"></div>
                    
                    <div className="flex gap-8">
                        <span className="text-[#5a5248] w-[200px]">RANK</span>
                        <span className="text-[#2a2520] font-normal">{player.rank}</span>
                    </div>
                    <div className="flex gap-8">
                        <span className="text-[#5a5248] w-[200px]">PROWESS</span>
                        <span className="text-[#2a2520] font-normal">{player.prowess.toLocaleString()}</span>
                    </div>
                    
                    {/* Empty line gap */}
                    <div className="h-[24px]"></div>
                    
                    {/* Match Stats - Side by Side */}
                    <div className="flex gap-24">
                        {/* Ranked Matches Section */}
                        <div>
                            <h4 className="text-[#c45c4c] text-[24px] italic mb-2 text-left">Ranked Matches</h4>
                            <div className="space-y-2">
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">WINS</span>
                                    <span className="text-[#2a2520] font-normal">{player.rankedMatches.wins}</span>
                                </div>
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">LOSES</span>
                                    <span className="text-[#2a2520] font-normal">{player.rankedMatches.loses}</span>
                                </div>
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">W/L RATE</span>
                                    <span className="text-[#2a2520] font-normal">{player.rankedMatches.wlRate}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Player Matches Section */}
                        <div>
                            <h4 className="text-[#c45c4c] text-[24px] italic mb-2 text-left">Player Matches</h4>
                            <div className="space-y-2">
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">WINS</span>
                                    <span className="text-[#2a2520] font-normal">{player.playerMatches.wins}</span>
                                </div>
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">LOSES</span>
                                    <span className="text-[#2a2520] font-normal">{player.playerMatches.loses}</span>
                                </div>
                                <div className="flex gap-8">
                                    <span className="text-[#5a5248] w-[200px]">W/L RATE</span>
                                    <span className="text-[#2a2520] font-normal">{player.playerMatches.wlRate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}