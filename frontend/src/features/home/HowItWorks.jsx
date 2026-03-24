import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-4">Your Path to the Pavilion</h2>
        <p className="text-on-surface-variant">Getting started with Kricketers Space is a matter of three simple overs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-primary/20 -z-10"></div>
        <div className="bg-surface-container p-10 text-center relative hover:bg-surface-container-high transition-colors">
          <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center font-headline font-black text-2xl mx-auto mb-6">1</div>
          <h3 className="font-headline font-bold uppercase text-xl mb-4">Sign Up</h3>
          <p className="text-sm text-on-surface-variant">Create your professional profile and list your player specializations.</p>
        </div>
        <div className="bg-surface-container p-10 text-center relative hover:bg-surface-container-high transition-colors">
          <div className="w-16 h-16 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center font-headline font-black text-2xl mx-auto mb-6">2</div>
          <h3 className="font-headline font-bold uppercase text-xl mb-4">Create Team</h3>
          <p className="text-sm text-on-surface-variant">Gather your colleagues, design your kit, and build your digital squad.</p>
        </div>
        <div className="bg-surface-container p-10 text-center relative hover:bg-surface-container-high transition-colors">
          <div className="w-16 h-16 bg-secondary text-on-secondary rounded-full flex items-center justify-center font-headline font-black text-2xl mx-auto mb-6">3</div>
          <h3 className="font-headline font-bold uppercase text-xl mb-4">Register</h3>
          <p className="text-sm text-on-surface-variant">Choose your tournament and take the field in professional style.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
