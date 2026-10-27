import { useState } from 'react';
import Logo from './Logo';
import { Check } from 'lucide-react';
import './Footer.css';

// Crisp SVG social icon
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Main 5-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col footer-col-brand">
            <Logo lightMode={false} size="default" />
            <p className="footer-brand-desc">
              Empowering individuals and businesses with financial products and world-class BPO services.
            </p>
            <div className="footer-social-row">
              <a 
                href="https://www.linkedin.com/company/gigrupee-fintech-9bbb123b7/?viewAsMember=true" 
                className="social-link" 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Lending Solutions</a></li>
              <li><a href="#services">BPO Services</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Useful Links</h4>
            <ul className="footer-links-list">
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#sitemap">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Personal Loan</a></li>
              <li><a href="#services">Business Loan</a></li>
              <li><a href="#services">Credit Card Assistance</a></li>
              <li><a href="#services">BPO Services</a></li>
              <li><a href="#services">Collections</a></li>
              <li><a href="#services">Back Office Support</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-col footer-col-newsletter">
            <h4 className="footer-col-title">Newsletter</h4>
            <p className="footer-newsletter-desc">
              Subscribe to our newsletter for updates and offers.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter-subscribe">
                {subscribed ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                    <Check size={14} /> Subscribed
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="sub-footer-bar">
          <div className="sub-footer-left">
            © 2026 GigRupee. All Rights Reserved.
          </div>
          <div className="sub-footer-center">
            Built by <span className="built-by-brand">Tzar Digital Agency</span>
          </div>
          <div className="sub-footer-right">
            <a href="https://www.gigrupee.com" target="_blank" rel="noreferrer">
              www.gigrupee.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
