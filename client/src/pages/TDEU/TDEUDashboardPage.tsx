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
    event_id?: number;
    name: string;
    event_name?: string;
    slug?: string;
    season?: number;
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
// Participation chart.
//
// One line per season, every season on one shared scale, plotted against each
// season's own running tournament count -- so week 1 of season 3 sits above week
// 1 of season 2 and the seasons can be read against each other rather than end
// to end. The scale is computed over every season and does not move when a
// season is hidden, so a comparison never silently rescales under the reader.
//
// Season 1's editions are numbered from #4 on start.gg, and its first five ran
// inside a single tournament, which is why the x position is the ordinal within
// the season and the edition number is carried in the tooltip instead.
// ---------------------------------------------------------------------------

// Categorical slots, stepped for a dark surface, in fixed order. The colour
// follows the season, not the series' position on screen, so hiding a season
// never repaints the ones left behind.
const SEASON_COLORS = ['#3987e5', '#d95926', '#199e70', '#c98500'];

function seasonColor(season: number): string {
    return SEASON_COLORS[(season - 1) % SEASON_COLORS.length];
}

interface SeasonSeries {
    season: number;
    label: string;
    color: string;
    points: TournamentStat[];
}

interface ChartPoint { x: number; y: number; data: TournamentStat }

// Smooth monotone cubic bezier through a set of points (no overshoot).
// Each segment uses horizontal control points at the mid-X so the curve
// stays flat at the endpoints — ideal for a time-series chart.
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

function groupBySeason(stats: TournamentStat[]): SeasonSeries[] {
    const bySeason = new Map<number, TournamentStat[]>();

    for (const stat of stats) {
        const season = stat.season ?? 0;
        if (!bySeason.has(season)) bySeason.set(season, []);
        bySeason.get(season)!.push(stat);
    }

    return [...bySeason.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([season, points]) => ({
            season,
            label: season ? `Season ${season}` : 'Unsorted',
            color: seasonColor(season || SEASON_COLORS.length),
            points: [...points].sort((a, b) =>
                (a.week_number ?? 0) - (b.week_number ?? 0) ||
                Date.parse(a.start_date || '') - Date.parse(b.start_date || '')),
        }));
}

// Axis bounds on round numbers, wide enough to hold every season.
const TICK_STEPS = [5, 10, 20, 25, 50, 100];

function niceBounds(min: number, max: number): { lo: number; hi: number; step: number } {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return { lo: 0, hi: 100, step: 25 };
    // The smallest round step that fits the spread in about four divisions:
    // a coarser target rounds 37..119 out to a 0..150 axis, leaving the seasons
    // squashed into the middle half of the chart.
    const step = TICK_STEPS.find(s => (max - min) / s <= 4) ?? TICK_STEPS[TICK_STEPS.length - 1];
    const lo = Math.max(0, Math.floor(min / step) * step);
    const hi = Math.ceil(max / step) * step;
    return { lo, hi: hi > lo ? hi : lo + step, step };
}

const PADDING = { top: 18, right: 54, bottom: 30, left: 34 } as const;
const W = 560;
const H = 230;
const CW = W - PADDING.left - PADDING.right;
const CH = H - PADDING.top - PADDING.bottom;

const ParticipationChart = memo(function ParticipationChart({ data }: { data: TournamentStat[] }) {
    const [hidden, setHidden] = useState<Set<number>>(new Set());
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const series = useMemo(() => groupBySeason(data), [data]);
    const visible = useMemo(() => series.filter(s => !hidden.has(s.season)), [series, hidden]);

    // Both scales are taken over every season, hidden or not: toggling a season
    // off is a way to read the chart, not a way to change what it measures.
    const { lo, hi, step } = useMemo(() => {
        const counts = data.map(d => d.participant_count).filter(n => Number.isFinite(n));
        return niceBounds(Math.min(...counts), Math.max(...counts));
    }, [data]);

    const columns = useMemo(
        () => Math.max(...series.map(s => s.points.length), 1),
        [series]);

    const xFor = (index: number) => PADDING.left + (index / Math.max(columns - 1, 1)) * CW;
    const yFor = (value: number) => PADDING.top + CH - ((value - lo) / (hi - lo || 1)) * CH;

    const plotted = useMemo(() => visible.map(s => ({
        ...s,
        chartPoints: s.points.map((point, i) => ({
            x: xFor(i),
            y: yFor(point.participant_count),
            data: point,
        })),
    })), [visible, lo, hi, columns]);

    const ticks = useMemo(() => {
        const out: number[] = [];
        for (let v = lo; v <= hi; v += step) out.push(v);
        return out;
    }, [lo, hi, step]);

    const xTicks = useMemo(() => {
        const every = Math.ceil(columns / 8);
        const out: number[] = [];
        for (let i = 0; i < columns; i += every) out.push(i);
        if (out[out.length - 1] !== columns - 1) out.push(columns - 1);
        return out;
    }, [columns]);

    // Direct labels at each line's end, nudged apart so two seasons ending at
    // similar counts do not print on top of each other.
    const endLabels = useMemo(() => {
        const labels = plotted
            .filter(s => s.chartPoints.length > 0)
            .map(s => {
                const last = s.chartPoints[s.chartPoints.length - 1];
                return { season: s.season, color: s.color, x: last.x, y: last.y };
            })
            .sort((a, b) => a.y - b.y);

        for (let i = 1; i < labels.length; i++) {
            if (labels[i].y - labels[i - 1].y < 11) labels[i].y = labels[i - 1].y + 11;
        }
        return labels;
    }, [plotted]);

    const toggleSeason = (season: number) => {
        setHidden(prev => {
            const next = new Set(prev);
            // Never hide the last visible season -- an empty chart is not a view.
            if (next.has(season)) next.delete(season);
            else if (visible.length > 1) next.add(season);
            return next;
        });
    };

    const handleMove = (e: React.MouseEvent<SVGRectElement>) => {
        const box = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - box.left) / (box.width || 1);
        const index = Math.round(ratio * Math.max(columns - 1, 1));
        setHoverIndex(Math.min(Math.max(index, 0), columns - 1));
    };

    const hovered = hoverIndex === null ? [] : plotted
        .map(s => ({ series: s, point: s.chartPoints[hoverIndex] }))
        .filter((row) => Boolean(row.point));

    return (
        <div>
            <div className="relative">
                <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img"
                    aria-label="Sign-ups per tournament, compared across seasons">
                    <defs>
                        <clipPath id="pcClip">
                            <rect x={PADDING.left} y={PADDING.top} width={CW} height={CH} />
                        </clipPath>
                    </defs>

                    {/* grid — hairlines, one shade off the surface */}
                    {ticks.map(value => (
                        <line key={`g${value}`}
                            x1={PADDING.left} y1={yFor(value)}
                            x2={PADDING.left + CW} y2={yFor(value)}
                            stroke="rgba(255,255,255,0.06)" strokeWidth="1"
                        />
                    ))}

                    {/* Y-axis labels */}
                    {ticks.map(value => (
                        <text key={`y${value}`} x={PADDING.left - 6} y={yFor(value) + 3}
                            fill="#6b7280" fontSize="9" textAnchor="end">
                            {value}
                        </text>
                    ))}

                    {/* X-axis labels — the nth tournament of each season */}
                    {xTicks.map(i => (
                        <text key={`x${i}`} x={xFor(i)} y={H - 12} fill="#6b7280" fontSize="9" textAnchor="middle">
                            {i + 1}
                        </text>
                    ))}
                    <text x={PADDING.left + CW / 2} y={H - 1} fill="#4b5563" fontSize="8" textAnchor="middle">
                        nth tournament of the season
                    </text>

                    {/* crosshair */}
                    {hoverIndex !== null && (
                        <line x1={xFor(hoverIndex)} y1={PADDING.top}
                            x2={xFor(hoverIndex)} y2={PADDING.top + CH}
                            stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    )}

                    {/* one line per season */}
                    {plotted.map(s => (
                        <g key={s.season}>
                            {s.chartPoints.length > 1 && (
                                <path d={smoothPath(s.chartPoints)} fill="none"
                                    stroke={s.color} strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    clipPath="url(#pcClip)" />
                            )}
                            {/* a season with a single tournament has no line to draw */}
                            {s.chartPoints.length === 1 && (
                                <circle cx={s.chartPoints[0].x} cy={s.chartPoints[0].y} r="3.5"
                                    fill={s.color} stroke="#000" strokeWidth="2" />
                            )}
                        </g>
                    ))}

                    {/* hovered values, ringed in the surface colour so overlapping dots stay apart */}
                    {hovered.map(({ series: s, point }) => (
                        <circle key={`h${s.season}`} cx={point.x} cy={point.y} r="4"
                            fill={s.color} stroke="#000" strokeWidth="2" />
                    ))}

                    {/* direct labels */}
                    {endLabels.map(label => (
                        <g key={`l${label.season}`}>
                            <circle cx={label.x + 8} cy={label.y} r="2.5" fill={label.color} />
                            <text x={label.x + 14} y={label.y + 3} fill="#9ca3af" fontSize="9">
                                S{label.season}
                            </text>
                        </g>
                    ))}

                    {/* hover surface */}
                    <rect x={PADDING.left} y={PADDING.top} width={CW} height={CH}
                        fill="transparent" style={{ cursor: 'crosshair' }}
                        onMouseMove={handleMove}
                        onMouseLeave={() => setHoverIndex(null)} />
                </svg>

                {hoverIndex !== null && hovered.length > 0 && (
                    <div
                        className="absolute pointer-events-none bg-black/90 border border-white/10 rounded-lg px-2.5 py-2 text-[11px] shadow-xl"
                        style={{
                            left: `${(xFor(hoverIndex) / W) * 100}%`,
                            top: 6,
                            transform: hoverIndex > columns / 2 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
                        }}
                    >
                        <p className="text-gray-500 mb-1">Tournament {hoverIndex + 1}</p>
                        {hovered.map(({ series: s, point }) => (
                            <div key={`t${s.season}`} className="flex items-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                <span className="text-gray-400">S{s.season}</span>
                                {getWeekLabel(point.data) && (
                                    <span className="text-gray-600">#{getWeekLabel(point.data)}</span>
                                )}
                                <span className="text-white font-medium ml-auto">{point.data.participant_count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* legend — identity never rests on colour alone */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {series.map(s => {
                    const isHidden = hidden.has(s.season);
                    return (
                        <button key={s.season} onClick={() => toggleSeason(s.season)}
                            className={`flex items-center gap-1.5 text-[11px] transition-opacity ${
                                isHidden ? 'opacity-35' : 'opacity-100'
                            }`}
                            aria-pressed={!isHidden}
                        >
                            <span className="w-3 h-[2px] rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="text-gray-300">{s.label}</span>
                            <span className="text-gray-600">{s.points.length}</span>
                        </button>
                    );
                })}
            </div>
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

    // Per-season totals under the chart, so the comparison is available as
    // numbers and not only as three lines.
    const seasonSummaries = useMemo(
        () => groupBySeason(tournamentStats).map(s => ({
            season: s.season,
            events: s.points.length,
            average: Math.round(s.points.reduce((sum, t) => sum + t.participant_count, 0) / s.points.length) || 0,
            peak: Math.max(...s.points.map(t => t.participant_count), 0),
        })),
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
                                    <p className="text-gray-500 text-[10px]">Sign-ups per tournament, season against season</p>
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
                                <ParticipationChart data={tournamentStats} />
                                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                    <div className="grid grid-cols-4 gap-4 text-[10px] text-gray-500 uppercase tracking-wider">
                                        <span>Season</span>
                                        <span>Events</span>
                                        <span>Avg</span>
                                        <span>Peak</span>
                                    </div>
                                    {seasonSummaries.map(summary => (
                                        <div key={summary.season} className="grid grid-cols-4 gap-4 items-center">
                                            <span className="flex items-center gap-1.5 text-sm text-gray-300">
                                                <span className="w-3 h-[2px] rounded-full shrink-0"
                                                    style={{ backgroundColor: seasonColor(summary.season) }} />
                                                S{summary.season}
                                            </span>
                                            <span className="text-lg font-semibold text-white">{summary.events}</span>
                                            <span className="text-lg font-semibold text-white">{summary.average}</span>
                                            <span className="text-lg font-semibold text-cyan-400">{summary.peak}</span>
                                        </div>
                                    ))}
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

