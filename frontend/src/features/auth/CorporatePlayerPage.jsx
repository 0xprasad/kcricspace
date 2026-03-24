import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CorporatePlayerPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('player.name@company.com');
  const [companyName, setCompanyName] = useState('');
  const [empId, setEmpId] = useState('');
  const [designation, setDesignation] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [playingRole, setPlayingRole] = useState('');
  const [battingStyle, setBattingStyle] = useState('');
  const [bowlingStyle, setBowlingStyle] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPersonalEmail = email.endsWith('@gmail.com') || email.endsWith('@yahoo.com') || email.endsWith('@outlook.com');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPersonalEmail || !email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('purpose', 'signup');
      formData.append('userType', 'corporate');
      formData.append('company_name', companyName);
      formData.append('employee_id', empId);
      formData.append('designation', designation);
      formData.append('state', selectedState);
      formData.append('city', city);
      formData.append('playing_role', playingRole);
      formData.append('batting_style', battingStyle);
      formData.append('bowling_style', bowlingStyle);
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch('http://localhost:5001/api/auth/request-otp', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/verify', { state: { email, purpose: 'signup', userType: 'corporate' } });
      } else {
        setError(data.message || 'Failed to request OTP');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
      setIsSubmitting(false);
    }
  };


  const indianStates = [
    'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 
    'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Telangana', 'Punjab'
  ];

  const citiesByState = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Agra'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar']
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-tertiary selection:text-on-tertiary">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 z-50 flex justify-between items-center px-6 h-16 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="text-xl font-bold text-tertiary font-headline uppercase tracking-wider">
          Kricketers Space Editorial
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 font-headline uppercase tracking-wider text-xs">
            <a className="text-primary/70 hover:text-tertiary transition-colors duration-300" href="#">Tournament</a>
            <a className="text-primary/70 hover:text-tertiary transition-colors duration-300" href="#">Teams</a>
            <a className="text-primary/70 hover:text-tertiary transition-colors duration-300" href="#">Schedule</a>
          </nav>
          <div className="flex items-center gap-4 text-primary">
            <button className="material-symbols-outlined hover:text-tertiary transition-colors">notifications</button>
            <button className="material-symbols-outlined hover:text-tertiary transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      <main className="pt-16 min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Hero Section (40%) */}
        <section className="relative w-full md:w-[40%] min-h-[400px] md:min-h-full bg-stadium-day flex items-start p-8 md:p-16 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md mt-64 md:mt-0"
          >
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-tertiary uppercase leading-[0.9] tracking-tighter text-glow">
              Step Up To <br /> The Crease
            </h1>
            <div className="mt-6 w-12 h-1 bg-tertiary"></div>
            <p className="mt-6 text-primary font-medium tracking-wide uppercase text-sm font-label">
              Join the Elite Pavilion Corporate League
            </p>
          </motion.div>
        </section>

        {/* Right Side: Registration Form (60%) */}
        <section className="w-full md:w-[60%] bg-surface flex items-center justify-center p-6 md:p-12 pb-32 md:pb-12 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl bg-surface-container-low p-8 md:p-12 shadow-2xl relative overflow-hidden border-l-4 border-tertiary my-12"
          >
            <header className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface uppercase tracking-tight">
                Start Your Corporate Innings
              </h2>
              <p className="text-on-surface-variant mt-2 font-body text-sm">Complete your corporate player profile to join the upcoming seasonal draft.</p>
            </header>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Profile Photo Upload */}
              <div className="flex items-center gap-6 p-6 bg-surface-container rounded-sm border border-outline-variant/10">
                <div className="w-20 h-20 rounded-sm bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline/30 relative overflow-hidden group cursor-pointer transition-all hover:border-primary/50">
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
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-primary mb-1">Profile Photo</label>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">PNG or JPG. Max 5MB.</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Corporate Email */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="email">Corporate Email</label>
                  <input 
                    className={`w-full bg-surface-container-lowest border-0 border-b-2 ${isPersonalEmail ? 'border-error' : 'border-outline-variant'} focus:ring-0 focus:border-tertiary text-on-surface p-4 transition-all font-body`}
                    id="email" 
                    placeholder="yourname@company.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {isPersonalEmail && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 text-error mt-2"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      <p className="text-[10px] font-medium italic">Please use your official corporate domain. Personal emails are not permitted.</p>
                    </motion.div>
                  )}
                  {error && <p className="text-error text-[10px] font-medium italic mt-2">{error}</p>}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="company">Company Name</label>
                  <input 
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 transition-all font-body" 
                    id="company" 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                {/* Employee ID */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="emp-id">Employee ID</label>
                  <input 
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 transition-all font-body" 
                    id="emp-id" 
                    type="text" 
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </div>

                {/* Designation */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="designation">Designation</label>
                  <input 
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 transition-all font-body" 
                    id="designation" 
                    type="text" 
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                {/* State Selection */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="state">State (India)</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 appearance-none transition-all font-body cursor-pointer" 
                      id="state"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>

                {/* City Selection */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="city">City (India)</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 appearance-none transition-all font-body cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!selectedState}
                    >
                      <option value="">Select City</option>
                      {selectedState && citiesByState[selectedState].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>

                {/* Playing Role */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="role">Playing Role</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 appearance-none transition-all font-body cursor-pointer" 
                      id="role"
                      value={playingRole}
                      onChange={(e) => setPlayingRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option>Batsman</option>
                      <option>Bowler</option>
                      <option>All-rounder</option>
                      <option>Wicketkeeper-Batsman</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>

                {/* Batting Style */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="batting">Batting Style</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 appearance-none transition-all font-body cursor-pointer" 
                      id="batting"
                      value={battingStyle}
                      onChange={(e) => setBattingStyle(e.target.value)}
                    >
                      <option value="">Select Batting Style</option>
                      <option>Right-Hand Bat</option>
                      <option>Left-Hand Bat</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>

                {/* Bowling Style */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="bowling">Bowling Style</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary text-on-surface p-4 appearance-none transition-all font-body cursor-pointer" 
                      id="bowling"
                      value={bowlingStyle}
                      onChange={(e) => setBowlingStyle(e.target.value)}
                    >
                      <option value="">Select Bowling Style</option>
                      <option>Right-arm Fast</option>
                      <option>Right-arm Medium</option>
                      <option>Right-arm Spin</option>
                      <option>Left-arm Fast</option>
                      <option>Left-arm Medium</option>
                      <option>Left-arm Spin</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-8">
                <button 
                  className="w-full bg-tertiary text-on-tertiary font-headline font-bold text-lg uppercase tracking-widest py-5 rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting || isPersonalEmail}
                >
                  {isSubmitting ? 'Setting the field...' : 'Take The Field'}
                  {!isSubmitting && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>}
                </button>
                <p className="text-center mt-6 text-[10px] text-on-surface-variant font-body px-8 leading-relaxed">
                  By registering, you agree to the <a className="underline hover:text-primary transition-colors" href="#">League Standards of Conduct</a> and <a className="underline hover:text-primary transition-colors" href="#">Data Privacy Policy</a>. 
                  <br className="mt-2" />
                  Already have an account? <Link className="text-tertiary font-bold hover:underline" to="/login">Log In</Link>
                </p>
              </div>
            </form>
          </motion.div>
        </section>
      </main>

      {/* Mobile Navigation (BottomNavBar) */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container-lowest border-t border-outline-variant/10 flex justify-around items-center h-16 pb-safe backdrop-blur-md">
        <a className="flex flex-col items-center justify-center text-primary/50 transition-all hover:text-primary active:scale-90" href="#">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-body text-[10px] uppercase font-bold tracking-widest mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-primary/50 transition-all hover:text-primary active:scale-90" href="#">
          <span className="material-symbols-outlined text-2xl">sports_cricket</span>
          <span className="font-body text-[10px] uppercase font-bold tracking-widest mt-1">Matches</span>
        </a>
        <a className="flex flex-col items-center justify-center text-tertiary border-t-2 border-tertiary h-full active:scale-90" href="#">
          <span className="material-symbols-outlined text-2xl">app_registration</span>
          <span className="font-body text-[10px] uppercase font-bold tracking-widest mt-1">Join</span>
        </a>
        <a className="flex flex-col items-center justify-center text-primary/50 transition-all hover:text-primary active:scale-90" href="#">
          <span className="material-symbols-outlined text-2xl">manage_accounts</span>
          <span className="font-body text-[10px] uppercase font-bold tracking-widest mt-1">Account</span>
        </a>
      </nav>
    </div>
  );
};

export default CorporatePlayerPage;
