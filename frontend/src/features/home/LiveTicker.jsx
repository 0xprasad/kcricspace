import React from 'react';

const LiveTicker = () => {
  return (
    <div className="bg-surface-container-high py-3 overflow-hidden border-y border-outline-variant/10">
      <div className="flex whitespace-nowrap gap-12 animate-marquee w-max">
        {/* Repeat item 3 times for continuous scroll */}
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-tertiary font-bold text-xs uppercase tracking-tighter">LIVE</span>
          <p className="font-headline font-medium text-sm">Amazon Warriors <span className="text-tertiary">142/6</span> vs Google Strikers — 15.4 Overs</p>
          <span className="text-xs text-on-surface-variant">Lord's Corporate Ground</span>
        </div>
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-secondary font-bold text-xs uppercase tracking-tighter">UPCOMING</span>
          <p className="font-headline font-medium text-sm">Microsoft Kings vs Meta Titans — 14:00 GMT</p>
          <span className="text-xs text-on-surface-variant">Silicon Oval</span>
        </div>
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-tertiary font-bold text-xs uppercase tracking-tighter">LIVE</span>
          <p className="font-headline font-medium text-sm">Oracle XI <span className="text-tertiary">89/2</span> vs IBM Giants — 9.2 Overs</p>
          <span className="text-xs text-on-surface-variant">Tech Park Arena</span>
        </div>
        
        {/* Duplicates for scrolling logic */}
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-tertiary font-bold text-xs uppercase tracking-tighter">LIVE</span>
          <p className="font-headline font-medium text-sm">Amazon Warriors <span className="text-tertiary">142/6</span> vs Google Strikers — 15.4 Overs</p>
          <span className="text-xs text-on-surface-variant">Lord's Corporate Ground</span>
        </div>
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-secondary font-bold text-xs uppercase tracking-tighter">UPCOMING</span>
          <p className="font-headline font-medium text-sm">Microsoft Kings vs Meta Titans — 14:00 GMT</p>
          <span className="text-xs text-on-surface-variant">Silicon Oval</span>
        </div>
        <div className="flex items-center gap-8 px-4 border-r border-outline-variant/30">
          <span className="text-tertiary font-bold text-xs uppercase tracking-tighter">LIVE</span>
          <p className="font-headline font-medium text-sm">Oracle XI <span className="text-tertiary">89/2</span> vs IBM Giants — 9.2 Overs</p>
          <span className="text-xs text-on-surface-variant">Tech Park Arena</span>
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
