import { ScoreEventForm } from '../components/match/ScoreEventForm';

export const LiveScoringPage = () => (
  <div className="space-y-8">
    <section className="card p-10">
      <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">Live & upcoming</p>
      <h1 className="mt-4 text-6xl font-black uppercase">Tech Titans 184/5 vs Cyber Centurions</h1>
      <p className="mt-4 text-xl text-pavilion-muted">Need 24 runs off 8 balls · current batters and active bowler synced via ball event feed.</p>
    </section>
    <ScoreEventForm />
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="card p-8">
        <h2 className="text-3xl font-bold uppercase">Batting scorecard</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm"><thead className="bg-white/5"><tr><th className="p-4">Player</th><th>Runs</th><th>Balls</th><th>SR</th></tr></thead><tbody><tr className="border-t border-white/10"><td className="p-4">Aryan Sharma *</td><td>75</td><td>42</td><td>178.57</td></tr><tr className="border-t border-white/10"><td className="p-4">Rahul Varma</td><td>32</td><td>18</td><td>177.78</td></tr></tbody></table>
        </div>
      </div>
      <aside className="card p-8">
        <h3 className="text-2xl font-bold uppercase">Scoring workflow</h3>
        <ul className="mt-6 space-y-3 text-pavilion-muted">
          <li>• Records legal deliveries, extras, wickets, and strike rotation.</li>
          <li>• Supports innings snapshots and eventual scorecard generation.</li>
          <li>• Designed to power commentary, score overlays, and leaderboards.</li>
        </ul>
      </aside>
    </section>
  </div>
);
