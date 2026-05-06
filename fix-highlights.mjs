import fs from 'fs';

const content = `import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import './HighlightsBar.css';

const HighlightsBar: React.FC = () => {
  return (
    <div className="highlights-bar">
      <div className="highlights-bar-inner">
        <div className="flex items-center gap-6">
          <div className="highlight-item">
            <span className="highlight-dot highlight-dot--red" />
            <span>NAAC A Grade University</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-dot highlight-dot--blue" />
            <span>100% Placement Assistance</span>
          </div>
        <div className="flex items-center gap-6">
          <div className="highlight-item">
            <MapPin className="h-3 w-3 text-red-500" />
            <span>Gurugram, Delhi-NCR</span>
          </div>
          <div className="highlight-item">
            <Phone className="h-3 w-3 text-blue-500" />
            <span>+91 11 4888 4888</span>
          </div>
      </div>
  );
};

export default HighlightsBar;
`;

fs.writeFileSync('src/components/layout/HighlightsBar.tsx', content, 'utf8');
console.log('Fixed HighlightsBar.tsx');
