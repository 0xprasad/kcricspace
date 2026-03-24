import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KpiSection from './components/KpiSection';
import AdminStats from './components/AdminStats';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-surface selection:bg-tertiary/30 selection:text-tertiary">
      {/* SideNavBar */}
      <Sidebar />

      {/* Main Canvas */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* TopAppBar */}
        <Topbar />

        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface mb-1">
                Editorial Control Center
              </h1>
              <p className="text-sm text-on-surface-variant font-medium tracking-wide">
                Welcome back, Chief Editor. Here's what's happening on the pitch today.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-surface-container-high border border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-all rounded-sm">
                Download Report
              </button>
              <button className="px-4 py-2 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm shadow-lg shadow-primary/20">
                Live Broadcast
              </button>
            </div>
          </div>

          {/* Hero / KPI Section */}
          <KpiSection />

          {/* Quick Actions & Secondary Stats */}
          <AdminStats />
        </div>

        {/* Sticky Footer Action */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-14 h-14 bg-tertiary text-on-tertiary rounded-full shadow-[0_8px_32px_rgba(255,185,87,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
            <span className="material-symbols-outlined text-3xl font-bold group-hover:rotate-90 transition-transform duration-300">add</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
