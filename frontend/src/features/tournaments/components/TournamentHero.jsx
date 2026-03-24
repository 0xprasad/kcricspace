import React from 'react';

const TournamentHero = () => {
  return (
    <section className="relative h-80 flex items-center bg-primary-container overflow-hidden border-b border-outline-variant/5">
      <div className="absolute inset-0 pitch-texture opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-full stadium-silhouette bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-1/4">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiQoL8DVGy1Axa4CUX0FDnovDPF-3SMKNppyr7vHJlBlvFBMQbQpoBFKu7SSQQOMkqmVHXoy1exst1gCUIlCUfDUoa20ISvJQ-tPRlueUP0kZnMoNDiUZXJ9C1DF-uLEGrz1H-dVZk8ELDTXVfanQgF0nTcH2eTi5h8WpWLX0-mNLYj7wJrt1GE1DTyGciyI_9meH7HeIAYd160hPAC1kC3YnyjkPJ9WtdHEdb8eGIGtbMxMmmLDWxPMn3Vz7bWEI51eGvLvqx8jc" 
          alt="Stadium Silhouette" 
          className="w-[800px] h-auto object-cover grayscale brightness-50" 
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs mb-4 block font-bold animate-in fade-in slide-in-from-left-4 duration-700">International & Domestic</span>
          <h1 className="font-headline text-7xl md:text-8xl font-black uppercase tracking-tighter text-on-background leading-none animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            All <br/><span className="text-primary italic">Tournaments</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default TournamentHero;
