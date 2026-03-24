import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#071610] dark:bg-[#071610] text-[#accebc] dark:text-[#accebc] font-['Space_Grotesk'] uppercase tracking-wider text-sm font-bold docked w-full top-0 z-50 fixed flex justify-between items-center px-6 py-4 max-w-none backdrop-blur-md bg-opacity-95 border-b border-outline-variant/10">
      <Link to="/" className="text-2xl font-black tracking-tighter text-glow text-[#accebc] dark:text-[#accebc]">Kricketers Space</Link>
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className="text-[#accebc]/70 hover:text-[#ffb957] transition-colors">Home</Link>
        <Link to="/tournaments" className="text-[#ffb957] border-b-2 border-[#ffb957] pb-1">Tournaments</Link>
        <Link to="#" className="text-[#accebc]/70 hover:text-[#accebc] transition-colors">Matches</Link>
      </div>
    </nav>
  );
};

export default Navbar;
