// Route preloader for faster navigation
// Preloads route components when user hovers over navigation links

type PreloadableRoute = () => Promise<any>;

const routePreloaders: Record<string, PreloadableRoute> = {
  '/dashboard/tdeu': () => import('../pages/TDEU/TDEUDashboardPage'),
  '/tournament-data': () => import('../pages/TDEU/TournamentDataPage'),
  '/ifl/match-control': () => import('../pages/TDEU/IFLMatchControlPage'),
  '/ifl/match-overlay': () => import('../pages/TDEU/IFLMatchOverlayPage'),
  '/tdeu/ifl/top8': () => import('../pages/TDEU/IFLTop8ControlPage'),
  '/tdeu/ifl/top8/overlay': () => import('../pages/TDEU/IFLTop8OverlayPage'),
  '/tdeu/ifl/top8/standings': () => import('../pages/TDEU/IFLTop8StandingsControlPage'),
  '/tdeu/ifl/top8/standings/overlay': () => import('../pages/TDEU/IFLTop8StandingsOverlayPage'),
  '/tag/match-control': () => import('../pages/TDEU/TagTeamControlPage'),
  '/tag/match-overlay': () => import('../pages/TDEU/TagTeamOverlayPage'),
  '/dashboard/rib': () => import('../pages/IFF/RIBDashboardPage'),
  '/rib/match-control': () => import('../pages/IFF/RIBMatchControlPage'),
  '/rib/match-cards-editor': () => import('../pages/IFF/RIBMatchCardsEditorPage'),
  '/rib/unified-overlay': () => import('../pages/IFF/RIBUnifiedOverlay'),
  '/rib/single-match-overlay': () => import('../pages/IFF/RIBSingleMatchOverlay'),
  '/rib/player-stats-overlay': () => import('../pages/IFF/RIBPlayerStatsOverlay'),
  '/rib/part-one-overlay': () => import('../pages/IFF/RIBPartOneOverlay'),
  '/rib/stream-overlay': () => import('../pages/IFF/RIBStreamOverlay'),
  '/iff/player-import': () => import('../pages/IFF/IFFPlayerImportPage'),
  '/iff/love-and-war': () => import('../pages/IFF/LoveAndWarDashboardPage'),
  '/iff/love-and-war/control': () => import('../pages/IFF/LoveAndWarControlPage'),
  '/iff/love-and-war/overlay': () => import('../pages/IFF/LoveAndWarTeamStatsOverlay'),
  '/iff/love-and-war/tournaments': () => import('../pages/IFF/LoveAndWarTournamentsPage'),
  '/iff/love-and-war/match-control': () => import('../pages/IFF/LoveAndWarMatchControlPage'),
  '/iff/love-and-war/match-overlay': () => import('../pages/IFF/LoveAndWarMatchOverlay'),
  '/iff/love-and-war/unified-overlay': () => import('../pages/IFF/LoveAndWarUnifiedOverlay')
};

const preloadedRoutes = new Set<string>();

export const preloadRoute = (path: string) => {
  // Don't preload if already preloaded
  if (preloadedRoutes.has(path)) return;
  
  const preloader = routePreloaders[path];
  if (preloader) {
    preloader().then(() => {
      preloadedRoutes.add(path);
      console.log(`[Preload] Route ${path} preloaded`);
    }).catch(err => {
      console.warn(`[Preload] Failed to preload ${path}:`, err);
    });
  }
};

// Preload multiple routes at once (useful for likely navigation paths)
export const preloadRoutes = (paths: string[]) => {
  paths.forEach(path => preloadRoute(path));
};

// Hook for preloading on hover
export const useRoutePreloader = () => {
  return {
    onMouseEnter: (path: string) => () => preloadRoute(path),
    onTouchStart: (path: string) => () => preloadRoute(path)
  };
};
