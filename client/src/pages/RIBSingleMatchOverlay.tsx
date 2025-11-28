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

export default function RIBSingleMatchOverlay() {
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

    if (!matchCards || !overlayState || !overlayState.showMatchCard) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const match = matchCards.singleMatch;
    const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5]"
                style={{ animation: `fadeIn 0.5s ease-out` }}
            />

            {/* Large watermark text */}
            <div 
                key={`watermark-${animKey}`}
                className="absolute bottom-0 left-0 right-0 text-[280px] font-black text-[#d4c4b0]/30 leading-none tracking-tighter select-none"
                style={{ 
                    animation: `slideUp 0.8s ease-out`,
                    fontFamily: 'Archivo Black, sans-serif'
                }}
            >
                {match.p1Name.split(' ').pop()?.toUpperCase()}
                <span className="ml-8">{match.p2Name.split(' ').pop()?.charAt(0).toUpperCase()}</span>
            </div>

            {/* Player 1 Character */}
            <div 
                key={`p1-${animKey}`}
                className="absolute left-0 bottom-0 h-[900px] w-[600px]"
                style={{ 
                    animation: `slideInLeft 0.6s ease-out`,
                }}
            >
                <img 
                    src={p1CharImg} 
                    alt={match.p1Character}
                    className="h-full w-full object-contain object-bottom"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Player 2 Character */}
            <div 
                key={`p2-${animKey}`}
                className="absolute right-0 bottom-0 h-[900px] w-[600px]"
                style={{ 
                    animation: `slideInRight 0.6s ease-out`,
                }}
            >
                <img 
                    src={p2CharImg} 
                    alt={match.p2Character}
                    className="h-full w-full object-contain object-bottom"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>

            {/* Center Card */}
            <div 
                key={`card-${animKey}`}
                className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-2xl"
                style={{ 
                    width: '700px',
                    animation: `fadeInDown 0.7s ease-out`,
                }}
            >
                {/* Title Section */}
                <div className="text-center py-6">
                    <h2 className="text-[#8a8070] text-[18px] tracking-[0.3em] font-medium">
                        {match.matchTitle}
                    </h2>
                    <p className="text-[#8a8070] text-[14px] tracking-[0.2em]">
                        {match.format}
                    </p>
                </div>

                {/* VS Section */}
                <div className="flex items-center justify-center gap-8 py-8">
                    {/* Player 1 */}
                    <div className="text-right">
                        <p className="text-[#c45c4c] text-[14px] tracking-[0.2em] font-medium mb-1">
                            {match.p1Title}
                        </p>
                        <h3 className="text-[#c45c4c] text-[42px] font-black tracking-tight leading-none">
                            {match.p1Name}
                        </h3>
                    </div>

                    {/* VS Badge */}
                    <div className="bg-[#c45c4c] text-white px-4 py-2 text-[16px] font-bold rounded">
                        VS
                    </div>

                    {/* Player 2 */}
                    <div className="text-left">
                        <p className="text-[#c45c4c] text-[14px] tracking-[0.2em] font-medium mb-1">
                            {match.p2Title}
                        </p>
                        <h3 className="text-[#c45c4c] text-[42px] font-black tracking-tight leading-none">
                            {match.p2Name}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div 
                key={`brand-${animKey}`}
                className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-center"
                style={{ animation: `fadeInUp 0.8s ease-out 0.3s both` }}
            >
                <div className="flex items-center gap-3 text-[#c45c4c]">
                    <div className="w-8 h-8 bg-[#c45c4c] rounded flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">◀◀</span>
                    </div>
                    <span className="text-[32px] font-black tracking-tight">RUNITBACK</span>
                    <span className="text-[32px] font-light text-[#8a8070]">PART {matchCards.partNumber}</span>
                </div>
                
                <div className="flex justify-center gap-16 mt-4 text-[10px] text-[#8a8070] tracking-[0.15em]">
                    <div>
                        <p>PROUDLY PRESENTED</p>
                        <p>BY {matchCards.sponsors.presenter}</p>
                    </div>
                    <div>
                        <p>IN ASSOCIATION WITH</p>
                        <p>{matchCards.sponsors.association}</p>
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
                @keyframes fadeInDown {
                    from { transform: translate(-50%, -30px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { transform: translate(-50%, 30px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

