import { teamRoster } from '../lib/data';

export const TeamsPage = () => (
  <div className="space-y-10">
    <section className="card p-10">
      <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">Squad intelligence</p>
      <h1 className="mt-3 text-6xl font-black uppercase">Melbourne Mariners</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        <div><p className="text-pavilion-muted">Captain</p><p className="mt-2 text-2xl font-bold">Steve Richardson</p></div>
        <div><p className="text-pavilion-muted">Home Ground</p><p className="mt-2 text-2xl font-bold">Docklands Stadium</p></div>
        <div><p className="text-pavilion-muted">City</p><p className="mt-2 text-2xl font-bold">Melbourne</p></div>
        <div><p className="text-pavilion-muted">Win Rate</p><p className="mt-2 text-2xl font-bold">68%</p></div>
      </div>
    </section>
    <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
      <div className="card p-8">
        <h2 className="text-3xl font-bold uppercase">Squad management</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 uppercase tracking-[0.2em] text-pavilion-muted"><tr><th className="p-4">Player</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {teamRoster.map((player) => (
                <tr key={player.name} className="border-t border-white/10">
                  <td className="p-4 font-semibold">{player.name}</td>
                  <td>{player.role}</td>
                  <td className={player.status === 'Available' ? 'text-pavilion-success' : 'text-pavilion-accent'}>{player.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="card p-8">
        <h3 className="text-2xl font-bold uppercase">Upcoming fixtures</h3>
        <div className="mt-6 space-y-4 text-sm">
          {['vs Storm Riders · Jun 14', 'vs Cyber Lions · Jun 18', 'vs Matrix XI · Jun 25'].map((fixture) => (
            <div key={fixture} className="rounded-xl border border-white/10 p-4">{fixture}</div>
          ))}
        </div>
      </aside>
    </section>
  </div>
);
