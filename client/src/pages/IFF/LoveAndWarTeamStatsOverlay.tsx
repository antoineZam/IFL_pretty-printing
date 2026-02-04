import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface TeamData {
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

interface DisplayState {
    teamId: number | null;
    visible: boolean;
}

const LoveAndWarTeamStatsOverlay = () => {
    const [searchParams] = useSearchParams();
    const [team, setTeam] = useState<TeamData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        console.log('[LnW Overlay] Connecting with key:', connectionKey ? 'present' : 'missing');
        
        const socket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        socket.on('connect', () => {
            console.log('[LnW Overlay] Socket connected');
        });

        socket.on('love-and-war-display-update', async (state: DisplayState) => {
            console.log('[LnW Overlay] Display update:', state);

            if (state.teamId && state.visible) {
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

        socket.on('love-and-war-team-update', (updatedTeam: TeamData) => {
            if (team && updatedTeam.id === team.id) {
                setTeam(updatedTeam);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams, team, currentTeamId]);

    // If not visible or no team, show default image
    if (!isVisible || !team) {
        return (
            <div className="w-[1920px] h-[1080px] relative overflow-hidden">
                <img 
                    src="/source/overlay/love_and_war/default.png"
                    alt="Love and War"
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    // Normalize team name for file paths (lowercase, replace spaces with underscores)
    const teamNameSlug = team.team_name.toLowerCase().replace(/\s+/g, ' ');
    const teamNameImagePath = `/source/overlay/love_and_war/team_names/${teamNameSlug}.png`;
    const teamLineworkPath = `/source/overlay/love_and_war/team_linework/${teamNameSlug}.png`;

    return (
        <div 
            key={animKey}
            className="w-[1920px] h-[1080px] relative overflow-hidden"
            style={{ 
                backgroundColor: 'transparent',
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
                    // Fallback to solid color if linework doesn't exist
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
                    alt={team.team_name}
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
                {/* Player Name - ED Manteca Black */}
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
                    {team.player_1_name}
                </div>

                {/* Character - ED Manteca Black */}
                <div 
                    className="text-[36px] mb-6"
                    style={{
                        fontFamily: "'ED Manteca Black', sans-serif",
                        fontWeight: 900,
                        color: '#FFD700',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                    }}
                >
                    {team.player_1_character}
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <StatRow label="DIVISION" value={team.player_1_division || 'N/A'} />
                    <StatRow label="IFF8 RANKING" value={team.player_1_iff_ranking || '#01'} />
                    <StatRow label="IFF8 RECORD" value={team.player_1_iff_record || '5W | 1L'} />
                    <StatRow label="IFF HISTORY" value={team.player_1_iff_history || '2X IFF CHAMPION'} />
                </div>

                <div className="h-[1px] bg-white/30 my-4"></div>

                <div className="space-y-3">
                    <StatRow label="TEKKEN RANK" value={team.player_1_tekken_rank || 'TEKKEN KING'} />
                    <StatRow label="TEKKEN PROWESS" value={team.player_1_tekken_prowess?.toLocaleString() || '213,457'} />
                </div>

                <div className="h-[1px] bg-white/30 my-4"></div>

                <div className="space-y-2">
                    <StatRow label="RANKED MATCHES" value="" />
                    <div className="pl-4 space-y-1">
                        <StatRow 
                            label="WINS" 
                            value={team.player_1_ranked_wins?.toString() || '240'} 
                            small 
                        />
                        <StatRow 
                            label="LOSSES" 
                            value={team.player_1_ranked_losses?.toString() || '20'} 
                            small 
                        />
                        <StatRow 
                            label="W/L RATE" 
                            value={team.player_1_ranked_wl_rate || '93.2%'} 
                            small 
                        />
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
                {/* Player Name - ED Manteca Black */}
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
                    {team.player_2_name}
                </div>

                {/* Character - ED Manteca Black */}
                <div 
                    className="text-[36px] mb-6"
                    style={{
                        fontFamily: "'ED Manteca Black', sans-serif",
                        fontWeight: 900,
                        color: '#FFD700',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                    }}
                >
                    {team.player_2_character}
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <StatRow label="DIVISION" value={team.player_2_division || 'N/A'} right />
                    <StatRow label="IFF8 RANKING" value={team.player_2_iff_ranking || '#01'} right />
                    <StatRow label="IFF8 RECORD" value={team.player_2_iff_record || '5W | 1L'} right />
                    <StatRow label="IFF HISTORY" value={team.player_2_iff_history || 'FINALIST IWGFA'} right />
                </div>

                <div className="h-[1px] bg-white/30 my-4"></div>

                <div className="space-y-3">
                    <StatRow label="TEKKEN RANK" value={team.player_2_tekken_rank || 'TEKKEN KING'} right />
                    <StatRow label="TEKKEN PROWESS" value={team.player_2_tekken_prowess?.toLocaleString() || '213,457'} right />
                </div>

                <div className="h-[1px] bg-white/30 my-4"></div>

                <div className="space-y-2">
                    <StatRow label="RANKED MATCHES" value="" right />
                    <div className="pr-4 space-y-1">
                        <StatRow 
                            label="WINS" 
                            value={team.player_2_ranked_wins?.toString() || '240'} 
                            small 
                            right
                        />
                        <StatRow 
                            label="LOSSES" 
                            value={team.player_2_ranked_losses?.toString() || '54'} 
                            small 
                            right
                        />
                        <StatRow 
                            label="W/L RATE" 
                            value={team.player_2_ranked_wl_rate || '78%'} 
                            small 
                            right
                        />
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

            <div 
                className="absolute bottom-[40px] left-[100px]"
                style={{
                    fontFamily: "'ED Manteca', sans-serif",
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
            >
                PROUDLY PRESENTED BY
            </div>

            <div 
                className="absolute bottom-[40px] right-[100px]"
                style={{
                    fontFamily: "'ED Manteca', sans-serif",
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
            >
                THE HAUS OF LOAF
            </div>

            <div 
                className="absolute top-[40px] left-[100px]"
                style={{
                    fontFamily: "'ED Manteca', sans-serif",
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
            >
                TEKKEN 8 ©
            </div>

            <div 
                className="absolute top-[40px] right-[100px]"
                style={{
                    fontFamily: "'ED Manteca Black', sans-serif",
                    fontSize: '24px',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
            >
                ALL RIGHTS RESERVED © 2026
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

export default LoveAndWarTeamStatsOverlay;
