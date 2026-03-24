import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const CreateTournament = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [formData, setFormData] = useState({
    tournament_id: 'KS-2026-CRK-082',
    name: '',
    sport: 'Cricket',
    format: 'T20 International',
    tournament_type: 'league',
    fixture_type: 'Round Robin',
    rules: '',
    banner_url: '',
    status: 'draft',
    primary_ground: 'The Oval Ground - London',
    entry_fee: '',
    prize_pool: '',
    max_teams: '16',
    registration_deadline: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately for snappy UX
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary via backend
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/upload/image`,
        { method: 'POST', body: formData }
      );
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, banner_url: result.url }));
      } else {
        alert('Image upload failed: ' + result.message);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (status) => {
    setLoading(true);
    const dataToSend = { ...formData, status };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/tournaments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`Tournament ${status === 'active' ? 'published' : 'saved'} successfully!`);
        navigate('/tournaments');
      } else {
        alert('Failed to save tournament: ' + result.message);
      }
    } catch (err) {
      console.error('Error saving tournament:', err);
      alert('Internal Server Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface selection:bg-tertiary/30 selection:text-tertiary">
      <Sidebar />

      <main className="flex-1 ml-64 min-h-screen pb-16">
        <Topbar />

        <div className="max-w-6xl mx-auto p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold font-headline uppercase tracking-tight text-primary leading-none mb-2">Create Tournament</h1>
              <p className="text-on-surface-variant font-body max-w-xl">
                Initialize a new professional cricket event. Configure formatting, financials, and ground logistics.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleSubmit('draft')}
                disabled={loading}
                className="px-6 py-3 border border-outline-variant text-on-surface font-bold uppercase text-xs tracking-widest hover:bg-primary-container/30 transition-colors rounded-sm disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Save as Draft'}
              </button>
              <button 
                onClick={() => handleSubmit('active')}
                disabled={loading}
                className="px-8 py-3 bg-tertiary text-on-tertiary font-extrabold uppercase text-xs tracking-widest hover:brightness-110 transition-all rounded-sm shadow-lg shadow-tertiary/10 disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Tournament'}
              </button>
            </div>
          </header>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="lg:col-span-8 space-y-8">
              
              <section className="bg-surface-container-low p-8 relative overflow-hidden group border border-outline-variant/5">
                <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
                <h3 className="font-headline text-xl uppercase font-bold text-[#accebc] mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">info</span>
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Tournament ID</label>
                    <input 
                      name="tournament_id"
                      value={formData.tournament_id}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface font-mono text-sm px-4 py-3 rounded-sm transition-all ring-1 ring-outline-variant/10" 
                      type="text" 
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Tournament Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface text-lg font-medium px-4 py-4 rounded-sm transition-all ring-1 ring-outline-variant/10" 
                      placeholder="e.g. Summer Premier League 2024" 
                      type="text" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Sport</label>
                    <select 
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm appearance-none ring-1 ring-outline-variant/10"
                    >
                      <option>Cricket</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Format</label>
                    <select 
                      name="format"
                      value={formData.format}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm appearance-none ring-1 ring-outline-variant/10"
                    >
                      <option>T20 International</option>
                      <option>T10 Blast</option>
                      <option>ODI (50 Overs)</option>
                      <option>Test Match (Custom)</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="bg-surface-container-low p-8 relative overflow-hidden group border border-outline-variant/5">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <h3 className="font-headline text-xl uppercase font-bold text-[#accebc] mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Competition Details
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Tournament Type</label>
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="tournament_type" 
                            value="league" 
                            checked={formData.tournament_type === 'league'} 
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <div className="bg-surface-container-lowest p-3 text-center border border-outline-variant/10 peer-checked:border-tertiary peer-checked:bg-tertiary/10 transition-all rounded-sm text-sm font-bold uppercase tracking-tighter hover:bg-surface-container-lowest/50">League</div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="tournament_type" 
                            value="knockout" 
                            checked={formData.tournament_type === 'knockout'} 
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <div className="bg-surface-container-lowest p-3 text-center border border-outline-variant/10 peer-checked:border-tertiary peer-checked:bg-tertiary/10 transition-all rounded-sm text-sm font-bold uppercase tracking-tighter hover:bg-surface-container-lowest/50">Knockout</div>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Fixture Type</label>
                      <select 
                        name="fixture_type"
                        value={formData.fixture_type}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm appearance-none ring-1 ring-outline-variant/10"
                      >
                        <option>Round Robin</option>
                        <option>Single Elimination</option>
                        <option>Double Elimination</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Tournament Rules & Guidelines</label>
                    <div className="bg-surface-container-lowest rounded-sm overflow-hidden ring-1 ring-outline-variant/10">
                      <textarea 
                        name="rules"
                        value={formData.rules}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none focus:ring-0 text-on-surface p-4 text-sm leading-relaxed resize-none placeholder:text-outline-variant/40" 
                        placeholder="Define the match rules, boundary regulations, and player eligibility..." 
                        rows="6"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-surface-container-low p-8 relative overflow-hidden group border border-outline-variant/5">
                <h3 className="font-headline text-xl uppercase font-bold text-[#accebc] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">image</span>
                  Visual Assets
                </h3>
                <div 
                  className={`border-2 border-dashed border-outline-variant/20 hover:border-tertiary/50 transition-all bg-surface-container-lowest p-8 text-center rounded-sm cursor-pointer group/upload relative min-h-[200px] flex flex-col items-center justify-center ${previewImage ? 'p-0 overflow-hidden' : ''}`}
                  onClick={handleUploadClick}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*"
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">progress_activity</span>
                      <p className="text-tertiary font-bold uppercase tracking-widest text-xs">Uploading to Cloudinary...</p>
                    </div>
                  ) : previewImage ? (
                    <img src={previewImage} alt="Banner Preview" className="w-full h-full object-cover max-h-[300px]" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#accebc]/20 group-hover/upload:text-tertiary group-hover/upload:scale-110 transition-transform mb-4">cloud_upload</span>
                      <p className="text-on-surface font-bold uppercase tracking-widest text-sm mb-1">Upload Tournament Banner</p>
                      <p className="text-on-surface-variant/60 text-xs text-center">Recommended size: 1920x600px (Max 5MB)</p>
                    </>
                  )}
                  {previewImage && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold uppercase tracking-widest text-xs">Change Image</span>
                    </div>
                  )}
                </div>
              </section>

            </div>

            <div className="lg:col-span-4 space-y-8">
              <section className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 shadow-lg shadow-black/20">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">Current Status</h4>
                <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-sm border-l-4 border-tertiary">
                  <div className="flex-1">
                    <p className="text-lg font-headline font-bold text-tertiary uppercase leading-none">Draft Mode</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">Not visible to teams yet</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary opacity-50">edit_note</span>
                </div>
              </section>

              <section className="bg-surface-container-low p-6 rounded-sm space-y-6 border border-outline-variant/5">
                <h3 className="font-headline text-lg uppercase font-bold text-[#accebc] flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">payments</span>
                  Financials & Logistics
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Primary Ground</label>
                    <select 
                      name="primary_ground"
                      value={formData.primary_ground}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10"
                    >
                      <option>The Oval Ground - London</option>
                      <option>Melbourne Cricket Ground</option>
                      <option>Eden Gardens - Kolkata</option>
                      <option>Wanderers Stadium</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Entry Fee ($)</label>
                      <input 
                        name="entry_fee"
                        value={formData.entry_fee}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10" 
                        placeholder="500" 
                        type="number" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Prize Pool ($)</label>
                      <input 
                        name="prize_pool"
                        value={formData.prize_pool}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10" 
                        placeholder="10000" 
                        type="number" 
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-surface-container-low p-6 rounded-sm space-y-6 border border-outline-variant/5">
                <h3 className="font-headline text-lg uppercase font-bold text-[#accebc] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Timeline
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Max Teams</label>
                    <input 
                      name="max_teams"
                      value={formData.max_teams}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10" 
                      placeholder="16" 
                      type="number" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Registration Deadline</label>
                    <input 
                      name="registration_deadline"
                      value={formData.registration_deadline}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10 [color-scheme:dark]" 
                      type="date" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Start Date</label>
                      <input 
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10 [color-scheme:dark]" 
                        type="date" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">End Date</label>
                      <input 
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-tertiary text-on-surface px-4 py-3 rounded-sm text-sm ring-1 ring-outline-variant/10 [color-scheme:dark]" 
                        type="date" 
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="relative h-64 w-full bg-surface-container rounded-sm overflow-hidden group border border-outline-variant/10 shadow-2xl">
                <img 
                  alt="Preview of tournament pitch" 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" 
                  src={previewImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCNZsMGOhqqRXpPOsVOcI645F5qBfTzQl_CwCO8nRmEMHmAcKInsT_UCoGce3Z87WQX1xfU24UWg_GPvgoaAabo2rcW_RkAGDlK2Ef8AwIrpBXO7NEa3RsVbmv7r8ewcXAXTcTnzRVcNjbB51yYHqgqO8iQZA2bLC1aj1KpMoelvA1w9eSo22g00o1JlgkDvXKx7AuqCYxy2b3w2ZtnHnKJObOz0yp8mnnyvChpYeJ1LwEEqapbPB9ufElizoDm6BV-e2umw3AOwMo"} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-tertiary mb-1">Live Preview</p>
                  <h5 className="text-2xl font-headline font-extrabold uppercase leading-tight">{formData.name || "Tournament Preview"}</h5>
                </div>
              </div>

            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateTournament;
