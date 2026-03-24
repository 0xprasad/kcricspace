import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import SignUpPage from './features/auth/SignUpPage';
import NormalPlayerPage from './features/auth/NormalPlayerPage';
import CorporatePlayerPage from './features/auth/CorporatePlayerPage';
import LoginPage from './features/auth/LoginPage';
import OTPPage from './features/auth/OTPPage';

import AdminDashboard from './features/admin/AdminDashboard';
import CreateTournament from './features/admin/CreateTournament';
import TournamentList from './features/tournaments/TournamentList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tournaments" element={<TournamentList />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/tournaments/create" element={<CreateTournament />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<OTPPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/player" element={<NormalPlayerPage />} />
      <Route path="/signup/corporate" element={<CorporatePlayerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
