import { featuredTournaments } from '../lib/data';
import { TournamentCard } from '../components/dashboard/TournamentCard';

export const TournamentsPage = () => (
  <div className="space-y-8">
    <div className="card p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">International & domestic</p>
      <h1 className="mt-3 text-6xl font-black uppercase">All tournaments</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {['Search tournaments', 'Format', 'Status', 'Entry Fee', 'City'].map((label) => (
          <input key={label} placeholder={label} className="rounded-xl border border-white/10 bg-black/20 px-4 py-4" />
        ))}
      </div>
    </div>
    <div className="grid gap-6 xl:grid-cols-3">
      {featuredTournaments.map((tournament) => <TournamentCard key={tournament.id} tournament={tournament} />)}
    </div>
  </div>
);
