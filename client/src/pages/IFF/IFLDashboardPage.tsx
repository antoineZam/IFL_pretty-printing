import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Lock, Monitor, Settings, Tv, ChevronLeft, Flame, Swords, Database, Heart } from 'lucide-react';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    external?: boolean;
}

const RIBDashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);
    const [ribUnlocked, setRibUnlocked] = useState(false);
    const [ribKeyRequired, setRibKeyRequired] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        
        setKey(connectionKey);
        checkRibAccess();
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

    const controlItems: NavItem[] = [
        {
            name: "RIB Control Panel",
            description: "Master control for Run It Back matches",
            path: "/rib/match-control",
            icon: <Settings size={20} />,
        },
        {
            name: "RIB Unified Overlay",
            description: "Combined overlay for OBS",
            path: "/rib/unified-overlay",
            icon: <Monitor size={20} />,
            external: true
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: "Single Match Overlay",
            description: "Individual match display",
            path: "/rib/single-match-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Player Stats Overlay",
            description: "Player statistics display",
            path: "/rib/player-stats-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Part One Overlay",
            description: "Part one display",
            path: "/rib/part-one-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Stream Overlay",
            description: "Main stream display",
            path: "/rib/stream-overlay",
            icon: <Tv size={20} />,
            external: true
        },
    ];

    const ewgfItems: NavItem[] = [
        {
            name: "IFF Player Manager",
            description: "Manage player data and stats",
            path: "/iff/player-import",
            icon: <Database size={20} />,
        },
    ];

    const loveAndWarItems: NavItem[] = [
        {
            name: "Love & War Control",
            description: "Manage teams and team data",
            path: "/iff/love-and-war/control",
            icon: <Heart size={20} />,
        },
        {
            name: "Team Stats Display",
            description: "Select and display team stats on stream",
            path: "/iff/love-and-war/display",
            icon: <Tv size={20} />,
        },
        {
            name: "Unified Overlay",
            description: "OBS browser source for team stats",
            path: "/iff/love-and-war/overlay",
            icon: <Monitor size={20} />,
            external: true
        },
    ];

    const isLocked = ribKeyRequired && !ribUnlocked;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Flame size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">IFF Dashboard</h1>
                            <p className="text-red-400/70 text-sm">Run It Back Tournament Series</p>
                        </div>
                        {isLocked && (
                            <span className="ml-auto px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400 flex items-center gap-2">
                                <Lock size={14} /> Access Locked
                            </span>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent border border-red-500/20">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-red-500/20">
                            <Swords size={32} className="text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Run It Back</h2>
                            <p className="text-gray-400 max-w-lg">
                                The ultimate competitive Tekken series featuring top players battling for glory. 
                                High-stakes matches with professional production quality.
                            </p>
                        </div>
                    </div>
                </div>

                {isLocked ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                            <Lock size={32} className="text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Access Required</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            You need the RIB access key to use these controls. Please enter the key from the main dashboard.
                        </p>
                        <Link 
                            to="/dashboard"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                            <ChevronLeft size={18} />
                            Return to Dashboard
                        </Link>
                    </div>
                ) : (
                    <>
                    {/* RUN IT BACK Section - Wrapped in a visible container */}
                    <div className="p-6 rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-transparent mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-red-500/20">
                                <Swords size={20} className="text-red-400" />
                            </div>
                            <h2 className="text-lg font-bold text-white">Run It Back</h2>
                            <span className="px-2 py-0.5 bg-red-500/20 rounded text-red-400 text-xs font-medium uppercase tracking-wider">Event</span>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Main Controls */}
                            <div>
                                <h3 className="text-xs font-medium text-red-400/70 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-red-500 rounded-full" />
                                    Controls
                                </h3>
                                <div className="space-y-3">
                                    {controlItems.map((item) => (
                                        item.external ? (
                                            <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                                <div className="flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-400 hover:bg-red-500/10 transition-all group">
                                                    <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400">
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                                        <p className="text-gray-400 text-sm">{item.description}</p>
                                                    </div>
                                                    <ExternalLink size={16} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </Link>
                                        ) : (
                                            <Link key={item.path} to={item.path}>
                                                <div className="flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-400 hover:bg-red-500/10 transition-all group">
                                                    <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400">
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                                        <p className="text-gray-400 text-sm">{item.description}</p>
                                                    </div>
                                                    <ChevronLeft size={18} className="text-red-400 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Overlays */}
                            <div>
                                <h3 className="text-xs font-medium text-orange-400/70 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-orange-500 rounded-full" />
                                    Stream Overlays
                                </h3>
                                <div className="space-y-3">
                                    {overlayItems.map((item) => (
                                        <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                            <div className="flex items-center gap-4 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:border-orange-400 hover:bg-orange-500/10 transition-all group">
                                                <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-white">{item.name}</h3>
                                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                                </div>
                                                <ExternalLink size={16} className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EWGF Player Data Section */}
                    <div className="mt-8">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                            <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                            IFF Player Data
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {ewgfItems.map((item) => (
                                item.external ? (
                                    <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all group">
                                            <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white">{item.name}</h3>
                                                <p className="text-gray-400 text-sm">{item.description}</p>
                                            </div>
                                            <ExternalLink size={16} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ) : (
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
                                )
                            ))}
                        </div>
                    </div>

                    {/* Love & War Section */}
                    <div className="p-6 rounded-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/5 via-red-500/5 to-transparent">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-pink-500/20">
                                <Heart size={20} className="text-pink-400" />
                            </div>
                            <h2 className="text-lg font-bold text-white">Love & War</h2>
                            <span className="px-2 py-0.5 bg-pink-500/20 rounded text-pink-400 text-xs font-medium uppercase tracking-wider">Event</span>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {loveAndWarItems.map((item) => (
                                item.external ? (
                                    <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:border-pink-400 hover:bg-pink-500/10 transition-all group">
                                            <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white">{item.name}</h3>
                                                <p className="text-gray-400 text-sm">{item.description}</p>
                                            </div>
                                            <ExternalLink size={16} className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ) : (
                                    <Link key={item.path} to={item.path}>
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:border-pink-400 hover:bg-pink-500/10 transition-all group">
                                            <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white">{item.name}</h3>
                                                <p className="text-gray-400 text-sm">{item.description}</p>
                                            </div>
                                            <ChevronLeft size={18} className="text-pink-400 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RIBDashboardPage;

