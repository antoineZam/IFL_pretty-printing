import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TDEUDashboardPage from './pages/TDEU/TDEUDashboardPage';
import RIBDashboardPage from './pages/IFF/IFLDashboardPage';
import TournamentDataPage from './pages/TDEU/TournamentDataPage';
import IFLMatchControlPage from './pages/TDEU/IFLMatchControlPage';
import IFLMatchOverlayPage from './pages/TDEU/IFLMatchOverlayPage';
import TagTeamControlPage from './pages/TDEU/TagTeamControlPage';
import TagTeamOverlayPage from './pages/TDEU/TagTeamOverlayPage';
// Run It Back pages
import RIBMatchControlPage from './pages/IFF/RIBMatchControlPage';
import RIBMatchCardsEditorPage from './pages/IFF/RIBMatchCardsEditorPage';
import RIBSingleMatchOverlay from './pages/IFF/RIBSingleMatchOverlay';
import RIBPlayerStatsOverlay from './pages/IFF/RIBPlayerStatsOverlay';
import RIBPartOneOverlay from './pages/IFF/RIBPartOneOverlay';
import RIBStreamOverlay from './pages/IFF/RIBStreamOverlay';
import RIBUnifiedOverlay from './pages/IFF/RIBUnifiedOverlay';
// IFF EWGF Player pages
import IFFPlayerImportPage from './pages/IFF/IFFPlayerImportPage';
import IFFPlayerRadarOverlay from './pages/IFF/IFFPlayerRadarOverlay';
// Love and War pages
import LoveAndWarControlPage from './pages/IFF/LoveAndWarControlPage';
import LoveAndWarTeamStatsOverlay from './pages/IFF/LoveAndWarTeamStatsOverlay';
import LoveAndWarTeamDisplayPage from './pages/IFF/LoveAndWarTeamDisplayPage';
import LoveAndWarUnifiedOverlay from './pages/IFF/LoveAndWarUnifiedOverlay';
// Access Guard
import IFLAccessGuard from './components/IFLAccessGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/tdeu" element={<TDEUDashboardPage />} />
        <Route path="/dashboard/rib" element={<IFLAccessGuard><RIBDashboardPage /></IFLAccessGuard>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tournament-data" element={<TournamentDataPage />} />
        <Route path="/ifl/match-control" element={<IFLMatchControlPage />} />
        <Route path="/ifl/match-overlay" element={<IFLMatchOverlayPage />} />
        <Route path="/tag/match-control" element={<TagTeamControlPage />} />
        <Route path="/tag/match-overlay" element={<TagTeamOverlayPage />} />
        {/* Run It Back routes - Protected by RIB Access Key */}
        <Route path="/rib/match-control" element={<IFLAccessGuard><RIBMatchControlPage /></IFLAccessGuard>} />
        <Route path="/rib/match-cards-editor" element={<IFLAccessGuard><RIBMatchCardsEditorPage /></IFLAccessGuard>} />
        <Route path="/rib/unified-overlay" element={<RIBUnifiedOverlay />} />
        <Route path="/rib/single-match-overlay" element={<RIBSingleMatchOverlay />} />
        <Route path="/rib/player-stats-overlay" element={<RIBPlayerStatsOverlay />} />
        <Route path="/rib/part-one-overlay" element={<RIBPartOneOverlay />} />
        <Route path="/rib/stream-overlay" element={<RIBStreamOverlay />} />
        {/* IFF EWGF Player routes */}
        <Route path="/iff/player-import" element={<IFLAccessGuard><IFFPlayerImportPage /></IFLAccessGuard>} />
        <Route path="/iff/player-stats/:polarisId" element={<IFFPlayerRadarOverlay />} />
        {/* Love and War routes */}
        <Route path="/iff/love-and-war/control" element={<IFLAccessGuard><LoveAndWarControlPage /></IFLAccessGuard>} />
        <Route path="/iff/love-and-war/display" element={<IFLAccessGuard><LoveAndWarTeamDisplayPage /></IFLAccessGuard>} />
        <Route path="/iff/love-and-war/team-stats/:teamId" element={<LoveAndWarTeamStatsOverlay />} />
        <Route path="/iff/love-and-war/overlay" element={<LoveAndWarUnifiedOverlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
