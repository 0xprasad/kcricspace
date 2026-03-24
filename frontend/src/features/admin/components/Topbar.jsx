import React from 'react';

const Topbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#071610] text-[#accebc] font-body font-medium text-sm tracking-wide flex justify-between items-center px-8 py-4 w-full border-b border-[#accebc]/10 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center gap-4 bg-[#1b3a2d] px-4 py-2 rounded-sm border border-[#accebc]/10 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
        <span className="material-symbols-outlined text-[#accebc]/60">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder-[#accebc]/30" 
          placeholder="Search tournaments, players, or matches..." 
          type="text"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative hover:bg-[#1b3a2d] p-2 rounded-sm transition-colors group">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-[#071610]"></span>
        </button>
        <button className="hover:bg-[#1b3a2d] p-2 rounded-sm transition-colors text-[#accebc]/60 hover:text-primary">
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-[#accebc]/10">
          <div className="text-right">
            <p className="text-xs font-bold font-headline uppercase tracking-tighter">Admin User</p>
            <p className="text-[10px] text-[#accebc]/50 italic">Chief Editor</p>
          </div>
          <div className="relative">
            <img 
              className="w-10 h-10 rounded-full border border-tertiary/30 p-0.5 object-cover" 
              alt="Admin user profile photo" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1-NEziNspXlWFFXrifcvTUbWI9k9T4GhdrI__T7y6k9s8rFxFE3wEy67HbYQin7bJL_eQNIDBMWa9yos5UbKqDvHeg8qlP8ZBm8qowY6-YFdeTjXZXIOd0IuaIV2y7pn243pFcuXqqXCbdbLNDEI7cULdx-qH-uWm7dwveS82HoJOOiKjAoAVxUnudE2hlxySxhAWPjPVo2vB4zyiQYg_Q5WBcPAIxGkD5cESxTW188Q3lnbkZVuVOK7DBIAduNxZDrzP58JFJy0"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-[#071610]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
