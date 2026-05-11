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