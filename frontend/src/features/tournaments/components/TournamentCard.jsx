import React from 'react';

const TournamentCard = ({ 
  title, 
  location, 
  prizePool, 
  entryFee, 
  teamsRegistered, 
  totalTeams, 
  status, 
  format, 
  image, 
  registrationClosing,
  winner,
  startDate
}) => {
  const isLive = status === 'LIVE';
  const isOpen = status === 'OPEN';
  const isCompleted = status === 'COMPLETED';

  return (
    <article className="group relative bg-surface-container-low overflow-hidden hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(46,125,50,0.3)] transition-all duration-300 border border-outline-variant/10">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 ${isCompleted ? 'grayscale opacity-60' : 'grayscale group-hover:grayscale-0'}`} 
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {isLive && (
            <span className="bg-red-600 text-white font-label text-[10px] font-black px-2 py-1 tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE
            </span>
          )}
          {isOpen && (
            <span className="bg-secondary text-on-secondary font-label text-[10px] font-black px-2 py-1 tracking-widest uppercase">Open</span>
          )}
          {isCompleted && (
            <span className="bg-surface-variant text-on-surface-variant font-label text-[10px] font-black px-2 py-1 tracking-widest uppercase">Completed</span>
          )}
          <span className="bg-surface-container-highest/80 backdrop-blur-md text-primary font-label text-[10px] font-bold px-2 py-1 tracking-widest uppercase">{format}</span>
        </div>
        {isOpen && registrationClosing && (
          <div className="absolute bottom-4 left-4 right-4 bg-tertiary/90 backdrop-blur-sm p-2 text-on-tertiary font-label text-[10px] font-black uppercase text-center tracking-widest">
            Registration closes in {registrationClosing}
          </div>
        )}
      </div>

      <div className={`p-6 ${isOpen ? 'border-l-4 border-tertiary' : ''} ${isCompleted ? 'opacity-80' : ''}`}>
        <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-on-background mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">location_on</span> {location}
        </p>

        {isCompleted ? (
          <div className="bg-surface-container py-4 px-4 flex items-center justify-between mb-4 mt-4">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-label">Winner</p>
              <p className="text-primary font-headline text-lg font-black uppercase tracking-tighter">{winner}</p>
            </div>
            <span className="material-symbols-outlined text-tertiary text-3xl fill-1">emoji_events</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface-container py-3 px-4 rounded-sm border border-outline-variant/5">
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-label">Prize Pool</p>
              <p className="text-tertiary font-headline text-xl font-bold">{prizePool}</p>
            </div>
            <div className="bg-surface-container py-3 px-4 rounded-sm border border-outline-variant/5">
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-label">Entry Fee</p>
              <p className="text-on-background font-headline text-xl font-bold">{entryFee}</p>
            </div>
          </div>
        )}

        {isLive && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-on-background uppercase tracking-wider">{teamsRegistered} / {totalTeams} Teams Registered</p>
              <div className="w-32 h-1 bg-surface-container mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(teamsRegistered / totalTeams) * 100}%` }}
                ></div>
              </div>
            </div>
            <button className="bg-primary text-on-primary p-2 group-hover:scale-110 transition-transform rounded-sm">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}

        {isOpen && (
          <div className="flex items-center justify-between">
            <button className="bg-tertiary text-on-tertiary font-label font-bold uppercase tracking-widest py-3 px-6 hover:brightness-110 transition-all text-xs active:scale-95">
              Take the field
            </button>
            <p className="text-[9px] text-on-surface-variant font-label uppercase font-bold tracking-widest">Starts {startDate}</p>
          </div>
        )}

        {isCompleted && (
          <button className="w-full border border-outline-variant/30 text-on-surface-variant font-label font-bold uppercase tracking-widest py-3 px-6 hover:bg-surface-container hover:text-on-surface transition-all text-xs rounded-sm">
            View Results
          </button>
        )}
      </div>
    </article>
  );
};

export default TournamentCard;
