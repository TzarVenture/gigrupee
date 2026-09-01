import React, { useState } from 'react';
import { X, CheckCircle, Send, Phone, Mail } from 'lucide-react';
import './LeadModal.css';

export default function LeadModal({ isOpen, onClose, initialType = 'general' }) {
  const [serviceType, setServiceType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <CheckCircle size={56} className="success-icon" />
            <h3 className="success-title">Thank You!</h3>
            <p className="success-desc">
              Your inquiry has been received. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h3 className="modal-title">Get in Touch with GigRupee</h3>
              <p className="modal-subtitle">
                Fill in your details and our financial or BPO advisory team will reach out to you promptly.
              </p>
            </div>

            {/* Type selector */}
            <div className="modal-type-selector">
              <button
                type="button"
                className={`type-btn ${serviceType === 'lending' ? 'active-lending' : ''}`}
                onClick={() => setServiceType('lending')}
              >
                Lending Inquiry
              </button>
              <button
                type="button"
                className={`type-btn ${serviceType === 'bpo' ? 'active-bpo' : ''}`}
                onClick={() => setServiceType('bpo')}
              >
                BPO Services
              </button>
              <button
                type="button"
                className={`type-btn ${serviceType === 'general' ? 'active-general' : ''}`}
                onClick={() => setServiceType('general')}
              >
                General Inquiry
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul Sharma" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Requirement / Notes</label>
                <textarea 
                  rows="3" 
                  placeholder="Tell us about your loan requirement or outsourcing needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-modal-submit">
                <Send size={16} />
                <span>Submit Request</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
