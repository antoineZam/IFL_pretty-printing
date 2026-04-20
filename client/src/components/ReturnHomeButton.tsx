import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function ReturnHomeButton() {
    const location = useLocation();
    const path = location.pathname;
    
    // Hide on overlays, auth page, and main dashboard pages
    if (
        path.includes('overlay') || 
        path.includes('player-stats') || 
        path === '/auth' ||
        path === '/' ||
        path === '/dashboard' ||
        path === '/dashboard/tdeu' ||
        path === '/dashboard/rib' ||
        path === '/iff/love-and-war'
    ) {
        return null;
    }

    let dashboardUrl = '/dashboard';
    let label = 'Main Dashboard';

    // TDEU Routes
    if (path.includes('/tdeu') || path.includes('/tag/') || path.includes('/tournament-data') || path === '/ifl/match-control') {
        dashboardUrl = '/dashboard/tdeu';
        label = 'TDEU Dashboard';
    } 
    // Run It Back Routes
    else if (path.includes('/rib/')) {
        dashboardUrl = '/dashboard/rib';
        label = 'RIB Dashboard';
    }
    // Love & War Routes
    else if (path.includes('/love-and-war')) {
        dashboardUrl = '/iff/love-and-war';
        label = 'Love & War Dashboard';
    }
    // General IFF Routes
    else if (path.includes('/iff/')) {
        dashboardUrl = '/dashboard/rib'; // Default IFF to RIB
        label = 'RIB Dashboard';
    }

    return (
        <Link 
            to={dashboardUrl}
            className="fixed top-5 right-5 z-[9999] flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-lg text-white/70 hover:text-cyan-400 transition-all shadow-lg group"
            title={`Return to ${label}`}
        >
            <Home size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium hidden sm:block">Return Home</span>
        </Link>
    );
}
