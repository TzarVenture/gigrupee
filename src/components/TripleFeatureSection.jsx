import React, { useState } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  PenTool, 
  Users, 
  LineChart, 
  Rocket, 
  ArrowRight,
  Quote
} from 'lucide-react';
import './TripleFeatureSection.css';

export default function TripleFeatureSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const whyChoosePoints = [
    'Experienced Operations Team',
    'Professional CRM & Reporting',
    'Fast Project Deployment',
    'Quality Monitoring',
    'Secure Data Handling',
    'Flexible Pricing Models',
    'PAN India Operations',
    'Performance-Based Delivery'
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Understand Business Requirements',
      icon: <FileText size={22} className="step-icon" />
    },
    {
      num: '02',
      title: 'Design Custom Solution',
      icon: <PenTool size={22} className="step-icon" />
    },
    {
      num: '03',
      title: 'Deploy Dedicated Team',
      icon: <Users size={22} className="step-icon" />
    },
    {
      num: '04',
      title: 'Performance Monitoring',
      icon: <LineChart size={22} className="step-icon" />
    },
    {
      num: '05',
      title: 'Continuous Growth',
      icon: <Rocket size={22} className="step-icon" />
    }
  ];

  const testimonials = [
    {
      quote: "GigRupee's team is professional, efficient and result-oriented. Their BPO services helped us improve our customer satisfaction and sales significantly.",
      author: "Rajesh Verma",
      role: "Operations Head, FinMart India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "The digital lending facilitation provided by GigRupee was seamless. We experienced a 40% reduction in turnaround time for customer approvals.",
      author: "Priya Sharma",
      role: "VP Lending, Apex Finance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "Outstanding customer verification and KYC operations. Their dedicated team scaled our telesales operations with complete transparency.",
      author: "Amitabh Sen",
      role: "Director of Operations, GrowthRetail",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="triple-section">
      <div className="container triple-container">
        {/* Column 1: Why Choose GigRupee? */}
        <div className="triple-col col-why-choose">
          <h3 className="triple-header">WHY CHOOSE GIGRUPEE?</h3>
          <div className="why-choose-list">
            {whyChoosePoints.map((point, idx) => (
              <div key={idx} className="why-choose-item">
                <CheckCircle2 size={16} className="check-icon-green" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Our Process */}
        <div className="triple-col col-process">
          <h3 className="triple-header">OUR PROCESS</h3>
          <div className="process-flow">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="process-node-wrapper">
                <div className="process-node">
                  <div className="process-icon-box">
                    {step.icon}
                  </div>
                  <div className="process-text">
                    <span className="process-num">{step.num}</span>
                    <span className="process-title">{step.title}</span>
                  </div>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="process-connector">
                    <ArrowRight size={14} className="connector-arrow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: What Our Clients Say */}
        <div className="triple-col col-testimonials">
          <h3 className="triple-header">WHAT OUR CLIENTS SAY</h3>
          
          <div className="testimonial-box">
            <div className="quote-icon-wrap">
              <Quote size={36} className="quote-icon" />
            </div>

            <p className="testimonial-quote">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="testimonial-author-row">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].author} 
                className="testimonial-avatar" 
              />
              <div className="testimonial-author-meta">
                <h5 className="testimonial-author-name">{testimonials[activeTestimonial].author}</h5>
                <span className="testimonial-author-role">{testimonials[activeTestimonial].role}</span>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="carousel-dots">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Go to testimonial ${dotIdx + 1}`}
                  className={`carousel-dot ${activeTestimonial === dotIdx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(dotIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
