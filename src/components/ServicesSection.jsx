import React from 'react';
import { IndianRupee, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import './ServicesSection.css';

export default function ServicesSection({ onSelectService }) {
  const lendingItemsCol1 = [
    'Personal Loans',
    'Business Loans',
    'Credit Card Assistance'
  ];

  const lendingItemsCol2 = [
    'Loan Against Property',
    'Balance Transfer',
    'Financial Consultation'
  ];

  const bpoItemsCol1 = [
    'Inbound Customer Support',
    'Outbound Sales',
    'Telemarketing',
    'Lead Generation',
    'Collections'
  ];

  const bpoItemsCol2 = [
    'Customer Verification',
    'KYC Verification',
    'Data Entry',
    'Back Office Support',
    'Email & Chat Support'
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Header */}
        <div className="services-header text-center">
          <span className="section-eyebrow">OUR SERVICES</span>
          <h2 className="section-title">Comprehensive Solutions Under One Roof</h2>
        </div>

        {/* 2 Service Cards */}
        <div className="services-grid">
          {/* Card 1: Lending Solutions */}
          <div className="service-card service-card-lending">
            <div className="service-icon-circle service-icon-blue">
              <IndianRupee size={32} />
            </div>

            <h3 className="service-card-title">Lending Solutions</h3>
            <p className="service-card-desc">
              Quick, easy and hassle-free financial solutions tailored to your needs.
            </p>

            <div className="service-checklist-grid">
              <div className="service-checklist-col">
                {lendingItemsCol1.map((item, i) => (
                  <div key={i} className="service-check-item">
                    <CheckCircle2 size={16} className="check-icon-blue" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="service-checklist-col">
                {lendingItemsCol2.map((item, i) => (
                  <div key={i} className="service-check-item">
                    <CheckCircle2 size={16} className="check-icon-blue" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              className="service-explore-link link-blue"
              onClick={() => onSelectService('lending')}
            >
              <span>Explore Lending Solutions</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Card 2: BPO Services */}
          <div className="service-card service-card-bpo">
            <div className="service-icon-circle service-icon-green">
              <Headphones size={32} />
            </div>

            <h3 className="service-card-title">BPO Services</h3>
            <p className="service-card-desc">
              Scalable, reliable and result-driven BPO services for businesses of all sizes.
            </p>

            <div className="service-checklist-grid">
              <div className="service-checklist-col">
                {bpoItemsCol1.map((item, i) => (
                  <div key={i} className="service-check-item">
                    <CheckCircle2 size={16} className="check-icon-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="service-checklist-col">
                {bpoItemsCol2.map((item, i) => (
                  <div key={i} className="service-check-item">
                    <CheckCircle2 size={16} className="check-icon-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              className="service-explore-link link-green"
              onClick={() => onSelectService('bpo')}
            >
              <span>Explore BPO Services</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
