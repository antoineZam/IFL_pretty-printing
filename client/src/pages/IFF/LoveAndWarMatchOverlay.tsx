import { useState, useEffect } from 'react';
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

// Props for embedded use (optional)
interface Props {
    socket?: Socket | null;  // If provided, use this socket instead of creating one
    embedded?: boolean;  // If true, use w-full h-full instead of fixed dimensions
    showAsMatchCard?: boolean;  // If true, show match card view
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
                className="max-w-full h-auto object-contain"
                style={{ 
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))',
                    transform: 'scale(0.8)'
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

const LoveAndWarMatchOverlay = ({ socket: propSocket, embedded = false, showAsMatchCard = false }: Props) => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<LnWMatchData | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    // Match Card view (full-screen centered display)
    if (showAsMatchCard) {
        return (
            <div 
                className={`${containerClass} bg-transparent text-white uppercase overflow-hidden flex items-center justify-center`}
                style={{ fontFamily: "'ED Manteca', sans-serif" }}
            >
                <div className="flex flex-col items-center gap-8 p-12">
                    {/* Love & War Branding */}
                    <div className="text-center">
                        <h1 className="text-6xl font-bold tracking-wider" style={{ fontFamily: "'ED Manteca Black', sans-serif" }}>
                            Love & War
                        </h1>
                        <p className="text-xl text-red-400 mt-2">{round}</p>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center gap-16">
                        {/* Team 1 */}
                        <div className="text-center min-w-[300px]">
                            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'ED Manteca Black', sans-serif" }}>
                                {team1.name}
                            </h2>
                            <div className="flex flex-col gap-2 items-center">
                                {team1.players.map((p, i) => {
                                    const playerNameSlug = p.name.toLowerCase().trim().replace(/\s+/g, '_');
                                    const playerNameImagePath = `/source/overlay/love_and_war/player_names/${playerNameSlug}.png`;
                                    return (
                                        <img 
                                            key={i}
                                            src={playerNameImagePath}
                                            alt={p.name}
                                            className={`max-w-full h-auto object-contain ${p.active ? 'opacity-100' : 'opacity-50'}`}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent = target.parentElement;
                                                if (parent && !parent.querySelector(`.fallback-${i}`)) {
                                                    const fallback = document.createElement('span');
                                                    fallback.className = `fallback-${i} text-2xl ${p.active ? 'text-white' : 'text-white/50'}`;
                                                    fallback.textContent = p.name;
                                                    parent.appendChild(fallback);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* VS */}
                        <div className="text-5xl font-bold text-red-500">VS</div>

                        {/* Team 2 */}
                        <div className="text-center min-w-[300px]">
                            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'ED Manteca Black', sans-serif" }}>
                                {team2.name}
                            </h2>
                            <div className="flex flex-col gap-2 items-center">
                                {team2.players.map((p, i) => {
                                    const playerNameSlug = p.name.toLowerCase().trim().replace(/\s+/g, '_');
                                    const playerNameImagePath = `/source/overlay/love_and_war/player_names/${playerNameSlug}.png`;
                                    return (
                                        <img 
                                            key={i}
                                            src={playerNameImagePath}
                                            alt={p.name}
                                            className={`max-w-full h-auto object-contain ${p.active ? 'opacity-100' : 'opacity-50'}`}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent = target.parentElement;
                                                if (parent && !parent.querySelector(`.fallback-${i}`)) {
                                                    const fallback = document.createElement('span');
                                                    fallback.className = `fallback-${i} text-2xl ${p.active ? 'text-white' : 'text-white/50'}`;
                                                    fallback.textContent = p.name;
                                                    parent.appendChild(fallback);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Match Overlay view (top bar)
    return (
        <div 
            className={`${containerClass} bg-transparent text-white uppercase overflow-hidden`}
            style={{ fontFamily: "'ED Manteca', sans-serif" }}
        >
            <div className="relative w-full h-full">
                {/* Background overlay image */}
                <img 
                    src="/source/overlay/love_and_war/overlay.png"
                    alt="Love and War Overlay"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Team 1 - Matching TagTeam positioning */}
                <div className="absolute top-[22px] w-full h-[100px]">
                    <PlayerCard 
                        player={team1.players[0]} 
                        className="absolute left-[195px] right-[calc(100%-415px)]" 
                    />
                    <div className="absolute top-7 left-[427px] w-0.5 h-[30px] bg-red-500 hidden" />
                    <PlayerCard 
                        player={team1.players[1]} 
                        className="absolute left-[432px] w-[258px]" 
                    />
                </div>
                {/* Team 1 Score */}
                <div 
                    className="absolute top-[-5px] left-[724px] text-[26px] w-[100px] text-center font-bold"
                    style={{ 
                        fontFamily: "'Archivo Expanded Bold', sans-serif"
                    }}
                >
                    {team1.score}
                </div>

                {/* Team 2 - Matching TagTeam positioning */}
                <div className="absolute top-[20px] w-full h-[100px]">
                    <PlayerCard 
                        player={team2.players[0]} 
                        className="absolute right-[195px] left-[calc(100%-410px)]" 
                    />
                    <div className="absolute top-[22px] right-[423px] w-0.5 h-[30px] bg-red-500 hidden" />
                    <PlayerCard 
                        player={team2.players[1]} 
                        className="absolute right-[428px] w-[262px]" 
                    />
                </div>
                {/* Team 2 Score */}
                <div 
                    className="absolute top-[-5px] right-[725px] text-[26px] w-[100px] text-center font-bold"
                    style={{ 
                        fontFamily: "'Archivo Expanded Bold', sans-serif"
                    }}
                >
                    {team2.score}
                </div>

                {/* Round - Centered */}
                <div 
                    className="absolute top-[1px] left-1/2 -translate-x-1/2 text-base text-center w-[600px] tracking-[2px] font-semibold"
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
