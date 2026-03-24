import React from 'react';

const KpiCard = ({ label, value, icon, color, subValue, hasTexture }) => (
  <div className={`bg-surface-container-low p-6 rounded-sm border-l-4 ${color} ${hasTexture ? 'pitch-card-texture' : ''} relative overflow-hidden transition-all hover:translate-y-[-2px] hover:shadow-lg`}>
    {!hasTexture && color.includes('error') && (
      <div className="absolute top-0 right-0 w-16 h-16 bg-error/5 rotate-45 translate-x-8 -translate-y-8"></div>
    )}
    <p className={`font-label uppercase tracking-widest text-[10px] ${color.includes('error') ? 'text-error' : 'text-on-surface-variant'} mb-1`}>
      {label}
    </p>
    <div className="flex items-end justify-between">
      <div>
        <h2 className="font-headline text-4xl font-bold text-on-surface tracking-tighter">{value}</h2>
        {subValue && <p className="text-[10px] text-secondary font-bold mt-1">{subValue}</p>}
      </div>
      <span className={`material-symbols-outlined ${color.replace('border-', 'text-')}/30 text-4xl`}>{icon}</span>
    </div>
  </div>
);

const KpiSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard 
        label="Active Tournaments" 
        value="12" 
        icon="emoji_events" 
        color="border-primary" 
        hasTexture={true} 
      />
      <KpiCard 
        label="Teams Pending Approval" 
        value="08" 
        icon="pending_actions" 
        color="border-error/50" 
      />
      <KpiCard 
        label="Today's Matches" 
        value="05" 
        icon="sports_cricket" 
        color="border-tertiary" 
        hasTexture={true} 
      />
      <KpiCard 
        label="Monthly Revenue" 
        value="$42,500" 
        icon="trending_up" 
        color="border-primary" 
        subValue="+12% vs last month"
      />
    </section>
  );
};

export default KpiSection;
