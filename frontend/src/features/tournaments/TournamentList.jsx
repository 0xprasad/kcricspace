import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TournamentHero from './components/TournamentHero';
import TournamentFilters from './components/TournamentFilters';
import TournamentCard from './components/TournamentCard';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/tournaments`);
        const result = await response.json();
        if (result.success) {
          // Map backend data to TournamentCard props
          const mappedTournaments = result.data.map(t => ({
            title: t.name,
            location: t.primary_ground,
            prizePool: `$${t.prize_pool}`,
            entryFee: parseFloat(t.entry_fee) === 0 ? 'FREE' : `$${t.entry_fee}`,
            teamsRegistered: 0, // Placeholder
            totalTeams: t.max_teams,
            status: t.status === 'active' ? 'OPEN' : t.status.toUpperCase(),
            format: t.format,
            image: t.banner_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZsMGOhqqRXpPOsVOcI645F5qBfTzQl_CwCO8nRmEMHmAcKInsT_UCoGce3Z87WQX1xfU24UWg_GPvgoaAabo2rcW_RkAGDlK2Ef8AwIrpBXO7NEa3RsVbmv7r8ewcXAXTcTnzRVcNjbB51yYHqgqO8iQZA2bLC1aj1KpMoelvA1w9eSo22g00o1JlgkDvXKx7AuqCYxy2b3w2ZtnHnKJObOz0yp8mnnyvChpYeJ1LwEEqapbPB9ufElizoDm6BV-e2umw3AOwMo'
          }));
          setTournaments(mappedTournaments);
        }
      } catch (err) {
        console.error('Error fetching tournaments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="bg-background min-h-screen font-body selection:bg-tertiary selection:text-on-tertiary overflow-x-hidden">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <TournamentHero />

        {/* Filter Bar */}
        <TournamentFilters />

        {/* Tournament Grid */}
        <section className="container mx-auto px-6 py-24">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.length > 0 ? (
                tournaments.map((tournament, index) => (
                  <TournamentCard key={index} {...tournament} />
                ))
              ) : (
                <div className="col-span-full mt-32 flex flex-col items-center justify-center text-center p-16 border-2 border-dashed border-outline-variant/10 group hover:border-primary/20 transition-colors bg-surface-container-low/30 rounded-sm">
                  <div className="mb-8 relative">
                    <span className="material-symbols-outlined text-8xl text-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">sports_cricket</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-tertiary rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                  </div>
                  <h3 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-background mb-3">No tournaments found</h3>
                  <p className="font-body text-on-surface-variant max-w-sm mb-10 leading-relaxed italic opacity-60">
                    It looks like the field is empty. Be the first to launch a professional event in the pavilion!
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TournamentList;
