import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IFFAccessGuard from './components/IFFAccessGuard';
import TDEULayout from './components/TDEULayout';
import ReturnHomeButton from './components/ReturnHomeButton';

// Eager load only critical pages for initial render
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

// Lazy load all other pages for code splitting
const TDEUDashboardPage = lazy(() => import('./pages/TDEU/TDEUDashboardPage'));
const RIBDashboardPage = lazy(() => import('./pages/IFF/RIBDashboardPage'));
const TournamentDataPage = lazy(() => import('./pages/TDEU/TournamentDataPage'));
const IFLMatchControlPage = lazy(() => import('./pages/TDEU/IFLMatchControlPage'));
const IFLMatchOverlayPage = lazy(() => import('./pages/TDEU/IFLMatchOverlayPage'));
const IFLTop8ControlPage = lazy(() => import('./pages/TDEU/IFLTop8ControlPage'));
const IFLTop8OverlayPage = lazy(() => import('./pages/TDEU/IFLTop8OverlayPage'));
const IFLTop8StandingsControlPage = lazy(() => import('./pages/TDEU/IFLTop8StandingsControlPage'));
const IFLTop8StandingsOverlayPage = lazy(() => import('./pages/TDEU/IFLTop8StandingsOverlayPage'));
const TagTeamControlPage = lazy(() => import('./pages/TDEU/TagTeamControlPage'));
const TagTeamOverlayPage = lazy(() => import('./pages/TDEU/TagTeamOverlayPage'));

// Run It Back pages
const RIBMatchControlPage = lazy(() => import('./pages/IFF/RIBMatchControlPage'));
const RIBMatchCardsEditorPage = lazy(() => import('./pages/IFF/RIBMatchCardsEditorPage'));
const RIBSingleMatchOverlay = lazy(() => import('./pages/IFF/RIBSingleMatchOverlay'));
const RIBPlayerStatsOverlay = lazy(() => import('./pages/IFF/RIBPlayerStatsOverlay'));
const RIBPartOneOverlay = lazy(() => import('./pages/IFF/RIBPartOneOverlay'));
const RIBStreamOverlay = lazy(() => import('./pages/IFF/RIBStreamOverlay'));
const RIBUnifiedOverlay = lazy(() => import('./pages/IFF/RIBUnifiedOverlay'));

// IFF EWGF Player pages
const IFFPlayerImportPage = lazy(() => import('./pages/IFF/IFFPlayerImportPage'));
const IFFPlayerRadarOverlay = lazy(() => import('./pages/IFF/IFFPlayerRadarOverlay'));

// Love & War pages
const LoveAndWarDashboardPage = lazy(() => import('./pages/IFF/LoveAndWarDashboardPage'));
const LoveAndWarControlPage = lazy(() => import('./pages/IFF/LoveAndWarControlPage'));
const LoveAndWarTeamStatsOverlay = lazy(() => import('./pages/IFF/LoveAndWarTeamStatsOverlay'));
const LoveAndWarTournamentsPage = lazy(() => import('./pages/IFF/LoveAndWarTournamentsPage'));
const LoveAndWarBracketPage = lazy(() => import('./pages/IFF/LoveAndWarBracketPage'));
const LoveAndWarRankingsPage = lazy(() => import('./pages/IFF/LoveAndWarRankingsPage'));
const LoveAndWarMatchControlPage = lazy(() => import('./pages/IFF/LoveAndWarMatchControlPage'));
const LoveAndWarMatchOverlay = lazy(() => import('./pages/IFF/LoveAndWarMatchOverlay'));
const LoveAndWarUnifiedOverlay = lazy(() => import('./pages/IFF/LoveAndWarUnifiedOverlay'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mb-4"></div>
      <p className="text-cyan-400 text-lg font-semibold">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ReturnHomeButton />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/rib" element={<IFFAccessGuard><RIBDashboardPage /></IFFAccessGuard>} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* TDEU Layout Routes */}
          <Route element={<TDEULayout />}>
            <Route path="/dashboard/tdeu" element={<TDEUDashboardPage />} />
            <Route path="/tournament-data" element={<TournamentDataPage />} />
            <Route path="/ifl/match-control" element={<IFLMatchControlPage />} />
            <Route path="/tdeu/ifl/top8" element={<IFLTop8ControlPage />} />
            <Route path="/tdeu/ifl/top8/standings" element={<IFLTop8StandingsControlPage />} />
            <Route path="/tag/match-control" element={<TagTeamControlPage />} />
          </Route>

          <Route path="/ifl/match-overlay" element={<IFLMatchOverlayPage />} />
          <Route path="/tdeu/ifl/top8/overlay" element={<IFLTop8OverlayPage />} />
          <Route path="/tdeu/ifl/top8/standings/overlay" element={<IFLTop8StandingsOverlayPage />} />
          <Route path="/tag/match-overlay" element={<TagTeamOverlayPage />} />
          {/* Run It Back routes - Protected by RIB Access Key */}
          <Route path="/rib/match-control" element={<IFFAccessGuard><RIBMatchControlPage /></IFFAccessGuard>} />
          <Route path="/rib/match-cards-editor" element={<IFFAccessGuard><RIBMatchCardsEditorPage /></IFFAccessGuard>} />
          <Route path="/rib/unified-overlay" element={<RIBUnifiedOverlay />} />
          <Route path="/rib/single-match-overlay" element={<RIBSingleMatchOverlay />} />
          <Route path="/rib/player-stats-overlay" element={<RIBPlayerStatsOverlay />} />
          <Route path="/rib/part-one-overlay" element={<RIBPartOneOverlay />} />
          <Route path="/rib/stream-overlay" element={<RIBStreamOverlay />} />
          {/* IFF EWGF Player routes */}
          <Route path="/iff/player-import" element={<IFFAccessGuard><IFFPlayerImportPage /></IFFAccessGuard>} />
          <Route path="/iff/player-stats/:polarisId" element={<IFFPlayerRadarOverlay />} />
          {/* Love & War routes - Protected by IFF Access Key */}
          <Route path="/iff/love-and-war" element={<IFFAccessGuard><LoveAndWarDashboardPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/control" element={<IFFAccessGuard><LoveAndWarControlPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/overlay" element={<LoveAndWarTeamStatsOverlay />} />
          <Route path="/iff/love-and-war/tournaments" element={<IFFAccessGuard><LoveAndWarTournamentsPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/tournament/:id/bracket" element={<IFFAccessGuard><LoveAndWarBracketPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/tournament/:id/rankings" element={<IFFAccessGuard><LoveAndWarRankingsPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/match-control" element={<IFFAccessGuard><LoveAndWarMatchControlPage /></IFFAccessGuard>} />
          <Route path="/iff/love-and-war/match-overlay" element={<LoveAndWarMatchOverlay />} />
          <Route path="/iff/love-and-war/unified-overlay" element={<LoveAndWarUnifiedOverlay />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
