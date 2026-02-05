import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// Data interfaces
interface Player {
    name: string;
    active: boolean;
}

interface Team {
    name: string;
    players: Player[];
    score: number;
}

interface LnWMatchData {
    team1: Team;
    team2: Team;
    round: string;
}

interface TeamStatsData {
    id: number;
    team_name: string;
    player_1_name: string;
    player_1_character: string;
    player_1_division: string;
    player_1_iff_ranking: string;
    player_1_iff_record: string;
    player_1_iff_history: string;
    player_1_tekken_rank: string;
    player_1_tekken_prowess: number;
    player_1_ranked_wins: number;
    player_1_ranked_losses: number;
    player_1_ranked_wl_rate: string;
    player_2_name: string;
    player_2_character: string;
    player_2_division: string;
    player_2_iff_ranking: string;
    player_2_iff_record: string;
    player_2_iff_history: string;
    player_2_tekken_rank: string;
    player_2_tekken_prowess: number;
    player_2_ranked_wins: number;
    player_2_ranked_losses: number;
    player_2_ranked_wl_rate: string;
}

// Display mode types
type DisplayMode = 'match' | 'team-stats' | 'match-card' | 'idle';

interface DisplayState {
    mode: DisplayMode;
    teamId?: number | null;
    visible: boolean;
}

// PlayerCard component with auto-scaling
interface PlayerCardProps {
    player: Player;
    className?: string;
    align?: 'left' | 'right';
}

const PlayerCard = ({ player, className = '', align = 'left' }: PlayerCardProps) => {
    const nameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (nameRef.current) {
            const container = nameRef.current.parentElement;
            if (!container) return;
            
            let fontSize = 28;
            nameRef.current.style.fontSize = `${fontSize}px`;
            
            while (nameRef.current.scrollWidth > container.clientWidth - 10 && fontSize > 14) {
                fontSize -= 1;
                nameRef.current.style.fontSize = `${fontSize}px`;
            }
        }
    }, [player.name]);

    return (
        <div 
            className={`flex items-center overflow-hidden ${className} ${!player.active ? 'opacity-40' : ''}`}
            style={{ 
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start' 
            }}
        >
            <span 
                ref={nameRef}
                className="font-bold text-white whitespace-nowrap uppercase tracking-wide"
                style={{ 
                    fontFamily: "'ED Manteca Black', 'ED Manteca', sans-serif",
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(220, 38, 38, 0.3)'
                }}
            >
                {player.name}
            </span>
        </div>
    );
};

// Stat row for team stats display
interface StatRowProps {
    label: string;
    value: string;
    small?: boolean;
    right?: boolean;
}

const StatRow = ({ label, value, small = false, right = false }: StatRowProps) => {
    return (
        <div className={`flex ${right ? 'justify-end' : 'justify-start'} gap-4`}>
            <div 
                className={small ? 'text-[16px]' : 'text-[20px]'}
                style={{
                    fontFamily: "'ED Manteca', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                    minWidth: '200px',
                    textAlign: right ? 'right' : 'left'
                }}
            >
                {label}
            </div>
            {value && (
                <div 
                    className={small ? 'text-[18px]' : 'text-[24px]'}
                    style={{
                        fontFamily: "'ED Manteca Black', sans-serif",
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                        minWidth: '200px',
                        textAlign: right ? 'left' : 'right'
                    }}
                >
                    {value}
                </div>
            )}
        </div>
    );
};

const LoveAndWarUnifiedOverlay = () => {
    const [searchParams] = useSearchParams();
    const [displayMode, setDisplayMode] = useState<DisplayMode>('idle');
    const [matchData, setMatchData] = useState<LnWMatchData | null>(null);
    const [teamStats, setTeamStats] = useState<TeamStatsData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [animKey, setAnimKey] = useState(0);

    // Set transparent background
    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    // Socket connection
    useEffect(() => {
        const key = searchParams.get('key');
        if (!key) {
            setError('No connection key');
            return;
        }

        const socket: Socket = io({ auth: { token: key } });
        
        socket.on('connect', () => {
            console.log('[LnW Unified Overlay] Socket connected');
        });
        
        socket.on('connect_error', (err) => {
            console.error('[LnW Unified Overlay] Connection error:', err);
            setError(`Connection Failed: ${err.message}`);
        });
        
        // Listen for match data updates
        socket.on('lnw-match-data', (serverData: LnWMatchData) => {
            console.log('[LnW Unified Overlay] Received match data:', serverData);
            setMatchData(serverData);
        });

        // Listen for display mode changes
        socket.on('lnw-display-mode', async (state: DisplayState) => {
            console.log('[LnW Unified Overlay] Display mode change:', state);
            setDisplayMode(state.mode);
            setIsVisible(state.visible);

            if (state.mode === 'team-stats' && state.teamId && state.visible) {
                try {
                    const response = await fetch(`/api/iff/love-and-war/team/${state.teamId}`);
                    const data = await response.json();
                    if (data.team) {
                        setAnimKey(k => k + 1);
                        setTeamStats(data.team);
                    }
                } catch (error) {
                    console.error('[LnW Unified Overlay] Error fetching team:', error);
                }
            }
        });

        // Listen for team stats display updates (backward compatibility)
        socket.on('love-and-war-display-update', async (state: { teamId: number | null; visible: boolean }) => {
            console.log('[LnW Unified Overlay] Team display update:', state);
            if (state.teamId && state.visible) {
                try {
                    const response = await fetch(`/api/iff/love-and-war/team/${state.teamId}`);
                    const data = await response.json();
                    if (data.team) {
                        setAnimKey(k => k + 1);
                        setTeamStats(data.team);
                        setDisplayMode('team-stats');
                        setIsVisible(true);
                    }
                } catch (error) {
                    console.error('[LnW Unified Overlay] Error fetching team:', error);
                }
            } else {
                setIsVisible(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams]);

    if (error) {
        return (
            <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-transparent text-red-500 text-4xl">
                {error}
            </div>
        );
    }

    // Render based on display mode
    const renderContent = () => {
        switch (displayMode) {
            case 'match':
                return renderMatchOverlay();
            case 'team-stats':
                return renderTeamStats();
            case 'match-card':
                return renderMatchCard();
            case 'idle':
            default:
                return renderIdle();
        }
    };

    // Idle state - just background
    const renderIdle = () => (
        <div className="w-full h-full relative">
            <img 
                src="/source/overlay/love_and_war/overlay.png"
                alt="Love and War Overlay"
                className="w-full h-full object-cover"
            />
        </div>
    );

    // Match overlay - team names, players, scores on top bar
    const renderMatchOverlay = () => {
        if (!matchData) {
            return renderIdle();
        }

        const { team1, team2, round } = matchData;

        return (
            <div className="w-full h-full relative">
                {/* Background overlay image */}
                <img 
                    src="/source/overlay/love_and_war/overlay.png"
                    alt="Love and War Overlay"
                    className="w-full h-full object-cover"
                />

                {/* Match info overlay on top */}
                <div className="absolute top-0 left-0 w-full">
                    {/* Background overlay bar */}
                    <div 
                        className="absolute top-0 left-0 w-full h-[90px]"
                        style={{
                            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 70%, transparent 100%)'
                        }}
                    />

                    {/* Team 1 (Left Side) */}
                    <div className="absolute top-0 left-0 h-[80px] flex items-center">
                        {/* Team Name */}
                        <div 
                            className="absolute left-[50px] top-[8px] text-[16px] uppercase tracking-[3px] text-red-400 font-semibold"
                            style={{ 
                                fontFamily: "'ED Manteca', sans-serif",
                                textShadow: '0 0 10px rgba(220, 38, 38, 0.5)'
                            }}
                        >
                            {team1.name}
                        </div>
                        
                        {/* Players */}
                        <div className="absolute left-[50px] top-[32px] flex items-center gap-4">
                            <PlayerCard 
                                player={team1.players[0]} 
                                className="w-[220px]"
                                align="left"
                            />
                            <div className="w-[2px] h-[28px] bg-red-500/60" />
                            <PlayerCard 
                                player={team1.players[1]} 
                                className="w-[220px]"
                                align="left"
                            />
                        </div>
                    </div>

                    {/* Team 1 Score */}
                    <div 
                        className="absolute top-[10px] left-[560px] text-[48px] font-bold w-[80px] text-center"
                        style={{ 
                            fontFamily: "'ED Manteca Black', 'ED Manteca', sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        {team1.score}
                    </div>

                    {/* Center - Round indicator */}
                    <div 
                        className="absolute top-[20px] left-1/2 -translate-x-1/2 text-[18px] text-center w-[400px] tracking-[4px] uppercase"
                        style={{ 
                            fontFamily: "'ED Manteca', sans-serif",
                            color: 'rgba(255, 255, 255, 0.7)',
                            textShadow: '0 0 10px rgba(220, 38, 38, 0.3)'
                        }}
                    >
                        {round}
                    </div>

                    {/* VS indicator */}
                    <div 
                        className="absolute top-[42px] left-1/2 -translate-x-1/2 text-[24px] font-bold"
                        style={{ 
                            fontFamily: "'ED Manteca Black', 'ED Manteca', sans-serif",
                            color: 'rgba(220, 38, 38, 0.8)',
                            textShadow: '0 0 15px rgba(220, 38, 38, 0.5)'
                        }}
                    >
                        VS
                    </div>

                    {/* Team 2 Score */}
                    <div 
                        className="absolute top-[10px] right-[560px] text-[48px] font-bold w-[80px] text-center"
                        style={{ 
                            fontFamily: "'ED Manteca Black', 'ED Manteca', sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        {team2.score}
                    </div>

                    {/* Team 2 (Right Side) */}
                    <div className="absolute top-0 right-0 h-[80px] flex items-center">
                        {/* Team Name */}
                        <div 
                            className="absolute right-[50px] top-[8px] text-[16px] uppercase tracking-[3px] text-red-400 font-semibold text-right"
                            style={{ 
                                fontFamily: "'ED Manteca', sans-serif",
                                textShadow: '0 0 10px rgba(220, 38, 38, 0.5)'
                            }}
                        >
                            {team2.name}
                        </div>
                        
                        {/* Players */}
                        <div className="absolute right-[50px] top-[32px] flex items-center gap-4">
                            <PlayerCard 
                                player={team2.players[1]} 
                                className="w-[220px]"
                                align="right"
                            />
                            <div className="w-[2px] h-[28px] bg-red-500/60" />
                            <PlayerCard 
                                player={team2.players[0]} 
                                className="w-[220px]"
                                align="right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Team stats overlay
    const renderTeamStats = () => {
        if (!teamStats || !isVisible) {
            return renderIdle();
        }

        const teamNameSlug = teamStats.team_name.toLowerCase().replace(/\s+/g, ' ').replace(/ /g, '_');
        const teamNameImagePath = `/source/overlay/love_and_war/team_names/${teamNameSlug}.png`;
        const teamLineworkPath = `/source/overlay/love_and_war/team_linework/${teamNameSlug}.png`;

        return (
            <div 
                key={animKey}
                className="w-full h-full relative overflow-hidden"
                style={{ 
                    fontFamily: "'ED Manteca', 'ED Manteca Black', sans-serif"
                }}
            >
                {/* Background Linework */}
                <img 
                    src={teamLineworkPath}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                    style={{
                        animation: 'fadeIn 0.6s ease-out'
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />

                {/* Red gradient background overlay */}
                <div 
                    className="absolute inset-0 opacity-90"
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.95) 0%, rgba(178, 34, 34, 0.85) 50%, rgba(139, 0, 0, 0.95) 100%)'
                    }}
                />

                {/* Team Name Image */}
                <div 
                    className="absolute top-[80px] left-1/2 transform -translate-x-1/2"
                    style={{
                        animation: 'slideDown 0.8s ease-out'
                    }}
                >
                    <img 
                        src={teamNameImagePath}
                        alt={teamStats.team_name}
                        className="h-[120px] object-contain"
                        style={{
                            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.8))'
                        }}
                    />
                </div>

                {/* Player 1 (Left Side) */}
                <div 
                    className="absolute left-[100px] top-[250px] w-[800px]"
                    style={{
                        animation: 'slideInLeft 0.8s ease-out 0.2s both'
                    }}
                >
                    <div 
                        className="text-[56px] mb-4"
                        style={{
                            fontFamily: "'ED Manteca Black', sans-serif",
                            fontWeight: 900,
                            color: '#FFFFFF',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.5)',
                            letterSpacing: '2px'
                        }}
                    >
                        {teamStats.player_1_name}
                    </div>

                    <div 
                        className="text-[36px] mb-6"
                        style={{
                            fontFamily: "'ED Manteca Black', sans-serif",
                            fontWeight: 900,
                            color: '#FFD700',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        {teamStats.player_1_character}
                    </div>

                    <div className="space-y-3">
                        <StatRow label="DIVISION" value={teamStats.player_1_division || 'N/A'} />
                        <StatRow label="IFF8 RANKING" value={teamStats.player_1_iff_ranking || '#01'} />
                        <StatRow label="IFF8 RECORD" value={teamStats.player_1_iff_record || '5W | 1L'} />
                        <StatRow label="IFF HISTORY" value={teamStats.player_1_iff_history || '2X IFF CHAMPION'} />
                    </div>

                    <div className="h-[1px] bg-white/30 my-4"></div>

                    <div className="space-y-3">
                        <StatRow label="TEKKEN RANK" value={teamStats.player_1_tekken_rank || 'TEKKEN KING'} />
                        <StatRow label="TEKKEN PROWESS" value={teamStats.player_1_tekken_prowess?.toLocaleString() || '213,457'} />
                    </div>

                    <div className="h-[1px] bg-white/30 my-4"></div>

                    <div className="space-y-2">
                        <StatRow label="RANKED MATCHES" value="" />
                        <div className="pl-4 space-y-1">
                            <StatRow label="WINS" value={teamStats.player_1_ranked_wins?.toString() || '240'} small />
                            <StatRow label="LOSSES" value={teamStats.player_1_ranked_losses?.toString() || '20'} small />
                            <StatRow label="W/L RATE" value={teamStats.player_1_ranked_wl_rate || '93.2%'} small />
                        </div>
                    </div>
                </div>

                {/* Player 2 (Right Side) */}
                <div 
                    className="absolute right-[100px] top-[250px] w-[800px] text-right"
                    style={{
                        animation: 'slideInRight 0.8s ease-out 0.4s both'
                    }}
                >
                    <div 
                        className="text-[56px] mb-4"
                        style={{
                            fontFamily: "'ED Manteca Black', sans-serif",
                            fontWeight: 900,
                            color: '#FFFFFF',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.5)',
                            letterSpacing: '2px'
                        }}
                    >
                        {teamStats.player_2_name}
                    </div>

                    <div 
                        className="text-[36px] mb-6"
                        style={{
                            fontFamily: "'ED Manteca Black', sans-serif",
                            fontWeight: 900,
                            color: '#FFD700',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        {teamStats.player_2_character}
                    </div>

                    <div className="space-y-3">
                        <StatRow label="DIVISION" value={teamStats.player_2_division || 'N/A'} right />
                        <StatRow label="IFF8 RANKING" value={teamStats.player_2_iff_ranking || '#01'} right />
                        <StatRow label="IFF8 RECORD" value={teamStats.player_2_iff_record || '5W | 1L'} right />
                        <StatRow label="IFF HISTORY" value={teamStats.player_2_iff_history || 'FINALIST IWGFA'} right />
                    </div>

                    <div className="h-[1px] bg-white/30 my-4"></div>

                    <div className="space-y-3">
                        <StatRow label="TEKKEN RANK" value={teamStats.player_2_tekken_rank || 'TEKKEN KING'} right />
                        <StatRow label="TEKKEN PROWESS" value={teamStats.player_2_tekken_prowess?.toLocaleString() || '213,457'} right />
                    </div>

                    <div className="h-[1px] bg-white/30 my-4"></div>

                    <div className="space-y-2">
                        <StatRow label="RANKED MATCHES" value="" right />
                        <div className="pr-4 space-y-1">
                            <StatRow label="WINS" value={teamStats.player_2_ranked_wins?.toString() || '240'} small right />
                            <StatRow label="LOSSES" value={teamStats.player_2_ranked_losses?.toString() || '54'} small right />
                            <StatRow label="W/L RATE" value={teamStats.player_2_ranked_wl_rate || '78%'} small right />
                        </div>
                    </div>
                </div>

                {/* Footer Branding */}
                <div 
                    className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 text-center"
                    style={{
                        animation: 'fadeIn 0.8s ease-out 0.6s both'
                    }}
                >
                    <div 
                        className="text-[20px] tracking-widest"
                        style={{
                            fontFamily: "'ED Manteca', sans-serif",
                            color: 'rgba(255, 255, 255, 0.7)',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        IN ASSOCIATION WITH
                    </div>
                    <div 
                        className="text-[32px] mt-1"
                        style={{
                            fontFamily: "'ED Manteca Black', sans-serif",
                            fontWeight: 900,
                            color: '#FFFFFF',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        IRON FROOT FEDERATION
                    </div>
                </div>

                {/* Animations */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideDown {
                        from {
                            opacity: 0;
                            transform: translate(-50%, -50px);
                        }
                        to {
                            opacity: 1;
                            transform: translate(-50%, 0);
                        }
                    }
                    @keyframes slideInLeft {
                        from {
                            opacity: 0;
                            transform: translateX(-100px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    @keyframes slideInRight {
                        from {
                            opacity: 0;
                            transform: translateX(100px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}</style>
            </div>
        );
    };

    // Match card - shows both teams with stats for upcoming match
    const renderMatchCard = () => {
        if (!matchData) {
            return renderIdle();
        }

        const { team1, team2, round } = matchData;

        return (
            <div className="w-full h-full relative">
                {/* Background overlay image */}
                <img 
                    src="/source/overlay/love_and_war/overlay.png"
                    alt="Love and War Overlay"
                    className="w-full h-full object-cover"
                />

                {/* Semi-transparent overlay for better readability */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)'
                    }}
                />

                {/* Match Card Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Round Title */}
                    <div 
                        className="text-[32px] uppercase tracking-[8px] mb-8"
                        style={{
                            fontFamily: "'ED Manteca', sans-serif",
                            color: 'rgba(255, 255, 255, 0.7)',
                            textShadow: '0 0 20px rgba(220, 38, 38, 0.5)'
                        }}
                    >
                        {round}
                    </div>

                    {/* Teams Display */}
                    <div className="flex items-center gap-16">
                        {/* Team 1 */}
                        <div className="text-right w-[500px]">
                            <div 
                                className="text-[64px] uppercase"
                                style={{
                                    fontFamily: "'ED Manteca Black', sans-serif",
                                    fontWeight: 900,
                                    color: '#FFFFFF',
                                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 0, 0, 0.4)',
                                    lineHeight: 1.1
                                }}
                            >
                                {team1.name}
                            </div>
                            <div className="mt-4 space-y-2">
                                {team1.players.map((player, idx) => (
                                    <div 
                                        key={idx}
                                        className={`text-[28px] ${player.active ? 'text-white' : 'text-gray-500'}`}
                                        style={{
                                            fontFamily: "'ED Manteca', sans-serif",
                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                                        }}
                                    >
                                        {player.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* VS */}
                        <div 
                            className="text-[72px] font-bold"
                            style={{
                                fontFamily: "'ED Manteca Black', sans-serif",
                                color: '#dc2626',
                                textShadow: '0 0 40px rgba(220, 38, 38, 0.8), 0 4px 20px rgba(0, 0, 0, 0.9)'
                            }}
                        >
                            VS
                        </div>

                        {/* Team 2 */}
                        <div className="text-left w-[500px]">
                            <div 
                                className="text-[64px] uppercase"
                                style={{
                                    fontFamily: "'ED Manteca Black', sans-serif",
                                    fontWeight: 900,
                                    color: '#FFFFFF',
                                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 0, 0, 0.4)',
                                    lineHeight: 1.1
                                }}
                            >
                                {team2.name}
                            </div>
                            <div className="mt-4 space-y-2">
                                {team2.players.map((player, idx) => (
                                    <div 
                                        key={idx}
                                        className={`text-[28px] ${player.active ? 'text-white' : 'text-gray-500'}`}
                                        style={{
                                            fontFamily: "'ED Manteca', sans-serif",
                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                                        }}
                                    >
                                        {player.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Love & War Branding */}
                    <div 
                        className="mt-16 text-[24px] uppercase tracking-[6px]"
                        style={{
                            fontFamily: "'ED Manteca', sans-serif",
                            color: 'rgba(255, 255, 255, 0.5)',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        Love & War
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div 
            className="w-[1920px] h-[1080px] bg-transparent text-white overflow-hidden"
            style={{ fontFamily: "'ED Manteca', sans-serif" }}
        >
            {renderContent()}
        </div>
    );
};

export default LoveAndWarUnifiedOverlay;
