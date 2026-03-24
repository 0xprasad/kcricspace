import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#03110b] border-t border-[#1b3a2d] font-body text-sm leading-relaxed w-full py-12 px-8 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div>
          <span className="text-xl font-bold text-[#ffb957] mb-4 block">Kricketers Space</span>
          <p className="text-[#accebc]/60 mb-6">Redefining corporate cricket through technical precision and editorial excellence. Your premium pavilion for every run and wicket.</p>
          <div className="flex gap-4">
            <a className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-all" href="#"><span className="material-symbols-outlined text-sm">public</span></a>
            <a className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-all" href="#"><span className="material-symbols-outlined text-sm">rss_feed</span></a>
            <a className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-all" href="#"><span className="material-symbols-outlined text-sm">alternate_email</span></a>
          </div>
        </div>
        <div>
          <h5 className="font-headline font-bold uppercase text-on-surface mb-6 tracking-widest">Quick Links</h5>
          <ul className="space-y-4">
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">About Us</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Tournament Rules</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Pitch Locations</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Support Desk</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-headline font-bold uppercase text-on-surface mb-6 tracking-widest">Upcoming Series</h5>
          <ul className="space-y-4">
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Silicon Oval T20</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">CEO Invitational Cup</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Winter Pro League</a></li>
            <li><a className="text-[#accebc]/60 hover:text-[#accebc] hover:translate-x-1 transition-transform inline-block" href="#">Founders Series</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-headline font-bold uppercase text-on-surface mb-6 tracking-widest">Newsletter</h5>
          <p className="text-[#accebc]/60 mb-4">Get tournament alerts and match highlights.</p>
          <div className="flex">
            <input className="bg-surface-container border-none text-xs px-4 py-3 flex-1 focus:ring-1 focus:ring-tertiary text-on-surface outline-none" placeholder="Email" type="email" />
            <button className="bg-tertiary text-on-tertiary p-3 hover:bg-tertiary-fixed transition-colors cursor-pointer"><span className="material-symbols-outlined">send</span></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#accebc]/60 text-xs">© 2024 Kricketers Space Editorial. Precision in every delivery.</p>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
          <a className="text-[#accebc]/60 hover:text-[#ffb957]" href="#">Privacy Policy</a>
          <a className="text-[#accebc]/60 hover:text-[#ffb957]" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
