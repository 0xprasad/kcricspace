import React from 'react';

const FeaturedTournaments = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-2">Featured Tournaments</h2>
          <div className="h-1 w-20 bg-tertiary"></div>
        </div>
        <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline cursor-pointer">View All Series</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-surface-container-low overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
          <div className="relative h-48">
            <img className="w-full h-full object-cover" data-alt="Cricket trophy on grass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVAs6gVE0JiKTvwEOExlMFOCLkXp2cgijh86NGRFydD1XyjB1I_fwvWBuCSymL1SoOfMBvO7mcKt7WggHemNkxa2kfoOxghisKKuYxksqqaB8-4499kulzpJtwgZWjV0QJbYEugyfqR7juCwlzI8ushed1P-x6eenhGmYyw14FRmzBiMU2nfujdvi-uJ301f7x1cMpUqpLzy86NXIWjcnXke_kqaqxjNxVaL5qt7giT55xXqGbvcHTTmVnFyY3q104P7r42plIuKY" alt="Trophy" />
            <div className="absolute top-4 right-4 bg-red-600 text-[10px] font-black uppercase px-3 py-1 tracking-widest text-white">Only 3 team slots left</div>
          </div>
          <div className="p-8">
            <span className="text-tertiary text-xs font-bold uppercase tracking-widest mb-2 block">T20 Format • Mumbai</span>
            <h3 className="font-headline text-2xl font-black mb-4 uppercase">Corporate Elite Cup 2024</h3>
            <div className="space-y-3 mb-8 text-on-surface-variant text-sm">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span>Entry Fee</span>
                <span className="text-on-surface font-bold">₹15,000 / Team</span>
              </div>
              <div className="flex justify-between">
                <span>Prize Pool</span>
                <span className="text-tertiary font-black">₹2,00,000</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest cursor-pointer">Register Now</button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-low overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
          <div className="relative h-48">
            <img className="w-full h-full object-cover" data-alt="Cricket match under stadium lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8S6H41K6Q9uk0NhD9_m3U1ymaWXSVbOuzoxrRsxghLHFE7dyxuPjpE7zUcGGiqDUfmba3RWI4jFaT1e9wOPUkIlfiTjgquhJB514WToRh8GmjZvHnYEx543hPp-NEkSkKOV9QVYKQuJS8ACOJfrMbLHul20D_RmfMjVAnTzhtZpURSA6QpfKIYSm0-ZbqGVMRDKKE_3N7DpM1QtNKurxlVZzHYngKYtGcUXJwRtYCcYFMHXsCHF7lrnHs47T4NLyAVGIcEtgmw3c" alt="Stadium" />
            <div className="absolute top-4 right-4 bg-red-600 text-[10px] font-black uppercase px-3 py-1 tracking-widest text-white">Registration closing soon</div>
          </div>
          <div className="p-8">
            <span className="text-tertiary text-xs font-bold uppercase tracking-widest mb-2 block">T10 Format • Bangalore</span>
            <h3 className="font-headline text-2xl font-black mb-4 uppercase">Tech City Sprint</h3>
            <div className="space-y-3 mb-8 text-on-surface-variant text-sm">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span>Entry Fee</span>
                <span className="text-on-surface font-bold">₹8,000 / Team</span>
              </div>
              <div className="flex justify-between">
                <span>Prize Pool</span>
                <span className="text-tertiary font-black">₹1,20,000</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest cursor-pointer">Register Now</button>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-low overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
          <div className="relative h-48">
            <img className="w-full h-full object-cover" data-alt="Close up of a cricket ball" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeyuZbO_YJYKHfnBcsmiyvKG5NqZ8rVKlW2fGtvhzJaWjLhgdBh3KYvfKv5knPy65YP2PdCbuhKA9WqzT8NcynfhjZvKsgl6FJj3JBtVJq_05Yxwbp8VV363DLDrylUXXJzZ3uNUGn8js2EQikZY4HBOlBmEH7rBwfwmygSQhv4G2jPD-znJMQfoyUBRHt8o_KAcWAF7f8T9n5uUUv1pZ1_IrhQaElHBhlvExE2DwQZvg19J2QzL-Wwz-6Ew9K5FTP-PDvXwE3V0w" alt="Cricket ball" />
          </div>
          <div className="p-8">
            <span className="text-tertiary text-xs font-bold uppercase tracking-widest mb-2 block">T20 Format • Delhi NCR</span>
            <h3 className="font-headline text-2xl font-black mb-4 uppercase">Founders Series IV</h3>
            <div className="space-y-3 mb-8 text-on-surface-variant text-sm">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span>Entry Fee</span>
                <span className="text-on-surface font-bold">₹20,000 / Team</span>
              </div>
              <div className="flex justify-between">
                <span>Prize Pool</span>
                <span className="text-tertiary font-black">₹5,00,000</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest cursor-pointer">Register Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;
