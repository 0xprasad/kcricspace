import React from 'react';

const GalleryStrip = () => {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center">
        <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">Match Moments</h2>
        <div className="flex gap-2">
          <button className="p-3 bg-surface-container hover:bg-primary/20 transition-colors cursor-pointer"><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="p-3 bg-surface-container hover:bg-primary/20 transition-colors cursor-pointer"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-6 px-6 pb-8 no-scrollbar">
        <div className="min-w-[400px] group relative overflow-hidden">
          <img className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Action shot from a corporate match" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACv9Tix104HyY_CLqV4Lrzjq9vIyMPtxN4pO7KY4IbsvYWi1rCvTXc3CdmpbecVOaZlCIhp-SSQNj6IZLSFjhodEQnwufOMoP0_FxotGFTNYmuSrS1BhAXV5PWYiFrrHRKJmI7v8UpcJNS78OlGoLkSvRjGonD_G4NLf__fh_Bi6g-TkhIlRxKyaj7K5LJdxapMFMXFe1b-hC1kd09YEJcYXM_9bxV1PRF5AhD8o54hIpnvAjNXjpUqU2eQYvlqDz3dlSs_Hso_DY" alt="Match 1" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6">
            <h4 className="font-headline font-bold uppercase">The Winning Catch</h4>
            <p className="text-xs text-tertiary font-bold tracking-widest uppercase">Amazon vs Microsoft • Finals</p>
          </div>
        </div>
        <div className="min-w-[400px] group relative overflow-hidden">
          <img className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Batsman celebrating century" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgIZLOtvjBYPZM6r9qCi9tv4JLExm2AnlT_BSN7m29CzNM8YQ830LnqYR6ZicALwqt6EumMxIOGUX-C6fJ9pe5fQi7zj13W4HEUg_jQRL8w_sPzCq0RJqUAcNAvejXIi6na9JkfZfK9g1rIhkBEAVxaZCQWGcGuacBOhU365LK8Al_GleVZc67vx8KtWeecxF7ya3iZNdqavagd4d8aYK-YHSTHPb1TqITS8NFY28ZM-zxDILQSe2Ee4EgCBj9FOalFeRNd-cqQvA" alt="Match 2" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6">
            <h4 className="font-headline font-bold uppercase">Centurion Glory</h4>
            <p className="text-xs text-tertiary font-bold tracking-widest uppercase">Wipro Invitational</p>
          </div>
        </div>
        <div className="min-w-[400px] group relative overflow-hidden">
          <img className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Post-match presentation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjjPNXToovETF3fvrt9Q6gGudxVJ1WvfumMseIDeb0DEyUFs5G46vA8pBpQg1Zo0Yh_7PGYnkokD23GKEcoOY2ceedPVQglYgQayeC2jKfSAWKlH2jVNq5m9e1dLBcSCcvFsK9JlMpv6B5l2IWYoU9Pl0sAfHjR2C4E-rLEnPgBhTHziCk1gQvsn6pQUiN-eZs1Qrp89CEzyjjMk46gFkxQco10cGszPdnVKSoaGTXJy-gSqvlzgyK7kb7mPnGgE4-LJgpz8srH2g" alt="Match 3" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6">
            <h4 className="font-headline font-bold uppercase">Pitch Report</h4>
            <p className="text-xs text-tertiary font-bold tracking-widest uppercase">Sunset Series 2024</p>
          </div>
        </div>
        <div className="min-w-[400px] group relative overflow-hidden">
          <img className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Teams shaking hands after match" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR14VP-qN581IQKONUCFgxapJjgQld-ACIewlO_CFDCeJZUwaoc8CG3_2QPZ4JPkBo-UnIb56Q22XpprOhmrVu-3ZjqfAZBGkymkdVjgtL0Ng_5BypHbVUBOC21r0SEUvlrKJN5b3xRErg2pBeWSpaypSbrLTM1lIL3WUOGcNvXUv_E17m1ohYkTg_HujuuovjUyP2xwx3XFuHL81FT2Krl0bDI4M87fBRNmsFlG_XUmVvFOK06gQamJzaOmc39411SQnoUbefUVQ" alt="Match 4" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6">
            <h4 className="font-headline font-bold uppercase">Spirit of the Game</h4>
            <p className="text-xs text-tertiary font-bold tracking-widest uppercase">Meta vs Oracle</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
