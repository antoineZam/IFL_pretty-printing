import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { getLayoutForPath } from '../config/tdeuLayouts';

const RADIUS = 5;

// Helper to convert lat/lon to 3D coordinates
const getCoordinates = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    
    return new THREE.Vector3(x, y, z);
};

const LOCATIONS = {
    '/dashboard/tdeu': { name: 'HQ', lat: 48.8566, lon: 2.3522 }, // Paris
    '/ifl/match-control': { name: 'Match Control', lat: 40.7128, lon: -74.0060 }, // NY
    '/tdeu/ifl/top8': { name: 'Top 8', lat: 35.6762, lon: 139.6503 }, // Tokyo
    '/tdeu/ifl/top8/standings': { name: 'Standings', lat: -22.9068, lon: -43.1729 }, // Rio
    '/tag/match-control': { name: 'Tag Team', lat: -26.2041, lon: 28.0473 }, // Joburg
    '/tournament-data': { name: 'Database', lat: -33.8688, lon: 151.2093 }, // Sydney
};

const NODES = Object.entries(LOCATIONS).map(([path, data]) => ({
    path,
    ...data,
    position: getCoordinates(data.lat, data.lon, RADIUS),
}));

// Create edges between nodes to form a network
const EDGES = [
    [NODES[0], NODES[1]],
    [NODES[0], NODES[2]],
    [NODES[0], NODES[4]],
    [NODES[1], NODES[3]],
    [NODES[2], NODES[5]],
    [NODES[3], NODES[4]],
    [NODES[4], NODES[5]],
    [NODES[1], NODES[2]],
];

// Electric signal component that travels along edges
const ElectricSignal = ({ curve, edgeIndex }: { curve: THREE.QuadraticBezierCurve3; edgeIndex: number }) => {
    const signalRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const trailRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (!signalRef.current || !glowRef.current || !trailRef.current) return;
        
        // Each signal has a different offset based on edge index for variety
        const offset = (edgeIndex * 0.3);
        const time = state.clock.elapsedTime;
        
        // Progress along the curve (0 to 1), synced with breathing effect
        // Complete one cycle every 3 seconds, with offset for staggering
        const progress = ((time * 0.33 + offset) % 1);
        
        // Get position along curve
        const position = curve.getPoint(progress);
        signalRef.current.position.copy(position);
        glowRef.current.position.copy(position);
        
        // Trail position slightly behind
        const trailProgress = Math.max(0, progress - 0.08);
        const trailPosition = curve.getPoint(trailProgress);
        trailRef.current.position.copy(trailPosition);
        
        // Fade in/out as it travels (creates a pulsing effect)
        const fadeIn = Math.min(progress * 5, 1); // Fade in quickly
        const fadeOut = Math.max(1 - (progress - 0.75) * 4, 0); // Fade out at the end
        const baseFade = Math.min(fadeIn, fadeOut);
        
        // Add breathing pulse synchronized with globe breathing
        const breathingBeat = Math.pow(Math.sin(time / 3 * Math.PI), 2);
        const breathingPulse = 0.7 + (breathingBeat * 0.3);
        
        // Very faint opacity
        const signalOpacity = baseFade * 0.3 * breathingPulse;
        const glowOpacity = baseFade * 0.15 * breathingPulse;
        const trailOpacity = baseFade * 0.1 * breathingPulse;
        
        (signalRef.current.material as THREE.Material).opacity = signalOpacity;
        (glowRef.current.material as THREE.Material).opacity = glowOpacity;
        (trailRef.current.material as THREE.Material).opacity = trailOpacity;
    });
    
    return (
        <group>
            {/* Trail */}
            <mesh ref={trailRef}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial 
                    color="#06b6d4" 
                    transparent 
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            
            {/* Main signal */}
            <mesh ref={signalRef}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            
            {/* Glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial 
                    color="#06b6d4" 
                    transparent 
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

const RandomizedWireframe = () => {
    const geometry = useMemo(() => {
        const geo = new THREE.IcosahedronGeometry(RADIUS * 0.98, 3);
        const posAttribute = geo.getAttribute('position');
        
        // Randomize vertices to break the perfect pattern and add unexpectedness
        for (let i = 0; i < posAttribute.count; i++) {
            const vertex = new THREE.Vector3().fromBufferAttribute(posAttribute, i);
            const offset = (Math.random() - 0.5) * 0.6; // Glitchy variance
            vertex.normalize().multiplyScalar((RADIUS * 0.98) + offset);
            posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (!meshRef.current) return;
        // Smooth breathing/heartbeat effect exactly once per second (1 Hz)
        const time = state.clock.elapsedTime/3;
        // Math.sin(time * Math.PI) completes one full curve from 0 to 1 to 0 every 1 second.
        // Power of 2 creates a smoother curve with a defined peak (a "beat") and a nice rest.
        const beat = Math.pow(Math.sin(time * Math.PI), 2);
        
        // Map the beat to an opacity range between 0.1 (rest) and 0.35 (peak)
        const opacity = 0.1 + (beat * 0.25); 
        (meshRef.current.material as THREE.Material).opacity = opacity;
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshBasicMaterial 
                color="#06b6d4" 
                wireframe 
                transparent 
                opacity={0.2} 
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

export default function HolographicGlobe() {
    const groupRef = useRef<THREE.Group>(null);
    const location = useLocation();
    
    const targetRotation = useRef(new THREE.Euler(0, 0, 0));
    const currentRotation = useRef(new THREE.Euler(0, 0, 0));
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

    useEffect(() => {
        const activeNode = NODES.find(n => location.pathname === n.path || location.pathname.startsWith(n.path + '/')) || NODES[0];
        
        const targetLon = activeNode.lon;
        const targetLat = activeNode.lat;
        const lonRad = targetLon * (Math.PI / 180);
        const latRad = targetLat * (Math.PI / 180);
        targetRotation.current.set(latRad, -lonRad, 0);

        const layout = getLayoutForPath(location.pathname);
        targetPosition.current.set(...layout.globeOffset);
    }, [location.pathname]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, delta * 2);
        currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y + state.clock.elapsedTime * 0.05, delta * 2);
        
        groupRef.current.rotation.x = currentRotation.current.x;
        groupRef.current.rotation.y = currentRotation.current.y;

        groupRef.current.position.lerp(targetPosition.current, delta * 2);
    });

    // Generate random dots for the globe surface to make it look holographic
    const dots = useMemo(() => {
        const points = [];
        const samples = 2000;
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < samples; i++) {
            const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y

            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            points.push(new THREE.Vector3(x * RADIUS, y * RADIUS, z * RADIUS));
        }
        return points;
    }, []);

    const dotsGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(dots);
        return geo;
    }, [dots]);

    const edgeData = useMemo(() =>
        EDGES.map((edge, i) => {
            const distance = edge[0].position.distanceTo(edge[1].position);
            const midPoint = new THREE.Vector3().addVectors(edge[0].position, edge[1].position).multiplyScalar(0.5);
            midPoint.normalize().multiplyScalar(RADIUS + distance * 0.2);

            const curve = new THREE.QuadraticBezierCurve3(
                edge[0].position,
                midPoint,
                edge[1].position
            );
            return { curve, points: curve.getPoints(20), index: i };
        }),
    []);

    return (
        <group ref={groupRef}>
            {/* Holographic Sphere Surface */}
            <points geometry={dotsGeometry}>
                <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.3} />
            </points>
            
            <RandomizedWireframe />

            {/* Connecting Lines with Electric Signals */}
            {edgeData.map(({ curve, points, index }) => (
                <group key={index}>
                    <Line
                        points={points}
                        color="#3b82f6"
                        lineWidth={2}
                        transparent
                        opacity={0.4}
                    />
                    <ElectricSignal curve={curve} edgeIndex={index} />
                </group>
            ))}

            {/* Nodes */}
            {NODES.map((node, i) => {
                const isActive = location.pathname === node.path || location.pathname.startsWith(node.path + '/');
                return (
                    <group key={i} position={node.position}>
                        {/* Core point */}
                        <mesh>
                            <sphereGeometry args={[isActive ? 0.15 : 0.08, 16, 16]} />
                            <meshBasicMaterial color={isActive ? "#06b6d4" : "#3b82f6"} />
                        </mesh>
                        
                        {/* Outer glow/ring */}
                        {isActive && (
                            <mesh>
                                <sphereGeometry args={[0.25, 16, 16]} />
                                <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} wireframe />
                            </mesh>
                        )}

                        <Html position={[0, 0.3, 0]} center style={{ pointerEvents: 'none' }}>
                            <div className={`transition-all duration-300 whitespace-nowrap px-2 py-1 rounded border backdrop-blur-md text-[10px] font-bold tracking-wider uppercase
                                ${isActive 
                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                                    : 'bg-blue-900/30 border-blue-500/30 text-blue-300/70 scale-90'
                                }`}>
                                {node.name}
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}
