import { useEffect, useState, useMemo, memo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Database, Monitor, Users, Gamepad2, Trophy, Tv, ChevronLeft, TrendingUp } from 'lucide-react';
import { getCountryCode } from '../../utils/countries';
import TDEUBurgerMenu from '../../components/TDEUBurgerMenu';
import { useRoutePreloader } from '../../utils/routePreloader';

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
    week_number?: number;
}

interface LeaderboardPlayer {
    rank: number;
    user_id: number;
    username: string;
    sponsor: string | null;
    country: string | null;
    points: number;
}

// ---------------------------------------------------------------------------
// Smooth monotone cubic bezier through a set of points (no overshoot).
// Each segment uses horizontal control points at the mid-X so the curve
// stays flat at the endpoints — ideal for a time-series chart.
// ---------------------------------------------------------------------------
interface ChartPoint { x: number; y: number; data: TournamentStat }

function smoothPath(pts: ChartPoint[]): string {
    if (pts.length < 2) return '';
    const d: string[] = [`M ${pts[0].x} ${pts[0].y}`];
    for (let i = 1; i < pts.length; i++) {
        const cpX = (pts[i - 1].x + pts[i].x) / 2;
        d.push(`C ${cpX} ${pts[i - 1].y} ${cpX} ${pts[i].y} ${pts[i].x} ${pts[i].y}`);
    }
    return d.join(' ');
}

function getWeekLabel(tournament: TournamentStat): string {
    if (tournament.week_number) return String(tournament.week_number);
    const m =
        tournament.name.match(/\[Week\s*(\d+)\]/i) ||
        tournament.name.match(/Week\s*(\d+)/i) ||
        tournament.name.match(/#(\d+)/);
    return m ? m[1] : '';
}

const PADDING = { top: 24, right: 20, bottom: 30, left: 36 } as const;
const W = 500;
const H = 200;
const CW = W - PADDING.left - PADDING.right;
const CH = H - PADDING.top - PADDING.bottom;

const LineChart = memo(function LineChart({ data }: { data: TournamentStat[] }) {
    const chartData = useMemo(() => data.slice(-12), [data]);

    const { points, maxValue, minValue } = useMemo(() => {
        const max = Math.max(...chartData.map(t => t.participant_count), 1);
        const min = Math.min(...chartData.map(t => t.participant_count));
        const span = Math.max(chartData.length - 1, 1);
        const pts: ChartPoint[] = chartData.map((t, i) => ({
            x: PADDING.left + (i / span) * CW,
            y: PADDING.top + CH - ((t.participant_count - min) / (max - min || 1)) * CH,
            data: t,
        }));
        return { points: pts, maxValue: max, minValue: min };
    }, [chartData]);

    const linePath = useMemo(() => smoothPath(points), [points]);

    const areaPath = useMemo(() => {
        if (points.length < 2) return '';
        const base = PADDING.top + CH;
        return `${linePath} L ${points[points.length - 1].x} ${base} L ${points[0].x} ${base} Z`;
    }, [linePath, points]);

    const xLabelSet = useMemo(() => {
        const step = Math.ceil(chartData.length / 6);
        const s = new Set<number>();
        for (let i = 0; i < chartData.length; i += step) s.add(i);
        s.add(chartData.length - 1);
        return s;
    }, [chartData]);

    const last = points[points.length - 1];
    const lastValue = chartData[chartData.length - 1]?.participant_count;
    const yMid = Math.round((maxValue + minValue) / 2);

    return (
        <div className="relative">
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
                <defs>
                    <linearGradient id="tcLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="tcArea" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <filter id="tcGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* clip so the curve never bleeds outside the chart box */}
                    <clipPath id="tcClip">
                        <rect x={PADDING.left} y={PADDING.top} width={CW} height={CH} />
                    </clipPath>
                </defs>

                {/* grid lines */}
                {[0, 0.5, 1].map((r, i) => (
                    <line
                        key={i}
                        x1={PADDING.left} y1={PADDING.top + CH * r}
                        x2={W - PADDING.right} y2={PADDING.top + CH * r}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="3,5"
                    />
                ))}

                {/* Y-axis labels */}
                {[maxValue, yMid, minValue].map((v, i) => (
                    <text
                        key={i}
                        x={PADDING.left - 6}
                        y={PADDING.top + (i / 2) * CH + 4}
                        fill="#4b5563" fontSize="9" textAnchor="end"
                    >
                        {v}
                    </text>
                ))}

                {/* X-axis labels */}
                {chartData.map((t, i) => {
                    if (!xLabelSet.has(i)) return null;
                    const x = PADDING.left + (i / Math.max(chartData.length - 1, 1)) * CW;
                    const label = getWeekLabel(t);
                    return label ? (
                        <text key={t.tournament_id} x={x} y={H - 6}
                            fill="#4b5563" fontSize="9" textAnchor="middle">
                            W{label}
                        </text>
                    ) : null;
                })}

                {/* area fill */}
                {points.length > 1 && (
                    <path d={areaPath} fill="url(#tcArea)" clipPath="url(#tcClip)" />
                )}

                {/* glow copy of line */}
                {points.length > 1 && (
                    <path d={linePath} fill="none"
                        stroke="url(#tcLine)" strokeWidth="5"
                        strokeLinecap="round" strokeLinejoin="round"
                        filter="url(#tcGlow)" opacity="0.45"
                        clipPath="url(#tcClip)"
                    />
                )}

                {/* main line */}
                {points.length > 1 && (
                    <path d={linePath} fill="none"
                        stroke="url(#tcLine)" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        clipPath="url(#tcClip)"
                    />
                )}

                {/* data points */}
                {points.map((p, i) => {
                    const isLast = i === points.length - 1;
                    return (
                        <g key={p.data.tournament_id}>
                            {isLast && (
                                <circle cx={p.x} cy={p.y} r="9"
                                    fill="#06b6d4" opacity="0.12" />
                            )}
                            <circle cx={p.x} cy={p.y}
                                r={isLast ? 4 : 2.5}
                                fill={isLast ? '#06b6d4' : '#0c4a5a'}
                                stroke={isLast ? '#67e8f9' : '#06b6d4'}
                                strokeWidth={isLast ? 1.5 : 1}
                            />
                        </g>
                    );
                })}

                {/* latest-value tooltip */}
                {last && lastValue != null && (
                    <g>
                        <rect
                            x={last.x - 16} y={last.y - 26}
                            width="32" height="16" rx="4"
                            fill="#0e7490" stroke="#06b6d4" strokeWidth="0.5"
                            opacity="0.92"
                        />
                        <text
                            x={last.x} y={last.y - 14}
                            fill="#e0f2fe" fontSize="9" fontWeight="600" textAnchor="middle"
                        >
                            {lastValue}
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
});

// ---------------------------------------------------------------------------

const TDEUDashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [tournamentStats, setTournamentStats] = useState<TournamentStat[]>([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
    const navigate = useNavigate();
    const { onMouseEnter, onTouchStart } = useRoutePreloader();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        
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
            name: "IFL Top 8",
            description: "Tournament standings display",
            path: "/tdeu/ifl/top8",
            icon: <Trophy size={20} />,
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
            name: "IFL Top 8 Overlay",
            description: "Tournament standings overlay",
            path: "/tdeu/ifl/top8/overlay",
            icon: <Trophy size={20} />,
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

    const maxParticipants = useMemo(
        () => Math.max(...tournamentStats.map(t => t.participant_count), 0),
        [tournamentStats]
    );

    return (
        <div className="min-h-screen bg-transparent">
            <TDEUBurgerMenu />
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl pl-6 pr-6 py-8">
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
                    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden">
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
                    <div className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-xl overflow-hidden">
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
                                {leaderboard.map((player) => {
                                    const countryCode = getCountryCode(player.country);
                                    return (
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

                                            {countryCode ? (
                                                <img 
                                                    src={`https://flagcdn.com/w20/${countryCode}.png`}
                                                    alt={player.country || ''}
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
                                    );
                                })}
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
                                <Link 
                                    key={item.path} 
                                    to={item.path}
                                    onMouseEnter={onMouseEnter(item.path)}
                                    onTouchStart={onTouchStart(item.path)}
                                >
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/30 bg-black/40 backdrop-blur-md hover:border-cyan-400 hover:bg-cyan-900/40 transition-all group">
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
                                <Link 
                                    key={item.path} 
                                    to={item.path} 
                                    target="_blank"
                                    onMouseEnter={onMouseEnter(item.path)}
                                    onTouchStart={onTouchStart(item.path)}
                                >
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-500/30 bg-black/40 backdrop-blur-md hover:border-blue-400 hover:bg-blue-900/40 transition-all group">
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

