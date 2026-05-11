import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlitchTransition() {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Exclude overlay pages from the glitch transition to not mess up broadcasts
        if (location.pathname.includes('overlay')) return;

        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 500); // 500ms total transition time

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!isTransitioning) return null;

    // Check if the destination is an IFF route to apply green-ish cyber colors
    const isIFF = location.pathname.includes('/iff') || location.pathname.includes('/rib');
    // Otherwise use TDEU/Main colors (cyan/white)
    const glitchColor1 = isIFF ? '#10b981' : '#06b6d4';
    const glitchColor2 = isIFF ? '#ef4444' : '#3b82f6';
    const glitchColor3 = isIFF ? '#34d399' : '#ffffff';

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
            <style>
                {`
                    @keyframes transition-flash {
                        0% { opacity: 0; background: transparent; }
                        10% { opacity: 1; background: #000; }
                        20% { opacity: 1; background: ${glitchColor1}; mix-blend-mode: color-dodge; }
                        30% { opacity: 0.5; background: #000; }
                        40% { opacity: 1; background: ${glitchColor2}; mix-blend-mode: exclusion; }
                        50% { opacity: 0.2; background: transparent; }
                        60% { opacity: 1; background: #000; }
                        70% { opacity: 0.8; background: ${glitchColor3}; mix-blend-mode: overlay; }
                        80% { opacity: 1; background: #000; }
                        90% { opacity: 0.3; background: transparent; }
                        100% { opacity: 0; background: transparent; }
                    }

                    @keyframes transition-slice {
                        0% { clip-path: inset(10% 0 80% 0); transform: translateX(-5%); }
                        10% { clip-path: inset(50% 0 20% 0); transform: translateX(5%); }
                        20% { clip-path: inset(80% 0 5% 0); transform: translateX(-2%); }
                        30% { clip-path: inset(20% 0 50% 0); transform: translateX(3%); }
                        40% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
                        50% { clip-path: inset(60% 0 10% 0); transform: translateX(-4%); }
                        60% { clip-path: inset(30% 0 40% 0); transform: translateX(4%); }
                        70% { clip-path: inset(90% 0 0% 0); transform: translateX(-1%); }
                        80% { clip-path: inset(10% 0 70% 0); transform: translateX(2%); }
                        90% { clip-path: inset(40% 0 30% 0); transform: translateX(0); }
                        100% { clip-path: inset(0 0 0 0); transform: translateX(0); }
                    }

                    @keyframes transition-scanline {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(100vh); }
                    }
                    
                    @keyframes transition-text-flicker {
                        0%, 100% { opacity: 0; }
                        10%, 30%, 50%, 70%, 90% { opacity: 1; transform: scale(1.1) skewX(-15deg); }
                        20%, 40%, 60%, 80% { opacity: 0.3; transform: scale(0.9) skewX(10deg); }
                    }
                `}
            </style>

            {/* Base Flashing Background */}
            <div className="absolute inset-0" style={{ animation: 'transition-flash 0.4s ease-in-out forwards' }} />

            {/* Sliced Image/Background Effect */}
            <div 
                className="absolute inset-0 bg-black" 
                style={{ animation: 'transition-slice 0.4s steps(10, end) forwards' }}
            >
                {/* Horizontal RGB split slices */}
                <div className="absolute inset-0 opacity-50" style={{ background: glitchColor1, transform: 'translateX(-10px)', mixBlendMode: 'screen' }} />
                <div className="absolute inset-0 opacity-50" style={{ background: glitchColor2, transform: 'translateX(10px)', mixBlendMode: 'screen' }} />
            </div>

            {/* Heavy Scanline sweeping down */}
            <div 
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-30 mix-blend-overlay"
                style={{ animation: 'transition-scanline 0.3s linear forwards' }}
            />
            
            {/* System Status Text */}
            <div 
                className="absolute font-mono text-4xl font-bold uppercase tracking-[0.5em] mix-blend-difference"
                style={{ 
                    color: glitchColor3,
                    animation: 'transition-text-flicker 0.4s steps(5, end) forwards' 
                }}
            >
                SYS_INIT
            </div>
            
            {/* Organic noise overlay (uses the filter from IFFStarfield if loaded, otherwise fallback to css static) */}
            <div 
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                    animation: 'transition-flash 0.5s reverse forwards'
                }}
            />
        </div>
    );
}