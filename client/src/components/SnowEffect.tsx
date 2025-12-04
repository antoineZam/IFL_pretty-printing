import { memo } from 'react';

// Generate blizzard particles - fast, wind-driven snow
const snowflakes = Array.from({ length: 400 }, (_, i) => ({
    id: i,
    // Start from left side for wind effect
    left: -20 + Math.random() * 120,
    // Fast fall speed for blizzard
    animationDuration: 3 + Math.random() * 5,
    animationDelay: Math.random() * 8,
    // High opacity
    opacity: 0.5 + Math.random() * 0.5,
    // Various sizes
    size: Math.random() < 0.7 ? 2 + Math.random() * 3 : 3 + Math.random() * 5,
    // Strong horizontal wind drift (moving right)
    drift: 200 + Math.random() * 400,
    // Motion blur for speed
    blur: 0.5 + Math.random() * 1,
    // Streak length for wind effect
    streak: Math.random() < 0.3 ? 1 + Math.random() * 3 : 1
}));

export const SnowEffect = memo(() => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style>{`
                @keyframes blizzard {
                    0% {
                        transform: translateY(-50px) translateX(-100px);
                        opacity: 0;
                    }
                    5% {
                        opacity: var(--opacity);
                    }
                    95% {
                        opacity: var(--opacity);
                    }
                    100% {
                        transform: translateY(1150px) translateX(var(--drift));
                        opacity: 0;
                    }
                }
                
                @keyframes windGust {
                    0%, 100% {
                        transform: translateX(0) scaleX(1);
                    }
                    50% {
                        transform: translateX(20px) scaleX(1.2);
                    }
                }
                
                .blizzard-particle {
                    position: absolute;
                    top: -50px;
                    background: radial-gradient(ellipse, 
                        rgba(255, 255, 255, 1) 0%, 
                        rgba(255, 255, 255, 0.6) 40%, 
                        rgba(255, 255, 255, 0) 70%
                    );
                    border-radius: 50%;
                    animation: blizzard linear infinite;
                }
                
                .blizzard-inner {
                    width: 100%;
                    height: 100%;
                    animation: windGust ease-in-out infinite;
                }
                
            `}</style>
            
            {/* Snow particles */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="blizzard-particle"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size * flake.streak}px`,
                        height: `${flake.size}px`,
                        filter: `blur(${flake.blur}px)`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        '--opacity': flake.opacity,
                        '--drift': `${flake.drift}px`
                    } as React.CSSProperties}
                >
                    <div 
                        className="blizzard-inner"
                        style={{
                            animationDuration: `${0.5 + Math.random() * 1}s`,
                            animationDelay: `${Math.random()}s`
                        }}
                    />
                </div>
            ))}
        </div>
    );
});

SnowEffect.displayName = 'SnowEffect';

export default SnowEffect;

