import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NormalPlayerPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [playingRole, setPlayingRole] = useState('');
  const [battingStyle, setBattingStyle] = useState('');
  const [bowlingStyle, setBowlingStyle] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('purpose', 'signup');
      formData.append('userType', 'ordinary');
      formData.append('full_name', fullName);
      formData.append('dob', dob);
      formData.append('city', city);
      formData.append('playing_role', playingRole);
      formData.append('batting_style', battingStyle);
      formData.append('bowling_style', bowlingStyle);
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch('http://localhost:5001/api/auth/request-otp', {
        method: 'POST',
        // Note: Do NOT set Content-Type to application/json, fetch will automatically set it to multipart/form-data with the correct boundary
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/verify', { state: { email, purpose: 'signup', userType: 'ordinary' } });
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
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-tertiary selection:text-on-tertiary">
      <main className="flex min-h-screen flex-col md:flex-row">
        {/* Left Section: Visual Anchor (Daylight) */}
        <section className="relative w-full md:w-[40%] bg-stadium-day flex flex-col justify-end p-8 md:p-16 overflow-hidden">
          <div className="z-10 mb-12">
            <div className="text-primary font-headline font-bold uppercase tracking-widest text-sm mb-4">Kricketers Space</div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-[0.9] tracking-tighter text-glow drop-shadow-2xl">
              Step Up To <br /> The Crease
            </h1>
            <p className="text-on-surface/80 mt-6 max-w-sm text-lg">
              Join tournaments, build your team, and track every run & wicket.
            </p>
          </div>
          
          <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[400px]">sports_cricket</span>
          </div>
        </section>

        {/* Right Section: Profile Form */}
        <section className="w-full md:w-[60%] bg-surface flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface-container-low p-8 md:p-12 rounded-sm shadow-2xl">
            <header className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">
                Start Your Innings
              </h2>
              <p className="text-on-surface-variant mt-2 font-body text-sm">Complete your player profile to join the upcoming seasonal draft.</p>
            </header>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alastair Cook"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface placeholder:text-on-surface-variant/30 rounded-sm transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="player@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface placeholder:text-on-surface-variant/30 rounded-sm transition-all"
                  />
                  {error && <p className="text-error text-xs mt-1">{error}</p>}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Date of Birth</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={dob}
                      onChange={(e) => setDob(e.target.value)} 
                      className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface rounded-sm transition-all appearance-none"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none">calendar_today</span>
                  </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">City (India)</label>
                  <input 
                    type="text" 
                    placeholder="London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface placeholder:text-on-surface-variant/30 rounded-sm transition-all"
                  />
                </div>

                {/* Playing Role */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Playing Role</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface appearance-none rounded-sm transition-all cursor-pointer"
                      value={playingRole}
                      onChange={(e) => setPlayingRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option>Batsman</option>
                      <option>Bowler</option>
                      <option>All-rounder</option>
                      <option>Wicketkeeper-Batsman</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>

                {/* Batting Style */}
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Batting Style</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface appearance-none rounded-sm transition-all cursor-pointer"
                      value={battingStyle}
                      onChange={(e) => setBattingStyle(e.target.value)}
                    >
                      <option value="">Select Style</option>
                      <option>Right-Hand Bat</option>
                      <option>Left-Hand Bat</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>

                {/* Bowling Style */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Bowling Style</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 p-4 text-on-surface appearance-none rounded-sm transition-all cursor-pointer"
                      value={bowlingStyle}
                      onChange={(e) => setBowlingStyle(e.target.value)}
                    >
                      <option value="">Select Style (Optional if purely Batsman)</option>
                      <option>Right-arm Fast</option>
                      <option>Right-arm Medium</option>
                      <option>Right-arm Spin</option>
                      <option>Left-arm Fast</option>
                      <option>Left-arm Medium</option>
                      <option>Left-arm Spin</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Player Headshot Upload */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Player Headshot</label>
                <div className="flex items-center gap-6 p-6 bg-surface-container-lowest rounded-sm border border-outline-variant/20 hover:border-primary/50 transition-colors">
                  <div className="w-24 h-24 rounded-sm bg-surface-container flex items-center justify-center border-2 border-dashed border-outline/30 relative overflow-hidden group">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-3xl">add_a_photo</span>
                    )}
                    <input 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAvatarFile(file);
                          setAvatarPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Upload Image</p>
                    <p className="text-xs text-on-surface-variant mt-1">PNG or JPG. Max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-outline-variant/10">
                <p className="text-on-surface-variant/60 text-xs max-w-xs leading-relaxed">
                  By taking the field, you agree to our Tournament Rules and Fair Play Policy. Already have an account? <Link className="text-tertiary font-bold hover:underline" to="/login">Log In</Link>
                </p>
                <button 
                  className="w-full bg-tertiary text-on-tertiary font-headline font-bold text-lg uppercase tracking-widest py-5 rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting || isPersonalEmail}
                >
                  {isSubmitting ? 'Setting the field...' : 'Take The Field'}
                  {!isSubmitting && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NormalPlayerPage;
