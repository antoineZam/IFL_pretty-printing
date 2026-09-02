import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface CyberNode {
  id: string;
  path: string;
  label: string;
  archived?: boolean;
}

// Nodes for the cyber map
const CYBER_NODES: CyberNode[] = [
  // IFF Hub
  { id: 'iff-dashboard',   path: '/dashboard/iff',                       label: 'IFF Hub' },
  { id: 'player-import',   path: '/iff/player-import',                   label: 'Player Data' },
  // Run It Back (Archived events)
  { id: 'iff-control',     path: '/iff/match-control',                   label: 'Match Protocol',  archived: true },
  { id: 'iff-cards',       path: '/iff/match-cards-editor',              label: 'Cards Editor',    archived: true },
  { id: 'iff-unified',     path: '/iff/unified-overlay',                 label: 'Unified Sys',     archived: true },
  { id: 'iff-single',      path: '/iff/single-match-overlay',            label: 'Single Match',    archived: true },
  { id: 'iff-stats',       path: '/iff/player-stats-overlay',            label: 'Stats Engine',    archived: true },
  { id: 'iff-part1',       path: '/iff/part-one-overlay',                label: 'Part One',        archived: true },
  { id: 'iff-stream',      path: '/iff/stream-overlay',                  label: 'Stream Uplink',   archived: true },
  // Love & War (Archived events)
  { id: 'lnw',             path: '/iff/love-and-war',                    label: 'Love & War',      archived: true },
  { id: 'lnw-control',     path: '/iff/love-and-war/control',            label: 'Team Mgmt',       archived: true },
  { id: 'lnw-display',     path: '/iff/love-and-war/display',            label: 'Display Core',    archived: true },
  { id: 'lnw-tournaments', path: '/iff/love-and-war/tournaments',        label: 'Tourneys',        archived: true },
  { id: 'lnw-overlay',     path: '/iff/love-and-war/overlay',            label: 'Team Stats',      archived: true },
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

function findActiveNode(pathname: string): CyberNode | undefined {
  const exact = CYBER_NODES.find(s => s.path === pathname);
  if (exact) return exact;
  // Longest-prefix match for dynamic routes
  return [...CYBER_NODES]
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
  type: 'line' | 'block' | 'dot' | 'spore' | 'v-rect';
  style: React.CSSProperties;
}

const ARTIFACT_COUNT = 800;

// Matches the container's opacity transition, so the artifacts stay mounted
// long enough to fade out before they are torn down.
const FADE_MS = 700;

const ARTIFACT_BACKGROUND: Record<CyberArtifact['type'], string> = {
  line:     '#10b981',
  dot:      '#34d399',
  spore:    'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 60%)',
  block:    '#047857',
  'v-rect': '#047857',
};

// The artifact list is generated once and never changes. Building each element's
// full style object up front means a re-render (every route change, since this
// component subscribes to the location) reuses the same frozen objects instead of
// allocating 800 new ones and restarting 800 CSS animations.
function buildArtifacts(): CyberArtifact[] {
  const rng = mulberry32(0xc0ffee42);
  return Array.from({ length: ARTIFACT_COUNT }, (_, i) => {
    const typeRand = rng();
    let type: CyberArtifact['type'];
    if (typeRand < 0.3) type = 'line';
    else if (typeRand < 0.5) type = 'dot';
    else if (typeRand < 0.75) type = 'block';
    else if (typeRand < 0.83) type = 'v-rect'; // Reduced amount
    else type = 'spore';

    let w, h;
    if (type === 'line') {
        w = 20 + rng() * 100;
        h = 1 + rng() * 3;
    } else if (type === 'dot') {
        w = 2;
        h = 2;
    } else if (type === 'spore') {
        w = h = 40 + rng() * 150;
    } else if (type === 'v-rect') {
        w = 40 + rng() * 120; // Increased width
        h = 60 + rng() * 300;
    } else {
        w = 10 + rng() * 30;
        h = 10 + rng() * 30;
    }

    let delay = rng() * 35;
    let dur = 6 + rng() * 15;

    if (type === 'v-rect') {
        delay = rng() * 85; // Reduced appearance rate again (even longer wait between cycles)
        dur = 10 + rng() * 20;
    }

    const x = rng() * 100; // percentage VW
    const y = rng() * 100; // percentage VH

    const style: React.CSSProperties = {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: w,
      height: h,
      background: ARTIFACT_BACKGROUND[type],
      borderRadius: type === 'spore' ? '50%' : '0',
      opacity: 0,
      mixBlendMode: 'screen',
      animation: (type === 'block' || type === 'spore' || type === 'v-rect')
        ? `organic-glitch ${dur}s infinite ${delay}s`
        : `cyber-glitch ${dur}s infinite ${delay}s`,
      '--glitch-tx': `${rng() * 10 - 5}px`,
      '--glitch-ty': `${rng() * 4 - 2}px`,
    } as React.CSSProperties;

    return { id: i, x, y, w, h, depth: rng(), delay, dur, type, style };
  });
}

let cachedArtifacts: CyberArtifact[] | null = null;
function getArtifacts(): CyberArtifact[] {
  if (!cachedArtifacts) cachedArtifacts = buildArtifacts();
  return cachedArtifacts;
}

export default function IFFCyberBackground() {
  const { pathname } = useLocation();
  const isVisible = isIFFPage(pathname);
  const activeNode = findActiveNode(pathname);

  // The 800 artifacts each run an infinite CSS animation, several of which apply
  // an SVG feTurbulence/feDisplacementMap filter. Leaving them in the DOM at
  // opacity 0 still costs style recalc, paint and filter work on every frame --
  // on overlay routes rendered inside OBS that was pure waste. Mount them only
  // while the background is on screen, keeping them through the fade-out.
  const [isMounted, setIsMounted] = useState(isVisible);
  // Drives the opacity transition. Kept separate from `isMounted` so a freshly
  // mounted layer paints at 0 for one frame and still fades in, exactly as it
  // did when the element was permanently in the DOM.
  const [isOpaque, setIsOpaque] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      const raf = requestAnimationFrame(() => setIsOpaque(true));
      return () => cancelAnimationFrame(raf);
    }
    setIsOpaque(false);
    const timer = setTimeout(() => setIsMounted(false), FADE_MS);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const artifacts = useMemo(() => (isMounted ? getArtifacts() : []), [isMounted]);

  // Once faded out the whole layer is invisible (opacity 0), so skip it entirely
  // rather than leaving a full-screen fixed element -- and its SVG filter,
  // scanline layer and CRT flicker -- composited behind every other route.
  if (!isMounted) return null;

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
        opacity: isOpaque ? 1 : 0,
        transition: 'opacity 0.7s ease',
        animation: isOpaque ? 'crt-flicker 0.15s infinite' : 'none',
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
        {artifacts.map(art => (
          <div key={art.id} style={art.style} />
        ))}

        {/* Active Page Glitching Pixel Name */}
        {activeNode && (
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              animation: 'page-name-jump 50s infinite steps(1, end)',
              opacity: activeNode.archived ? 0.85 : 1,
            }}
          >
            {/* The Glitched Pixel */}
            <div
              style={{
                width: 10,
                height: 10,
                background: activeNode.archived ? '#064e3b' : '#10b981',
                boxShadow: activeNode.archived 
                  ? '0 0 5px 1px rgba(16,185,129,0.5), 0 0 10px 2px rgba(52,211,153,0.2)'
                  : '0 0 10px 2px rgba(16,185,129,0.8), 0 0 20px 5px rgba(52,211,153,0.4)',
                margin: '0 auto',
                animation: 'node-jitter 3s infinite',
              }}
            />
            {/* Route label underneath */}
            <div
              style={{
                marginTop: 15,
                color: activeNode.archived ? '#a7f3d0' : '#6ee7b7',
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                textAlign: 'center',
                animation: activeNode.archived 
                  ? 'label-flicker 2s infinite, archived-label-glitch 4s infinite' 
                  : 'label-flicker 2s infinite',
              }}
            >
              [{activeNode.label}]
            </div>
          </div>
        )}
      </div>
    </div>
  );
}