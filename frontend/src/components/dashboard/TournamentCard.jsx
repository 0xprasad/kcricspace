import { Button } from '../common/Button';

export const TournamentCard = ({ tournament }) => (
  <article className="card flex flex-col gap-6 p-6">
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-pavilion-accent/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-pavilion-accent">{tournament.status}</span>
      <span className="text-sm text-pavilion-muted">{tournament.format}</span>
    </div>
    <div>
      <h3 className="text-2xl font-bold uppercase">{tournament.name}</h3>
      <p className="mt-2 text-pavilion-muted">{tournament.city}</p>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-pavilion-muted">Entry Fee</p>
        <p className="mt-1 font-semibold">{tournament.fee}</p>
      </div>
      <div>
        <p className="text-pavilion-muted">Prize Pool</p>
        <p className="mt-1 font-semibold">{tournament.prize}</p>
      </div>
    </div>
    <Button>Register Team</Button>
  </article>
);
