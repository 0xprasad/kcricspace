export const StatCard = ({ label, value, helper }) => (
  <div className="card p-6">
    <p className="text-xs uppercase tracking-[0.25em] text-pavilion-muted">{label}</p>
    <p className="mt-3 text-4xl font-bold">{value}</p>
    <p className="mt-2 text-sm text-pavilion-muted">{helper}</p>
  </div>
);
