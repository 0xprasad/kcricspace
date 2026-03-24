import Navbar from '../../components/layout/Navbar';
import HeroSection from './HeroSection';
import LiveTicker from './LiveTicker';
import StatsBanner from './StatsBanner';
import FeaturedTournaments from './FeaturedTournaments';
import HowItWorks from './HowItWorks';
import GalleryStrip from './GalleryStrip';
import Testimonials from './Testimonials';
import Footer from '../../components/layout/Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background text-on-background font-body selection:bg-tertiary selection:text-on-tertiary">
      <Navbar />
      <HeroSection />
      <LiveTicker />
      <StatsBanner />
      <FeaturedTournaments />
      <HowItWorks />
      <GalleryStrip />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default HomePage;
