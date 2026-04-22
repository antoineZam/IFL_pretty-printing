import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const PALETTES = {
    golden: ['#DAA520', '#F59E0B', '#D97706', '#FBBF24', '#B8860B', '#E8A317'],
    cool:   ['#06b6d4', '#3b82f6', '#2563eb', '#0ea5e9', '#38bdf8', '#4f46e5'],
    warm:   ['#ff3377', '#ff4488', '#ff3399', '#ee5599', '#ff2277', '#dc2626'],
} as const;

type Palette = keyof typeof PALETTES;

function hexToRgb(hex: string): [number, number, number] {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
    ];
}

function getPaletteForPath(pathname: string): Palette | null {
    if (pathname.includes('overlay')) return null;
    if (
        pathname.startsWith('/dashboard/rib') ||
        pathname.startsWith('/rib/') ||
        pathname.startsWith('/iff/')
    ) return 'warm';
    if (
        pathname.startsWith('/dashboard/tdeu') ||
        pathname.startsWith('/ifl/') ||
        pathname.startsWith('/tdeu/') ||
        pathname.startsWith('/tag/') ||
        pathname.startsWith('/tournament-data')
    ) return 'cool';
    return 'golden';
}

interface Particle {
    x: number;
    y: number;
    r: number;
    speedY: number;
    speedX: number;
    color: [number, number, number];
    targetColor: [number, number, number];
    paletteIndex: number;
    life: number;
    wobbleSpeed: number;
    wobbleDist: number;
    seed: number;
    rotation: number;
    rotationSpeed: number;
    roughness: number[];
}

const PARTICLE_COUNT = 90;
const COLOR_LERP_SPEED = 0.012;

export default function AmbientParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const location = useLocation();
    const particlesRef = useRef<Particle[]>([]);
    const paletteRef = useRef<Palette>('golden');
    const hiddenRef = useRef(false);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const animFrameRef = useRef<number>(0);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const createParticle = useCallback((canvasWidth: number, canvasHeight: number, startY?: number): Particle => {
        const numRoughnessPoints = 8 + Math.floor(Math.random() * 8);
        const roughness = Array.from({ length: numRoughnessPoints }, () =>
            0.7 + Math.random() * 0.6
        );
        const paletteIndex = Math.floor(Math.random() * 6);
        const colors = PALETTES[paletteRef.current];
        const rgb = hexToRgb(colors[paletteIndex % colors.length]);

        return {
            x: Math.random() * (canvasWidth * 1.3),
            y: startY !== undefined ? startY : canvasHeight + Math.random() * 50,
            r: Math.random() * 5 + 2,
            speedY: Math.random() * 0.35 + 0.1,
            speedX: -(Math.random() * 0.4 + 0.15),
            color: [...rgb],
            targetColor: [...rgb],
            paletteIndex,
            life: Math.random() * 0.25 + 0.15,
            wobbleSpeed: Math.random() * 0.007 + 0.002,
            wobbleDist: Math.random() * 1.0 + 0.2,
            seed: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.008,
            roughness,
        };
    }, []);

    const startLoop = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx || hiddenRef.current) return;
        if (animFrameRef.current) return;

        const render = (time: number) => {
            if (hiddenRef.current) {
                animFrameRef.current = 0;
                return;
            }

            const { width, height } = canvas;
            const particles = particlesRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.y -= p.speedY;
                p.rotation += p.rotationSpeed;

                for (let c = 0; c < 3; c++) {
                    p.color[c] += (p.targetColor[c] - p.color[c]) * COLOR_LERP_SPEED;
                }

                const wobble = Math.sin(time * p.wobbleSpeed + p.seed) * p.wobbleDist;
                p.x += p.speedX + wobble * 0.1;

                if (p.y < height * 0.08 || p.x < -80) {
                    const newP = createParticle(width, height);
                    newP.color = [...p.color];
                    particles[i] = newP;
                }
            }

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                const parallaxX = (mx - 0.5) * p.r * -0.8;
                const parallaxY = (my - 0.5) * p.r * -0.5;

                const heightRatio = p.y / height;
                const verticalFade = Math.max(0, (heightRatio - 0.12) / 0.88);
                const opacity = p.life * Math.pow(verticalFade, 2.5) * 0.45;

                if (opacity > 0.005) {
                    const [r, g, b] = p.color.map(Math.round);
                    const colorStr = `rgb(${r},${g},${b})`;

                    ctx.save();
                    ctx.translate(p.x + parallaxX, p.y + parallaxY);
                    ctx.rotate(p.rotation);
                    ctx.fillStyle = colorStr;
                    ctx.globalAlpha = opacity;
                    ctx.shadowBlur = p.r * 3.5;
                    ctx.shadowColor = colorStr;

                    ctx.beginPath();
                    const numPoints = p.roughness.length;
                    for (let j = 0; j < numPoints; j++) {
                        const angle = (j / numPoints) * Math.PI * 2;
                        const nextAngle = ((j + 1) / numPoints) * Math.PI * 2;
                        const radius = p.r * p.roughness[j];
                        const nextRadius = p.r * p.roughness[(j + 1) % numPoints];

                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const nextX = Math.cos(nextAngle) * nextRadius;
                        const nextY = Math.sin(nextAngle) * nextRadius;

                        if (j === 0) ctx.moveTo(x, y);

                        const cpAngle = (angle + nextAngle) / 2;
                        const cpRadius = (radius + nextRadius) / 2 * 1.05;
                        ctx.quadraticCurveTo(
                            Math.cos(cpAngle) * cpRadius,
                            Math.sin(cpAngle) * cpRadius,
                            nextX, nextY
                        );
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            animFrameRef.current = requestAnimationFrame(render);
        };

        animFrameRef.current = requestAnimationFrame(render);
    }, [createParticle]);

    useEffect(() => {
        const p = getPaletteForPath(location.pathname);
        const wasHidden = hiddenRef.current;
        hiddenRef.current = p === null;

        if (p && p !== paletteRef.current) {
            paletteRef.current = p;
            const colors = PALETTES[p];
            for (const particle of particlesRef.current) {
                particle.targetColor = hexToRgb(colors[particle.paletteIndex % colors.length]);
            }
        }

        if (canvasRef.current) {
            canvasRef.current.style.opacity = hiddenRef.current ? '0' : '1';
        }

        if (wasHidden && !hiddenRef.current) {
            startLoop();
        }
    }, [location.pathname, startLoop]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        if (particlesRef.current.length === 0) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particlesRef.current.push(createParticle(canvas.width, canvas.height, Math.random() * canvas.height));
            }
        }

        startLoop();

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = 0;
            }
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [createParticle, startLoop]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, mixBlendMode: 'screen', transition: 'opacity 0.8s ease' }}
        />
    );
}
