import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  ['/', 'Home'],
  ['/tournaments', 'Tournaments'],
  ['/teams', 'Teams'],
  ['/matches/live', 'Live'],
  ['/admin', 'Admin']
];

export const AppShell = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-shell">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-pavilion/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-3xl font-black uppercase text-pavilion-text">The Grandstand</Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `text-sm uppercase tracking-[0.2em] ${isActive ? 'text-pavilion-accent' : 'text-pavilion-muted'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm text-pavilion-muted">
            {user ? (
              <>
                <span>{user.name}</span>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};
