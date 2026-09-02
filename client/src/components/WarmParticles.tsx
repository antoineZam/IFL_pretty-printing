import { useEffect, useRef } from 'react';

export default function WarmParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Fixed dimensions for 1080p overlay
        canvas.width = 1920;
        canvas.height = 1080;

        type Particle = {
            x: number,
            y: number,
            r: number,
            speedY: number,
            speedX: number,
            color: string,
            life: number,
            wobbleSpeed: number,
            wobbleDist: number,
            seed: number,
            rotation: number,
            rotationSpeed: number,
            roughness: number[],
            // Pre-rendered glow and body. A particle's shape, colour and radius
            // never change once it is created, so the expensive part -- tracing an
            // 8-16 segment bezier blob and running a gaussian shadow blur over it
            // -- happens once here instead of 180 times per frame.
            glow: HTMLCanvasElement,
            body: HTMLCanvasElement,
            half: number
        };

        const particles: Particle[] = [];

        // Blueish-toned reds (magenta/pink/purple tones)
        const colors = ['#ff3377', '#ff4488', '#ff3399', '#ee5599', '#ff2277', '#ff44aa'];

        // Traces the irregular rounded blob in local coordinates, centred on (0, 0).
        const traceBlob = (c: CanvasRenderingContext2D, r: number, roughness: number[]) => {
            const numPoints = roughness.length;
            c.beginPath();
            for (let j = 0; j < numPoints; j++) {
                const angle = (j / numPoints) * Math.PI * 2;
                const nextAngle = ((j + 1) / numPoints) * Math.PI * 2;
                const radius = r * roughness[j];
                const nextRadius = r * roughness[(j + 1) % numPoints];

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const nextX = Math.cos(nextAngle) * nextRadius;
                const nextY = Math.sin(nextAngle) * nextRadius;

                if (j === 0) {
                    c.moveTo(x, y);
                }

                // Control points for smooth curves
                const cpAngle = (angle + nextAngle) / 2;
                const cpRadius = (radius + nextRadius) / 2 * 1.05;
                const cpX = Math.cos(cpAngle) * cpRadius;
                const cpY = Math.sin(cpAngle) * cpRadius;

                c.quadraticCurveTo(cpX, cpY, nextX, nextY);
            }
            c.closePath();
        };

        // Glow and body are baked as separate sprites and drawn back to back at
        // the same globalAlpha, which composites to exactly what a single
        // shadowed fill() produced: blurred silhouette first, solid shape over it.
        const bakeSprites = (r: number, color: string, roughness: number[]) => {
            const half = Math.ceil(r * 6.5) + 2;
            const size = half * 2;

            const glow = document.createElement('canvas');
            glow.width = size;
            glow.height = size;
            const body = document.createElement('canvas');
            body.width = size;
            body.height = size;

            const gctx = glow.getContext('2d');
            const bctx = body.getContext('2d');
            if (!gctx || !bctx) return { glow, body, half };

            gctx.translate(half, half);
            gctx.fillStyle = color;
            gctx.shadowColor = color;
            gctx.shadowBlur = r * 3;
            // Offset the shadow by a full sprite width and draw the shape that far
            // off to the left, so only the blurred silhouette lands on the sprite.
            gctx.shadowOffsetX = size * 2;
            gctx.translate(-size * 2, 0);
            traceBlob(gctx, r, roughness);
            gctx.fill();

            bctx.translate(half, half);
            bctx.fillStyle = color;
            traceBlob(bctx, r, roughness);
            bctx.fill();

            return { glow, body, half };
        };

        const createParticle = (startY?: number): Particle => {
            // Generate random roughness points for irregular rounded shape
            const numRoughnessPoints = 8 + Math.floor(Math.random() * 8);
            const roughness = Array.from({ length: numRoughnessPoints }, () =>
                0.7 + Math.random() * 0.6 // Random size variation per point (more subtle)
            );

            const r = Math.random() * 4.5 + 2.5; // Thicker particles (was 1.5 - 4.0)
            const color = colors[Math.floor(Math.random() * colors.length)];
            const sprites = bakeSprites(r, color, roughness);

            return {
                // Spawn across the screen and further to the right since they drift left
                x: Math.random() * (canvas.width * 1.5),
                y: startY !== undefined ? startY : canvas.height + Math.random() * 50,
                r,
                speedY: Math.random() * 0.6 + 0.2, // Slower upwards speed (was 0.3 - 1.5)
                speedX: -(Math.random() * 0.8 + 0.4), // Steady drift to the left (diagonal from bottom right)
                color,
                life: Math.random() * 0.3 + 0.3, // Base opacity modifier (reduced for faster fade)
                wobbleSpeed: Math.random() * 0.01 + 0.005, // Slower, calmer wobble
                wobbleDist: Math.random() * 1.0 + 0.2,
                seed: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01, // Slow rotation
                roughness,
                glow: sprites.glow,
                body: sprites.body,
                half: sprites.half
            };
        };

        // Pre-fill particles distributed across the screen height
        // Reduced particle count to avoid clutter
        for (let i = 0; i < 180; i++) {
            particles.push(createParticle(Math.random() * canvas.height));
        }

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.y -= p.speedY;
                p.rotation += p.rotationSpeed;

                // Add natural horizontal wobble/drift
                const wobble = Math.sin(time * p.wobbleSpeed + p.seed) * p.wobbleDist;
                p.x += p.speedX + wobble * 0.1;

                // Opacity is much higher at the bottom (y close to canvas.height)
                // We use Math.pow with higher exponent to make it fade faster
                const heightRatio = p.y / canvas.height;
                // Ensures particles completely fade out before hitting the top 20%
                const verticalFade = Math.max(0, (heightRatio - 0.2) / 0.8);
                const opacity = p.life * Math.pow(verticalFade, 3.0) * 0.5;

                if (opacity > 0.005) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);

                    ctx.globalAlpha = opacity;
                    ctx.drawImage(p.glow, -p.half, -p.half);
                    ctx.drawImage(p.body, -p.half, -p.half);

                    ctx.restore();
                }

                // Reset when particle goes too high or completely fades, or drifts off screen
                if (p.y < 200 || p.x < -100) {
                    particles[i] = createParticle();
                }
            }

            // Reset global alpha
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{ width: '1920px', height: '1080px', zIndex: 5 }} // Just above background, behind text
        />
    );
}
