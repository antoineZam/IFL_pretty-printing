import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Settings, Monitor, Tv, Swords, Gamepad2 } from 'lucide-react';
import { useRoutePreloader } from '../../utils/routePreloader';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    external?: boolean;
}

const IFF9DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { onMouseEnter, onTouchStart } = useRoutePreloader();
    const [connectionKey, setConnectionKey] = useState<string | null>(null);

    useEffect(() => {
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) {
            navigate('/auth');
            return;
        }
        setConnectionKey(key);
    }, [searchParams, navigate]);

    const keyQs = connectionKey ? `?key=${connectionKey}` : '';

    const controlItems: NavItem[] = [
        {
            name: 'Match Control',
            description: 'Build the week lineup and drive overlay / match cards',
            path: '/iff/iff-9/match-control',
            icon: <Settings size={20} />,
        },
        {
            name: 'Unified Overlay',
            description: 'All-in-one OBS browser source (idle / match / cards)',
            path: `/iff/iff-9/unified-overlay${keyQs}`,
            icon: <Monitor size={20} />,
            external: true,
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: 'Match Overlay',
            description: '1v1 in-game top bar',
            path: `/iff/iff-9/match-overlay${keyQs}`,
            icon: <Gamepad2 size={20} />,
            external: true,
        },
        {
            name: 'Match Cards',
            description: 'Glitch-in vs-card lineup screen',
            path: `/iff/iff-9/match-cards${keyQs}`,
            icon: <Tv size={20} />,
            external: true,
        },
    ];

    const renderCard = (item: NavItem) => (
        <Link
            key={item.path}
            to={item.path}
            target={item.external ? '_blank' : undefined}
            onMouseEnter={onMouseEnter(item.path)}
            onTouchStart={onTouchStart(item.path)}
        >
            <div className="flex items-center gap-4 p-4 rounded-none border border-[#10b981]/30 bg-[#020617]/60 hover:bg-[#020617]/90 hover:border-[#10b981] transition-all group cyber-card">
                <div className="p-2.5 rounded-none bg-[#10b981]/10 text-[#10b981] group-hover:bg-[#10b981]/20 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">
                    {item.icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-white tracking-widest uppercase font-mono text-sm">{item.name}</h3>
                    <p className="text-[#a7f3d0]/50 text-xs font-mono">{item.description}</p>
                </div>
                {item.external
                    ? <ExternalLink size={16} className="text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity" />
                    : <ChevronLeft size={18} className="text-[#10b981] rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-transparent">
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 40%)`
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <header className="mb-8">
                    <Link to="/dashboard/iff" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to IFF Protocol</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-none border border-[#10b981]/50 bg-gradient-to-br from-[#064e3b] to-[#022c22] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <Swords size={24} className="text-[#10b981]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">IFF9</h1>
                            <p className="text-[#34d399]/70 text-sm uppercase tracking-widest font-mono">Iron Fist Federation IX</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-[10px] font-bold text-[#10b981] uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                            <div className="w-1 h-4 bg-[#10b981] rounded-none shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                            Control
                        </h3>
                        <div className="space-y-3">{controlItems.map(renderCard)}</div>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold text-[#10b981] uppercase tracking-widest mb-3 px-1 flex items-center gap-2 font-mono">
                            <div className="w-1 h-4 bg-[#10b981] rounded-none shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                            Stream Overlays
                        </h3>
                        <div className="space-y-3">{overlayItems.map(renderCard)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IFF9DashboardPage;
