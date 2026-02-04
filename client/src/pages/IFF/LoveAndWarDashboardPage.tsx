import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Monitor, Settings, Tv, ChevronLeft, Heart, Swords, Trophy } from 'lucide-react';

interface NavItem {
    name: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    external?: boolean;
}

const LoveAndWarDashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [key, setKey] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
        
        setKey(connectionKey);
    }, [searchParams, navigate]);

    const controlItems: NavItem[] = [
        {
            name: "Team Management",
            description: "Create and manage Love & War teams",
            path: "/iff/love-and-war/control",
            icon: <Settings size={20} />,
        },
        {
            name: "Display Control",
            description: "Select which team to display on stream",
            path: "/iff/love-and-war/display",
            icon: <Monitor size={20} />,
        },
    ];

    const tournamentItems: NavItem[] = [
        {
            name: "Tournament Manager",
            description: "Create and manage Love & War tournaments",
            path: "/iff/love-and-war/tournaments",
            icon: <Trophy size={20} />,
        },
    ];

    const overlayItems: NavItem[] = [
        {
            name: "Team Stats Overlay",
            description: "Main team statistics display for OBS",
            path: "/iff/love-and-war/overlay",
            icon: <Tv size={20} />,
            external: true
        },
    ];

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
                    <Link to="/dashboard/rib?key=${key}" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-4">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to IFF Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Heart size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Love & War Dashboard</h1>
                            <p className="text-red-400/70 text-sm">Team-based Tournament Series</p>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-pink-500/5 to-transparent border border-red-500/20">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-red-500/20">
                            <Swords size={32} className="text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Love & War</h2>
                            <p className="text-gray-400 max-w-lg">
                                The ultimate 2v2 team tournament featuring the best duos in competitive Tekken. 
                                Manage teams and display their combined statistics live.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tournament Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                        <div className="w-1 h-4 bg-yellow-500 rounded-full" />
                        Tournament Management
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {tournamentItems.map((item) => (
                            <Link key={item.path} to={`${item.path}?key=${key}`}>
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-400 hover:bg-yellow-500/10 transition-all group">
                                    <div className="p-2.5 rounded-lg bg-yellow-500/20 text-yellow-400">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Control Pages */}
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                            <div className="w-1 h-4 bg-red-500 rounded-full" />
                            Control Pages
                        </h3>
                        <div className="space-y-3">
                            {controlItems.map((item) => (
                                <Link key={item.path} to={`${item.path}?key=${key}`}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-400 hover:bg-red-500/10 transition-all group">
                                        <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Stream Overlays */}
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                            <div className="w-1 h-4 bg-pink-500 rounded-full" />
                            Stream Overlays
                        </h3>
                        <div className="space-y-3">
                            {overlayItems.map((item) => (
                                item.external ? (
                                    <Link key={item.path} to={`${item.path}?key=${key}`} target="_blank">
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:border-pink-400 hover:bg-pink-500/10 transition-all group">
                                            <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                            <div className="text-gray-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link key={item.path} to={`${item.path}?key=${key}`}>
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:border-pink-400 hover:bg-pink-500/10 transition-all group">
                                            <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoveAndWarDashboardPage;
