import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'admin@grandstand.com', password: 'Password123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex min-h-[70vh] flex-col justify-end rounded-3xl border border-white/10 bg-gradient-to-br from-pavilion-panel to-pavilion p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-pavilion-accent">Welcome back, champion</p>
        <h1 className="mt-6 text-6xl font-black leading-none">Login to Pavilion</h1>
        <p className="mt-4 max-w-lg text-lg text-pavilion-muted">Use JWT-backed authentication today, then extend with Google OAuth for company SSO tomorrow.</p>
      </div>
      <form onSubmit={handleSubmit} className="card mx-auto flex w-full max-w-xl flex-col gap-5 p-10">
        <h2 className="text-3xl font-bold uppercase">Secure Sign In</h2>
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-4" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-4" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <Button disabled={loading}>{loading ? 'Signing In...' : 'Send OTP / Login'}</Button>
      </form>
    </div>
  );
};
