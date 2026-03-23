import { useState } from 'react';
import { Button } from '../common/Button';

const initialState = { inningsNumber: 1, overNumber: 0, ballInOver: 1, runsBat: 0, extrasType: 'none', extrasRuns: 0, isWicket: false, strikerId: 1, bowlerId: 2 };

export const ScoreEventForm = () => {
  const [state, setState] = useState(initialState);

  return (
    <form className="card grid gap-4 p-6 md:grid-cols-3">
      {Object.entries(state).map(([key, value]) => (
        <label key={key} className="flex flex-col gap-2 text-sm uppercase tracking-[0.15em] text-pavilion-muted">
          {key}
          {typeof value === 'boolean' ? (
            <input type="checkbox" checked={value} onChange={(e) => setState((prev) => ({ ...prev, [key]: e.target.checked }))} className="h-5 w-5 rounded border-white/20 bg-black/20" />
          ) : (
            <input value={value} onChange={(e) => setState((prev) => ({ ...prev, [key]: e.target.value }))} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-pavilion-text" />
          )}
        </label>
      ))}
      <div className="md:col-span-3">
        <Button type="button">Push Ball Event</Button>
      </div>
    </form>
  );
};
