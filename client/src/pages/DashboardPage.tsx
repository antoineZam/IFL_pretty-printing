import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutDashboard, ExternalLink } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        setKey(connectionKey);

        if (!connectionKey) {
            // Optional: Redirect to auth page if no key is found
            // navigate('/auth');
        }
    }, [searchParams]);

    const routes = [
        { name: "IFL Match Control", path: "/ifl/match-control" },
        { name: "IFL Match Overlay", path: "/ifl/match-overlay" },
        { name: "Tag Team Control", path: "/tag/match-control" },
        { name: "Tag Team Overlay", path: "/tag/match-overlay" },
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {routes.map((route, idx) => (
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
                            {/* This creates a cool 'scanline' effect over the iframe preview */}
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
        </div>
    );
};

export default DashboardPage;
