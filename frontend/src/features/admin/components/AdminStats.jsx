import React from 'react';

const AdminStats = () => {
  const quickActions = [
    { icon: 'trophy', label: 'Create Tournament' },
    { icon: 'stadium', label: 'Add Ground' },
    { icon: 'scoreboard', label: 'Enter Score' },
    { icon: 'verified_user', label: 'Approve Teams' },
  ];

  const activities = [
    { 
      type: 'New Registration', 
      entity: 'Lords CC Elite', 
      status: 'Success', 
      time: '2m ago', 
      icon: 'person_add', 
      color: 'text-secondary', 
      bgColor: 'bg-secondary/10', 
      statusColor: 'bg-secondary/10 text-secondary border-secondary/20' 
    },
    { 
      type: 'Match Finalized', 
      entity: 'Titans vs Warriors', 
      status: 'Recorded', 
      time: '14m ago', 
      icon: 'sports_score', 
      color: 'text-tertiary', 
      bgColor: 'bg-tertiary/10', 
      statusColor: 'bg-primary/10 text-primary border-primary/20' 
    },
    { 
      type: 'Player Dispute', 
      entity: 'John Doe (Kensington)', 
      status: 'Flagged', 
      time: '1h ago', 
      icon: 'report', 
      color: 'text-error', 
      bgColor: 'bg-error/10', 
      statusColor: 'bg-error/10 text-error border-error/20' 
    },
  ];

  const pendingApprovals = [
    { 
      name: 'Oval Strikers U-19', 
      submittedBy: 'Michael Richardson', 
      time: '4h ago', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB4_RLOyIqS0R42SHahFDNDwuUB5wddKs8X3ezvtdbpWqh0khNLw0YXF2gV9RtSWS0-Q1evTeaiF4Qzw_gJeuCOOq2rN55muw4AVBQ1_vqzCRXN-5Vk64jS-weIE6S7XfO-rbLHC6N9sPTIAFIRjRvv0mfk5pW3x3kxADIulWVprL5FUhTmOZfKRS6mWo-Fe7coAaYWLm_EO2eTuTE4TjRSeXWhc4BySvEKMHIMhLz9pPVTOaZbEa0UECJdVFvfGjPmpNvN8VmMuU' 
    },
    { 
      name: 'Melbourne Renegades Elite', 
      submittedBy: 'Sarah Jenkins', 
      time: '6h ago', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA514TuMqIbr-mwGuG8ih432c-gPmLTW9telis5MycIhQNo9FYtgBqDnv8LNJb1FXCJbf2NtsrsmEqNx1OKjIkUDsVLK875UMyfjTE6ZScNfXI2o787AYDFICnMYYLT5ZyPM_XT-hoAfWiqqY9jX8wukxQkcNpMwJlqSYatdQQIq72vCsX3BWbimjZmLvWBYipzUbCo9IUBVQb9eYkRsclouJmcJInv9jEeGxj9QOW5bdnQV_W_lVWNDtBC_sra1KgIb2AYcOR7Joo' 
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Quick Actions Grid */}
      <div className="lg:col-span-1 space-y-6">
        <h3 className="font-headline uppercase tracking-widest text-xs font-bold text-tertiary">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <button key={i} className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-high hover:bg-primary-container transition-all group rounded-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold text-on-surface-variant group-hover:text-on-surface text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Revenue Chart Placeholder */}
        <div className="bg-surface-container-lowest p-6 rounded-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline uppercase tracking-widest text-xs font-bold text-on-surface">Revenue Trend</h3>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Last 30 Days</span>
          </div>
          <div className="h-32 flex items-end gap-1">
            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-2/3 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-1/3 rounded-t-sm"></div>
            <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-2/3 rounded-t-sm"></div>
            <div className="w-full bg-primary/60 h-full rounded-t-sm border-t-2 border-tertiary"></div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Approvals */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-surface-container-low rounded-sm overflow-hidden border border-outline-variant/5 shadow-inner">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/30">
            <h3 className="font-headline uppercase tracking-widest text-xs font-bold text-on-surface">Recent Activity</h3>
            <button className="text-[10px] text-tertiary font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Activity</th>
                <th className="px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Entity</th>
                <th className="px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</th>
                <th className="px-6 py-3 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {activities.map((act, i) => (
                <tr key={i} className="hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${act.bgColor} flex items-center justify-center ${act.color}`}>
                      <span className="material-symbols-outlined text-sm">{act.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{act.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">{act.entity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${act.statusColor}`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant/40 font-bold">{act.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending Approvals */}
        <div className="space-y-4">
          <h3 className="font-headline uppercase tracking-widest text-xs font-bold text-on-surface">Pending Approvals</h3>
          <div className="grid grid-cols-1 gap-4">
            {pendingApprovals.map((app, i) => (
              <div key={i} className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded-sm overflow-hidden">
                    <img className="w-8 h-8 object-contain opacity-80" alt={app.name} src={app.img} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">{app.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      Submitted by: <span className="text-on-surface">{app.submittedBy}</span> • {app.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Approve</button>
                  <button className="px-4 py-2 bg-error/10 text-error border border-error/20 text-[10px] font-bold uppercase tracking-widest hover:bg-error hover:text-on-error transition-all">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
