import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import './HighlightsBar.css';

const stats = [
  'NAAC A Grade University',
  '100% Placement Assistance',
  '92% Placement Rate',
  '₹56.6 LPA Highest Package (2025)',
  '800+ Recruiters',
  '12,000+ Students',
  '4000+ Research Publications | 250+ Patents',
  'Ranked #1 in Haryana | #17 Times B-School Survey 2026',
  '#7 among Top 40 Private Universities',
];

const HighlightsBar: React.FC = () => {
  return (
    <div className="highlights-bar">
      <div className="highlights-bar-inner">
        {/* Marquee Section */}
        <div className="highlights-marquee">
          <div className="highlights-track">
            {stats.map((stat, index) => (
              <div className="highlight-item" key={`a-${index}`}>
                <span
                  className={`highlight-dot ${
                    index % 2 === 0 ? 'highlight-dot--red' : 'highlight-dot--blue'
                  }`}
                />
                <span>{stat}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {stats.map((stat, index) => (
              <div className="highlight-item" key={`b-${index}`}>
                <span
                  className={`highlight-dot ${
                    index % 2 === 0 ? 'highlight-dot--red' : 'highlight-dot--blue'
                  }`}
                />
                <span>{stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Right Section */}
        <div className="highlights-fixed">
          <div className="highlight-item">
            <MapPin className="h-3 w-3 text-red-500" />
            <span>Gurugram, Delhi-NCR</span>
          </div>
          <div className="highlight-item">
            <Phone className="h-3 w-3 text-blue-500" />
            <span>+91 11 4888 4888</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightsBar;

