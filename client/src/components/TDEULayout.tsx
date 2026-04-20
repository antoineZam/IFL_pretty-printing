import { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Outlet, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import HolographicGlobe from './HolographicGlobe';
import { getLayoutForPath } from '../config/tdeuLayouts';

export default function TDEULayout() {
    const location = useLocation();
    const layout = useMemo(() => getLayoutForPath(location.pathname), [location.pathname]);

    const [isWide, setIsWide] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
    );

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const contentStyle: React.CSSProperties = isWide
        ? {
              paddingLeft: layout.contentSide === 'right' ? '28vw' : undefined,
              paddingRight: layout.contentSide === 'left' ? '28vw' : undefined,
              transition: 'padding 0.7s ease-out',
          }
        : { transition: 'padding 0.7s ease-out' };

    const vignetteOrigin = layout.contentSide === 'right' ? '30% 50%' : '70% 50%';

    return (
        <div className="relative min-h-screen bg-transparent overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 12], fov: 45 }}
                    gl={{ alpha: true }}
                    onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => { gl.setClearColor(0x000000, 0); }}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <HolographicGlobe />
                </Canvas>
                <div
                    className="absolute inset-0 pointer-events-none transition-all duration-700"
                    style={{
                        background: `radial-gradient(ellipse at ${vignetteOrigin}, transparent 0%, rgba(0,0,0,0.55) 100%)`,
                    }}
                />
            </div>

            {/* Glow connector -- subtle light cast from globe toward content */}
            <div
                className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-700"
                style={{
                    background: `radial-gradient(ellipse at ${layout.glowOrigin}, rgba(6,182,212,0.07) 0%, transparent 50%)`,
                }}
            />

            {/* Content -- pushed to opposite side of globe on lg+ screens */}
            <div className="relative z-10 w-full min-h-screen" style={contentStyle}>
                <Outlet />
            </div>
        </div>
    );
}
