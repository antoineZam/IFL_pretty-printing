import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface PageStar {
  id: string;
  path: string;
  label: string;
}

// Nodes for the cyber map
const PAGE_STARS: PageStar[] = [
  // IFF Hub
  { id: 'iff-dashboard',   path: '/dashboard/iff',                       label: 'IFF Hub' },
  { id: 'player-import',   path: '/iff/player-import',                   label: 'Player Data' },
  // Run It Back (Archived events)
  { id: 'iff-control',     path: '/iff/match-control',                   label: 'Match Protocol' },
  { id: 'iff-cards',       path: '/iff/match-cards-editor',              label: 'Cards Editor' },
  { id: 'iff-unified',     path: '/iff/unified-overlay',                 label: 'Unified Sys' },
  { id: 'iff-single',      path: '/iff/single-match-overlay',            label: 'Single Match' },
  { id: 'iff-stats',       path: '/iff/player-stats-overlay',            label: 'Stats Engine' },
  { id: 'iff-part1',       path: '/iff/part-one-overlay',                label: 'Part One' },
  { id: 'iff-stream',      path: '/iff/stream-overlay',                  label: 'Stream Uplink' },
  // Love & War (Archived events)
  { id: 'lnw',             path: '/iff/love-and-war',                    label: 'Love & War' },
  { id: 'lnw-control',     path: '/iff/love-and-war/control',            label: 'Team Mgmt' },
  { id: 'lnw-display',     path: '/iff/love-and-war/display',            label: 'Display Core' },
  { id: 'lnw-tournaments', path: '/iff/love-and-war/tournaments',        label: 'Tourneys' },
  { id: 'lnw-overlay',     path: '/iff/love-and-war/overlay',            label: 'Team Stats' },
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
        x: rng() * 100, // percentage VW
        y: rng() * 100, // percentage VH
        w: type === 'line' ? 20 + rng() * 100 : type === 'dot' ? 2 : type === 'spore' ? 40 + rng() * 150 : 10 + rng() * 30,
        h: type === 'line' ? 1 + rng() * 3 : type === 'dot' ? 2 : type === 'spore' ? 40 + rng() * 150 : 10 + rng() * 30,
        depth: rng(),
        delay: rng() * 5,
        dur: 0.2 + rng() * 4,
        type
      };
    });
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
      <div className="absolute inset-0">
        {/* Background Glitch Artifacts */}
        {artifacts.map(art => {
          return (
            <div
              key={art.id}
              style={{
                position: 'absolute',
                left: `${art.x}%`,
                top: `${art.y}%`,
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

        {/* Active Page Glitching Pixel Name */}
        {activeStar && (
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              animation: 'page-name-jump 50s infinite steps(1, end)',
            }}
          >
            {/* The Glitched Pixel */}
            <div
              style={{
                width: 10,
                height: 10,
                background: '#10b981',
                boxShadow: '0 0 10px 2px rgba(16,185,129,0.8), 0 0 20px 5px rgba(52,211,153,0.4)',
                margin: '0 auto',
                animation: 'node-jitter 3s infinite',
              }}
            />
            {/* Route label underneath */}
            <div
              style={{
                marginTop: 15,
                color: '#6ee7b7',
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                textAlign: 'center',
                animation: 'label-flicker 2s infinite',
              }}
            >
              [{activeStar.label}]
            </div>
          </div>
        )}
      </div>
    </div>
  );
}