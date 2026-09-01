import React from 'react';

export default function Logo({ lightMode = true, size = 'default' }) {
  const isLarge = size === 'large';
  const textColor = lightMode ? '#0F172A' : '#FFFFFF';
  const subTextColor = lightMode ? '#64748B' : '#94A3B8';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', userSelect: 'none' }}>
      {/* Dynamic Geometric 'G' Logo Mark */}
      <svg
        width={isLarge ? "42" : "36"}
        height={isLarge ? "42" : "36"}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="48" height="48" rx="12" fill={lightMode ? "#F0F7FF" : "#0A1E42"} />
        {/* Stylized folded G ribbon with Green & Blue gradients */}
        <defs>
          <linearGradient id="logoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0E66DE" />
          </linearGradient>
          <linearGradient id="logoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Emerald arc */}
        <path
          d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C29.6 38 34.42 34.73 36.68 30"
          stroke="url(#logoBlue)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Vibrant Rupee / folded swoosh in Green */}
        <path
          d="M20 18H34M20 23H30M20 23C24 23 28 26 28 29C28 32 24.5 35 21 35L33 35"
          stroke="url(#logoGreen)"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="18" r="3" fill="#059669" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div style={{ fontSize: isLarge ? '26px' : '22px', fontWeight: 800, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: textColor }}>Gig</span>
          <span style={{ color: '#0E66DE' }}>Rupee</span>
        </div>
        <div style={{ fontSize: '10px', fontWeight: 600, color: subTextColor, letterSpacing: '0.04em', marginTop: '2px' }}>
          Lending | BPO Solutions
        </div>
      </div>
    </div>
  );
}
