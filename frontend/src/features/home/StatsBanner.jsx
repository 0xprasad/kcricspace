import React from 'react';

const StatsBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-12 relative z-30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container p-8 border-b-4 border-primary transition-all hover:bg-surface-container-high group">
          <span className="material-symbols-outlined text-primary mb-4 block group-hover:scale-110 transition-transform">stadium</span>
          <h4 className="text-4xl font-headline font-black mb-1">1,240</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Matches Played</p>
        </div>
        <div className="bg-surface-container p-8 border-b-4 border-secondary transition-all hover:bg-surface-container-high group">
          <span className="material-symbols-outlined text-secondary mb-4 block group-hover:scale-110 transition-transform">group</span>
          <h4 className="text-4xl font-headline font-black mb-1">8,450</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Players Registered</p>
        </div>
        <div className="bg-surface-container p-8 border-b-4 border-tertiary transition-all hover:bg-surface-container-high group">
          <span className="material-symbols-outlined text-tertiary mb-4 block group-hover:scale-110 transition-transform">emoji_events</span>
          <h4 className="text-4xl font-headline font-black mb-1">42</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tournaments</p>
        </div>
        <div className="bg-surface-container p-8 border-b-4 border-white/50 transition-all hover:bg-surface-container-high group">
          <span className="material-symbols-outlined text-white/50 mb-4 block group-hover:scale-110 transition-transform">analytics</span>
          <h4 className="text-4xl font-headline font-black mb-1">154k+</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Runs Scored 🏏</p>
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
