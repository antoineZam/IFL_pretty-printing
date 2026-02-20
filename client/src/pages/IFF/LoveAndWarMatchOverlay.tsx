import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import LoveAndWarTextureOverlay from '../../components/LoveAndWarTextureOverlay';

// Data interfaces
interface Player {
    name: string;
    active: boolean;
    character?: string;
    iff_history?: string | null;
    division?: string | null;
    iff8_ranking?: string | null;
}

interface Team {
    name: string;
    players: Player[];
    score: number;
}

type MatchMode = 'team' | '1v1';

interface LnWMatchData {
    team1: Team;
    team2: Team;
    round: string;
    match_number?: number;
    win_score?: number; // First to X (default 4 for team, 3 for 1v1)
    match_mode?: MatchMode; // 'team' or '1v1'
}

// Props for embedded use (optional)
interface Props {
    socket?: Socket | null;  // If provided, use this socket instead of creating one
    embedded?: boolean;  // If true, use w-full h-full instead of fixed dimensions
    showAsMatchCard?: boolean;  // If true, show match card view
    initialData?: LnWMatchData | null;  // Pre-loaded data so component doesn't start empty
}

// PlayerCard component with player name image
interface PlayerCardProps {
    player: Player;
    className: string;
}

const PlayerCard = ({ player, className }: PlayerCardProps) => {
    // Normalize player name to file path (same logic as TeamStatsOverlay)
    const playerNameSlug = player.name.toLowerCase().trim().replace(/\s+/g, '_');
    const playerNameImagePath = `/source/overlay/love_and_war/player_names/${playerNameSlug}.png`;

    return (
        <div 
            className={`flex flex-row items-center justify-center ${className} ${!player.active ? 'opacity-40' : ''}`}
        >
            <img 
                src={playerNameImagePath}
                alt={player.name}
                className="object-contain"
                style={{
                    height: '40px',
                    width: 'auto',
                    maxWidth: '100%'
                }}
                onError={(e) => {
                    // Fallback to text if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'fallback-text text-[24px] font-bold text-white whitespace-nowrap uppercase';
                        fallback.style.fontFamily = "'ED Manteca Black', 'ED Manteca', sans-serif";
                        fallback.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.9)';
                        fallback.textContent = player.name;
                        parent.appendChild(fallback);
                    }
                }}
            />
        </div>
    );
};

// TeamPlayersRow: renders "player1name ---- player2name" in a single row (used in matchup card)
interface TeamPlayersRowProps {
    players: Player[];
    getPlayerNameImagePath: (name: string) => string;
}

const TeamPlayersRow = ({ players, getPlayerNameImagePath }: TeamPlayersRowProps) => {
    const player1 = players[0];
    const player2 = players[1];
    if (!player1 || !player2) return null;

    return (
        <div className="flex items-center gap-4">
            <img 
                src={getPlayerNameImagePath(player1.name)}
                className="h-auto object-contain shrink-0"
                style={{ maxHeight: '53px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex-1 border-t-2 border-white/40" />
            <img 
                src={getPlayerNameImagePath(player2.name)}
                alt={player2.name}
                className="h-auto object-contain shrink-0"
                style={{ maxHeight: '53px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
        </div>
    );
};

const LoveAndWarMatchOverlay = ({ socket: propSocket, embedded = false, showAsMatchCard = false, initialData = null }: Props) => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<LnWMatchData | null>(initialData);
    const [error, setError] = useState<string | null>(null);
    const [overlayKey, setOverlayKey] = useState(0);

    // Set transparent background (standalone mode only)
    useEffect(() => {
        if (embedded) return;
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, [embedded]);

    // Listen on provided socket (embedded mode)
    useEffect(() => {
        if (!propSocket) return;
        
        const handleData = (serverData: LnWMatchData) => {
            console.log('[LnW Match Overlay] Received data (embedded):', serverData);
            setData(serverData);
        };
        
        propSocket.on('lnw-match-data', handleData);
        return () => {
            propSocket.off('lnw-match-data', handleData);
        };
    }, [propSocket]);

    // Create own socket (standalone mode)
    useEffect(() => {
        if (embedded || propSocket) return;
        
        const key = searchParams.get('key');
        if (!key) {
            setError('No connection key');
            return;
        }

        const socket: Socket = io({ auth: { token: key } });
        
        socket.on('connect', () => {
            console.log('[LnW Match Overlay] Socket connected');
        });
        
        socket.on('connect_error', (err) => {
            console.error('[LnW Match Overlay] Connection error:', err);
            setError(`Connection Failed: ${err.message}`);
        });
        
        socket.on('lnw-match-data', (serverData: LnWMatchData) => {
            console.log('[LnW Match Overlay] Received data:', serverData);
            setData(serverData);
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams, embedded, propSocket]);

    // Update overlay key when overlay file changes to force reload
    useEffect(() => {
        if (data) {
            const t1p1Active = data.team1.players[0]?.active || false;
            const t1p2Active = data.team1.players[1]?.active || false;
            const t2p1Active = data.team2.players[0]?.active || false;
            const t2p2Active = data.team2.players[1]?.active || false;

            let newOverlay: string | null = null;
            if (t1p1Active && t2p2Active) newOverlay = 'overlay_01.png';
            else if (t1p1Active && t2p1Active) newOverlay = 'overlay_02.png';
            else if (t1p2Active && t2p1Active) newOverlay = 'overlay_03.png';
            else if (t1p2Active && t2p2Active) newOverlay = 'overlay_04.png';

            if (newOverlay) {
                setOverlayKey(prev => prev + 1);
            }
        }
    }, [data?.team1.players, data?.team2.players]);

    const containerClass = embedded ? 'w-full h-full' : 'w-[1920px] h-[1080px]';

    if (error && !embedded) {
        return (
            <div className={`${containerClass} flex items-center justify-center bg-transparent text-red-500 text-4xl`}>
                {error}
            </div>
        );
    }
    
    if (!data) {
        if (embedded) {
            return (
                <div className={`${containerClass} relative`}>
                    <img 
                        src="/source/overlay/love_and_war/overlay.png"
                        alt="Love and War Overlay"
                        className="w-full h-full object-cover"
                    />
                </div>
            );
        }
        return <div className={`${containerClass} bg-transparent`}></div>;
    }

    const { team1, team2, round } = data;

    // Determine which stream overlay to load based on active players
    const getStreamOverlay = (): string | null => {
        if (!data) return null;
        
        const t1p1Active = team1.players[0]?.active || false;
        const t1p2Active = team1.players[1]?.active || false;
        const t2p1Active = team2.players[0]?.active || false;
        const t2p2Active = team2.players[1]?.active || false;

        // 01: team1 player 1 AND team2 player 2
        if (t1p1Active && t2p2Active) {
            return 'overlay_01.png';
        }
        // 02: player 1 on both teams (team1 player 1 AND team2 player 1)
        if (t1p1Active && t2p1Active) {
            return 'overlay_02.png';
        }
        // 03: team1 player 2 AND team2 player 1
        if (t1p2Active && t2p1Active) {
            return 'overlay_03.png';
        }
        // 04: player 2 on both teams (team1 player 2 AND team2 player 2)
        if (t1p2Active && t2p2Active) {
            return 'overlay_04.png';
        }
        
        // Default: return null if no specific match
        return null;
    };

    const streamOverlayFile = getStreamOverlay();
    const matchMode = data?.match_mode || 'team';
    const winScore = data?.win_score || (matchMode === '1v1' ? 3 : 4); // Default to 3 for 1v1, 4 for team
    const team1Won = team1.score >= winScore;
    const team2Won = team2.score >= winScore;
    const matchComplete = team1Won || team2Won;

    // Helper: matchup image path (same slug as team name images)
    const getMatchupImagePath = (teamName: string): string => {
        const slug = teamName.toLowerCase().trim().replace(/\s+/g, '_');
        return `/source/overlay/love_and_war/matchups/${slug}.png`;
    };

    // Helper: team name image path
    const getTeamNameImagePath = (teamName: string): string => {
        const slug = teamName.toLowerCase().trim().replace(/\s+/g, '_');
        return `/source/overlay/love_and_war/team_names/${slug}.png`;
    };

    // Helper: player name image path
    const getPlayerNameImagePath = (playerName: string): string => {
        const slug = playerName.toLowerCase().trim().replace(/\s+/g, '_');
        return `/source/overlay/love_and_war/player_names/${slug}.png`;
    };

    // Match Card view (matchup card design)
    if (showAsMatchCard) {
        return (
            <div 
                className={`${embedded ? 'w-full h-full' : 'w-[1920px] h-[1080px]'} text-white uppercase relative overflow-hidden`}
                style={{ 
                    fontFamily: "'ED Manteca', sans-serif",
                    backgroundColor: '#911A2C'
                }}
            >

                {/* Boiler Plate */}
                <img 
                    src="/source/overlay/love_and_war/boiler_plate.png"
                    alt="Boiler Plate"
                    className="absolute w-full h-full object-cover z-[5]"
                    style={{ animation: 'fadeIn 0.6s ease-out', top: '980px', left: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />

                {/* Texture Overlay */}
                <LoveAndWarTextureOverlay />

                {/* ============ TOP 2/3: Matchup images in left & right vertical thirds ============ */}

                {/* Team 1 Image - Left vertical third */}
                <div className={`absolute top-[5%] left-[%] w-[45%] h-[70%] z-10 overflow-visible pointer-events-none ${matchComplete && team2Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}>
                    <img 
                        src={getMatchupImagePath(team1.name)}
                        className="w-full h-full  left-[90px] object-cover"
                        alt={team1.name}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>

                {/* Team 2 Image - Right vertical third */}
                <div className={`absolute top-[5%] right-0 w-[45%] h-[70%] z-10 overflow-visible pointer-events-none ${matchComplete && team1Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}>
                    <img 
                        src={getMatchupImagePath(team2.name)}
                        alt={team2.name}
                        className="w-full h-full  right-[100px] object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>

                {/* Score Display - VS. vertically centered between scores */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[43%] -translate-y-1/2 text-2xl text-white/70 font-semibold z-30">VS.</div>
                <div className="absolute top-[43%] -translate-y-1/2 z-30 text-[180px] font-bold leading-none" style={{ fontFamily: "'Crook', sans-serif", right: 'calc(50% + 40px)', textAlign: 'right' }}>{team1.score}</div>
                <div className="absolute top-[43%] -translate-y-1/2 z-30 text-[180px] font-bold leading-none" style={{ fontFamily: "'Crook', sans-serif", left: 'calc(50% + 40px)', textAlign: 'left' }}>{team2.score}</div>

                {/* Round / Match Info */}
                <div className="absolute left-1/2 -translate-x-1/2 text-sm text-white/70 tracking-wider z-50" style={{ fontFamily: "'Archivo Semi Condensed Bold', sans-serif", top: 'calc(43% - 100px)' }}>
                    {data?.round || 'ROUND 1'}
                </div>

                {/* ============ BOTTOM 1/3: Team names ============ */}
                <div className="absolute bottom-0 left-0 w-full h-[38%] flex z-40">
                    {/* Team 1 Name - Left third, slightly closer to center */}
                    <div className={`left-[10%] w-[50%] h-full flex flex-col justify-end pb-10 pl-16 pr-8 ${matchComplete && team2Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}>
                        <img 
                            src={getTeamNameImagePath(team1.name)}
                            className="h-auto object-contain self-start"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>

                    {/* Center third - empty spacer */}
                    <div className="w-[10%]" />

                    {/* Team 2 Name - Right third, closer to center */}
                    <div className={`top-[60.67%] right-[10%] w-[50%] h-full flex flex-col justify-end items-start pb-10 px-8 ${matchComplete && team1Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}>
                        <img 
                            src={getTeamNameImagePath(team2.name)}
                            className="h-auto object-contain self-start"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* ============ Player names (centered under team names) ============ */}

                {/* Team 1 Players: centered at 25% of left half (12.5% from left) */}
                <div className={`absolute bottom-[15%] w-[32%] -translate-x-1/2 z-50 ${matchComplete && team2Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`} style={{ left: '24%' }}>
                    <TeamPlayersRow players={team1.players} getPlayerNameImagePath={getPlayerNameImagePath} />
                </div>

                {/* Team 2 Players: centered at 25% of right half (75% from left) */}
                <div className={`absolute bottom-[15%] w-[32%] -translate-x-1/2 z-50 ${matchComplete && team1Won ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`} style={{ left: '77%' }}>
                    <TeamPlayersRow players={team2.players} getPlayerNameImagePath={getPlayerNameImagePath} />
                </div>
            </div>
        );
    }

    // 1v1 Match Overlay view - simplified layout showing only active players
    if (matchMode === '1v1') {
        const player1 = team1.players.find(p => p.active) || team1.players[0];
        const player2 = team2.players.find(p => p.active) || team2.players[0];

        return (
            <div 
                className={`${containerClass} bg-transparent text-white uppercase overflow-hidden`}
                style={{ fontFamily: "'ED Manteca', sans-serif" }}
            >
                <div className="relative w-full h-full">
                    {/* 1v1 Stream overlay */}
                    <img 
                        src="/source/overlay/love_and_war/stream_overlays/1v1_overlay.png"
                        alt="1v1 Overlay"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                    <img 
                        src="/source/overlay/love_and_war/stream_overlays/bottom_page.png"
                        alt="Bottom Page"
                        className="absolute bottom-0 left-0 w-full h-full object-cover z-0"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />

                    {/* Player 1 - Left side, centered in left half */}
                    <div className="absolute w-full h-[100px] z-10 flex items-center">
                        <div className="absolute left-[-280px] right-[calc(50%+100px)] flex items-center justify-center">
                            <img 
                                src={getPlayerNameImagePath(player1.name)}
                                alt={player1.name}
                                className="object-contain"
                                style={{ height: '45px', width: 'auto', maxWidth: '100%' }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent && !parent.querySelector('.fallback-text')) {
                                        const fallback = document.createElement('span');
                                        fallback.className = 'fallback-text text-[28px] font-bold text-white whitespace-nowrap uppercase';
                                        fallback.style.fontFamily = "'ED Manteca Black', 'ED Manteca', sans-serif";
                                        fallback.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.9)';
                                        fallback.textContent = player1.name;
                                        parent.appendChild(fallback);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Player 1 Score */}
                    <div 
                        className="absolute top-[-5px] left-[724px] text-[26px] w-[100px] text-center font-bold z-10"
                        style={{ fontFamily: "'Archivo Expanded Bold', sans-serif" }}
                    >
                        {team1.score}
                    </div>

                    {/* Player 2 - Right side, centered in right half */}
                    <div className="absolute w-full h-[100px] z-10 flex items-center">
                        <div className="absolute right-[-280px] left-[calc(50%+100px)] flex items-center justify-center">
                            <img 
                                src={getPlayerNameImagePath(player2.name)}
                                alt={player2.name}
                                className="object-contain"
                                style={{ height: '45px', width: 'auto', maxWidth: '100%' }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent && !parent.querySelector('.fallback-text')) {
                                        const fallback = document.createElement('span');
                                        fallback.className = 'fallback-text text-[28px] font-bold text-white whitespace-nowrap uppercase';
                                        fallback.style.fontFamily = "'ED Manteca Black', 'ED Manteca', sans-serif";
                                        fallback.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.9)';
                                        fallback.textContent = player2.name;
                                        parent.appendChild(fallback);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Player 2 Score */}
                    <div 
                        className="absolute top-[-5px] right-[725px] text-[26px] w-[100px] text-center font-bold z-10"
                        style={{ fontFamily: "'Archivo Expanded Bold', sans-serif" }}
                    >
                        {team2.score}
                    </div>

                    {/* Round - Centered */}
                    <div 
                        className="absolute top-[1px] left-1/2 -translate-x-1/2 text-base text-center w-[600px] tracking-[2px] font-semibold z-10"
                        style={{ fontFamily: "'Archivo Semi Condensed Bold', sans-serif" }}
                    >
                        {round}
                    </div>
                </div>
            </div>
        );
    }

    // Team Match Overlay view (top bar)
    return (
        <div 
            className={`${containerClass} bg-transparent text-white uppercase overflow-hidden`}
            style={{ fontFamily: "'ED Manteca', sans-serif" }}
        >
            <div className="relative w-full h-full">
                {/* Stream overlay based on active players */}
                {streamOverlayFile && (
                    <img 
                        key={`${streamOverlayFile}-${overlayKey}`}
                        src={`/source/overlay/love_and_war/stream_overlays/${streamOverlayFile}`}
                        alt="Stream Overlay"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                )}
                <img 
                    src={"/source/overlay/love_and_war/stream_overlays/bottom_page.png"}
                    alt="Bottom Page"
                    className="absolute bottom-0 left-0 w-full h-full object-cover z-0"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />

                {/* Team 1 - Matching TagTeam positioning */}
                <div className="absolute w-full h-[100px] z-10 flex items-center">
                    <PlayerCard 
                        player={team1.players[0]} 
                        className="absolute left-[195px] right-[calc(100%-415px)]" 
                    />
                    <div className="absolute top-[22px] left-[427px] w-0.5 h-[30px] bg-red-500 hidden" />
                    <PlayerCard 
                        player={team1.players[1]} 
                        className="absolute left-[432px] w-[258px]" 
                    />
                </div>
                {/* Team 1 Score */}
                <div 
                    className="absolute top-[-5px] left-[724px] text-[26px] w-[100px] text-center font-bold z-10"
                    style={{ 
                        fontFamily: "'Archivo Expanded Bold', sans-serif"
                    }}
                >
                    {team1.score}
                </div>

                {/* Team 2 - Matching TagTeam positioning */}
                <div className="absolute w-full h-[100px] z-10 flex items-center">
                    <PlayerCard 
                        player={team2.players[0]} 
                        className="absolute right-[428px] w-[262px]" 
                    />
                    <div className="absolute top-[22px] right-[423px] w-0.5 h-[30px] bg-red-500 hidden" />
                    <PlayerCard 
                        player={team2.players[1]} 
                        className="absolute right-[195px] left-[calc(100%-410px)]" 
                    />
                </div>
                {/* Team 2 Score */}
                <div 
                    className="absolute top-[-5px] right-[725px] text-[26px] w-[100px] text-center font-bold z-10"
                    style={{ 
                        fontFamily: "'Archivo Expanded Bold', sans-serif"
                    }}
                >
                    {team2.score}
                </div>

                {/* Round - Centered */}
                <div 
                    className="absolute top-[1px] left-1/2 -translate-x-1/2 text-base text-center w-[600px] tracking-[2px] font-semibold z-10"
                    style={{ 
                        fontFamily: "'Archivo Semi Condensed Bold', sans-serif"
                    }}
                >
                    {round}
                </div>
            </div>
        </div>
    );
};

export default LoveAndWarMatchOverlay;
