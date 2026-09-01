import React, { useState } from 'react';
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

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('general');

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
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        initialType={modalType} 
      />
    </div>
  );
}

export default App;
