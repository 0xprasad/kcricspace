import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState('/signup/player'); // default selection

  const handleContinue = () => {
    navigate(selectedProfile);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-tertiary selection:text-on-tertiary">
      <main className="flex min-h-screen flex-col md:flex-row">
        {/* Left Section (40%): Visual Anchor */}
        <section className="relative w-full md:w-[40%] bg-stadium flex flex-col justify-between p-8 md:p-16 overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-12 group">
              <div className="w-10 h-10 bg-tertiary flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
                <span className="material-symbols-outlined text-on-tertiary">sports_cricket</span>
              </div>
              <span className="font-headline font-bold uppercase tracking-tighter text-2xl text-primary">Kricketers Space</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface leading-[0.9] tracking-tighter text-glow">
                Step Up To <br /> The Crease
              </h1>
              <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
                Join tournaments, build your team, and track every run & wicket. Experience the game from the premium digital pavilion.
              </p>
            </motion.div>
          </div>
          
          {/* Asymmetric Graphic Element */}
          <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[300px]">sports_cricket</span>
          </div>
          
          <div className="z-10 flex items-center gap-4 text-sm font-label uppercase tracking-widest text-primary/60">
            <span className="w-8 h-[1px] bg-primary/40"></span>
            <span>Established 2024</span>
          </div>
        </section>

        {/* Right Section (60%): Interaction Canvas */}
        <section className="w-full md:w-[60%] bg-surface flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-xl">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase">Step 01 / 03</span>
                <div className="h-[2px] w-12 bg-surface-container-highest flex">
                  <div className="h-full w-1/3 bg-tertiary"></div>
                </div>
              </div>
              <h2 className="font-headline text-4xl font-bold text-on-surface tracking-tight">Create Your Account</h2>
              <p className="text-on-surface-variant mt-2">Choose your player profile to customize your experience.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Option 1 */}
              <button 
                onClick={() => setSelectedProfile('/signup/player')}
                className={`group relative text-left bg-surface-container-low border-l-4 transition-all duration-300 p-8 flex flex-col justify-between h-64 focus:outline-none focus:ring-2 focus:ring-primary/20 ${selectedProfile === '/signup/player' ? 'border-tertiary bg-surface-container shadow-md' : 'border-transparent hover:border-tertiary/50 hover:bg-surface-container/50'}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 transition-transform ${selectedProfile === '/signup/player' ? 'bg-tertiary text-on-tertiary scale-110' : 'bg-primary/10 text-primary group-hover:scale-110'}`}>
                    <span className="material-symbols-outlined text-inherit text-3xl">sports_cricket</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-2 uppercase tracking-wide">Normal Player</h3>
                  <p className="text-on-surface-variant text-sm leading-snug">I play for fun, local club, or friends.</p>
                </div>
                <div className={`flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold transition-opacity ${selectedProfile === '/signup/player' ? 'text-tertiary opacity-100' : 'text-primary opacity-0 group-hover:opacity-100'}`}>
                  Selected <span className="material-symbols-outlined text-sm">check_circle</span>
                </div>
              </button>

              {/* Player Option 2 */}
              <button 
                onClick={() => setSelectedProfile('/signup/corporate')}
                className={`group relative text-left bg-surface-container-low border-l-4 transition-all duration-300 p-8 flex flex-col justify-between h-64 focus:outline-none focus:ring-2 focus:ring-primary/20 ${selectedProfile === '/signup/corporate' ? 'border-tertiary bg-surface-container shadow-md' : 'border-transparent hover:border-tertiary/50 hover:bg-surface-container/50'}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 transition-transform ${selectedProfile === '/signup/corporate' ? 'bg-tertiary text-on-tertiary scale-110' : 'bg-primary/10 text-primary group-hover:scale-110'}`}>
                    <span className="material-symbols-outlined text-inherit text-3xl">domain</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-2 uppercase tracking-wide">Corporate Player</h3>
                  <p className="text-on-surface-variant text-sm leading-snug">I represent my company in professional leagues.</p>
                </div>
                <div className={`flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold transition-opacity ${selectedProfile === '/signup/corporate' ? 'text-tertiary opacity-100' : 'text-primary opacity-0 group-hover:opacity-100'}`}>
                  Selected <span className="material-symbols-outlined text-sm">check_circle</span>
                </div>
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-on-surface-variant text-sm">
                Already have an account? 
                <Link className="text-tertiary font-bold hover:underline ml-1" to="/login">Log In</Link>
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={handleContinue}
                  className="flex-1 md:flex-none px-8 py-3 bg-tertiary text-on-tertiary font-headline font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all active:scale-95"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Footer Trust Badges */}
            <div className="mt-16 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
              <span className="material-symbols-outlined text-4xl">verified_user</span>
              <span className="material-symbols-outlined text-4xl">security</span>
              <span className="material-symbols-outlined text-4xl">language</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUpPage;
