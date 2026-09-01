import React from 'react';
import { Landmark, Headphones, CheckCircle2, Star } from 'lucide-react';
import heroTeamImg from '../assets/hero-team.jpg';
import './Hero.css';

export default function Hero({ onApplyLoan, onHireBPO }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Content Column */}
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Businesses <br />
            with Financial & <br />
            <span className="hero-title-highlight">Business Process Solutions</span>
          </h1>

          <p className="hero-subtitle">
            GigRupee helps individuals access financial products while enabling businesses to scale through professional BPO, customer support, telesales, collections, and back-office operations.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-actions">
            <button 
              type="button" 
              className="btn-hero-green"
              onClick={onApplyLoan}
            >
              <Landmark size={18} />
              <span>Apply for Loan</span>
            </button>

            <button 
              type="button" 
              className="btn-hero-blue"
              onClick={onHireBPO}
            >
              <Headphones size={18} />
              <span>Hire BPO Team</span>
            </button>
          </div>

          {/* Social Proof / Trust Badge */}
          <div className="hero-trust-badge">
            <div className="avatar-group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Client avatar 1" 
                className="avatar-img" 
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="Client avatar 2" 
                className="avatar-img" 
              />
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                alt="Client avatar 3" 
                className="avatar-img" 
              />
            </div>
            <div className="trust-info">
              <div className="trust-label">Trusted by 500+ Clients</div>
              <div className="rating-row">
                <span className="rating-score">4.8/5</span>
                <div className="rating-stars">
                  <Star size={14} className="star-icon fill-star" />
                  <Star size={14} className="star-icon fill-star" />
                  <Star size={14} className="star-icon fill-star" />
                  <Star size={14} className="star-icon fill-star" />
                  <Star size={14} className="star-icon fill-star" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual Column with Floating Status Cards */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-frame">
            <img 
              src={heroTeamImg} 
              alt="GigRupee Financial and BPO Team Professionals" 
              className="hero-main-img" 
            />

            {/* Floating Card 1: Loan Approved (Top Right) */}
            <div className="floating-card float-card-loan">
              <div className="loan-badge-icon">
                <CheckCircle2 size={24} className="check-icon-green" />
              </div>
              <div className="loan-badge-details">
                <span className="loan-badge-status">Loan Approved</span>
                <span className="loan-badge-amount">₹2,50,000</span>
                <span className="loan-badge-time">In Just 24 Hours</span>
              </div>
            </div>

            {/* Floating Card 2: BPO Solutions (Bottom Left / Center) */}
            <div className="floating-card float-card-bpo">
              <div className="bpo-badge-icon">
                <Headphones size={22} className="headset-icon-blue" />
              </div>
              <div className="bpo-badge-details">
                <span className="bpo-badge-title">BPO Solutions</span>
                <span className="bpo-badge-stat">200+</span>
                <span className="bpo-badge-sub">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
