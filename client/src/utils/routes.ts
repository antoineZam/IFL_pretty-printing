/**
 * One source of truth for route classification.
 *
 * This used to be duplicated three ways with three different rule sets: the
 * page loader tested some path substrings, the glitch transition tested
 * different ones, and the cyber background kept a hand-maintained list of
 * eleven overlay prefixes. Adding an overlay route and forgetting that list put
 * an opaque animated background over a live broadcast -- which is exactly what
 * happened to the player-radar overlay, whose route (/iff/player-stats/:id)
 * does not start with the listed prefix /iff/player-stats-overlay.
 *
 * When you add an overlay route to App.tsx, add it to OVERLAY_ROUTES here and
 * every consumer stays correct.
 */

/**
 * Every route that is rendered into an OBS browser source.
 *
 * These must stay free of UI chrome: no background layer, no page transition,
 * no loader, no visible error card. `:param` segments match a single segment.
 */
export const OVERLAY_ROUTES = [
    // TDEU / IFL
    '/ifl/match-overlay',
    '/tdeu/ifl/top8/overlay',
    '/tdeu/ifl/top8/standings/overlay',
    '/tag/match-overlay',
    // Run It Back
    '/iff/unified-overlay',
    '/iff/single-match-overlay',
    '/iff/player-stats-overlay',
    '/iff/part-one-overlay',
    '/iff/stream-overlay',
    // IFF player radar -- a broadcast overlay despite not being named "overlay"
    '/iff/player-stats/:polarisId',
    // Love & War
    '/iff/love-and-war/overlay',
    '/iff/love-and-war/match-overlay',
    '/iff/love-and-war/unified-overlay',
    // IFF9
    '/iff/iff-9/match-overlay',
    '/iff/iff-9/match-cards',
    '/iff/iff-9/unified-overlay',
] as const;

function matchesPattern(pathname: string, pattern: string): boolean {
    const pathParts = pathname.replace(/\/+$/, '').split('/');
    const patternParts = pattern.split('/');
    if (pathParts.length !== patternParts.length) return false;
    return patternParts.every((part, i) => part.startsWith(':') ? pathParts[i] !== '' : part === pathParts[i]);
}

/** True when this path renders into OBS and must carry no UI decoration. */
export function isOverlayRoute(pathname: string): boolean {
    return OVERLAY_ROUTES.some(pattern => matchesPattern(pathname, pattern));
}

/** True for the TDEU section, which has its own holographic chrome. */
export function isTDEURoute(pathname: string): boolean {
    return (
        pathname.startsWith('/tdeu') ||
        pathname.startsWith('/ifl/') ||
        pathname.startsWith('/tag/')
    );
}

/** True for the IFF section, which uses the green cyber chrome. */
export function isIFFRoute(pathname: string): boolean {
    return pathname.startsWith('/dashboard/iff') || pathname.startsWith('/iff/');
}
