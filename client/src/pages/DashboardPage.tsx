import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Lock, Database, Monitor, Settings, Users, Gamepad2, Trophy, Tv, ChevronRight, TrendingUp } from 'lucide-react';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    color: string;
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
    wins: number;
    losses: number;
    total_matches: number;
    tournaments_played: number;
    points: number;
}

const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);
    const [ribUnlocked, setRibUnlocked] = useState(false);
    const [ribKeyRequired, setRibKeyRequired] = useState(true);
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
        checkRibAccess();
        loadTournamentStats();
        loadLeaderboard();
    }, [searchParams, navigate]);

    const checkRibAccess = async () => {
        try {
            const requiredRes = await fetch('/api/rib-auth/required');
            const requiredData = await requiredRes.json();
            
            if (!requiredData.required) {
                setRibKeyRequired(false);
                setRibUnlocked(true);
                return;
            }

            const storedKey = localStorage.getItem('ribAccessKey');
            if (storedKey) {
                const res = await fetch('/api/rib-auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: storedKey })
                });
                
                if (res.ok) {
                    setRibUnlocked(true);
                }
            }
        } catch (err) {
            console.error('Error checking RIB access:', err);
        }
    };

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

    const mainNavItems: NavItem[] = [
        {
            name: "Tournament Data",
            description: "Database, start.gg sync, match history",
            path: "/tournament-data",
            icon: <Database size={20} />,
            color: "amber"
        },
        {
            name: "IFL Match Control",
            description: "1v1 match overlay controller",
            path: "/ifl/match-control",
            icon: <Gamepad2 size={20} />,
            color: "blue"
        },
        {
            name: "Tag Team Control",
            description: "Team vs team overlay controller",
            path: "/tag/match-control",
            icon: <Users size={20} />,
            color: "blue"
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: "IFL Match Overlay",
            description: "1v1 stream overlay",
            path: "/ifl/match-overlay",
            icon: <Monitor size={20} />,
            color: "blue",
            external: true
        },
        {
            name: "Tag Team Overlay",
            description: "Team stream overlay",
            path: "/tag/match-overlay",
            icon: <Tv size={20} />,
            color: "blue",
            external: true
        },
    ];

    const ribNavItems: NavItem[] = [
        {
            name: "RIB Control Panel",
            description: "Master control for Run It Back",
            path: "/rib/match-control",
            icon: <Settings size={20} />,
            color: "red"
        },
        {
            name: "RIB Unified Overlay",
            description: "Combined overlay for OBS",
            path: "/rib/unified-overlay",
            icon: <Monitor size={20} />,
            color: "orange",
            external: true
        },
    ];

    const ribOverlayItems: NavItem[] = [
        { name: "Single Match", path: "/rib/single-match-overlay", icon: <Tv size={14} />, color: "red", description: "", external: true },
        { name: "Player Stats", path: "/rib/player-stats-overlay", icon: <Tv size={14} />, color: "red", description: "", external: true },
        { name: "Part One", path: "/rib/part-one-overlay", icon: <Tv size={14} />, color: "red", description: "", external: true },
        { name: "Stream", path: "/rib/stream-overlay", icon: <Tv size={14} />, color: "red", description: "", external: true },
    ];

    const NavCard = ({ item, locked = false, compact = false }: { item: NavItem; locked?: boolean; compact?: boolean }) => {
        const colorClasses = {
            amber: "border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5",
            blue: "border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5",
            red: "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5",
            orange: "border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5",
        };
        
        const iconColors = {
            amber: "text-amber-400",
            blue: "text-cyan-400",
            red: "text-red-400",
            orange: "text-orange-400",
        };

        const content = (
            <div className={`
                relative rounded-xl border bg-white/[0.02] transition-all duration-200 group
                ${compact ? 'p-3' : 'p-4'}
                ${colorClasses[item.color as keyof typeof colorClasses]}
                ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}>
                <div className="flex items-center gap-3">
                    <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg bg-black/30 ${iconColors[item.color as keyof typeof iconColors]}`}>
                        {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-white ${compact ? 'text-sm' : 'text-sm'}`}>{item.name}</h3>
                        {item.description && !compact && (
                            <p className="text-gray-500 text-xs mt-0.5 truncate">{item.description}</p>
                        )}
                    </div>
                    <div className={`${iconColors[item.color as keyof typeof iconColors]} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {item.external ? <ExternalLink size={14} /> : <ChevronRight size={16} />}
                    </div>
                </div>
                {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                        <Lock size={16} className="text-red-400" />
                    </div>
                )}
            </div>
        );

        if (locked) return content;

        if (item.external) {
            return (
                <Link to={`${item.path}?key=${key}`} target="_blank">
                    {content}
                </Link>
            );
        }

        return <Link to={item.path}>{content}</Link>;
    };

    // Line Chart Component
    const LineChart = ({ data }: { data: TournamentStat[] }) => {
        const chartData = data.slice(-12); // Last 12 tournaments
        const maxValue = Math.max(...chartData.map(t => t.participant_count), 1);
        const minValue = Math.min(...chartData.map(t => t.participant_count));
        
        const padding = { top: 20, right: 15, bottom: 30, left: 35 };
        const width = 320;
        const height = 180;
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // Create points for the line
        const points = chartData.map((tournament, idx) => {
            const x = padding.left + (idx / (chartData.length - 1 || 1)) * chartWidth;
            const y = padding.top + chartHeight - ((tournament.participant_count - minValue) / (maxValue - minValue || 1)) * chartHeight;
            return { x, y, data: tournament };
        });

        // Create path for the line
        const linePath = points.map((p, idx) => 
            `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
        ).join(' ');

        // Create path for the gradient fill
        const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

        // Get tournament number for labels
        const getLabel = (name: string) => {
            const match = name.match(/#(\d+)/);
            return match ? match[1] : '';
        };

        // Y-axis labels
        const yLabels = [maxValue, Math.round((maxValue + minValue) / 2), minValue];

        return (
            <div className="relative">
                <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                    {/* Definitions for gradients and filters */}
                    <defs>
                        {/* Line gradient */}
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        
                        {/* Area fill gradient */}
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>

                        {/* Glow filter */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>

                        {/* Point glow */}
                        <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Grid lines */}
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

                    {/* Y-axis labels */}
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

                    {/* X-axis labels */}
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

                    {/* Area fill */}
                    {points.length > 1 && (
                        <path
                            d={areaPath}
                            fill="url(#areaGradient)"
                        />
                    )}

                    {/* Main line with glow */}
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

                    {/* Data points */}
                    {points.map((point, idx) => (
                        <g key={point.data.tournament_id}>
                            {/* Outer glow */}
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={idx === points.length - 1 ? 6 : 4}
                                fill={idx === points.length - 1 ? "#3b82f6" : "#1e3a5f"}
                                filter="url(#pointGlow)"
                                opacity={idx === points.length - 1 ? 0.6 : 0.3}
                            />
                            {/* Inner point */}
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

                    {/* Latest value label */}
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

    // Get max participant count for stats
    const maxParticipants = Math.max(...tournamentStats.map(t => t.participant_count), 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Trophy size={22} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-white tracking-tight">IFL Broadcast</h1>
                                <p className="text-gray-500 text-sm">Iron Fist League Control Center</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 text-xs font-medium">Connected</span>
                        </div>
                    </div>
                </header>

                {/* IFL Stats Row - Graph and Standings Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
                    {/* Participation Trend Graph */}
                    <div className="bg-gradient-to-b from-blue-500/5 to-transparent border border-blue-500/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-blue-500/20">
                                    <TrendingUp size={14} className="text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="font-medium text-white text-sm">IFL Participation Trend</h2>
                                    <p className="text-gray-500 text-[10px]">Players per tournament</p>
                                </div>
                            </div>
                        </div>

                        {loadingStats ? (
                            <div className="p-8 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
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
                                    <h2 className="font-medium text-white text-sm">League Standings</h2>
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
                                        className={`px-4 py-2 flex items-center gap-3 ${
                                            player.rank <= 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
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
                                            <div className="flex items-baseline gap-1 truncate">
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

                {/* IRON FIST LEAGUE / TDEU Section */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Iron Fist League / TDEU</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Controls */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">Controls</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {mainNavItems.map((item) => (
                                    <NavCard key={item.path} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Overlays */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">Overlays</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {overlayItems.map((item) => (
                                    <NavCard key={item.path} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* RUN IT BACK Section */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Run It Back</h2>
                        {ribKeyRequired && !ribUnlocked && (
                            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 flex items-center gap-1">
                                <Lock size={10} /> Locked
                            </span>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main Controls */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">Controls</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {ribNavItems.map((item) => (
                                    <NavCard 
                                        key={item.path} 
                                        item={item} 
                                        locked={ribKeyRequired && !ribUnlocked}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Overlays */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">Overlays</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {ribOverlayItems.map((item) => (
                                    <NavCard key={item.path} item={item} compact />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-white/5">
                    <p className="text-center text-gray-600 text-xs">
                        Iron Fist League Broadcast System
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default DashboardPage;
