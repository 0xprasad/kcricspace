import { Button } from '../components/common/Button';
import { StatCard } from '../components/common/StatCard';
import { TournamentCard } from '../components/dashboard/TournamentCard';
import { dashboardStats, featuredTournaments } from '../lib/data';

export const LandingPage = () => (
  <div className="space-y-16">
    <section className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="card overflow-hidden p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">Production-ready cricket operations suite</p>
        <h1 className="mt-6 max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl">Manage tournaments, teams, live scoring, and payments from one pavilion.</h1>
        <p className="mt-6 max-w-2xl text-lg text-pavilion-muted">From player registration and match scheduling to ball-by-ball scoring, leaderboard generation, and Razorpay settlement, the platform supports organizers, scorers, captains, and admins.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Launch Tournament</Button>
          <Button variant="secondary">View APIs</Button>
        </div>
      </div>
      <div className="grid gap-4">
        {dashboardStats.map((item) => <StatCard key={item.label} {...item} />)}
      </div>
    </section>

    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">Tournament marketplace</p>
          <h2 className="mt-2 text-4xl font-black uppercase">Featured tournaments</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredTournaments.map((tournament) => <TournamentCard key={tournament.id} tournament={tournament} />)}
      </div>
    </section>
  </div>
);
