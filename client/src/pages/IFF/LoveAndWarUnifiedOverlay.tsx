import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface TeamData {
    id: number;
    team_name: string;
    player_1_id: number;
    player_2_id: number;
    player_1_name: string;
    player_1_character: string;
    player_1_division: string;
    player_1_rank: string;
    player_1_tekken_power: number;
    player_1_prowess: number;
    player_1_iff8_ranking: string;
    player_1_iff8_record: string;
    player_1_iff8_record_details: string;
    player_1_iff_history: string;
    player_1_ranked_wins: number;
    player_1_ranked_losses: number;
    player_1_ranked_wl_rate: string;
    player_1_player_wins: number;
    player_1_player_losses: number;
    player_1_player_wl_rate: string;
    player_2_name: string;
    player_2_character: string;
    player_2_division: string;
    player_2_rank: string;
    player_2_tekken_power: number;
    player_2_prowess: number;
    player_2_iff8_ranking: string;
    player_2_iff8_record: string;
    player_2_iff8_record_details: string;
    player_2_iff_history: string;
    player_2_ranked_wins: number;
    player_2_ranked_losses: number;
    player_2_ranked_wl_rate: string;
    player_2_player_wins: number;
    player_2_player_losses: number;
    player_2_player_wl_rate: string;
}

interface DisplayState {
    teamId: number | null;
    visible: boolean;
}

export default function LoveAndWarUnifiedOverlay() {
    const [searchParams] = useSearchParams();
    const [team, setTeam] = useState<TeamData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        const socket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        // Listen for display state changes
        socket.on('love-and-war-display-update', async (state: DisplayState) => {
            console.log('[LnW Overlay] Display update:', state);
            
            if (state.teamId && state.visible) {
                // Fetch team data
                try {
                    const response = await fetch(`/api/iff/love-and-war/team/${state.teamId}`);
                    const data = await response.json();
                    if (data.team) {
                        // Only trigger animation if it's a different team
                        if (state.teamId !== currentTeamId) {
                            setAnimKey(k => k + 1);
                            setCurrentTeamId(state.teamId);
                        }
                        setTeam(data.team);
                        setIsVisible(true);
                    }
                } catch (error) {
                    console.error('[LnW Overlay] Error fetching team:', error);
                }
            } else {
                setIsVisible(false);
            }
        });

        // Listen for team data updates - update data without re-animating
        socket.on('love-and-war-team-update', (updatedTeam: TeamData) => {
            if (team && updatedTeam.id === team.id) {
                setTeam(updatedTeam);
                // Don't increment animKey - no re-animation on data updates
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams, team, currentTeamId]);

    // Return default image when not visible or no team selected
    if (!isVisible || !team) {
        return (
            <div className="w-[1920px] h-[1080px] relative" style={{ backgroundColor: 'transparent' }}>
                <img 
                    src="/source/overlay/love_and_war/default.png" 
                    alt="Love & War"
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    // Split team name into two parts for the split display
    const teamNameParts = team.team_name.split(' ');
    const firstHalf = teamNameParts.slice(0, Math.ceil(teamNameParts.length / 2)).join(' ');
    const secondHalf = teamNameParts.slice(Math.ceil(teamNameParts.length / 2)).join(' ') || '';

    return (
        <div 
            key={animKey}
            className="w-[1920px] h-[1080px] relative overflow-hidden"
            style={{ 
                backgroundColor: '#c12a1f',
                background: 'linear-gradient(135deg, #a01810 0%, #c12a1f 30%, #b8231a 60%, #8a1510 100%)',
                fontFamily: "'ED Manteca', 'Gotham', 'Archivo', sans-serif",
                animation: 'overlayFadeIn 0.5s ease-out'
            }}
        >
            {/* Noise texture overlay */}
            <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                }}
            />

            {/* Character Renders - P1 Left */}
            {team.player_1_character && (
                <img
                    src={`/source/overlay/characters/vs_screen/${team.player_1_character.toLowerCase()}_p1.png`}
                    alt={team.player_1_character}
                    className="absolute"
                    style={{
                        left: '-100px',
                        top: '0',
                        height: '1080px',
                        width: 'auto',
                        animation: 'slideInLeft 0.8s ease-out both',
                        filter: 'drop-shadow(10px 0 30px rgba(0, 0, 0, 0.5))',
                        zIndex: 5
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            )}

            {/* Character Renders - P2 Right */}
            {team.player_2_character && (
                <img
                    src={`/source/overlay/characters/vs_screen/${team.player_2_character.toLowerCase()}_p2.png`}
                    alt={team.player_2_character}
                    className="absolute"
                    style={{
                        right: '-100px',
                        top: '0',
                        height: '1080px',
                        width: 'auto',
                        animation: 'slideInRight 0.8s ease-out both',
                        filter: 'drop-shadow(-10px 0 30px rgba(0, 0, 0, 0.5))',
                        zIndex: 5
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            )}

            {/* Header Bar */}
            <div 
                className="absolute top-0 left-0 right-0 h-[60px] flex items-center justify-center gap-20 z-20"
                style={{ animation: 'fadeIn 0.6s ease-out both' }}
            >
                <div className="text-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white">In Association With</span>
                    <div className="text-[16px] text-white/90" style={{ fontFamily: "'ED Manteca', serif", fontWeight: 900 }}>IRON FROOT FEDERATION</div>
                </div>
                <div className="text-center">
                    <span className="text-[12px] uppercase tracking-[0.2em] text-white">Proudly Presented By</span>
                    <div className="text-[16px] text-white/90" style={{ fontFamily: "'ED Manteca', serif", fontWeight: 900 }}>THE HAUS OF LOAF</div>
                </div>
                <div className="text-center">
                    <span className="text-[14px] text-white">TEKKEN 8 ™</span>
                    <div className="text-[10px] text-white">© BANDAI NAMCO</div>
                </div>
                <div className="text-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white">All Rights Reserved</span>
                    <div className="text-[16px] text-white/90">2026</div>
                </div>
            </div>

            {/* Decorative Swirls - Center */}
            <div 
                className="absolute top-[100px] left-1/2 -translate-x-1/2 z-10"
                style={{ animation: 'scaleIn 0.8s ease-out 0.2s both', opacity: 0 }}
            >
                <svg width="400" height="200" viewBox="0 0 400 200" fill="none" className="opacity-90">
                    <path d="M200 180 C200 100 100 50 50 80 C0 110 50 180 100 160 C150 140 180 100 200 50" 
                          stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M200 180 C200 100 300 50 350 80 C400 110 350 180 300 160 C250 140 220 100 200 50" 
                          stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <circle cx="200" cy="100" r="30" stroke="white" strokeWidth="2" fill="none"/>
                    <circle cx="200" cy="100" r="15" fill="white" opacity="0.3"/>
                </svg>
            </div>

            {/* Team Name - Split in Center */}
            <div 
                className="absolute top-[320px] left-0 right-0 z-20 text-center"
                style={{ animation: 'fadeIn 0.8s ease-out 0.3s both', opacity: 0 }}
            >
                <div className="flex items-center justify-center gap-16">
                    <h1 
                        className="text-[120px] leading-none text-white"
                        style={{ 
                            fontFamily: "'ED Manteca', serif",
                            fontWeight: 900,
                            textShadow: '4px 4px 20px rgba(0,0,0,0.5)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        {firstHalf.toUpperCase()}
                    </h1>
                    {secondHalf && (
                        <h1 
                            className="text-[120px] leading-none text-white"
                            style={{ 
                                fontFamily: "'ED Manteca', serif",
                                fontWeight: 900,
                                textShadow: '4px 4px 20px rgba(0,0,0,0.5)',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {secondHalf.toUpperCase()}
                        </h1>
                    )}
                </div>
            </div>

            {/* Player Names Row */}
            <div 
                className="absolute top-[460px] left-0 right-0 z-20"
                style={{ animation: 'fadeIn 0.8s ease-out 0.4s both', opacity: 0 }}
            >
                <div className="flex items-center justify-center gap-32">
                    <h2 
                        className="text-[56px] text-white/90"
                        style={{ 
                            fontFamily: "'ED Manteca', serif",
                            fontWeight: 900,
                            textShadow: '2px 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        {team.player_1_name?.toUpperCase() || 'PLAYER 1'}
                    </h2>
                    <h2 
                        className="text-[56px] text-white/90"
                        style={{ 
                            fontFamily: "'ED Manteca', serif",
                            fontWeight: 900,
                            textShadow: '2px 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        {team.player_2_name?.toUpperCase() || 'PLAYER 2'}
                    </h2>
                </div>
            </div>

            {/* Decorative Center Element */}
            <div 
                className="absolute bottom-[200px] left-1/2 -translate-x-1/2 z-10"
                style={{ animation: 'scaleIn 0.8s ease-out 0.5s both', opacity: 0 }}
            >
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                    <path d="M100 10 C60 30 30 60 50 90 C70 120 100 100 100 70 C100 100 130 120 150 90 C170 60 140 30 100 10" 
                          stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Player 1 Stats - Left Side */}
            <div 
                className="absolute bottom-[100px] left-[80px] z-20"
                style={{ animation: 'slideUp 0.7s ease-out 0.5s both', opacity: 0, fontFamily: "'Gotham', 'Archivo', sans-serif" }}
            >
                <div className="mb-6 text-[20px] space-y-[-2px]">
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">Division</span>
                        <span className="text-white font-medium">{team.player_1_division || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">IFF8 Ranking</span>
                        <span className="text-white font-medium">{team.player_1_iff8_ranking || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">IFF8 Record</span>
                        <span className="text-white font-medium">{team.player_1_iff8_record || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">IFF History</span>
                        <span className="text-white font-medium">{team.player_1_iff_history || 'N/A'}</span>
                    </div>
                </div>

                <div className="mb-6 text-[20px] space-y-[-2px]">
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">Tekken Rank</span>
                        <span className="text-white font-medium">{team.player_1_rank || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider">Tekken Prowess</span>
                        <span className="text-white font-medium">{team.player_1_prowess?.toLocaleString() || '0'}</span>
                    </div>
                </div>

                <div className="text-[18px] space-y-[-2px]">
                    <h4 className="text-white/80 text-[20px] font-bold uppercase tracking-wider mb-2">Ranked Matches</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-white/60 w-[100px] font-bold uppercase">Wins</span>
                        <span className="text-white/30">--------</span>
                        <span className="text-white font-medium">{team.player_1_ranked_wins || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white/60 w-[100px] font-bold uppercase">Loses</span>
                        <span className="text-white/30">-------</span>
                        <span className="text-white font-medium">{team.player_1_ranked_losses || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white/60 w-[100px] font-bold uppercase">W/L Rate</span>
                        <span className="text-white/30">---</span>
                        <span className="text-white font-medium">{team.player_1_ranked_wl_rate || '0%'}</span>
                    </div>
                </div>
            </div>

            {/* Player 2 Stats - Right Side (Mirrored) */}
            <div 
                className="absolute bottom-[100px] right-[80px] z-20 text-right"
                style={{ animation: 'slideUp 0.7s ease-out 0.5s both', opacity: 0, fontFamily: "'Gotham', 'Archivo', sans-serif" }}
            >
                <div className="mb-6 text-[20px] space-y-[-2px]">
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_division || 'N/A'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">Division</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_iff8_ranking || 'N/A'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">IFF8 Ranking</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_iff8_record || 'N/A'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">IFF8 Record</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_iff_history || 'N/A'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">IFF History</span>
                    </div>
                </div>

                <div className="mb-6 text-[20px] space-y-[-2px]">
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_rank || 'N/A'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">Tekken Rank</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-white font-medium">{team.player_2_prowess?.toLocaleString() || '0'}</span>
                        <span className="text-white/60 w-[200px] font-bold uppercase tracking-wider text-right">Tekken Prowess</span>
                    </div>
                </div>

                <div className="text-[18px] space-y-[-2px]">
                    <h4 className="text-white/80 text-[20px] font-bold uppercase tracking-wider mb-2">Ranked Matches</h4>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-white font-medium">{team.player_2_ranked_wins || 0}</span>
                        <span className="text-white/30">--------</span>
                        <span className="text-white/60 w-[100px] font-bold uppercase text-right">Wins</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-white font-medium">{team.player_2_ranked_losses || 0}</span>
                        <span className="text-white/30">-------</span>
                        <span className="text-white/60 w-[100px] font-bold uppercase text-right">Loses</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-white font-medium">{team.player_2_ranked_wl_rate || '0%'}</span>
                        <span className="text-white/30">---</span>
                        <span className="text-white/60 w-[100px] font-bold uppercase text-right">W/L Rate</span>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @font-face {
                    font-family: 'ED Manteca';
                    src: url('/source/fonts/EDMantecaBlack/EDManteca-Regular.woff2') format('woff2'),
                         url('/source/fonts/EDMantecaBlack/EDManteca-Regular.woff') format('woff'),
                         url('/source/fonts/EDMantecaBlack/EDManteca-Regular.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'ED Manteca';
                    src: url('/source/fonts/EDMantecaBlack/EDMantecaBlack-Regular.woff2') format('woff2'),
                         url('/source/fonts/EDMantecaBlack/EDMantecaBlack-Regular.woff') format('woff'),
                         url('/source/fonts/EDMantecaBlack/EDMantecaBlack-Regular.ttf') format('truetype');
                    font-weight: 900;
                    font-style: normal;
                    font-display: swap;
                }
                @keyframes overlayFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: translateX(-50%) scale(0.8); opacity: 0; }
                    to { transform: translateX(-50%) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
