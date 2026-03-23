export const SetupGuidePage = () => (
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
);
