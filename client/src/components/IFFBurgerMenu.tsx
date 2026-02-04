import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { 
    Menu, X, Home, Settings, Monitor, Tv, Users, Trophy, 
    Heart, Swords, LayoutDashboard, UserCircle, Layers,
    ChevronDown, ChevronRight, ExternalLink
} from 'lucide-react';

interface NavSection {
    title: string;
    icon: React.ReactNode;
    items: NavItem[];
    defaultOpen?: boolean;
}

interface NavItem {
    name: string;
    path: string;
    icon?: React.ReactNode;
    isOverlay?: boolean;
}

const IFFBurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'rib', 'lnw']);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => 
            prev.includes(section) 
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const navSections: NavSection[] = [
        {
            title: 'Main',
            icon: <LayoutDashboard size={18} />,
            defaultOpen: true,
            items: [
                { name: 'IFF Dashboard', path: '/dashboard/rib', icon: <Home size={16} /> },
                { name: 'Player Management', path: '/iff/player-import', icon: <UserCircle size={16} /> },
            ]
        },
        {
            title: 'Run It Back Event',
            icon: <Swords size={18} />,
            defaultOpen: true,
            items: [
                { name: 'Match Control', path: '/rib/match-control', icon: <Settings size={16} /> },
                { name: 'Match Cards Editor', path: '/rib/match-cards-editor', icon: <Settings size={16} /> },
                { name: 'Unified Overlay', path: '/rib/unified-overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Single Match Overlay', path: '/rib/single-match-overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Player Stats Overlay', path: '/rib/player-stats-overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Part One Overlay', path: '/rib/part-one-overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Stream Overlay', path: '/rib/stream-overlay', icon: <Tv size={16} />, isOverlay: true },
            ]
        },
        {
            title: 'Love & War',
            icon: <Heart size={18} />,
            defaultOpen: true,
            items: [
                { name: 'L&W Dashboard', path: '/iff/love-and-war', icon: <LayoutDashboard size={16} /> },
                { name: 'Team Management', path: '/iff/love-and-war/control', icon: <Users size={16} /> },
                { name: 'Display Control', path: '/iff/love-and-war/display', icon: <Monitor size={16} /> },
                { name: 'Tournaments', path: '/iff/love-and-war/tournaments', icon: <Trophy size={16} /> },
                { name: 'Team Stats Overlay', path: '/iff/love-and-war/overlay', icon: <Tv size={16} />, isOverlay: true },
            ]
        },
    ];

    return (
        <>
            {/* Burger Button - Fixed Position */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 p-3 bg-red-600 hover:bg-red-700 border-2 border-red-500 rounded-xl shadow-xl shadow-red-500/20 transition-all group"
                style={{ zIndex: 9999 }}
                aria-label="Open navigation menu"
            >
                <Menu size={24} className="text-white" />
            </button>

            {/* Overlay Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    style={{ zIndex: 9998 }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Menu */}
            <div 
                className={`fixed top-0 left-0 h-full w-80 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ zIndex: 10000 }}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                            <Layers size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white">IFF Navigation</h2>
                            <p className="text-xs text-gray-500">Iron Fist Federation</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Navigation Sections */}
                <div className="overflow-y-auto h-[calc(100%-80px)] py-4">
                    {navSections.map((section) => (
                        <div key={section.title} className="mb-2">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.title.toLowerCase().replace(/\s+/g, ''))}
                                className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-900 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">{section.icon}</span>
                                    <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                        {section.title}
                                    </span>
                                </div>
                                {expandedSections.includes(section.title.toLowerCase().replace(/\s+/g, '')) ? (
                                    <ChevronDown size={16} className="text-gray-500" />
                                ) : (
                                    <ChevronRight size={16} className="text-gray-500" />
                                )}
                            </button>

                            {/* Section Items */}
                            {expandedSections.includes(section.title.toLowerCase().replace(/\s+/g, '')) && (
                                <div className="ml-4 border-l border-gray-800">
                                    {section.items.map((item) => {
                                        const active = isActive(item.path);
                                        const linkPath = item.isOverlay 
                                            ? item.path 
                                            : `${item.path}?key=${key}`;
                                        
                                        return item.isOverlay ? (
                                            <Link
                                                key={item.path}
                                                to={linkPath}
                                                target="_blank"
                                                className={`flex items-center gap-3 px-4 py-2.5 ml-2 rounded-r-lg transition-all ${
                                                    active 
                                                        ? 'bg-red-500/20 text-red-400 border-l-2 border-red-500 -ml-[2px]' 
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                }`}
                                            >
                                                {item.icon}
                                                <span className="text-sm">{item.name}</span>
                                                <ExternalLink size={12} className="ml-auto text-gray-600" />
                                            </Link>
                                        ) : (
                                            <Link
                                                key={item.path}
                                                to={linkPath}
                                                className={`flex items-center gap-3 px-4 py-2.5 ml-2 rounded-r-lg transition-all ${
                                                    active 
                                                        ? 'bg-red-500/20 text-red-400 border-l-2 border-red-500 -ml-[2px]' 
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                }`}
                                            >
                                                {item.icon}
                                                <span className="text-sm">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Back to Main Dashboard */}
                    <div className="mt-6 px-4">
                        <Link
                            to={`/dashboard?key=${key}`}
                            className="flex items-center gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors border border-gray-800"
                        >
                            <Home size={18} />
                            <span className="text-sm font-medium">Back to Main Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IFFBurgerMenu;
