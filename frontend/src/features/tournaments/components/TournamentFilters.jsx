import React from 'react';

const TournamentFilters = () => {
  return (
    <section className="sticky top-[64px] z-40 bg-surface-container-lowest py-6 border-b border-outline-variant/10 shadow-2xl backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-1 w-full lg:w-auto">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Search Tournaments</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors group-focus-within:text-tertiary">search</span>
              <input 
                className="w-full bg-surface-container-high border-none rounded-sm py-4 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-tertiary placeholder:text-outline-variant/40 transition-all font-medium" 
                placeholder="Step up to the crease..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Format</label>
              <select className="w-full bg-surface-container-low border-none rounded-sm py-4 px-4 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none font-semibold cursor-pointer ring-1 ring-outline-variant/5">
                <option>All Formats</option>
                <option>T20 Blast</option>
                <option>T10 Power</option>
                <option>ODI Shield</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Status</label>
              <select className="w-full bg-surface-container-low border-none rounded-sm py-4 px-4 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none font-semibold cursor-pointer ring-1 ring-outline-variant/5">
                <option>Live & Upcoming</option>
                <option>Open</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">Entry Fee</label>
              <select className="w-full bg-surface-container-low border-none rounded-sm py-4 px-4 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none font-semibold cursor-pointer ring-1 ring-outline-variant/5">
                <option>Any Range</option>
                <option>Free</option>
                <option>$10 - $50</option>
                <option>$50+</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block font-bold">City</label>
              <select className="w-full bg-surface-container-low border-none rounded-sm py-4 px-4 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none font-semibold cursor-pointer ring-1 ring-outline-variant/5">
                <option>Global</option>
                <option>London</option>
                <option>Mumbai</option>
                <option>Sydney</option>
              </select>
            </div>
          </div>
          
          <button className="bg-tertiary text-on-tertiary font-label font-bold uppercase tracking-widest py-4 px-8 hover:brightness-110 transition-all active:scale-95 duration-100 whitespace-nowrap shadow-lg shadow-tertiary/10 rounded-sm">
            Apply Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default TournamentFilters;
