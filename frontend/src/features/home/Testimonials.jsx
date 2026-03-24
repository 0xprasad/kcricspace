import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="bg-surface-container rounded-sm p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(to right, rgba(172, 206, 188, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(172, 206, 188, 0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <img className="w-24 h-24 rounded-full border-4 border-tertiary mb-6 object-cover" data-alt="Team Captain portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-qSJtPUjsksA0qbNdrqERjni3e0OX1yqQiajkiRIE8bGuT2U1tG2Jj171K06N-zuKFePljGArHMcD9sootilan52Dvh239pbSJLqw8E0lBl5Vma5CHe23RqwDxGi6CLHcGe4l02WXMcQxiYgyqUpE4H7SGtF81_Tos3QQ-wydiMZgLBvfEI1-H1YfLY-nEIg56vqC8QflCE83R3SNlnmG2Buy7-0JtU8ukzOXH-RfKHlG3nMb0ZKHzLUQvR8CrtkifgPnU2d0S5s" alt="Captain portrait" />
            <h4 className="font-headline text-2xl font-black uppercase tracking-tight">Vikram Singhania</h4>
            <p className="text-xs font-bold text-tertiary uppercase tracking-widest">Captain, TCS Blaze</p>
          </div>
          <div className="md:w-2/3 border-l border-outline-variant/30 md:pl-12">
            <span className="material-symbols-outlined text-tertiary text-6xl mb-4 block">format_quote</span>
            <p className="text-xl md:text-2xl font-body italic text-on-surface mb-8 leading-relaxed">
              "Kricketers Space has completely transformed our weekend cricket. From professional match officiating to digital scorecards, we feel like we're playing on the international stage every Saturday."
            </p>
            <div className="flex gap-8 opacity-40 grayscale hover:grayscale-0 transition-all flex-wrap">
              <span className="font-headline font-bold">WIPRO</span>
              <span className="font-headline font-bold">TCS</span>
              <span className="font-headline font-bold">AMAZON</span>
              <span className="font-headline font-bold">META</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
