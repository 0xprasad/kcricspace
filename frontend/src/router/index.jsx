import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { TournamentsPage } from '../pages/TournamentsPage';
import { TeamsPage } from '../pages/TeamsPage';
import { PlayerProfilePage } from '../pages/PlayerProfilePage';
import { LiveScoringPage } from '../pages/LiveScoringPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { SetupGuidePage } from '../pages/SetupGuidePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'tournaments', element: <TournamentsPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'players/:id', element: <PlayerProfilePage /> },
      { path: 'matches/live', element: <LiveScoringPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'setup', element: <SetupGuidePage /> }
    ]
  }
]);
