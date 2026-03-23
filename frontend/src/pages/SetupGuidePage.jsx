import { apiCatalog } from '../lib/data';

export const SetupGuidePage = () => (
  <div className="space-y-8">
    <div className="card space-y-8 p-10">
      <h1 className="text-4xl font-black uppercase">Setup & run instructions</h1>
      <ol className="space-y-4 text-lg text-pavilion-muted">
        <li>1. Install dependencies at the repo root with <code>npm install</code>.</li>
        <li>2. Copy environment files from <code>backend/.env.example</code> and <code>frontend/.env.example</code>.</li>
        <li>3. Provision MySQL and run <code>backend/sql/schema.sql</code>.</li>
        <li>4. Start both workspaces via <code>npm run dev</code>.</li>
        <li>5. Build production artifacts via <code>npm run build</code>.</li>
      </ol>
    </div>

    <div className="card p-10">
      <h2 className="text-3xl font-bold uppercase">API integration catalog</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 uppercase tracking-[0.2em] text-pavilion-muted"><tr><th className="p-4">Method</th><th>Path</th><th>Description</th></tr></thead>
          <tbody>
            {apiCatalog.map((item) => (
              <tr key={item.path} className="border-t border-white/10">
                <td className="p-4 font-semibold text-pavilion-accent">{item.method}</td>
                <td className="font-mono">{item.path}</td>
                <td className="text-pavilion-muted">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
