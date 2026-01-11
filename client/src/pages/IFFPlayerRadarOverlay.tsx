import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface IFFPlayer {
    id: number;
    name: string;
    polaris_id: string | null;
    character_name: string;
    division: string;
    rank_name: string;
    tekken_power: number;
    prowess: number;
    iff8_ranking: string;
    iff8_record: string;
    iff8_record_details: string;
    iff_history: string;
    ranked_wins: number;
    ranked_losses: number;
    ranked_wl_rate: string;
    player_wins: number;
    player_losses: number;
    player_wl_rate: string;
    offense_rating: number;
    defense_rating: number;
    consistency_rating: number;
    adaptability_rating: number;
    clutch_rating: number;
    experience_rating: number;
}

interface RadarChartProps {
    data: number[];
    labels: string[];
    size?: number;
    color?: string;
    animated?: boolean;
}

// Radar Chart Component using pure SVG
function RadarChart({ data, labels, size = 400, color = '#f97316', animated = true }: RadarChartProps) {
    const center = size / 2;
    const radius = size * 0.38;
    const levels = 5;
    const angleStep = (Math.PI * 2) / data.length;
    const [animatedData, setAnimatedData] = useState<number[]>(data.map(() => 0));

    useEffect(() => {
        if (animated) {
            const timeout = setTimeout(() => {
                setAnimatedData(data);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setAnimatedData(data);
        }
    }, [data, animated]);

    const getPoint = (index: number, value: number) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    const gridLines = [];
    for (let level = 1; level <= levels; level++) {
        const levelRadius = (level / levels) * radius;
        const points = [];
        for (let i = 0; i < data.length; i++) {
            const angle = angleStep * i - Math.PI / 2;
            points.push(`${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`);
        }
        gridLines.push(
            <polygon
                key={`grid-${level}`}
                points={points.join(' ')}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
            />
        );
    }

    const axisLines = data.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const endX = center + radius * Math.cos(angle);
        const endY = center + radius * Math.sin(angle);
        return (
            <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
            />
        );
    });

    const dataPoints = animatedData.map((value, i) => {
        const point = getPoint(i, value);
        return `${point.x},${point.y}`;
    }).join(' ');

    const labelElements = labels.map((label, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const labelRadius = radius + 35;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        return (
            <text
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="14"
                fontWeight="700"
                fontFamily="'Gotham', 'Archivo', sans-serif"
                letterSpacing="1"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
            >
                {label}
            </text>
        );
    });

    const valueElements = animatedData.map((value, i) => {
        const point = getPoint(i, value);
        return (
            <text
                key={`value-${i}`}
                x={point.x}
                y={point.y - 14}
                textAnchor="middle"
                fill="white"
                fontSize="15"
                fontWeight="800"
                fontFamily="'Gotham', 'Archivo', sans-serif"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}
            >
                {Math.round(value)}
            </text>
        );
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {gridLines}
            {axisLines}

            <polygon
                points={dataPoints}
                fill="url(#radarGradient)"
                stroke={color}
                strokeWidth="2.5"
                filter="url(#glow)"
                style={{
                    transition: animated ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                }}
            />

            {animatedData.map((value, i) => {
                const point = getPoint(i, value);
                return (
                    <circle
                        key={`point-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r="5"
                        fill={color}
                        stroke="white"
                        strokeWidth="2"
                        filter="url(#softGlow)"
                        style={{
                            transition: animated ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                        }}
                    />
                );
            })}

            {labelElements}
            {valueElements}
        </svg>
    );
}

export default function IFFPlayerRadarOverlay() {
    const { polarisId } = useParams<{ polarisId: string }>();
    const [searchParams] = useSearchParams();
    const [player, setPlayer] = useState<IFFPlayer | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        const fetchPlayer = async () => {
            if (!polarisId) return;
            try {
                const response = await fetch(`/api/iff/player/${polarisId}`);
                const data = await response.json();
                if (data.player) {
                    setPlayer(data.player);
                    setAnimKey(k => k + 1);
                }
            } catch (error) {
                console.error('Error fetching player:', error);
            }
        };

        fetchPlayer();

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (connectionKey) {
            const socket: Socket = io({
                auth: { token: connectionKey }
            });

            socket.on('iff-player-update', (updatedPlayer: IFFPlayer) => {
                if (updatedPlayer.id === parseInt(polarisId || '0')) {
                    setPlayer(updatedPlayer);
                    setAnimKey(k => k + 1);
                }
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [polarisId, searchParams]);

    if (!player) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const radarData = [
        player.offense_rating || 50,
        player.defense_rating || 50,
        player.consistency_rating || 50,
        player.adaptability_rating || 50,
        player.clutch_rating || 50,
        player.experience_rating || 50
    ];

    const radarLabels = ['OFF', 'DEF', 'CON', 'ADP', 'CLU', 'EXP'];

    return (
        <div 
            key={animKey}
            className="w-[1920px] h-[1080px] relative overflow-hidden"
            style={{ 
                backgroundColor: 'transparent',
                fontFamily: "'Gotham', 'Archivo', sans-serif"
            }}
        >
            {/* Background Gradient */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, rgba(10,10,12,0.98) 0%, rgba(15,15,20,0.95) 40%, rgba(20,15,15,0.9) 100%)'
                }}
            />

            {/* Character Art - Already 1080p and left aligned in source */}
            {player.character_name && (
                <img
                    src={`/source/overlay/characters/P1/${player.character_name.toLowerCase()}.png`}
                    alt={player.character_name}
                    className="absolute top-0 left-0"
                    style={{
                        animation: 'slideInLeft 0.6s ease-out both',
                        filter: 'drop-shadow(25px -15px 25px rgba(0, 0, 0, 0.27)) drop-shadow(12px -8px 10px rgba(0, 0, 0, 0.17))',
                        zIndex: 5
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            )}

            {/* Decorative Lines */}
            <div className="absolute top-0 left-[640px] w-[640px] h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" 
                 style={{ animation: 'fadeIn 0.8s ease-out forwards' }} />
            <div className="absolute bottom-0 left-[640px] w-[640px] h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Middle Third - Player Info (640px - 1280px) */}
            <div className="absolute left-[640px] top-0 w-[640px] h-full z-10">
                
                {/* Panel Background */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.85) 85%, transparent 100%)'
                    }}
                />

                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center px-10">
                    
                    {/* Player Name */}
                    <div 
                        className="text-center mb-6"
                        style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
                    >
                        <div className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em] mb-2">
                            Player Profile
                        </div>
                        <h1 
                            className="text-[52px] font-black text-white leading-none"
                            style={{ 
                                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {player.name}
                        </h1>
                    </div>

                    {/* Tags Row */}
                    <div 
                        className="flex flex-wrap gap-3 justify-center mb-8"
                        style={{ animation: 'fadeIn 0.6s ease-out 0.1s forwards', opacity: 0 }}
                    >
                        {player.character_name && (
                            <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                                <span className="text-orange-400 font-semibold capitalize text-sm">{player.character_name}</span>
                            </div>
                        )}
                        {player.rank_name && (
                            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                <span className="text-purple-400 font-semibold text-sm">{player.rank_name}</span>
                            </div>
                        )}
                        {player.division && (
                            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                <span className="text-cyan-400 font-semibold text-sm">{player.division}</span>
                            </div>
                        )}
                    </div>

                    {/* IFF8 Stats */}
                    {(player.iff8_ranking || player.iff8_record) && (
                        <div 
                            className="mb-8 p-5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center w-full max-w-[400px]"
                            style={{ animation: 'fadeIn 0.6s ease-out 0.2s forwards', opacity: 0 }}
                        >
                            <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
                                IFF Season 8
                            </div>
                            <div className="flex gap-10 justify-center">
                                {player.iff8_ranking && (
                                    <div className="text-center">
                                        <div className="text-gray-500 text-xs uppercase tracking-wider">Ranking</div>
                                        <div className="text-4xl font-black text-white">{player.iff8_ranking}</div>
                                    </div>
                                )}
                                {player.iff8_record && (
                                    <div className="text-center">
                                        <div className="text-gray-500 text-xs uppercase tracking-wider">Record</div>
                                        <div className="text-4xl font-black text-white">{player.iff8_record}</div>
                                    </div>
                                )}
                            </div>
                            {player.iff8_record_details && (
                                <div className="mt-3 text-gray-400 text-sm">{player.iff8_record_details}</div>
                            )}
                        </div>
                    )}

                    {/* Match Stats Grid */}
                    <div 
                        className="grid grid-cols-3 gap-4 text-center w-full max-w-[400px]"
                        style={{ animation: 'fadeIn 0.6s ease-out 0.3s forwards', opacity: 0 }}
                    >
                        {/* Ranked Stats */}
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Ranked</div>
                            <div className="text-lg font-bold">
                                <span className="text-green-400">{player.ranked_wins}W</span>
                                <span className="text-gray-600 mx-1">-</span>
                                <span className="text-red-400">{player.ranked_losses}L</span>
                            </div>
                        </div>
                        
                        {/* Player Stats */}
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Player</div>
                            <div className="text-lg font-bold">
                                <span className="text-green-400">{player.player_wins}W</span>
                                <span className="text-gray-600 mx-1">-</span>
                                <span className="text-red-400">{player.player_losses}L</span>
                            </div>
                        </div>

                        {/* Prowess */}
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Prowess</div>
                            <div className="text-lg font-bold text-white">{player.prowess > 0 ? player.prowess.toLocaleString() : '-'}</div>
                        </div>
                    </div>

                    {/* IFF Branding */}
                    <div 
                        className="mt-10 flex items-center gap-4"
                        style={{ animation: 'fadeIn 1s ease-out 0.8s forwards', opacity: 0 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <span className="text-white font-black text-sm">IFF</span>
                        </div>
                        <div>
                            <div className="text-white font-bold">Iron Fist Federation</div>
                            <div className="text-gray-500 text-xs">Run It Back Series</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Third - Radar Chart Only (1280px - 1920px) */}
            <div className="absolute right-0 top-0 w-[640px] h-full z-10">
                
                {/* Panel Background */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.85) 100%)'
                    }}
                />

                {/* Radar Chart - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                        className="relative"
                        style={{ animation: 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards', opacity: 0 }}
                    >
                        {/* Radar Glow */}
                        <div 
                            className="absolute inset-0 -m-16"
                            style={{
                                background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 55%)',
                                filter: 'blur(40px)'
                            }}
                        />

                        {/* Radar Title */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center">
                            <div className="text-orange-500/80 text-sm font-bold uppercase tracking-[0.2em]">Performance</div>
                        </div>

                        <RadarChart 
                            data={radarData} 
                            labels={radarLabels} 
                            size={450}
                            color="#f97316"
                            animated={true}
                        />
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-40px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(40px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.85); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
}
