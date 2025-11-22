import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import IFLMatchControlPage from './pages/IFLMatchControlPage';
import IFLMatchOverlayPage from './pages/IFLMatchOverlayPage';
import TagTeamControlPage from './pages/TagTeamControlPage';
import TagTeamOverlayPage from './pages/TagTeamOverlayPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ifl/match-control" element={<IFLMatchControlPage />} />
        <Route path="/ifl/match-overlay" element={<IFLMatchOverlayPage />} />
        <Route path="/tag/match-control" element={<TagTeamControlPage />} />
        <Route path="/tag/match-overlay" element={<TagTeamOverlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
