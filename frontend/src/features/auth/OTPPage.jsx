import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { email, purpose, userType } = location.state || { 
    email: '', 
    purpose: 'login', 
    userType: 'ordinary' 
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Focus previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location.state || { email, purpose, userType }),
      });
      const data = await response.json();
      
      if (data.success) {
        setTimer(45);
        setAttemptsRemaining(3);
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6 || !email) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue, purpose, userType }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/');
      } else {
        setError(data.message || 'Invalid OTP');
        setIsSubmitting(false);

        if (data.message && data.message.includes('remaining')) {
          const match = data.message.match(/(\d+)\s+attempt/);
          if (match) {
            setAttemptsRemaining(parseInt(match[1], 10));
          }
        } else if (data.message && data.message.includes('Maximum')) {
          setAttemptsRemaining(0);
          setTimer(0);
        }
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen selection:bg-tertiary selection:text-on-tertiary overflow-hidden relative">
      {/* Background Pattern Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>

      <main className="min-h-screen flex flex-col lg:row overflow-hidden flex-col md:flex-row relative z-10">
        {/* Left Side (40%): Brand Identity & Visual Anchor */}
        <section className="relative w-full md:w-[40%] min-h-[350px] md:min-h-screen flex items-end p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Cinematic sunset view of a cricket stadium" 
              className="w-full h-full object-cover" 
              src="/src/assets/stadium-verify.png" 
            />
            {/* Deep Forest Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-transparent"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full"
          >
            <div className="mb-6">
              <span className="text-tertiary font-headline font-bold text-lg tracking-[0.2em] uppercase">Kricketers Space</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-on-background leading-tight mb-4 tracking-tighter">
              Verify Your <br /> Identity
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-sm">
              A quick check before you take the field.
            </p>
          </motion.div>
        </section>

        {/* Right Side (60%): OTP Entry */}
        <section className="w-full md:w-[60%] bg-surface flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg bg-surface-container-low p-8 md:p-12 border-l border-white/5 shadow-2xl relative"
          >
            <header className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2 tracking-tight uppercase">Enter Verification Code</h2>
              <p className="text-on-surface-variant font-body mb-2">We've sent a 6-digit code to {email || 'your email'}.</p>
              {error && <p className="text-error text-sm font-medium">{error}</p>}
            </header>

            <form className="space-y-10" onSubmit={handleVerify}>
              {/* 6-Digit OTP Input Grid */}
              <div className="grid grid-cols-6 gap-3 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    aria-label={`OTP Digit ${index + 1}`}
                    className="w-full aspect-square text-center text-3xl font-headline font-bold bg-surface-container-lowest border-none text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary transition-all duration-200"
                    inputMode="numeric"
                    maxLength="1"
                    pattern="[0-9]*"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>

              {/* Meta Info & Helpers */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-y border-outline-variant/20">
                {timer > 0 && attemptsRemaining > 0 ? (
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    Resend OTP in <span className="text-on-surface font-bold">{formatTime(timer)}</span>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="flex items-center gap-2 text-tertiary hover:text-tertiary/80 transition-colors text-sm font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    {isResending ? 'Resending...' : 'Resend OTP'}
                  </button>
                )}
                <div className={`flex items-center gap-2 text-sm font-medium ${attemptsRemaining === 0 ? 'text-error font-bold' : 'text-error'}`}>
                  <span className="material-symbols-outlined text-[18px]">security_update_warning</span>
                  {attemptsRemaining === 0 ? 'Maximum attempts reached' : `${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining`}
                </div>
              </div>

              {/* Primary Action */}
              <div className="space-y-4">
                <button 
                  className="w-full bg-tertiary hover:bg-tertiary/90 text-on-tertiary py-5 font-headline font-bold text-lg uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-[0_8px_20px_-4px_rgba(255,185,87,0.3)] disabled:opacity-70 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={isSubmitting || otp.join('').length !== 6 || attemptsRemaining === 0}
                >
                  {isSubmitting ? 'Consulting the third umpire...' : 'Take The Field'}
                </button>
              </div>

              {/* Footer Options */}
              <div className="text-center pt-2">
                <button 
                  className="text-on-surface-variant hover:text-primary text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors group" 
                  type="button"
                  onClick={() => navigate('/login')}
                >
                  Not your email? 
                  <span className="text-primary group-hover:underline flex items-center">
                    Edit Email
                    <span className="material-symbols-outlined text-[16px] ml-1">edit</span>
                  </span>
                </button>
              </div>
            </form>

            {/* Brand Sub-mark */}
            <div className="mt-16 pt-8 border-t border-outline-variant/10 flex justify-between items-center opacity-40">
              <span className="text-[10px] uppercase tracking-[0.2em] font-label">Pavilion Elite Security</span>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                <span className="material-symbols-outlined text-[14px]">encrypted</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default OTPPage;
