import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, ChevronRight, Lock } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const DashboardPage = () => {
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
        
        // Check RIB access
        checkRibAccess();

    }, [searchParams, navigate]);

    const checkRibAccess = async () => {
        try {
            // Check if RIB key is required
            const requiredRes = await fetch('/api/rib-auth/required');
            const requiredData = await requiredRes.json();
            
            if (!requiredData.required) {
                setRibKeyRequired(false);
                setRibUnlocked(true);
                return;
            }

            // Check if we have a valid stored key
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

    const iflRoutes = [
        { name: "IFL Match Control", path: "/ifl/match-control" },
        { name: "IFL Match Overlay", path: "/ifl/match-overlay" },
        { name: "Tag Team Control", path: "/tag/match-control" },
        { name: "Tag Team Overlay", path: "/tag/match-overlay" },
    ];

    const ribRoutes = [
        { name: "RIB Match Control", path: "/rib/match-control" },
        { name: "RIB Unified Overlay", path: "/rib/unified-overlay", primary: true },
        { name: "RIB Single Match Overlay", path: "/rib/single-match-overlay" },
        { name: "RIB Player Stats Overlay", path: "/rib/player-stats-overlay" },
        { name: "RIB Part One Overlay", path: "/rib/part-one-overlay" },
        { name: "RIB Stream Overlay", path: "/rib/stream-overlay" },
    ];

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-12 animate-slide-up">
                <div>
                    <h1 className="text-4xl font-archivo-expanded-bold text-white">DASHBOARD</h1>
                    <p className="text-gray-500 mt-1">Welcome to the IFL broadcast network.</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE
                </div>
            </header>

            {/* IFL Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    TDEU Overlays
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {iflRoutes.map((route, idx) => (
                        <GlassCard key={route.path} className={`p-1 overflow-hidden group animate-slide-up`} style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="bg-surfaceHighlight/50 p-4 flex justify-between items-center border-b border-white/5">
                                <h3 className="font-bold text-white tracking-wide">{route.name}</h3>
                                <Link 
                                    to={`${route.path}?key=${key}`}
                                    target="_blank"
                                    className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1"
                                >
                                    OPEN NEW WINDOW <ExternalLink size={12} />
                                </Link>
                            </div>
                            <div className="relative h-64 bg-black">
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-20" />
                                <iframe
                                    src={`${route.path}?key=${key}`}
                                    className="w-[1920px] h-[1080px] border-0 origin-top-left scale-[0.335] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    title={route.name}
                                />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Run It Back Section */}
            <section className="relative">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                    Run It Back
                    {ribKeyRequired && !ribUnlocked && (
                        <span className="ml-2 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 flex items-center gap-1">
                            <Lock size={12} /> Locked
                        </span>
                    )}
                </h2>
                
                {/* Blur overlay when locked */}
                {ribKeyRequired && !ribUnlocked && (
                    <div className="absolute inset-0 top-12 z-10 backdrop-blur-md bg-black/40 rounded-xl flex items-center justify-center">
                        <div className="text-center p-8">
                            <Lock size={48} className="text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Section Locked</h3>
                            <p className="text-gray-400 mb-4">This section requires an additional access key</p>
                            <Link 
                                to="/rib/match-control"
                                className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                            >
                                Enter Access Key
                            </Link>
                        </div>
                    </div>
                )}
                
                {/* Quick Access Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Link 
                        to="/rib/match-control"
                        className="block bg-gradient-to-r from-red-600/20 to-red-900/20 border border-red-500/30 rounded-xl p-4 hover:border-red-500/50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-red-400">RIB Control Panel</h3>
                                <p className="text-gray-400 text-sm">Manage overlays, match cards, and player stats</p>
                            </div>
                            <ChevronRight size={24} className="text-red-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                    <Link 
                        to={`/rib/unified-overlay?key=${key}`}
                        target="_blank"
                        className="block bg-gradient-to-r from-orange-600/20 to-red-900/20 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-orange-400">RIB Unified Overlay</h3>
                                <p className="text-gray-400 text-sm">Single display for all RIB overlays (for OBS)</p>
                            </div>
                            <ExternalLink size={20} className="text-orange-400 group-hover:scale-110 transition-transform" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {ribRoutes.filter(r => r.path !== '/rib/match-control').map((route, idx) => (
                        <GlassCard key={route.path} className={`p-1 overflow-hidden group animate-slide-up`} style={{ animationDelay: `${(idx + iflRoutes.length) * 100}ms` }}>
                            <div className="bg-surfaceHighlight/50 p-4 flex justify-between items-center border-b border-white/5">
                                <h3 className="font-bold text-white tracking-wide">{route.name}</h3>
                                <Link 
                                    to={`${route.path}?key=${key}`}
                                    target="_blank"
                                    className="text-xs font-bold text-red-400 hover:text-white transition-colors flex items-center gap-1"
                                >
                                    OPEN NEW WINDOW <ExternalLink size={12} />
                                </Link>
                            </div>
                            <div className="relative h-64 bg-black">
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-20" />
                                <iframe
                                    src={`${route.path}?key=${key}`}
                                    className="w-[1920px] h-[1080px] border-0 origin-top-left scale-[0.335] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    title={route.name}
                                />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
