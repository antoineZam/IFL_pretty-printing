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

// PlayerCard component with ED Manteca font
interface PlayerCardProps {
    player: Player;
    className?: string;
    align?: 'left' | 'right';
}

const PlayerCard = ({ player, className = '', align = 'left' }: PlayerCardProps) => {
    const nameRef = useRef<HTMLSpanElement>(null);

    // Auto-scale font size to fit
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

const LoveAndWarMatchOverlay = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<LnWMatchData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
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
    }, [searchParams]);

    if (error) {
        return (
            <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-transparent text-red-500 text-4xl">
                {error}
            </div>
        );
    }
    
    if (!data) {
        return <div className="w-[1920px] h-[1080px] bg-transparent"></div>;
    }

    const { team1, team2, round } = data;

    return (
        <div 
            className="w-[1920px] h-[1080px] bg-transparent text-white overflow-hidden"
            style={{ fontFamily: "'ED Manteca', sans-serif" }}
        >
            <div className="relative w-full h-full">
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

export default LoveAndWarMatchOverlay;
