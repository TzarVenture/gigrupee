import React from 'react';
import { ArrowRight, Eye, Target, ShieldCheck, HeartHandshake } from 'lucide-react';
import officeBuildingImg from '../assets/office-building.jpg';
import Logo from './Logo';
import './AboutSection.css';

export default function AboutSection({ onKnowMore }) {
  const pillars = [
    {
      id: 'vision',
      title: 'Vision',
      icon: <Eye size={24} className="pillar-icon pillar-icon-blue" />,
      desc: "To be India's most trusted financial & BPO solutions partner."
    },
    {
      id: 'mission',
      title: 'Mission',
      icon: <Target size={24} className="pillar-icon pillar-icon-green" />,
      desc: 'Deliver innovative, ethical & customer-centric solutions.'
    },
    {
      id: 'values',
      title: 'Values',
      icon: <ShieldCheck size={24} className="pillar-icon pillar-icon-blue" />,
      desc: 'Integrity, Quality, Transparency & Teamwork.'
    },
    {
      id: 'commitment',
      title: 'Commitment',
      icon: <HeartHandshake size={24} className="pillar-icon pillar-icon-green" />,
      desc: 'We are committed to your growth and success.'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        {/* Left Column: Narrative & CTA */}
        <div className="about-left">
          <span className="section-eyebrow">ABOUT GIGRUPEE</span>
          <h2 className="section-title about-title">
            A Technology-Driven Organization Focused on Growth & Trust
          </h2>

          <p className="about-text">
            GigRupee is a technology-driven organization delivering innovative financial and outsourcing solutions across India. We combine digital lending expertise with scalable BPO operations to help both individuals and businesses grow faster.
          </p>

          <p className="about-text">
            Our mission is to simplify access to finance while providing reliable business support services that improve operational efficiency and customer satisfaction.
          </p>

          <button 
            type="button" 
            className="btn-about"
            onClick={onKnowMore}
          >
            <span>Know More About Us</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Column: Building Photo & 4 Strategic Pillars */}
        <div className="about-right">
          <div className="building-card">
            <img 
              src={officeBuildingImg} 
              alt="GigRupee Corporate Headquarters" 
              className="building-img" 
            />
            <div className="building-badge-overlay">
              <Logo lightMode={true} size="default" />
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="pillars-grid">
            {pillars.map((item) => (
              <div key={item.id} className="pillar-card">
                <div className="pillar-icon-wrapper">
                  {item.icon}
                </div>
                <h4 className="pillar-title">{item.title}</h4>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
