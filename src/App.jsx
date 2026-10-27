import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import IndustriesSection from './components/IndustriesSection';
import TripleFeatureSection from './components/TripleFeatureSection';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import './App.css';

function getInitialSubmitted() {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('submitted') === 'true';
  }
  return false;
}

function App() {
  const isInitialSubmitted = getInitialSubmitted();
  const [modalOpen, setModalOpen] = useState(isInitialSubmitted);
  const [modalType, setModalType] = useState(isInitialSubmitted ? 'success' : 'general');

  useEffect(() => {
    if (isInitialSubmitted) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [isInitialSubmitted]);

  const handleOpenContact = (type = 'general') => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Sticky Header */}
      <Navbar onOpenContact={() => handleOpenContact('general')} />

      {/* Main Content Flow matching exact reference */}
      <main className="main-content">
        {/* Hero Section */}
        <Hero 
          onApplyLoan={() => handleOpenContact('lending')} 
          onHireBPO={() => handleOpenContact('bpo')} 
        />

        {/* Stats Counter Strip */}
        <StatsBar />

        {/* About GigRupee */}
        <AboutSection onKnowMore={() => handleOpenContact('general')} />

        {/* Comprehensive Services (Lending & BPO) */}
        <ServicesSection onSelectService={(type) => handleOpenContact(type)} />

        {/* Industries We Serve */}
        <IndustriesSection />

        {/* Why Choose Us, Our Process & Testimonials */}
        <TripleFeatureSection />

        {/* Pre-Footer Call to Action Banner */}
        <ContactBanner onConnect={() => handleOpenContact('general')} />
      </main>

      {/* Corporate 5-Column Footer */}
      <Footer />

      {/* Interactive Lead Generation / Contact Modal */}
      <LeadModal 
        key={`${modalType}-${modalOpen ? 'open' : 'closed'}`}
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        initialType={modalType} 
      />
    </div>
  );
}

export default App;
