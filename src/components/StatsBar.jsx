import React from 'react';
import { Users, Briefcase, Headphones, BarChart3, Award } from 'lucide-react';
import './StatsBar.css';

export default function StatsBar() {
  const stats = [
    {
      id: 1,
      icon: <Users size={28} className="stat-icon" />,
      number: '50,000+',
      label: 'Happy Customers'
    },
    {
      id: 2,
      icon: <Briefcase size={28} className="stat-icon" />,
      number: '500+',
      label: 'Business Clients'
    },
    {
      id: 3,
      icon: <Headphones size={28} className="stat-icon" />,
      number: '1,000+',
      label: 'Trained Professionals'
    },
    {
      id: 4,
      icon: <BarChart3 size={28} className="stat-icon" />,
      number: '98%',
      label: 'Client Retention'
    },
    {
      id: 5,
      icon: <Award size={28} className="stat-icon" />,
      number: '5+ Years',
      label: 'Of Excellence'
    }
  ];

  return (
    <section className="stats-bar-section">
      <div className="container">
        <div className="stats-bar-grid">
          {stats.map((stat, idx) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-icon-wrap">
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {idx < stats.length - 1 && <div className="stat-divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
