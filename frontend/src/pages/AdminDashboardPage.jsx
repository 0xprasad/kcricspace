import { StatCard } from '../components/common/StatCard';
import { dashboardStats } from '../lib/data';

export const AdminDashboardPage = () => (
  <div className="space-y-10">
    <section className="grid gap-6 md:grid-cols-4">
      {dashboardStats.map((item) => <StatCard key={item.label} {...item} />)}
    </section>
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
      <div className="card p-8">
        <h2 className="text-3xl font-bold uppercase">Quick actions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['Create Tournament', 'Add Ground', 'Enter Score', 'Approve Teams'].map((action) => (
            <button key={action} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left text-xl font-semibold uppercase">{action}</button>
          ))}
        </div>
      </div>
      <div className="card p-8">
        <div className="flex items-center justify-between"><h2 className="text-3xl font-bold uppercase">Recent activity</h2><span className="text-sm uppercase tracking-[0.2em] text-pavilion-accent">View all</span></div>
        <div className="mt-6 space-y-4">
          {[
            ['New Registration', 'Lords CC Elite', 'Success'],
            ['Match Finalized', 'Titans vs Warriors', 'Recorded'],
            ['Player Dispute', 'John Doe', 'Flagged']
          ].map(([activity, entity, status]) => (
            <div key={activity} className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <div><p className="text-lg font-semibold">{activity}</p><p className="text-pavilion-muted">{entity}</p></div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em]">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
