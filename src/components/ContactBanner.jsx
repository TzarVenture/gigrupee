import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './ContactBanner.css';

export default function ContactBanner({ onConnect }) {
  return (
    <section id="contact" className="contact-banner-section">
      <div className="container">
        <div className="contact-banner-card">
          {/* Segment 1: Ready to Grow CTA */}
          <div className="contact-cta-block">
            <div className="cta-icon-box">
              <Mail size={22} className="cta-icon" />
            </div>
            <div className="cta-text-wrap">
              <h3 className="cta-heading">Ready to Grow Your Business?</h3>
              <p className="cta-sub">Partner with GigRupee for smart financial & BPO solutions that drive real results.</p>
              <button 
                type="button" 
                className="btn-connect-white"
                onClick={onConnect}
              >
                <span>Let's Connect</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Segment 2: Call Us */}
          <a href="tel:+919876543210" className="contact-info-block">
            <div className="info-icon-circle">
              <Phone size={20} />
            </div>
            <div className="info-content">
              <span className="info-label">Call Us</span>
              <span className="info-value">+91 98765 43210</span>
            </div>
          </a>

          {/* Segment 3: Email Us */}
          <a href="mailto:info@gigrupee.com" className="contact-info-block">
            <div className="info-icon-circle">
              <Mail size={20} />
            </div>
            <div className="info-content">
              <span className="info-label">Email Us</span>
              <span className="info-value">info@gigrupee.com</span>
            </div>
          </a>

          {/* Segment 4: Visit Us */}
          <div className="contact-info-block">
            <div className="info-icon-circle">
              <MapPin size={20} />
            </div>
            <div className="info-content">
              <span className="info-label">Visit Us</span>
              <span className="info-value">Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
