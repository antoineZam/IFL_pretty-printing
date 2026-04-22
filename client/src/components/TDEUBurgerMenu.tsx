import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Menu, X, Home, Users, Trophy, Tv,
    ChevronDown, ChevronRight, ExternalLink, Database, Gamepad2, Layers
} from 'lucide-react';

interface NavSection {
    title: string;
    icon: React.ReactNode;
    items: NavItem[];
}

interface NavItem {
    name: string;
    path: string;
    icon?: React.ReactNode;
    isOverlay?: boolean;
}

const TDEUBurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(['ifl', 'tagteam', 'data']);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
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
            title: 'IFL',
            icon: <Trophy size={18} />,
            items: [
                { name: 'TDEU Dashboard', path: '/dashboard/tdeu', icon: <Home size={16} /> },
                { name: 'Match Control', path: '/ifl/match-control', icon: <Gamepad2 size={16} /> },
                { name: 'Top 8 Bracket', path: '/tdeu/ifl/top8', icon: <Trophy size={16} /> },
                { name: 'Top 8 Standings', path: '/tdeu/ifl/top8/standings', icon: <Trophy size={16} /> },
                { name: 'Match Overlay', path: '/ifl/match-overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Top 8 Bracket Overlay', path: '/tdeu/ifl/top8/overlay', icon: <Tv size={16} />, isOverlay: true },
                { name: 'Top 8 Standings Overlay', path: '/tdeu/ifl/top8/standings/overlay', icon: <Tv size={16} />, isOverlay: true },
            ]
        },
        {
            title: 'Tag Team',
            icon: <Users size={18} />,
            items: [
                { name: 'Tag Team Control', path: '/tag/match-control', icon: <Gamepad2 size={16} /> },
                { name: 'Tag Team Overlay', path: '/tag/match-overlay', icon: <Tv size={16} />, isOverlay: true },
            ]
        },
        {
            title: 'Data',
            icon: <Database size={18} />,
            items: [
                { name: 'Tournament Data', path: '/tournament-data', icon: <Database size={16} /> },
            ]
        },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-5 left-5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white backdrop-blur-sm transition-all duration-200"
                style={{ zIndex: 9999 }}
                aria-label="Open navigation menu"
            >
                <Menu size={20} />
            </button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    style={{ zIndex: 9998 }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div 
                className={`fixed top-0 left-0 h-full w-80 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ zIndex: 10000 }}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Layers size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white">TDEU Navigation</h2>
                            <p className="text-xs text-gray-500">Iron Fist League</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100%-80px)] py-4">
                    {navSections.map((section) => {
                        const sectionKey = section.title.toLowerCase().replace(/\s+/g, '');
                        return (
                            <div key={section.title} className="mb-2">
                                <button
                                    onClick={() => toggleSection(sectionKey)}
                                    className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-900 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">{section.icon}</span>
                                        <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                            {section.title}
                                        </span>
                                    </div>
                                    {expandedSections.includes(sectionKey) ? (
                                        <ChevronDown size={16} className="text-gray-500" />
                                    ) : (
                                        <ChevronRight size={16} className="text-gray-500" />
                                    )}
                                </button>

                                {expandedSections.includes(sectionKey) && (
                                    <div className="ml-4 border-l border-gray-800">
                                        {section.items.map((item) => {
                                            const active = isActive(item.path);
                                            const linkPath = item.path;

                                            return item.isOverlay ? (
                                                <Link
                                                    key={item.path}
                                                    to={linkPath}
                                                    target="_blank"
                                                    className={`flex items-center gap-3 px-4 py-2.5 ml-2 rounded-r-lg transition-all ${
                                                        active 
                                                            ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500 -ml-[2px]' 
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
                                                            ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500 -ml-[2px]' 
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
                        );
                    })}

                    <div className="mt-6 px-4">
                        <Link
                            to="/dashboard"
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

export default TDEUBurgerMenu;
