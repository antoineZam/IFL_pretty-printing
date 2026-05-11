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
            
            {/* Glitching Pixels */}
            <div 
                className="absolute mix-blend-difference"
                style={{ 
                    width: '40px',
                    height: '40px',
                    backgroundColor: glitchColor3,
                    animation: 'transition-pixel-jump 0.4s steps(1, end) forwards' 
                }}
            />
            <div 
                className="absolute mix-blend-exclusion"
                style={{ 
                    width: '60px',
                    height: '20px',
                    backgroundColor: glitchColor1,
                    animation: 'transition-pixel-jump 0.5s steps(1, end) reverse forwards' 
                }}
            />
            <div 
                className="absolute mix-blend-color-dodge"
                style={{ 
                    width: '15px',
                    height: '80px',
                    backgroundColor: glitchColor2,
                    animation: 'transition-pixel-jump 0.3s steps(1, end) forwards 0.1s' 
                }}
            />
            
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