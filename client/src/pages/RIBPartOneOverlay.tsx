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
    const p1CharImg = `/source/overlay/run_it_back/characters/${mainEvent.p1Character}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/${mainEvent.p2Character}.png`;

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
                className="absolute bottom-0 left-0 text-[350px] font-black text-[#d4c4b0]/25 leading-none tracking-tighter select-none"
                style={{ 
                    animation: `slideUp 0.8s ease-out`,
                    fontFamily: 'Archivo Black, sans-serif',
                    transform: 'translateX(-50px)'
                }}
            >
                R
            </div>

            {/* Title Section - Left */}
            <div 
                key={`title-${animKey}`}
                className="absolute top-[180px] left-[80px]"
                style={{ animation: `slideInLeft 0.6s ease-out` }}
            >
                <p className="text-[#8a8070] text-[18px] tracking-[0.3em] font-medium mb-2">
                    {matchCards.eventSubtitle}
                </p>
                <div className="flex items-center gap-3 text-[#c45c4c]">
                    <div className="w-10 h-10 bg-[#c45c4c] rounded flex items-center justify-center">
                        <span className="text-white text-[12px] font-bold">◀◀</span>
                    </div>
                    <span className="text-[48px] font-black tracking-tight">RUNITBACK</span>
                </div>
                <p className="text-[#8a8070] text-[48px] font-light">PART {matchCards.partNumber}</p>
            </div>

            {/* Match Cards Section - Right */}
            <div 
                key={`matches-${animKey}`}
                className="absolute top-[140px] right-[100px] w-[950px]"
                style={{ animation: `slideInRight 0.7s ease-out` }}
            >
                {/* Main Event Card */}
                <div 
                    className="bg-gradient-to-r from-[#c45c4c] to-[#d97060] rounded-lg overflow-hidden mb-4 flex items-center h-[120px]"
                    style={{ animation: `fadeInDown 0.5s ease-out 0.2s both` }}
                >
                    {/* P1 Character */}
                    <div className="w-[180px] h-full relative overflow-hidden">
                        <img 
                            src={p1CharImg}
                            alt={mainEvent.p1Character}
                            className="absolute bottom-0 left-0 h-[140px] w-auto object-contain"
                            style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    
                    {/* P1 Info */}
                    <div className="flex-1 text-white px-4">
                        <h3 className="text-[28px] font-bold">{mainEvent.p1Name}</h3>
                        <p className="text-[14px] opacity-90 tracking-wider">{mainEvent.p1Title}</p>
                    </div>

                    {/* P2 Info */}
                    <div className="flex-1 text-white px-4 text-right">
                        <h3 className="text-[28px] font-bold">{mainEvent.p2Name}</h3>
                        <p className="text-[14px] opacity-90 tracking-wider">{mainEvent.p2Title}</p>
                    </div>

                    {/* P2 Character */}
                    <div className="w-[180px] h-full relative overflow-hidden">
                        <img 
                            src={p2CharImg}
                            alt={mainEvent.p2Character}
                            className="absolute bottom-0 right-0 h-[140px] w-auto object-contain"
                            style={{ clipPath: 'polygon(0 100%, 15% 0, 100% 0, 100% 100%)' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* Regular Match Cards */}
                {matchCards.matches.map((match, index) => {
                    const mp1Img = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
                    const mp2Img = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;
                    
                    return (
                        <div 
                            key={match.id}
                            className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden mb-3 flex items-center h-[100px] shadow-md"
                            style={{ animation: `fadeInRight 0.5s ease-out ${0.3 + index * 0.1}s both` }}
                        >
                            {/* P1 Character */}
                            <div className="w-[140px] h-full relative overflow-hidden bg-gradient-to-r from-[#f0ebe5] to-transparent">
                                <img 
                                    src={mp1Img}
                                    alt={match.p1Character}
                                    className="absolute bottom-0 left-0 h-[120px] w-auto object-contain"
                                    style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                            
                            {/* P1 Info */}
                            <div className="flex-1 px-4">
                                <h3 className="text-[24px] font-bold text-[#3a3530]">{match.p1Name}</h3>
                                <p className="text-[12px] text-[#c45c4c] tracking-wider font-medium">{match.p1Title}</p>
                            </div>

                            {/* P2 Info */}
                            <div className="flex-1 px-4 text-right">
                                <h3 className="text-[24px] font-bold text-[#3a3530]">{match.p2Name}</h3>
                                <p className="text-[12px] text-[#c45c4c] tracking-wider font-medium">{match.p2Title}</p>
                            </div>

                            {/* P2 Character */}
                            <div className="w-[140px] h-full relative overflow-hidden bg-gradient-to-l from-[#f0ebe5] to-transparent">
                                <img 
                                    src={mp2Img}
                                    alt={match.p2Character}
                                    className="absolute bottom-0 right-0 h-[120px] w-auto object-contain"
                                    style={{ clipPath: 'polygon(0 100%, 15% 0, 100% 0, 100% 100%)' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sponsors - Bottom */}
            <div 
                key={`sponsors-${animKey}`}
                className="absolute bottom-[40px] left-[80px] right-[80px] flex justify-between text-[11px] text-[#8a8070] tracking-[0.15em]"
                style={{ animation: `fadeIn 0.6s ease-out 0.5s both` }}
            >
                <div>
                    <p>PROUDLY PRESENTED</p>
                    <p>BY {matchCards.sponsors.presenter}</p>
                </div>
                <div className="text-right">
                    <p>IN ASSOCIATION WITH</p>
                    <p>{matchCards.sponsors.association}</p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100px) translateX(-50px); opacity: 0; }
                    to { transform: translateY(0) translateX(-50px); opacity: 1; }
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
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInRight {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

