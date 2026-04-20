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

        const particles: { 
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
            roughness: number[]
        }[] = [];
        
        // Blueish-toned reds (magenta/pink/purple tones)
        const colors = ['#ff3377', '#ff4488', '#ff3399', '#ee5599', '#ff2277', '#ff44aa'];

        const createParticle = (startY?: number) => {
            // Generate random roughness points for irregular rounded shape
            const numRoughnessPoints = 8 + Math.floor(Math.random() * 8);
            const roughness = Array.from({ length: numRoughnessPoints }, () => 
                0.7 + Math.random() * 0.6 // Random size variation per point (more subtle)
            );
            
            return {
                // Spawn across the screen and further to the right since they drift left
                x: Math.random() * (canvas.width * 1.5),
                y: startY !== undefined ? startY : canvas.height + Math.random() * 50,
                r: Math.random() * 4.5 + 2.5, // Thicker particles (was 1.5 - 4.0)
                speedY: Math.random() * 0.6 + 0.2, // Slower upwards speed (was 0.3 - 1.5)
                speedX: -(Math.random() * 0.8 + 0.4), // Steady drift to the left (diagonal from bottom right)
                color: colors[Math.floor(Math.random() * colors.length)],
                life: Math.random() * 0.3 + 0.3, // Base opacity modifier (reduced for faster fade)
                wobbleSpeed: Math.random() * 0.01 + 0.005, // Slower, calmer wobble
                wobbleDist: Math.random() * 1.0 + 0.2,
                seed: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01, // Slow rotation
                roughness: roughness
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
                    
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = opacity;
                    ctx.shadowBlur = p.r * 3;
                    ctx.shadowColor = p.color;
                    
                    ctx.beginPath();
                    
                    // Irregular rounded blob with bezier curves
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
                        
                        if (j === 0) {
                            ctx.moveTo(x, y);
                        }
                        
                        // Control points for smooth curves
                        const cpAngle = (angle + nextAngle) / 2;
                        const cpRadius = (radius + nextRadius) / 2 * 1.05;
                        const cpX = Math.cos(cpAngle) * cpRadius;
                        const cpY = Math.sin(cpAngle) * cpRadius;
                        
                        ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
                    }
                    ctx.closePath();
                    
                    ctx.fill();
                    ctx.restore();
                }
                
                // Reset when particle goes too high or completely fades, or drifts off screen
                if (p.y < 200 || p.x < -100) {
                    particles[i] = createParticle();
                }
            }
            
            // Reset global alpha and shadow
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

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