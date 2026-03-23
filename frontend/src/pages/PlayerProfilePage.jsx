import { players } from '../lib/data';
import { Button } from '../components/common/Button';

export const PlayerProfilePage = () => {
  const player = players[0];
  return (
    <div className="space-y-8">
      <section className="card grid gap-8 p-10 lg:grid-cols-[260px_1fr]">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-900/40 to-pavilion-panel p-4">
          <div className="aspect-square rounded-xl bg-black/20" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">{player.team}</p>
          <h1 className="mt-4 text-6xl font-black uppercase">{player.name}</h1>
          <p className="mt-4 text-2xl text-pavilion-muted">{player.role} ({player.batting} / {player.bowling})</p>
          <div className="mt-8 flex gap-4"><Button>Follow Player</Button><Button variant="secondary">View Full Log</Button></div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-4">
        {[
          ['Matches', '142'],
          ['Runs Scored', String(player.runs)],
          ['Wickets', String(player.wickets)],
          ['POTM Awards', '24']
        ].map(([label, value]) => (
          <div key={label} className="card p-6"><p className="text-xs uppercase tracking-[0.25em] text-pavilion-muted">{label}</p><p className="mt-4 text-5xl font-bold">{value}</p></div>
        ))}
      </section>
    </div>
  );
};
