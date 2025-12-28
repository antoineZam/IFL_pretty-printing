import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Trophy, Menu, X, ChevronRight, Zap, Gamepad2, Database, Flame } from 'lucide-react';

const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        if (!connectionKey) {
            navigate('/auth');
            return;
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* YouTube Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 scale-[1.5] origin-center">
                    <iframe
                        src="https://www.youtube.com/embed/fzqvmFrV46c?autoplay=1&mute=1&loop=1&playlist=fzqvmFrV46c&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
                        title="Background Video"
                        className="w-full h-full pointer-events-none"
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '177.78vh', /* 16:9 aspect ratio */
                            height: '100vh',
                            minWidth: '100%',
                            minHeight: '56.25vw' /* 16:9 aspect ratio */
                        }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                        frameBorder="0"
                    />
                </div>
                {/* Dimming overlay */}
                <div className="absolute inset-0 bg-black/75" />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
            </div>

            {/* Burger Menu Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
            >
                {menuOpen ? (
                    <X size={24} className="text-white group-hover:text-cyan-400 transition-colors" />
                ) : (
                    <Menu size={24} className="text-white group-hover:text-cyan-400 transition-colors" />
                )}
            </button>

            {/* Slide-out Menu */}
            <div className={`
                fixed top-0 right-0 h-full w-full max-w-sm z-40 transform transition-transform duration-300 ease-out
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="h-full bg-black/95 backdrop-blur-xl border-l border-white/10 overflow-y-auto">
                    <div className="p-6 pt-24">
                        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Select Tournament System</h2>
                        
                        {/* TDEU Dashboard Link */}
                        <Link 
                            to="/dashboard/tdeu" 
                            onClick={() => setMenuOpen(false)}
                            className="block mb-4"
                        >
                            <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 hover:border-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/10 transition-all group">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 rounded-xl bg-cyan-500/20">
                                        <Trophy size={24} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">TDEU</h3>
                                        <p className="text-cyan-400/70 text-sm">Iron Fist League & Tag Team</p>
                                    </div>
                                    <ChevronRight size={20} className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Access IFL match controls, tag team overlays, tournament data sync, and league standings.
                                </p>
                            </div>
                        </Link>

                        {/* RIB Dashboard Link */}
                        <Link 
                            to="/dashboard/rib" 
                            onClick={() => setMenuOpen(false)}
                            className="block"
                        >
                            <div className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/5 hover:border-red-400 hover:from-red-500/20 hover:to-orange-500/10 transition-all group">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 rounded-xl bg-red-500/20">
                                        <Flame size={24} className="text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">IFF</h3>
                                        <p className="text-red-400/70 text-sm">Run It Back Series</p>
                                    </div>
                                    <ChevronRight size={20} className="ml-auto text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Manage Run It Back tournament broadcasts, player stats, and stream overlays.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu Backdrop */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Main Content - Landing Page */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
                {/* Logo / Branding */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-8 shadow-2xl shadow-cyan-500/30">
                        <Trophy size={48} className="text-white" />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                            IFL
                        </span>
                        <span className="text-white/90"> Broadcast</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        The ultimate broadcast control system for 
                        <span className="text-cyan-400 font-medium"> Iron Fist League </span> 
                        and competitive Tekken tournaments
                    </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Gamepad2 size={24} className="text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Match Control</h3>
                        <p className="text-gray-400 text-sm">Real-time overlay control for 1v1 and team matches with player history integration</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Database size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Start.gg Sync</h3>
                        <p className="text-gray-400 text-sm">Automatic synchronization with start.gg for brackets, players, and match data</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Zap size={24} className="text-amber-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Live Overlays</h3>
                        <p className="text-gray-400 text-sm">Professional stream overlays that update in real-time via WebSocket</p>
                    </div>
                </div>

                {/* Quick Access Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/dashboard/tdeu"
                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                    >
                        <span className="flex items-center gap-3">
                            <Trophy size={20} />
                            TDEU Dashboard
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        to="/dashboard/rib"
                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold text-lg shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
                    >
                        <span className="flex items-center gap-3">
                            <Flame size={20} />
                            IFF Dashboard
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>

                {/* Connection Status */}
                <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-gray-400 text-sm">Connected</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <p className="text-center text-gray-600 text-sm">
                    TEKKEN 8 Tournament Broadcast • Powered by TDEU & IFF
                </p>
            </footer>
        </div>
    );
};

export default DashboardPage;
