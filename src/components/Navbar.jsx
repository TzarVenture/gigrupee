import React, { useState } from 'react';
import Logo from './Logo';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-brand">
          <Logo lightMode={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav">
          <a href="#home" className="nav-link active">
            Home
            <span className="active-indicator" />
          </a>
          <a href="#about" className="nav-link">About Us</a>
          
          {/* Lending Solutions Dropdown */}
          <div 
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('lending')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a href="#services" className="nav-link dropdown-toggle">
              Lending Solutions
              <ChevronDown size={14} className="chevron-icon" />
            </a>
            {activeDropdown === 'lending' && (
              <div className="dropdown-menu">
                <a href="#services" className="dropdown-item">Personal Loans</a>
                <a href="#services" className="dropdown-item">Business Loans</a>
                <a href="#services" className="dropdown-item">Credit Card Assistance</a>
                <a href="#services" className="dropdown-item">Loan Against Property</a>
                <a href="#services" className="dropdown-item">Balance Transfer</a>
                <a href="#services" className="dropdown-item">Financial Consultation</a>
              </div>
            )}
          </div>

          {/* BPO Services Dropdown */}
          <div 
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('bpo')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a href="#services" className="nav-link dropdown-toggle">
              BPO Services
              <ChevronDown size={14} className="chevron-icon" />
            </a>
            {activeDropdown === 'bpo' && (
              <div className="dropdown-menu">
                <a href="#services" className="dropdown-item">Inbound Customer Support</a>
                <a href="#services" className="dropdown-item">Outbound Sales & Telemarketing</a>
                <a href="#services" className="dropdown-item">Customer & KYC Verification</a>
                <a href="#services" className="dropdown-item">Data Entry & Collections</a>
                <a href="#services" className="dropdown-item">Back Office & Chat Support</a>
              </div>
            )}
          </div>

          <a href="#industries" className="nav-link">Industries</a>
          <a href="#careers" className="nav-link">Careers</a>
          <a href="#contact" className="nav-link">Contact Us</a>
        </nav>

        {/* Right Action: Phone & Get in Touch CTA */}
        <div className="navbar-actions">
          <a href="tel:+919876543210" className="nav-phone">
            <Phone size={16} className="phone-icon" />
            <span>+91 98765 43210</span>
          </a>
          <button 
            type="button" 
            className="btn-primary-nav"
            onClick={onOpenContact}
          >
            Get in Touch
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#home" className="mobile-nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Lending Solutions</a>
          <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>BPO Services</a>
          <a href="#industries" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Industries</a>
          <a href="#careers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Careers</a>
          <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
          <div className="mobile-drawer-bottom">
            <a href="tel:+919876543210" className="mobile-phone">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </a>
            <button 
              type="button" 
              className="btn-primary-nav w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
