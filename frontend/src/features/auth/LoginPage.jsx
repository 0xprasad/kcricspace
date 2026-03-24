import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BattingLoader from '@/components/ui/BattingLoader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, purpose: 'login' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/verify', { state: { email, purpose: 'login', userType: 'ordinary' } });
      } else {
        setError(data.message || 'Failed to request OTP');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen selection:bg-tertiary selection:text-on-tertiary overflow-hidden">
      <main className="flex min-h-screen">
        {/* Left Section (40%): Hero Visual */}
        <section className="hidden lg:flex lg:w-[40%] relative overflow-hidden bg-surface-container-lowest border-r border-outline-variant/10">
          {/* Background Image with Stadium Login Asset */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              alt="Cinematic wide shot of a misty cricket ground at dusk" 
              className="w-full h-full object-cover mix-blend-overlay opacity-40 grayscale" 
              src="/src/assets/stadium-login.png" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
          </div>

          {/* Branding Overlay */}
          <div className="absolute top-10 left-10">
            <div className="flex items-center gap-2">
              <span className="text-primary font-headline text-2xl font-bold uppercase tracking-tighter">Kricketers Space</span>
            </div>
          </div>

          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col justify-end p-16 h-full w-full"
          >
            <div className="space-y-6">
              <h1 className="font-headline text-6xl font-bold text-primary tracking-tighter leading-none">
                Welcome Back,<br />Champion
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-sm leading-relaxed">
                Your next match might be today. Step inside the Pavilion.
              </p>
              <div className="pt-8">
                <div className="w-12 h-1 bg-tertiary"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right Section (60%): Login Form */}
        <section className="w-full lg:w-[60%] flex flex-col items-center justify-center p-8 lg:p-24 relative bg-surface">
          {/* Mobile Brand Header */}
          <div className="lg:hidden absolute top-8 left-8">
            <span className="text-primary font-headline text-xl font-bold uppercase tracking-tighter">Kricketers Space</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md space-y-10"
          >
            {/* Heading */}
            <header className="space-y-2">
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight uppercase">Login to Pavilion</h2>
              <p className="text-on-surface-variant font-body">Enter your credentials to access the editorial suite.</p>
              {error && <p className="text-error text-[10px] font-medium italic mt-2">{error}</p>}
            </header>

            {/* Login Card (Glassmorphism Effect) */}
            <div className="bg-surface-container-low p-8 rounded-lg shadow-2xl border border-outline-variant/5 backdrop-blur-sm relative overflow-hidden min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <BattingLoader />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold" htmlFor="email">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                          <input 
                            className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary py-4 pl-12 pr-4 text-on-surface font-body rounded transition-all placeholder:text-outline-variant" 
                            id="email" 
                            placeholder="champion@kricketers.com" 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button 
                        className="w-full bg-tertiary hover:bg-tertiary/90 text-on-tertiary font-headline font-bold py-4 px-6 rounded-sm tracking-tight transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
                        type="submit"
                        disabled={!email}
                      >
                        <span>Take the Field</span>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Link */}
            <footer className="text-center pt-4">
              <Link className="inline-flex items-center gap-2 group" to="/signup">
                <span className="text-on-surface-variant font-body">New here?</span>
                <span className="text-secondary font-headline font-semibold tracking-tight group-hover:underline">Step up to the crease → Sign up</span>
              </Link>
            </footer>
          </motion.div>

          {/* Background Decoration (Corner) */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] pointer-events-none"></div>
        </section>
      </main>

    </div>
  );
};

export default LoginPage;
