import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/admin' },
    { icon: 'emoji_events', label: 'Tournaments', path: '/admin/tournaments/create' },
    { icon: 'sports_cricket', label: 'Match Center', path: '#' },
    { icon: 'groups', label: 'Player Registry', path: '#' },
    { icon: 'leaderboard', label: 'Analytics', path: '#' },
    { icon: 'payments', label: 'Financials', path: '#' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-[#03110b] flex flex-col py-8 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div className="px-6 mb-10">
        <h1 className="text-[#ffb957] font-black text-2xl font-headline tracking-tighter italic text-glow">KRICKETERS SPACE</h1>
        <p className="font-headline uppercase tracking-widest text-[10px] font-bold text-[#accebc]/60 mt-1">Editorial Admin</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-3 transition-all duration-300 font-headline uppercase tracking-widest text-xs font-bold group ${
                isActive
                  ? 'bg-[#1b3a2d] text-[#ffb957] border-l-4 border-[#ffb957] shadow-inner'
                  : 'text-[#accebc]/60 hover:text-[#accebc] hover:bg-[#1b3a2d]/30 translate-x-0 hover:translate-x-1'
              }`}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pt-6 mt-6 border-t border-[#accebc]/10">
        <Link 
          to="/admin/tournaments/create"
          className="w-full py-3 bg-[#ffb957] text-[#462b00] font-headline font-bold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,185,87,0.15)] group"
        >
          <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-300">add</span>
          Create Tournament
        </Link>
      </div>

      <div className="mt-auto px-6 space-y-1">
        <a className="flex items-center gap-4 py-2 text-[#accebc]/40 hover:text-[#accebc] font-headline uppercase tracking-widest text-[10px] font-bold transition-all" href="#">
          <span className="material-symbols-outlined text-lg">help</span>
          Support
        </a>
        <a className="flex items-center gap-4 py-2 text-error/60 hover:text-error font-headline uppercase tracking-widest text-[10px] font-bold transition-all" href="#">
          <span className="material-symbols-outlined text-lg">logout</span>
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
