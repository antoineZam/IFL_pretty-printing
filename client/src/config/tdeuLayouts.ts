export interface RouteLayout {
    globeOffset: [number, number, number];
    contentSide: 'left' | 'right';
    glowOrigin: string;
}

export const ROUTE_LAYOUTS: Record<string, RouteLayout> = {
    '/dashboard/tdeu':          { globeOffset: [-2, 0.3, 0],    contentSide: 'right', glowOrigin: 'left center' },
    '/ifl/match-control':       { globeOffset: [2.2, 0.5, 0],   contentSide: 'left',  glowOrigin: 'right center' },
    '/tdeu/ifl/top8':           { globeOffset: [-1.8, 1, 0],    contentSide: 'right', glowOrigin: 'left top' },
    '/tdeu/ifl/top8/standings': { globeOffset: [1.5, 1.5, 0],   contentSide: 'left',  glowOrigin: 'right top' },
    '/tag/match-control':       { globeOffset: [2, -0.5, 0],    contentSide: 'left',  glowOrigin: 'right bottom' },
    '/tournament-data':         { globeOffset: [-2.2, -0.3, 0], contentSide: 'right', glowOrigin: 'left center' },
};

export const DEFAULT_LAYOUT: RouteLayout = {
    globeOffset: [0, 0, 0],
    contentSide: 'right',
    glowOrigin: 'center center',
};

export function getLayoutForPath(pathname: string): RouteLayout {
    return ROUTE_LAYOUTS[pathname] || DEFAULT_LAYOUT;
}
