import React from 'react';
import { 
  Building2, 
  Coins, 
  Smartphone, 
  ShoppingCart, 
  Radio, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Truck, 
  ShoppingBag 
} from 'lucide-react';
import './IndustriesSection.css';

export default function IndustriesSection() {
  const industries = [
    { id: 'banking', name: 'Banking', icon: <Building2 size={24} /> },
    { id: 'nbfc', name: 'NBFC', icon: <Coins size={24} /> },
    { id: 'fintech', name: 'Fintech', icon: <Smartphone size={24} /> },
    { id: 'ecommerce', name: 'E-Commerce', icon: <ShoppingCart size={24} /> },
    { id: 'telecom', name: 'Telecom', icon: <Radio size={24} /> },
    { id: 'healthcare', name: 'Healthcare', icon: <HeartPulse size={24} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={24} /> },
    { id: 'insurance', name: 'Insurance', icon: <ShieldCheck size={24} /> },
    { id: 'logistics', name: 'Logistics', icon: <Truck size={24} /> },
    { id: 'retail', name: 'Retail', icon: <ShoppingBag size={24} /> }
  ];

  return (
    <section id="industries" className="industries-section">
      <div className="container">
        <div className="industries-header text-center">
          <span className="section-eyebrow">INDUSTRIES WE SERVE</span>
        </div>

        <div className="industries-grid">
          {industries.map((item) => (
            <div key={item.id} className="industry-card">
              <div className="industry-icon-wrap">
                {item.icon}
              </div>
              <span className="industry-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
