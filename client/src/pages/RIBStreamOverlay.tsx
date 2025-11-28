import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface StreamData {
    matchTitle: string;
    p1Name: string;
    p1Flag: string;
    p1Score: number;
    p2Name: string;
    p2Flag: string;
    p2Score: number;
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

export default function RIBStreamOverlay() {
    const [streamData, setStreamData] = useState<StreamData>({
        matchTitle: '',
        p1Name: '', p1Flag: '', p1Score: 0,
        p2Name: '', p2Flag: '', p2Score: 0
    });
    const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        const connectionKey = localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-stream-data-update', (data: StreamData) => setStreamData(data));
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

    if (!overlayState || !overlayState.showStreamOverlay) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const p1FlagUrl = streamData.p1Flag 
        ? `/source/overlay/flags/${streamData.p1Flag.toLowerCase()}.png`
        : '/source/overlay/ifl/no-flag.png';
    const p2FlagUrl = streamData.p2Flag 
        ? `/source/overlay/flags/${streamData.p2Flag.toLowerCase()}.png`
        : '/source/overlay/ifl/no-flag.png';

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Top Scoreboard */}
            <div 
                key={`scoreboard-${animKey}`}
                className="absolute top-0 left-1/2 -translate-x-1/2 flex"
                style={{ animation: `slideDown 0.5s ease-out` }}
            >
                {/* Player 1 Section */}
                <div className="flex items-center">
                    {/* Flag */}
                    <div 
                        className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white shadow-lg"
                        style={{ 
                            backgroundImage: `url(${p1FlagUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    
                    {/* Name Bar */}
                    <div 
                        className="bg-white/95 backdrop-blur-sm h-[50px] flex items-center px-6 -ml-2"
                        style={{ 
                            clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                            minWidth: '200px'
                        }}
                    >
                        <span className="text-[#2a2520] text-[24px] font-bold tracking-tight">
                            {streamData.p1Name}
                        </span>
                    </div>
                    
                    {/* Score */}
                    <div 
                        className="bg-[#c45c4c] h-[50px] w-[60px] flex items-center justify-center -ml-3"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                    >
                        <span className="text-white text-[28px] font-bold">{streamData.p1Score}</span>
                    </div>
                </div>

                {/* Match Title in Center */}
                <div className="w-[200px] flex items-center justify-center">
                    {streamData.matchTitle && (
                        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded">
                            <span className="text-[#2a2520] text-[14px] font-bold tracking-wider uppercase">
                                {streamData.matchTitle}
                            </span>
                        </div>
                    )}
                </div>

                {/* Player 2 Section */}
                <div className="flex items-center flex-row-reverse">
                    {/* Flag */}
                    <div 
                        className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white shadow-lg"
                        style={{ 
                            backgroundImage: `url(${p2FlagUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    
                    {/* Name Bar */}
                    <div 
                        className="bg-white/95 backdrop-blur-sm h-[50px] flex items-center justify-end px-6 -mr-2"
                        style={{ 
                            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)',
                            minWidth: '200px'
                        }}
                    >
                        <span className="text-[#2a2520] text-[24px] font-bold tracking-tight">
                            {streamData.p2Name}
                        </span>
                    </div>
                    
                    {/* Score */}
                    <div 
                        className="bg-[#c45c4c] h-[50px] w-[60px] flex items-center justify-center -mr-3"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)' }}
                    >
                        <span className="text-white text-[28px] font-bold">{streamData.p2Score}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Logo */}
            <div 
                key={`logo-${animKey}`}
                className="absolute bottom-[30px] left-1/2 -translate-x-1/2"
                style={{ animation: `fadeInUp 0.6s ease-out 0.2s both` }}
            >
                <div className="flex items-center gap-2 text-[#c45c4c]">
                    <div className="w-8 h-8 bg-[#c45c4c] rounded flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">◀◀</span>
                    </div>
                    <span className="text-[28px] font-black tracking-tight">RUNITBACK</span>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes slideDown {
                    from { transform: translate(-50%, -100%); }
                    to { transform: translate(-50%, 0); }
                }
                @keyframes fadeInUp {
                    from { transform: translate(-50%, 20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

