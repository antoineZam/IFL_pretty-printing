import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// ============================================
// INTERFACES
// ============================================

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore?: number;
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

// ============================================
// SINGLE MATCH OVERLAY CONTENT
// ============================================

function SingleMatchContent({ matchCards, animKey }: { matchCards: MatchCardData; animKey: number }) {
    const match = matchCards.singleMatch;
    const p1CharImg = `/source/overlay/run_it_back/characters/${match.p1Character}.png`;
    const p2CharImg = `/source/overlay/run_it_back/characters/${match.p2Character}.png`;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Background */}
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

            {/* Match Title */}
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

            {/* Player 1 Name - Background */}
            <div 
                key={`p1name-bg-${animKey}`}
                className="absolute left-[-1400px] bottom-[-10px] overflow-hidden pointer-events-none"
                style={{ animation: `fadeIn 0.5s ease-out 0.1s both`, zIndex: 0 }}
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

            {/* Player 2 Name - Background */}
            <div
                key={`p2name-bg-${animKey}`}
                className="absolute right-[-1050px] bottom-[-10px] overflow-hidden pointer-events-none"
                style={{ animation: `fadeIn 0.5s ease-out 0.1s both`, zIndex: 0 }}
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

            {/* Player 1 Character */}
            <div 
                key={`p1-${animKey}`}
                className="absolute left-[-200px] bottom-[-675px]"
                style={{ animation: `slideInLeft 0.6s ease-out 0.2s both`, zIndex: 2 }}
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

            {/* Player 2 Character */}
            <div 
                key={`p2-${animKey}`}
                className="absolute right-[-200px] bottom-[-675px]"
                style={{ animation: `slideInRight 0.6s ease-out 0.2s both`, zIndex: 2 }}
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

            {/* Player 1 Info */}
            <div 
                key={`p1info-${animKey}`}
                className="absolute top-[310px] left-[500px] text-right"
                style={{ animation: `fadeIn 0.6s ease-out 0.3s both`, zIndex: 3 }}
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

            {/* Player 2 Info */}
            <div 
                key={`p2info-${animKey}`}
                className="absolute top-[310px] right-[550px] text-left"
                style={{ animation: `fadeIn 0.6s ease-out 0.3s both`, zIndex: 3 }}
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
        </div>
    );
}

// ============================================
// PART ONE / MATCH CARDS OVERLAY CONTENT
// ============================================

function PartOneContent({ matchCards, animKey }: { matchCards: MatchCardData; animKey: number }) {
    const mainEvent = matchCards.mainEvent;
    const allMatches = [
        { ...mainEvent, id: 0, isMainEvent: true },
        ...matchCards.matches.map(m => ({ ...m, isMainEvent: false }))
    ];
    const totalCards = allMatches.length;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            <img 
                key={`bg-${animKey}`}
                src="/source/overlay/run_it_back/match_card/background.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: `fadeIn 0.4s ease-out` }}
            />

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
                    const animDelay = (totalCards - 1 - index) * 0.12;
                    const cardHeight = isMainEvent ? 140 : 110;

                    return (
                        <div 
                            key={`card-${match.id}-${animKey}`}
                            className="relative"
                            style={{ height: `${cardHeight}px`, animation: `slideUpFade 0.5s ease-out ${animDelay}s both` }}
                        >
                            <img src={cardBg} alt="Card Background" className="absolute inset-0 w-full h-full object-contain object-center" />
                            <div className="absolute inset-0 flex items-center">
                                <div className="h-full relative overflow-hidden" style={{ width: isMainEvent ? '200px' : '160px' }}>
                                    <img 
                                        src={p1CharImg}
                                        alt={match.p1Character}
                                        className="absolute bottom-0 left-[20px] object-contain"
                                        style={{ height: isMainEvent ? '160px' : '130px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                                <div className="flex-1 px-4" style={{ marginLeft: isMainEvent ? '40px' : '20px' }}>
                                    <h3 
                                        className={`font-bold tracking-tight ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                        style={{ fontSize: isMainEvent ? '32px' : '26px', fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
                                    >
                                        {match.p1Name}
                                    </h3>
                                    <p className={`tracking-wider font-medium ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`} style={{ fontSize: isMainEvent ? '14px' : '12px' }}>
                                        {match.p1Title}
                                    </p>
                                </div>
                                <div className="w-[80px] flex items-center justify-center">
                                    <span className={`font-black ${isMainEvent ? 'text-white/60' : 'text-[#8a8070]/60'}`} style={{ fontSize: '20px' }}>VS</span>
                                </div>
                                <div className="flex-1 px-4 text-right" style={{ marginRight: isMainEvent ? '40px' : '20px' }}>
                                    <h3 
                                        className={`font-bold tracking-tight ${isMainEvent ? 'text-white' : 'text-[#3a3530]'}`}
                                        style={{ fontSize: isMainEvent ? '32px' : '26px', fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
                                    >
                                        {match.p2Name}
                                    </h3>
                                    <p className={`tracking-wider font-medium ${isMainEvent ? 'text-white/90' : 'text-[#c45c4c]'}`} style={{ fontSize: isMainEvent ? '14px' : '12px' }}>
                                        {match.p2Title}
                                    </p>
                                </div>
                                <div className="h-full relative overflow-hidden" style={{ width: isMainEvent ? '200px' : '160px' }}>
                                    <img 
                                        src={p2CharImg}
                                        alt={match.p2Character}
                                        className="absolute bottom-0 right-[20px] object-contain"
                                        style={{ height: isMainEvent ? '160px' : '130px', filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.3))', transform: 'scaleX(-1)' }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                            </div>
                            {isMainEvent && (
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#8b3a3a] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1 rounded-b"
                                    style={{ animation: `fadeIn 0.3s ease-out ${animDelay + 0.3}s both` }}>
                                    MAIN EVENT
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================
// PLAYER STATS OVERLAY CONTENT
// ============================================

function PlayerStatsContent({ playerStats, selectedPlayerIndex, animKey }: { playerStats: PlayerStatsData; selectedPlayerIndex: number; animKey: number }) {
    const player = playerStats.players[selectedPlayerIndex];
    if (!player) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const charImg = `/source/overlay/run_it_back/characters/${player.character}.png`;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5]" style={{ animation: `fadeIn 0.5s ease-out` }} />
            
            <div key={`watermark-${animKey}`} className="absolute bottom-0 left-0 right-0 text-[200px] font-black text-[#d4c4b0]/40 leading-none tracking-tighter select-none"
                style={{ animation: `slideUp 0.8s ease-out`, fontFamily: 'Archivo Black, sans-serif' }}>
                {player.name.toUpperCase()}
            </div>

            <div key={`char-${animKey}`} className="absolute right-0 bottom-0 h-[900px] w-[600px]" style={{ animation: `slideInRight 0.6s ease-out` }}>
                <img src={charImg} alt={player.character} className="h-full w-full object-contain object-bottom" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>

            <div key={`stats-${animKey}`} className="absolute top-[100px] left-[100px] w-[700px]" style={{ animation: `slideInLeft 0.6s ease-out` }}>
                <h1 className="text-[#c45c4c] text-[64px] font-black tracking-tight">{player.name}</h1>
                <p className="text-[#8a8070] text-[18px] tracking-[0.2em]">{player.division}</p>
                
                <div className="mt-8 space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-[#8a8070] text-[12px] tracking-wider">IFF8 RANKING</p>
                        <p className="text-[#3a3530] text-[28px] font-bold">{player.iff8Ranking}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-[#8a8070] text-[12px] tracking-wider">IFF8 RECORD</p>
                        <p className="text-[#3a3530] text-[28px] font-bold">{player.iff8Record}</p>
                        <p className="text-[#8a8070] text-[14px]">{player.iff8RecordDetails}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-[#8a8070] text-[12px] tracking-wider">RANKED MATCHES</p>
                        <p className="text-[#3a3530] text-[28px] font-bold">{player.rankedMatches.wins}W - {player.rankedMatches.loses}L</p>
                        <p className="text-[#c45c4c] text-[14px]">{player.rankedMatches.wlRate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// STREAM OVERLAY CONTENT
// ============================================

function StreamOverlayContent({ streamData, animKey }: { streamData: StreamData; animKey: number }) {
    const noFlagUrl = '/source/overlay/ifl/no-flag.png';
    const p1FlagUrl = streamData.p1Flag ? `https://flagcdn.com/h240/${streamData.p1Flag.toLowerCase()}.png` : noFlagUrl;
    const p2FlagUrl = streamData.p2Flag ? `https://flagcdn.com/h240/${streamData.p2Flag.toLowerCase()}.png` : noFlagUrl;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            <img 
                key={`overlay-${animKey}`}
                src="/source/overlay/run_it_back/match_overlay/runitback_overlay.png"
                alt="Overlay"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ animation: `fadeIn 0.3s ease-out` }}
            />

            {/* P1 Flag */}
            <div 
                key={`p1flag-${animKey}`}
                className="absolute top-[21px] left-[202px] w-[46px] h-[46px] rounded-full overflow-hidden z-10"
                style={{ backgroundImage: `url(${p1FlagUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: `fadeIn 0.4s ease-out 0.1s both` }}
            />

            {/* P1 Name */}
            <div key={`p1name-${animKey}`} className="absolute top-[28px] left-[400px] w-[280px] h-[30px] flex items-center"
                style={{ animation: `slideInLeft 0.4s ease-out 0.1s both`, fontFamily: 'Gotham Book, Gotham, sans-serif' }}>
                <span className="text-[#3a3a3a] text-[24px] font-bold tracking-tight">{streamData.p1Name}</span>
            </div>

            {/* P1 Score */}
            <div key={`p1score-${animKey}`} className="absolute top-[20px] left-[620px] w-[50px] h-[45px] flex items-center justify-center"
                style={{ animation: `fadeIn 0.4s ease-out 0.2s both`, fontFamily: 'Gotham Bold, Gotham, sans-serif' }}>
                <span className="text-[#c45c4c] text-[40px] font-bold">{streamData.p1Score}</span>
            </div>

            {/* P2 Flag */}
            <div 
                key={`p2flag-${animKey}`}
                className="absolute top-[21px] right-[204px] w-[46px] h-[46px] rounded-full overflow-hidden z-10"
                style={{ backgroundImage: `url(${p2FlagUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: `fadeIn 0.4s ease-out 0.1s both` }}
            />

            {/* P2 Name */}
            <div key={`p2name-${animKey}`} className="absolute top-[28px] right-[400px] w-[280px] h-[30px] flex items-center justify-end"
                style={{ animation: `slideInRight 0.4s ease-out 0.1s both`, fontFamily: 'Gotham Book, Gotham, sans-serif' }}>
                <span className="text-[#3a3a3a] text-[24px] font-bold tracking-tight">{streamData.p2Name}</span>
            </div>

            {/* P2 Score */}
            <div key={`p2score-${animKey}`} className="absolute top-[20px] right-[625px] w-[50px] h-[45px] flex items-center justify-center"
                style={{ animation: `fadeIn 0.4s ease-out 0.2s both`, fontFamily: 'Gotham Bold, Gotham, sans-serif' }}>
                <span className="text-[#c45c4c] text-[40px] font-bold">{streamData.p2Score}</span>
            </div>
        </div>
    );
}

// ============================================
// MAIN UNIFIED OVERLAY COMPONENT
// ============================================

export default function RIBUnifiedOverlay() {
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null);
    const [streamData, setStreamData] = useState<StreamData>({
        matchTitle: '', p1Name: '', p1Flag: '', p1Score: 0, p2Name: '', p2Flag: '', p2Score: 0
    });
    const [overlayState, setOverlayState] = useState<OverlayState>({
        showMatchCard: false,
        showPlayerStats: false,
        showPartOne: false,
        showStreamOverlay: false,
        selectedMatchIndex: 0,
        selectedPlayerIndex: 0,
        animationTrigger: 0
    });
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        
        const connectionKey = localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => setMatchCards(data));
        newSocket.on('rib-player-stats-update', (data: PlayerStatsData) => setPlayerStats(data));
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

    // Render based on active overlay
    if (overlayState.showMatchCard && matchCards) {
        return (
            <>
                <SingleMatchContent matchCards={matchCards} animKey={animKey} />
                <style>{animations}</style>
            </>
        );
    }
    
    if (overlayState.showPartOne && matchCards) {
        return (
            <>
                <PartOneContent matchCards={matchCards} animKey={animKey} />
                <style>{animations}</style>
            </>
        );
    }
    
    if (overlayState.showPlayerStats && playerStats) {
        return (
            <>
                <PlayerStatsContent playerStats={playerStats} selectedPlayerIndex={overlayState.selectedPlayerIndex} animKey={animKey} />
                <style>{animations}</style>
            </>
        );
    }
    
    if (overlayState.showStreamOverlay) {
        return (
            <>
                <StreamOverlayContent streamData={streamData} animKey={animKey} />
                <style>{animations}</style>
            </>
        );
    }

    // No overlay active
    return <div className="w-[1920px] h-[1080px]" />;
}

// Shared animations
const animations = `
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
    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideUpFade {
        from { transform: translateY(80px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
