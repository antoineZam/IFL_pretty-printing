import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Database, Monitor, Users, Gamepad2, Trophy, Tv, ChevronLeft, TrendingUp } from 'lucide-react';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    external?: boolean;
}

interface TournamentStat {
    tournament_id: number;
    name: string;
    start_date: string;
    status: string;
    participant_count: number;
    match_count: number;
}

interface LeaderboardPlayer {
    rank: number;
    user_id: number;
    username: string;
    sponsor: string | null;
    country: string | null;
    points: number;
}

const TDEUDashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);
    const [tournamentStats, setTournamentStats] = useState<TournamentStat[]>([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        
        setKey(connectionKey);
        loadTournamentStats();
        loadLeaderboard();
    }, [searchParams, navigate]);

    const loadTournamentStats = async () => {
        try {
            const res = await fetch('/api/db/tournaments/stats');
            const data = await res.json();
            setTournamentStats(data.stats || []);
        } catch (err) {
            console.error('Error loading tournament stats:', err);
        } finally {
            setLoadingStats(false);
        }
    };

    const loadLeaderboard = async () => {
        try {
            const res = await fetch('/api/db/league/standings?limit=8');
            const data = await res.json();
            setLeaderboard(data.standings || []);
        } catch (err) {
            console.error('Error loading leaderboard:', err);
        } finally {
            setLoadingLeaderboard(false);
        }
    };

    const controlItems: NavItem[] = [
        {
            name: "Tournament Data",
            description: "Database, start.gg sync, match history",
            path: "/tournament-data",
            icon: <Database size={20} />,
        },
        {
            name: "IFL Match Control",
            description: "1v1 match overlay controller",
            path: "/ifl/match-control",
            icon: <Gamepad2 size={20} />,
        },
        {
            name: "Tag Team Control",
            description: "Team vs team overlay controller",
            path: "/tag/match-control",
            icon: <Users size={20} />,
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: "IFL Match Overlay",
            description: "1v1 stream overlay",
            path: "/ifl/match-overlay",
            icon: <Monitor size={20} />,
            external: true
        },
        {
            name: "Tag Team Overlay",
            description: "Team stream overlay",
            path: "/tag/match-overlay",
            icon: <Tv size={20} />,
            external: true
        },
    ];

    // Line Chart Component
    const LineChart = ({ data }: { data: TournamentStat[] }) => {
        const chartData = data.slice(-12);
        const maxValue = Math.max(...chartData.map(t => t.participant_count), 1);
        const minValue = Math.min(...chartData.map(t => t.participant_count));
        
        const padding = { top: 20, right: 15, bottom: 30, left: 35 };
        const width = 400;
        const height = 200;
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const points = chartData.map((tournament, idx) => {
            const x = padding.left + (idx / (chartData.length - 1 || 1)) * chartWidth;
            const y = padding.top + chartHeight - ((tournament.participant_count - minValue) / (maxValue - minValue || 1)) * chartHeight;
            return { x, y, data: tournament };
        });

        const linePath = points.map((p, idx) => 
            `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
        ).join(' ');

        const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

        const getLabel = (name: string) => {
            const match = name.match(/#(\d+)/);
            return match ? match[1] : '';
        };

        const yLabels = [maxValue, Math.round((maxValue + minValue) / 2), minValue];

        return (
            <div className="relative">
                <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {[0, 0.5, 1].map((ratio, idx) => (
                        <line
                            key={idx}
                            x1={padding.left}
                            y1={padding.top + chartHeight * ratio}
                            x2={width - padding.right}
                            y2={padding.top + chartHeight * ratio}
                            stroke="rgba(255,255,255,0.05)"
                            strokeDasharray="4,4"
                        />
                    ))}

                    {yLabels.map((label, idx) => (
                        <text
                            key={idx}
                            x={padding.left - 8}
                            y={padding.top + (idx / 2) * chartHeight + 4}
                            fill="#4b5563"
                            fontSize="10"
                            textAnchor="end"
                        >
                            {label}
                        </text>
                    ))}

                    {chartData.filter((_, i) => i % Math.ceil(chartData.length / 6) === 0 || i === chartData.length - 1).map((tournament) => {
                        const originalIdx = chartData.indexOf(tournament);
                        const x = padding.left + (originalIdx / (chartData.length - 1 || 1)) * chartWidth;
                        return (
                            <text
                                key={tournament.tournament_id}
                                x={x}
                                y={height - 8}
                                fill="#4b5563"
                                fontSize="9"
                                textAnchor="middle"
                            >
                                #{getLabel(tournament.name)}
                            </text>
                        );
                    })}

                    {points.length > 1 && (
                        <path d={areaPath} fill="url(#areaGradient)" />
                    )}

                    {points.length > 1 && (
                        <>
                            <path
                                d={linePath}
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                            />
                            <path
                                d={linePath}
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </>
                    )}

                    {points.map((point, idx) => (
                        <g key={point.data.tournament_id}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={idx === points.length - 1 ? 6 : 4}
                                fill={idx === points.length - 1 ? "#3b82f6" : "#1e3a5f"}
                                filter="url(#pointGlow)"
                                opacity={idx === points.length - 1 ? 0.6 : 0.3}
                            />
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={idx === points.length - 1 ? 4 : 3}
                                fill={idx === points.length - 1 ? "#60a5fa" : "#3b82f6"}
                                stroke={idx === points.length - 1 ? "#93c5fd" : "#1e40af"}
                                strokeWidth="1.5"
                            />
                        </g>
                    ))}

                    {points.length > 0 && (
                        <g>
                            <rect
                                x={points[points.length - 1].x - 14}
                                y={points[points.length - 1].y - 24}
                                width="28"
                                height="16"
                                rx="4"
                                fill="#3b82f6"
                                opacity="0.9"
                            />
                            <text
                                x={points[points.length - 1].x}
                                y={points[points.length - 1].y - 12}
                                fill="white"
                                fontSize="10"
                                fontWeight="600"
                                textAnchor="middle"
                            >
                                {chartData[chartData.length - 1]?.participant_count}
                            </text>
                        </g>
                    )}
                </svg>
            </div>
        );
    };

    const maxParticipants = Math.max(...tournamentStats.map(t => t.participant_count), 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Trophy size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">TDEU Dashboard</h1>
                            <p className="text-cyan-400/70 text-sm">Iron Fist League & Tag Team Tournaments</p>
                        </div>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Participation Trend Graph */}
                    <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-cyan-500/20">
                                    <TrendingUp size={14} className="text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="font-medium text-white text-sm">IFL Participation Trend</h2>
                                    <p className="text-gray-500 text-[10px]">Players per tournament</p>
                                </div>
                            </div>
                        </div>

                        {loadingStats ? (
                            <div className="p-8 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                            </div>
                        ) : tournamentStats.length === 0 ? (
                            <div className="p-8 text-center text-gray-600 text-sm">
                                No tournament data
                            </div>
                        ) : (
                            <div className="p-4">
                                <LineChart data={tournamentStats} />
                                <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Events</p>
                                        <p className="text-xl font-semibold text-white">{tournamentStats.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg</p>
                                        <p className="text-xl font-semibold text-white">
                                            {Math.round(tournamentStats.reduce((sum, t) => sum + t.participant_count, 0) / tournamentStats.length) || 0}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Peak</p>
                                        <p className="text-xl font-semibold text-cyan-400">{maxParticipants}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Matches</p>
                                        <p className="text-xl font-semibold text-white">
                                            {tournamentStats.reduce((sum, t) => sum + t.match_count, 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* League Standings */}
                    <div className="bg-gradient-to-b from-amber-500/5 to-transparent border border-amber-500/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-amber-500/20">
                                    <Trophy size={14} className="text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="font-medium text-white text-sm">Season Standings</h2>
                                    <p className="text-gray-500 text-[10px]">Top 8 players</p>
                                </div>
                            </div>
                        </div>

                        {loadingLeaderboard ? (
                            <div className="p-8 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                            </div>
                        ) : leaderboard.length === 0 ? (
                            <div className="p-8 text-center text-gray-600 text-sm">
                                No standings data
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {leaderboard.map((player) => (
                                    <div 
                                        key={player.user_id || player.rank}
                                        className={`px-4 py-2.5 flex items-center gap-3 ${
                                            player.rank <= 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''
                                        }`}
                                    >
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                            player.rank === 1 ? 'bg-amber-500 text-black' :
                                            player.rank === 2 ? 'bg-gray-400 text-black' :
                                            player.rank === 3 ? 'bg-amber-700 text-white' :
                                            'bg-white/10 text-gray-400'
                                        }`}>
                                            {player.rank}
                                        </div>

                                        {player.country ? (
                                            <img 
                                                src={`https://flagcdn.com/w20/${player.country.toLowerCase()}.png`}
                                                alt={player.country}
                                                className="w-5 h-auto"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="w-5" />
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-1.5 truncate">
                                                {player.sponsor && (
                                                    <span className="text-[10px] text-gray-500">{player.sponsor}</span>
                                                )}
                                                <span className={`text-sm font-medium truncate ${
                                                    player.rank === 1 ? 'text-amber-400' : 'text-white'
                                                }`}>
                                                    {player.username}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-lg font-bold ${
                                                player.rank === 1 ? 'text-amber-400' : 
                                                player.rank <= 3 ? 'text-amber-300/80' : 'text-white'
                                            }`}>
                                                {player.points}
                                            </p>
                                            <p className="text-[9px] text-gray-500 uppercase">pts</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Controls */}
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                            <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                            Control Panels
                        </h3>
                        <div className="space-y-3">
                            {controlItems.map((item) => (
                                <Link key={item.path} to={item.path}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all group">
                                        <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                        <ChevronLeft size={18} className="text-cyan-400 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Overlays */}
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-500 rounded-full" />
                            Stream Overlays
                        </h3>
                        <div className="space-y-3">
                            {overlayItems.map((item) => (
                                <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-400 hover:bg-blue-500/10 transition-all group">
                                        <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                        <ExternalLink size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TDEUDashboardPage;

