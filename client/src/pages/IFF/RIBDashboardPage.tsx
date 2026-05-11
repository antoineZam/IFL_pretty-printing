import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Lock, Monitor, Settings, Tv, ChevronLeft, Flame, Swords, Database, Heart, Archive } from 'lucide-react';
import IFFBurgerMenu from '../../components/IFFBurgerMenu';
import { useRoutePreloader } from '../../utils/routePreloader';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    external?: boolean;
}

const RIBDashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [ribUnlocked, setRibUnlocked] = useState(false);
    const [ribKeyRequired, setRibKeyRequired] = useState(true);
    const navigate = useNavigate();
    const { onMouseEnter, onTouchStart } = useRoutePreloader();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        
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
            path: "/iff/match-control",
            icon: <Settings size={20} />,
        },
        {
            name: "RIB Unified Overlay",
            description: "Combined overlay for OBS",
            path: "/iff/unified-overlay",
            icon: <Monitor size={20} />,
            external: true
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: "Single Match Overlay",
            description: "Individual match display",
            path: "/iff/single-match-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Player Stats Overlay",
            description: "Player statistics display",
            path: "/iff/player-stats-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Part One Overlay",
            description: "Part one display",
            path: "/iff/part-one-overlay",
            icon: <Tv size={20} />,
            external: true
        },
        {
            name: "Stream Overlay",
            description: "Main stream display",
            path: "/iff/stream-overlay",
            icon: <Tv size={20} />,
            external: true
        },
    ];

    const ewgfItems: NavItem[] = [
        {
            name: "EWGF Player Import",
            description: "Fetch player data from ewgf.gg",
            path: "/iff/player-import",
            icon: <Database size={20} />,
        },
    ];

    const isLocked = ribKeyRequired && !ribUnlocked;

    return (
        <div className="min-h-screen bg-transparent">
            <IFFBurgerMenu />
            

            {/* Subtle background pattern */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pl-16 pr-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-none border border-[#10b981]/50 bg-gradient-to-br from-[#064e3b] to-[#022c22] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <Flame size={24} className="text-[#10b981]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">IFF Protocol</h1>
                            <p className="text-[#34d399]/70 text-sm uppercase tracking-widest font-mono">Interactive Fight Framework</p>
                        </div>
                        {isLocked && (
                            <span className="ml-auto px-3 py-1.5 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-none text-xs tracking-widest uppercase font-mono text-[#ef4444] flex items-center gap-2">
                                <Lock size={14} /> Access Locked
                            </span>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <div className="mb-8 p-6 rounded-none bg-[#020617]/80 backdrop-blur-sm border border-[#10b981]/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-none bg-[#10b981]/10 border border-[#10b981]/20">
                            <Swords size={32} className="text-[#10b981]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1 uppercase tracking-widest font-mono">IRON FIST FEDERATION</h2>
                            <p className="text-[#a7f3d0]/60 max-w-lg font-mono text-sm">
                                The ultimate competitive Tekken series featuring top players battling for glory. 
                                High-stakes matches with professional production quality.
                            </p>
                        </div>
                    </div>
                </div>
                        
                {isLocked ? (
                    <div className="text-center py-16 font-mono">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-none bg-[#ef4444]/10 border border-[#ef4444]/30 mb-6">
                            <Lock size={32} className="text-[#ef4444]" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2 uppercase tracking-widest">Access Required</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
                            You need the IFF access key to use these controls. Please enter the key from the main dashboard.
                        </p>
                        <Link 
                            to="/dashboard"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/20 transition-all uppercase tracking-widest text-sm"
                        >
                            <ChevronLeft size={18} />
                            Return to Dashboard
                        </Link>
                    </div>
                ) : (
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main Controls — Archived */}
                        <div>
                            <h3 className="text-[10px] font-bold text-[#10b981]/50 uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                                <div className="w-1 h-4 bg-[#10b981]/30 rounded-none" />
                                Main Controls
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-widest bg-[#020617] text-[#10b981]/50 border border-[#10b981]/30 ml-1">
                                    <Archive size={9} /> Archived
                                </span>
                            </h3>
                            <div className="space-y-3">
                                {controlItems.map((item) => (
                                    <div
                                        key={item.path}
                                        className="flex items-center gap-4 p-4 rounded-none border border-[#10b981]/20 bg-[#020617]/40 cursor-not-allowed opacity-50"
                                        title="This section is archived"
                                    >
                                        <div className="p-2.5 rounded-none bg-[#10b981]/5 text-[#10b981]/50 border border-[#10b981]/10">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#10b981]/50 line-through decoration-[#10b981]/50 tracking-widest uppercase font-mono text-sm">{item.name}</h3>
                                            <p className="text-[#10b981]/30 text-xs font-mono">{item.description}</p>
                                        </div>
                                        {item.external
                                            ? <ExternalLink size={16} className="text-[#10b981]/40" />
                                            : <ChevronLeft size={18} className="text-[#10b981]/40 rotate-180" />
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Overlays — Archived */}
                        <div>
                            <h3 className="text-[10px] font-bold text-[#10b981]/50 uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                                <div className="w-1 h-4 bg-[#10b981]/30 rounded-none" />
                                Stream Overlays
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-widest bg-[#020617] text-[#10b981]/50 border border-[#10b981]/30 ml-1">
                                    <Archive size={9} /> Archived
                                </span>
                            </h3>
                            <div className="space-y-3">
                                {overlayItems.map((item) => (
                                    <div
                                        key={item.path}
                                        className="flex items-center gap-4 p-4 rounded-none border border-[#10b981]/20 bg-[#020617]/40 cursor-not-allowed opacity-50"
                                        title="This section is archived"
                                    >
                                        <div className="p-2.5 rounded-none bg-[#10b981]/5 text-[#10b981]/50 border border-[#10b981]/10">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#10b981]/50 line-through decoration-[#10b981]/50 tracking-widest uppercase font-mono text-sm">{item.name}</h3>
                                            <p className="text-[#10b981]/30 text-xs font-mono">{item.description}</p>
                                        </div>
                                        <ExternalLink size={16} className="text-[#10b981]/40" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* EWGF Player Data Section */}
                    <div className="mt-8">
                        <h3 className="text-[10px] font-bold text-[#10b981] uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                            <div className="w-1 h-4 bg-[#10b981] rounded-none shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                            IFF Player Data
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {ewgfItems.map((item) => (
                                item.external ? (
                                    <Link 
                                        key={item.path} 
                                        to={item.path} 
                                        target="_blank"
                                        onMouseEnter={onMouseEnter(item.path)}
                                        onTouchStart={onTouchStart(item.path)}
                                    >
                                        <div className="flex items-center gap-4 p-4 rounded-none border border-[#10b981]/20 bg-[#020617]/60 hover:bg-[#020617]/90 transition-all group cyber-card">
                                            <div className="p-2.5 rounded-none bg-[#10b981]/10 text-[#10b981] group-hover:bg-[#10b981]/20 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white tracking-widest uppercase font-mono text-sm">{item.name}</h3>
                                                <p className="text-[#a7f3d0]/50 text-xs font-mono">{item.description}</p>
                                            </div>
                                            <ExternalLink size={16} className="text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ) : (
                                    <Link 
                                        key={item.path} 
                                        to={item.path}
                                        onMouseEnter={onMouseEnter(item.path)}
                                        onTouchStart={onTouchStart(item.path)}
                                    >
                                        <div className="flex items-center gap-4 p-4 rounded-none border border-[#10b981]/20 bg-[#020617]/60 hover:bg-[#020617]/90 transition-all group cyber-card">
                                            <div className="p-2.5 rounded-none bg-[#10b981]/10 text-[#10b981] group-hover:bg-[#10b981]/20 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white tracking-widest uppercase font-mono text-sm">{item.name}</h3>
                                                <p className="text-[#a7f3d0]/50 text-xs font-mono">{item.description}</p>
                                            </div>
                                            <ChevronLeft size={18} className="text-[#10b981] rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Love & War Section — Archived */}
                    <div className="mt-8">
                        <h3 className="text-[10px] font-bold text-[#10b981]/50 uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                            <div className="w-1 h-4 bg-[#10b981]/30 rounded-none" />
                            Love & War Tournament
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-widest bg-[#020617] text-[#10b981]/50 border border-[#10b981]/30 ml-1">
                                <Archive size={9} /> Archived
                            </span>
                        </h3>
                        <div
                            className="flex items-center gap-4 p-6 rounded-none border border-[#10b981]/20 bg-[#020617]/40 cursor-not-allowed opacity-50"
                            title="This section is archived"
                        >
                            <div className="p-3 rounded-none bg-[#10b981]/5 text-[#10b981]/50 border border-[#10b981]/10">
                                <Heart size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#10b981]/50 text-lg mb-1 line-through decoration-[#10b981]/50 tracking-widest uppercase font-mono text-sm">Love & War Dashboard</h3>
                                <p className="text-[#10b981]/30 text-xs font-mono">Manage 2v2 team tournaments, display team stats, and control live overlays</p>
                            </div>
                            <ChevronLeft size={20} className="text-[#10b981]/40 rotate-180" />
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RIBDashboardPage;

