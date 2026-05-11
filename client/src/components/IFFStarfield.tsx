import { useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const SPACE_W = 5000;
const SPACE_H = 4000;

interface PageStar {
  id: string;
  path: string;
  label: string;
  x: number;
  y: number;
  archived?: boolean;
}

// Nodes for the cyber map
const PAGE_STARS: PageStar[] = [
  // IFF Hub
  { id: 'iff-dashboard',   path: '/dashboard/iff',                       label: 'IFF Hub',         x: 2500, y: 2000 },
  { id: 'player-import',   path: '/iff/player-import',                   label: 'Player Data',     x: 3200, y: 1500 },
  // Run It Back (Archived events)
  { id: 'iff-control',     path: '/iff/match-control',                   label: 'Match Protocol',  x: 1600, y: 1400, archived: true },
  { id: 'iff-cards',       path: '/iff/match-cards-editor',              label: 'Cards Editor',    x: 1350, y: 1200, archived: true },
  { id: 'iff-unified',     path: '/iff/unified-overlay',                 label: 'Unified Sys',     x: 1200, y: 1650, archived: true },
  { id: 'iff-single',      path: '/iff/single-match-overlay',            label: 'Single Match',    x: 1720, y: 1760, archived: true },
  { id: 'iff-stats',       path: '/iff/player-stats-overlay',            label: 'Stats Engine',    x: 1090, y: 1860, archived: true },
  { id: 'iff-part1',       path: '/iff/part-one-overlay',                label: 'Part One',        x: 1360, y: 2060, archived: true },
  { id: 'iff-stream',      path: '/iff/stream-overlay',                  label: 'Stream Uplink',   x: 1560, y: 2260, archived: true },
  // Love & War (Archived events)
  { id: 'lnw',             path: '/iff/love-and-war',                    label: 'Love & War',      x: 3360, y: 2860, archived: true },
  { id: 'lnw-control',     path: '/iff/love-and-war/control',            label: 'Team Mgmt',       x: 3660, y: 2660, archived: true },
  { id: 'lnw-display',     path: '/iff/love-and-war/display',            label: 'Display Core',    x: 3200, y: 3110, archived: true },
  { id: 'lnw-tournaments', path: '/iff/love-and-war/tournaments',        label: 'Tourneys',        x: 3610, y: 3310, archived: true },
  { id: 'lnw-overlay',     path: '/iff/love-and-war/overlay',            label: 'Team Stats',      x: 3050, y: 3010, archived: true },
];

// Overlay routes rendered in OBS — no UI decoration
const OVERLAY_PREFIXES = [
  '/iff/unified-overlay',
  '/iff/single-match-overlay',
  '/iff/player-stats-overlay',
  '/iff/part-one-overlay',
  '/iff/stream-overlay',
  '/iff/love-and-war/overlay',
  '/iff/love-and-war/match-overlay',
  '/iff/love-and-war/unified-overlay',
];

function isIFFPage(pathname: string): boolean {
  if (OVERLAY_PREFIXES.some(p => pathname.startsWith(p))) return false;
  return (
    pathname.startsWith('/dashboard/iff') ||
    pathname.startsWith('/iff/')
  );
}

function findActiveStar(pathname: string): PageStar | undefined {
  const exact = PAGE_STARS.find(s => s.path === pathname);
  if (exact) return exact;
  // Longest-prefix match for dynamic routes
  return [...PAGE_STARS]
    .filter(s => pathname.startsWith(s.path))
    .sort((a, b) => b.path.length - a.path.length)[0];
}

// Mulberry32 — fast, seedable PRNG
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface CyberArtifact {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  delay: number;
  dur: number;
  type: 'line' | 'block' | 'dot' | 'spore';
}

const ARTIFACT_COUNT = 800;

export default function IFFCyberBackground() {
  const { pathname } = useLocation();
  const cameraRef = useRef<HTMLDivElement>(null);
  const activeStarIdRef = useRef<string | undefined>(undefined);
  const animRef = useRef<Animation | null>(null);
  const isFirstRef = useRef(true);

  const isVisible = isIFFPage(pathname);
  const activeStar = findActiveStar(pathname);

  // Generate artifacts (glitches) once deterministically
  const artifacts = useMemo<CyberArtifact[]>(() => {
    const rng = mulberry32(0xc0ffee42);
    return Array.from({ length: ARTIFACT_COUNT }, (_, i) => {
      const typeRand = rng();
      const type = typeRand < 0.4 ? 'line' : typeRand < 0.7 ? 'dot' : typeRand < 0.85 ? 'block' : 'spore';
      return {
        id: i,
        x: rng() * SPACE_W,
        y: rng() * SPACE_H,
        w: type === 'line' ? 20 + rng() * 100 : type === 'dot' ? 2 : type === 'spore' ? 40 + rng() * 150 : 10 + rng() * 30,
        h: type === 'line' ? 1 + rng() * 3 : type === 'dot' ? 2 : type === 'spore' ? 40 + rng() * 150 : 10 + rng() * 30,
        depth: rng(),
        delay: rng() * 5,
        dur: 0.2 + rng() * 4,
        type
      };
    });
  }, []);

  function cameraTranslate(star: PageStar | undefined): { tx: number; ty: number } {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = star?.x ?? SPACE_W / 2;
    const y = star?.y ?? SPACE_H / 2;
    return { tx: vw / 2 - x, ty: vh / 2 - y };
  }

  useEffect(() => {
    const el = cameraRef.current;
    if (!el) return;

    const prevStar = PAGE_STARS.find(s => s.id === activeStarIdRef.current);
    activeStarIdRef.current = activeStar?.id;

    const { tx, ty } = cameraTranslate(activeStar);

    if (isFirstRef.current || !prevStar || !isVisible) {
      isFirstRef.current = false;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
      return;
    }

    const { tx: oldTx, ty: oldTy } = cameraTranslate(prevStar);

    animRef.current?.cancel();
    animRef.current = null;

    // Glitch-snap animation instead of smooth curve
    // It creates an electric, jittery translation over a shorter time
    const anim = el.animate(
      [
        { transform: `translate(${oldTx}px, ${oldTy}px)` },
        { transform: `translate(${oldTx + (tx - oldTx)*0.3}px, ${oldTy + (ty - oldTy)*0.2}px)`, offset: 0.2 },
        { transform: `translate(${oldTx + (tx - oldTx)*0.4 + 50}px, ${oldTy + (ty - oldTy)*0.5 - 20}px)`, offset: 0.4 },
        { transform: `translate(${oldTx + (tx - oldTx)*0.8 - 40}px, ${oldTy + (ty - oldTy)*0.9 + 30}px)`, offset: 0.7 },
        { transform: `translate(${tx}px, ${ty}px)` },
      ],
      { duration: 600, easing: 'steps(5, end)', fill: 'forwards' }
    );

    animRef.current = anim;
    anim.finished
      .then(() => {
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        anim.cancel();
        animRef.current = null;
      })
      .catch(() => {});
  }, [activeStar?.id, isVisible]);

  useEffect(() => {
    function onResize() {
      const el = cameraRef.current;
      if (!el) return;
      const currentStar = PAGE_STARS.find(s => s.id === activeStarIdRef.current);
      const { tx, ty } = cameraTranslate(currentStar);
      animRef.current?.cancel();
      animRef.current = null;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 1,
        background: '#020617', // Very dark cyber green/blue
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px),
          linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.7s ease',
        animation: isVisible ? 'crt-flicker 0.15s infinite' : 'none',
      }}
    >

      {/* SVG Filters for organic digital tearing */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="organic-tear">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.8" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
        backgroundSize: '100% 4px',
        zIndex: 10
      }} />
      <div
        ref={cameraRef}
        style={{
          position: 'absolute',
          width: SPACE_W,
          height: SPACE_H,
          willChange: 'transform',
        }}
      >
        {/* Background Glitch Artifacts */}
        {artifacts.map(art => {
          return (
            <div
              key={art.id}
              style={{
                position: 'absolute',
                left: art.x,
                top: art.y,
                width: art.w,
                height: art.h,
                background: art.type === 'line' ? '#10b981' : art.type === 'dot' ? '#34d399' : art.type === 'spore' ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 60%)' : '#047857',
                borderRadius: art.type === 'spore' ? '50%' : '0',
                opacity: 0,
                mixBlendMode: 'screen',
                animation: (art.type === 'block' || art.type === 'spore') 
                  ? `organic-glitch ${art.dur}s infinite ${art.delay}s`
                  : `cyber-glitch ${art.dur}s infinite ${art.delay}s`,
                '--glitch-tx': `${Math.random() * 10 - 5}px`,
                '--glitch-ty': `${Math.random() * 4 - 2}px`
              } as React.CSSProperties}
            />
          );
        })}

        {/* Node Points */}
        {PAGE_STARS.map(star => {
          const active = star.id === activeStar?.id;

          const dotSize  = active ? 10 : star.archived ? 6 : 8;
          const dotColor = active
            ? star.archived ? '#34d399' : '#10b981' // Bright green
            : star.archived ? '#064e3b' : '#059669'; // Dimmer green
          
          const glow = active
            ? '0 0 10px 2px rgba(16,185,129,0.8), 0 0 20px 5px rgba(52,211,153,0.4)'
            : '0 0 5px rgba(16,185,129,0.3)';

          return (
            <div
              key={star.id}
              style={{
                position: 'absolute',
                left: star.x,
                top: star.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Expanding pulse ring — active node */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '2px', // Square/digital feel
                    border: `1px solid rgba(16, 185, 129, 0.5)`,
                    animation: 'cyber-pulse 2s infinite',
                  }}
                />
              )}

              {/* Node core (square instead of circle) */}
              <div
                style={{
                  width: dotSize,
                  height: dotSize,
                  background: dotColor,
                  boxShadow: glow,
                  transform: 'rotate(45deg)', // Diamond shape
                  transition: 'all 0.3s ease',
                  animation: active ? 'node-jitter 3s infinite' : 'none',
                }}
              />

              {/* Route label — visible only on active star */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: 15,
                    color: star.archived ? '#a7f3d0' : '#6ee7b7',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '0.2em',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    animation: 'label-flicker 0.4s ease-out forwards',
                  }}
                >
                  [{star.label}]
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}