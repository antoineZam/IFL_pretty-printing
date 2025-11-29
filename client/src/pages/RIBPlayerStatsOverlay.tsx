import { useState, useEffect } from 'react';
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
}

export default function RIBPlayerStatsOverlay({ forceShow = false }: Props) {
    const [searchParams] = useSearchParams();
    const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null);
    const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-player-stats-update', (data: PlayerStatsData) => setPlayerStats(data));
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

    const shouldShow = forceShow || (overlayState && overlayState.showPlayerStats);
    
    if (!playerStats || !shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const player = playerStats.players[overlayState?.selectedPlayerIndex ?? 0];
    if (!player) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const charImg = `/source/overlay/run_it_back/characters/${player.character}.png`;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5]"
                style={{ animation: `fadeIn 0.5s ease-out` }}
            />

            {/* Large watermark name */}
            <div 
                key={`watermark-${animKey}`}
                className="absolute bottom-0 left-0 right-0 text-[200px] font-black text-[#d4c4b0]/40 leading-none tracking-tighter select-none"
                style={{ 
                    animation: `slideUp 0.8s ease-out`,
                    fontFamily: 'Archivo Black, sans-serif'
                }}
            >
                {player.name.toUpperCase()}
            </div>

            {/* Character Image */}
            <div 
                key={`char-${animKey}`}
                className="absolute left-0 bottom-0 h-[950px] w-[700px]"
                style={{ 
                    animation: `slideInLeft 0.6s ease-out`,
                }}
            >
                <img 
                    src={charImg} 
                    alt={player.character}
                    className="h-full w-full object-contain object-bottom"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Sponsors - Top */}
            <div 
                key={`sponsors-${animKey}`}
                className="absolute top-[30px] left-[80px] right-[80px] flex justify-between text-[11px] text-[#8a8070] tracking-[0.15em]"
                style={{ animation: `fadeIn 0.6s ease-out 0.2s both` }}
            >
            </div>

            {/* Stats Panel */}
            <div 
                key={`stats-${animKey}`}
                className="absolute top-[90px] right-[100px] w-[780px]"
                style={{ animation: `slideInRight 0.7s ease-out` }}
            >
                {/* IFF Stats */}
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[20px]">
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">DIVISON</span>
                            <span className="text-[#2a2520]">{player.division}</span>
                        </div>
                        <div></div>
                        
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">IFF8 RANKING</span>
                            <span className="text-[#2a2520]">{player.iff8Ranking}</span>
                        </div>
                        <div></div>
                        
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">IFF8 RECORD</span>
                            <span className="text-[#2a2520]">
                                {player.iff8Record}
                                <span className="text-[#8a8070] text-[16px] ml-2">({player.iff8RecordDetails})</span>
                            </span>
                        </div>
                        <div></div>
                        
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">IFF HISTORY</span>
                            <span className="text-[#2a2520]">{player.iffHistory}</span>
                        </div>
                        <div></div>
                    </div>
                </div>

                {/* Rank & Prowess */}
                <div className="mb-8">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[20px]">
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">RANK</span>
                            <span className="text-[#2a2520]">{player.rank}</span>
                        </div>
                        <div></div>
                        
                        <div className="flex justify-between">
                            <span className="font-bold text-[#5a5248]">PROWESS</span>
                            <span className="text-[#2a2520]">{player.prowess.toLocaleString()}</span>
                        </div>
                        <div></div>
                    </div>
                </div>

                {/* Match Stats */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Ranked Matches */}
                    <div>
                        <h4 className="text-[#c45c4c] text-[22px] font-bold italic mb-3">Ranked Matches</h4>
                        <div className="space-y-1 text-[18px]">
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">WINS</span>
                                <span className="text-[#2a2520]">{player.rankedMatches.wins}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">LOSES</span>
                                <span className="text-[#2a2520]">{player.rankedMatches.loses}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">W/L RATE</span>
                                <span className="text-[#2a2520]">{player.rankedMatches.wlRate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Player Matches */}
                    <div>
                        <h4 className="text-[#c45c4c] text-[22px] font-bold italic mb-3">Player Matches</h4>
                        <div className="space-y-1 text-[18px]">
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">WINS</span>
                                <span className="text-[#2a2520]">{player.playerMatches.wins}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">LOSES</span>
                                <span className="text-[#2a2520]">{player.playerMatches.loses}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold text-[#5a5248]">W/L RATE</span>
                                <span className="text-[#2a2520]">{player.playerMatches.wlRate}</span>
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

