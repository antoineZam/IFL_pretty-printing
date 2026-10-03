import { useState, useEffect } from 'react';

interface LogoCarouselProps {
    logos: string[];
    intervalMs?: number;
    fadeMs?: number;
}

// Rotates through a list of full-canvas logo assets with a crossfade, each already positioned within its own image.
const LogoCarousel = ({ logos, intervalMs = 10000, fadeMs = 500 }: LogoCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % logos.length);
                setIsFading(false);
            }, fadeMs);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [logos, intervalMs, fadeMs]);

    return (
        <div className="absolute">
            <img
                src={logos[currentIndex]}
                alt="logo"
                className="w-auto object-contain transition-opacity duration-500"
                style={{ opacity: isFading ? 0 : 1 }}
            />
        </div>
    );
};

export default LogoCarousel;
