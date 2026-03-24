import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [animatingBtn, setAnimatingBtn] = useState(null);

  const handleNavigation = (path, btnType) => {
    setAnimatingBtn(btnType);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <style>{`
        @keyframes hit-bat {
          0% { transform: rotate(-45deg) translateX(-20px); }
          40% { transform: rotate(45deg) translateX(10px); }
          100% { transform: rotate(45deg) translateX(10px); opacity: 0; }
        }
        @keyframes fly-ball {
          0% { transform: translate(-10px, 0) scale(1); opacity: 0; }
          30% { transform: translate(-10px, 0) scale(1); opacity: 1; }
          100% { transform: translate(250px, -150px) scale(0.3); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover opacity-40" data-alt="Aerial view of a cricket stadium at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAncRDu42tFcWIFu28S6OskNbaniXMJuFfBLlhKAERtBjF7fDMhJD6I6eODhnHOLZItjkEHUJQ_Wj8oW8whZZXefqIM133RL6WuvIi6l4KuiVV5QM9tU_w7_8vNzGPdGhMuBBvCiwRVE8uOT3LyUQci134YashtS_4Xhxzcf3CyuE-bA8QflvOk47mV1nallpTL_uV3skSipmgIMwlmiQ2iujWncfJF9QzKSevkrNKZfJP7gDfB0EWa-lO1t1tOGJVzxuizRA_endA" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight mb-6">
          Where <span className="text-tertiary">Corporate Cricket</span> Comes Alive
        </h1>
        <p className="font-body text-xl md:text-2xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
          Join tournaments, build your team, track every run & wicket. The ultimate digital pavilion for the modern game.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => handleNavigation('/login', 'login')}
            className={`bg-tertiary text-on-tertiary font-headline font-bold uppercase tracking-widest px-10 py-5 rounded-sm hover:scale-105 transition-all cursor-pointer relative overflow-hidden flex items-center justify-center min-w-[280px] h-[64px] ${animatingBtn === 'login' ? 'scale-110 !bg-primary text-on-primary' : ''}`}
          >
            {animatingBtn === 'login' && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="text-3xl absolute animate-[hit-bat_0.5s_ease-in-out_forwards]">🏏</span>
                <span className="text-lg absolute animate-[fly-ball_0.7s_ease-out_forwards]">🔴</span>
              </div>
            )}
            <span className={`transition-opacity duration-200 ${animatingBtn === 'login' ? 'opacity-0' : 'opacity-100'}`}>Take the Field</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/signup', 'signup')}
            className={`border-2 border-primary text-primary font-headline font-bold uppercase tracking-widest px-10 py-5 rounded-sm hover:bg-primary/10 transition-all cursor-pointer relative overflow-hidden flex items-center justify-center min-w-[280px] h-[64px] ${animatingBtn === 'signup' ? 'scale-110 bg-primary !text-on-primary border-transparent' : ''}`}
          >
            {animatingBtn === 'signup' && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="text-3xl absolute animate-[hit-bat_0.5s_ease-in-out_forwards]">🏏</span>
                <span className="text-lg absolute animate-[fly-ball_0.7s_ease-out_forwards]">🔴</span>
              </div>
            )}
            <span className={`transition-opacity duration-200 ${animatingBtn === 'signup' ? 'opacity-0' : 'opacity-100'}`}>Step up to the Crease</span>
          </button>
        </div>
      </div>
      {/* Live Match Widget */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="bg-surface-container/80 backdrop-blur-xl p-6 rounded-lg border-l-4 border-tertiary shadow-2xl w-80 group">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse text-white">LIVE</span>
            <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Challengers Trophy</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-headline font-bold text-lg">Wipro XI</span>
              <span className="font-headline font-black text-2xl">164/4 <span className="text-xs font-normal opacity-60">(18.2)</span></span>
            </div>
            <div className="flex justify-between items-center opacity-60">
              <span className="font-headline font-bold">TCS Blaze</span>
              <span className="font-headline font-bold">Yet to Bat</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-tertiary">Match in progress</span>
            <div className="w-6 h-6 bg-on-background rounded-full flex items-center justify-center relative shadow-md">
              <span className="material-symbols-outlined text-[16px] text-background group-hover:rotate-180 transition-transform duration-700">sports_cricket</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
