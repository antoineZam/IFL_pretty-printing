import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import IFLMatchControlPage from './pages/IFLMatchControlPage';
import IFLMatchOverlayPage from './pages/IFLMatchOverlayPage';
import TagTeamControlPage from './pages/TagTeamControlPage';
import TagTeamOverlayPage from './pages/TagTeamOverlayPage';
// Run It Back pages
import RIBMatchControlPage from './pages/RIBMatchControlPage';
import RIBMatchCardsEditorPage from './pages/RIBMatchCardsEditorPage';
import RIBSingleMatchOverlay from './pages/RIBSingleMatchOverlay';
import RIBPlayerStatsOverlay from './pages/RIBPlayerStatsOverlay';
import RIBPartOneOverlay from './pages/RIBPartOneOverlay';
import RIBStreamOverlay from './pages/RIBStreamOverlay';
// Access Guard
import RIBAccessGuard from './components/RIBAccessGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/ifl/match-control" element={<IFLMatchControlPage />} />
        <Route path="/ifl/match-overlay" element={<IFLMatchOverlayPage />} />
        <Route path="/tag/match-control" element={<TagTeamControlPage />} />
        <Route path="/tag/match-overlay" element={<TagTeamOverlayPage />} />
        {/* Run It Back routes - Protected by RIB Access Key */}
        <Route path="/rib/match-control" element={<RIBAccessGuard><RIBMatchControlPage /></RIBAccessGuard>} />
        <Route path="/rib/match-cards-editor" element={<RIBAccessGuard><RIBMatchCardsEditorPage /></RIBAccessGuard>} />
        <Route path="/rib/single-match-overlay" element={<RIBSingleMatchOverlay />} />
        <Route path="/rib/player-stats-overlay" element={<RIBPlayerStatsOverlay />} />
        <Route path="/rib/part-one-overlay" element={<RIBPartOneOverlay />} />
        <Route path="/rib/stream-overlay" element={<RIBStreamOverlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
