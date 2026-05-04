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

// One star per navigable IFF route, grouped by section
const PAGE_STARS: PageStar[] = [
  // IFF Hub
  { id: 'iff-dashboard',   path: '/dashboard/rib',                       label: 'IFF Dashboard',   x: 2500, y: 2000 },
  { id: 'player-import',   path: '/iff/player-import',                   label: 'Player Import',   x: 3200, y: 1500 },
  // Run It Back — archived
  { id: 'rib-control',     path: '/rib/match-control',                   label: 'Match Control',   x: 1600, y: 1400, archived: true },
  { id: 'rib-cards',       path: '/rib/match-cards-editor',              label: 'Cards Editor',    x: 1350, y: 1200, archived: true },
  { id: 'rib-unified',     path: '/rib/unified-overlay',                 label: 'Unified Overlay', x: 1200, y: 1650, archived: true },
  { id: 'rib-single',      path: '/rib/single-match-overlay',            label: 'Single Match',    x: 1720, y: 1760, archived: true },
  { id: 'rib-stats',       path: '/rib/player-stats-overlay',            label: 'Player Stats',    x: 1090, y: 1860, archived: true },
  { id: 'rib-part1',       path: '/rib/part-one-overlay',                label: 'Part One',        x: 1360, y: 2060, archived: true },
  { id: 'rib-stream',      path: '/rib/stream-overlay',                  label: 'Stream Overlay',  x: 1560, y: 2260, archived: true },
  // Love & War — archived
  { id: 'lnw',             path: '/iff/love-and-war',                    label: 'Love & War',      x: 3360, y: 2860, archived: true },
  { id: 'lnw-control',     path: '/iff/love-and-war/control',            label: 'Team Mgmt',       x: 3660, y: 2660, archived: true },
  { id: 'lnw-display',     path: '/iff/love-and-war/display',            label: 'Display Control', x: 3200, y: 3110, archived: true },
  { id: 'lnw-tournaments', path: '/iff/love-and-war/tournaments',        label: 'Tournaments',     x: 3610, y: 3310, archived: true },
  { id: 'lnw-overlay',     path: '/iff/love-and-war/overlay',            label: 'Team Stats',      x: 3050, y: 3010, archived: true },
];

// Overlay routes rendered in OBS — no UI decoration
const OVERLAY_PREFIXES = [
  '/rib/unified-overlay',
  '/rib/single-match-overlay',
  '/rib/player-stats-overlay',
  '/rib/part-one-overlay',
  '/rib/stream-overlay',
  '/iff/love-and-war/overlay',
  '/iff/love-and-war/match-overlay',
  '/iff/love-and-war/unified-overlay',
];

function isIFFPage(pathname: string): boolean {
  if (OVERLAY_PREFIXES.some(p => pathname.startsWith(p))) return false;
  return (
    pathname.startsWith('/dashboard/rib') ||
    pathname.startsWith('/rib/') ||
    pathname.startsWith('/iff/')
  );
}

function findActiveStar(pathname: string): PageStar | undefined {
  const exact = PAGE_STARS.find(s => s.path === pathname);
  if (exact) return exact;
  // Longest-prefix match for dynamic routes (e.g. /iff/player-stats/:id)
  return [...PAGE_STARS]
    .filter(s => pathname.startsWith(s.path))
    .sort((a, b) => b.path.length - a.path.length)[0];
}

// Mulberry32 — fast, seedable PRNG for deterministic star layout
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// depth: 0 = very far away, 1 = very close
// Three tiers:  [0, FAR_T)   = far   — tiny, cold blue-white, slow subtle twinkle
//               [FAR_T, MID_T) = mid  — medium, near white, moderate twinkle
//               [MID_T, 1]   = close — large, warm white, dramatic twinkle + 4-pointed shape
const FAR_T  = 0.44;
const MID_T  = 0.83;

// 4-pointed star clip-path (outer radius 50%, inner ~36%)
const STAR_CLIP =
  'polygon(50% 0%, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0% 50%, 36% 36%)';

interface AmbientStar {
  id: number;
  x: number;
  y: number;
  depth: number;   // raw [0,1]
  rotation: number; // degrees — orientation of close 4-pointed stars
  r1: number;      // [0,1] extra random — drives duration variation
  delay: number;
}

const AMBIENT_COUNT = 310;

export default function IFFStarfield() {
  const { pathname } = useLocation();
  const cameraRef = useRef<HTMLDivElement>(null);
  const activeStarIdRef = useRef<string | undefined>(undefined);
  const animRef = useRef<Animation | null>(null);
  const isFirstRef = useRef(true);

  const isVisible = isIFFPage(pathname);
  const activeStar = findActiveStar(pathname);

  // Generate ambient stars once — deterministic layout, no re-renders
  const ambientStars = useMemo<AmbientStar[]>(() => {
    const rng = mulberry32(0xc0ffee42);
    return Array.from({ length: AMBIENT_COUNT }, (_, i) => ({
      id: i,
      x: rng() * SPACE_W,
      y: rng() * SPACE_H,
      depth: rng(),
      rotation: rng() * 90,  // 0-90° (4-fold symmetry → 90° covers all orientations)
      r1: rng(),
      delay: rng() * 11,
    }));
  }, []);

  function cameraTranslate(star: PageStar | undefined): { tx: number; ty: number } {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = star?.x ?? SPACE_W / 2;
    const y = star?.y ?? SPACE_H / 2;
    return { tx: vw / 2 - x, ty: vh / 2 - y };
  }

  // Drive the camera animation whenever the active star changes
  useEffect(() => {
    const el = cameraRef.current;
    if (!el) return;

    const prevStar = PAGE_STARS.find(s => s.id === activeStarIdRef.current);
    activeStarIdRef.current = activeStar?.id;

    const { tx, ty } = cameraTranslate(activeStar);

    // First render or entering IFF from outside: snap with no animation
    if (isFirstRef.current || !prevStar || !isVisible) {
      isFirstRef.current = false;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
      return;
    }

    const { tx: oldTx, ty: oldTy } = cameraTranslate(prevStar);

    animRef.current?.cancel();
    animRef.current = null;

    const dx = tx - oldTx;
    const dy = ty - oldTy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Rotation: minimum 18°, grows with distance up to 42°
    const maxRot = 18 + Math.min(24, dist / 80);
    const rot = maxRot * ((activeStar?.x ?? SPACE_W / 2) > prevStar.x ? 1 : -1);

    // Peak at 30% of the journey: quick swing-out, then a long smooth glide into the destination.
    // Using ease-in for segment 1 and ease-out for segment 2 means there is exactly ONE
    // velocity peak across the entire animation — no re-acceleration at the midpoint.
    const peakOffset = 0.3;
    const peakTx = oldTx + (tx - oldTx) * peakOffset;
    const peakTy = oldTy + (ty - oldTy) * peakOffset;

    const anim = el.animate(
      [
        {
          transform: `translate(${oldTx}px, ${oldTy}px) rotate(0deg)`,
          easing: 'cubic-bezier(0.4, 0, 1, 0.6)',   // ease-in: accelerate into the turn
        },
        {
          transform: `translate(${peakTx}px, ${peakTy}px) rotate(${rot}deg)`,
          offset: peakOffset,
          easing: 'cubic-bezier(0, 0.4, 0.3, 1)',   // ease-out: decelerate into destination
        },
        {
          transform: `translate(${tx}px, ${ty}px) rotate(0deg)`,
        },
      ],
      { duration: 1400, easing: 'linear', fill: 'forwards' }
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

  // Re-center on resize without replaying the animation
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
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, #07071a 0%, #03030d 65%, #000000 100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.7s ease',
      }}
    >
      {/* Camera — the transformed space container */}
      <div
        ref={cameraRef}
        style={{
          position: 'absolute',
          width: SPACE_W,
          height: SPACE_H,
          willChange: 'transform',
        }}
      >
        {/* Ambient background stars */}
        {ambientStars.map(star => {
          const d = star.depth;
          const isFar   = d < FAR_T;
          const isClose = d >= MID_T;
          // Normalised position within each tier [0, 1]
          const t = isFar
            ? d / FAR_T
            : isClose
            ? (d - MID_T) / (1 - MID_T)
            : (d - FAR_T) / (MID_T - FAR_T);

          // Radius (px) — grows with proximity
          const r = isFar
            ? 0.25 + t * 0.55   // 0.25–0.80 px
            : isClose
            ? 1.5  + t * 1.6    // 1.50–3.10 px
            : 0.7  + t * 0.9;   // 0.70–1.60 px

          // Base alpha baked into the color — animation controls element opacity on top
          const alpha = isFar
            ? 0.05 + t * 0.20   // 0.05–0.25
            : isClose
            ? 0.50 + t * 0.40   // 0.50–0.90
            : 0.20 + t * 0.35;  // 0.20–0.55

          // Color temperature: cold blue-white → neutral white → warm yellow-white
          const [cr, cg, cb] = isFar
            ? [180, 200, 255]
            : isClose
            ? [255, 252, 235]
            : [240, 248, 255];

          // Twinkle speed and depth
          const animName = isFar
            ? 'iff-twinkle-far'
            : isClose
            ? 'iff-twinkle-close'
            : 'iff-twinkle-mid';
          const dur = isFar
            ? 7 + star.r1 * 6    // 7–13 s  slow
            : isClose
            ? 1.2 + star.r1 * 2.5 // 1.2–3.7 s  fast
            : 3 + star.r1 * 4;   // 3–7 s  medium

          return (
            <div
              key={star.id}
              style={{
                position: 'absolute',
                left: star.x - r,
                top: star.y - r,
                width:  r * 2,
                height: r * 2,
                borderRadius: isClose ? undefined : '50%',
                clipPath:     isClose ? STAR_CLIP : undefined,
                background:   `rgba(${cr}, ${cg}, ${cb}, ${alpha})`,
                // drop-shadow follows the clipped star shape (unlike box-shadow)
                filter: isClose
                  ? `drop-shadow(0 0 ${(r * 0.7).toFixed(1)}px rgba(255, 252, 225, 0.85))`
                  : undefined,
                transform: isClose ? `rotate(${star.rotation}deg)` : undefined,
                animationName: animName,
                animationDuration: `${dur}s`,
                animationDelay: `${star.delay}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            />
          );
        })}

        {/* Page stars */}
        {PAGE_STARS.map(star => {
          const active = star.id === activeStar?.id;

          const dotSize  = active ? 7 : star.archived ? 3.5 : 5;
          const dotColor = active
            ? star.archived ? '#94a3b8' : '#fde68a'
            : star.archived ? '#2d3f55' : '#8ca0b8';
          const glow = active
            ? star.archived
              ? '0 0 8px 2px rgba(148,163,184,0.95), 0 0 22px 7px rgba(100,116,139,0.4)'
              : '0 0 16px 5px rgba(253,230,138,1), 0 0 38px 14px rgba(251,146,60,0.6), 0 0 72px 24px rgba(239,68,68,0.25)'
            : 'none';
          const ringColor = star.archived
            ? 'rgba(148,163,184,0.15)'
            : 'rgba(253,230,138,0.2)';

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
              {/* Expanding pulse ring — active star only */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    width: 28,
                    height: 28,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    border: `1px solid ${ringColor}`,
                    animationName: 'iff-pulse',
                    animationDuration: '2.4s',
                    animationTimingFunction: 'ease-out',
                    animationIterationCount: 'infinite',
                  }}
                />
              )}

              {/* Star dot */}
              <div
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: '50%',
                  background: dotColor,
                  boxShadow: glow,
                  transition: 'width 0.5s ease, height 0.5s ease, background 0.5s ease, box-shadow 0.5s ease',
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
                    marginTop: 11,
                    color: star.archived
                      ? 'rgba(148,163,184,0.8)'
                      : 'rgba(253,230,138,0.95)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    textShadow:
                      '0 0 12px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.95)',
                    animationName: 'iff-label-in',
                    animationDuration: '0.5s',
                    animationFillMode: 'both',
                  }}
                >
                  {star.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
