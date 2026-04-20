import { Canvas } from '@react-three/fiber';
import { Outlet } from 'react-router-dom';
import HolographicGlobe from './HolographicGlobe';

export default function TDEULayout() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <HolographicGlobe />
                </Canvas>
                {/* Overlay gradient to fade out edges slightly without hiding the globe */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                <Outlet />
            </div>
        </div>
    );
}
