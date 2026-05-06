import React from 'react';
import { motion } from 'motion/react';
import { Bus, Home, CreditCard, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Portal {
  title: string;
  desc: string;
  icon: React.ElementType;
  color: 'blue' | 'emerald' | 'purple';
  url: string;
}

const portals: Portal[] = [
  {
    title: 'Transport',
    desc: 'Bus routes & schedules',
    icon: Bus,
    color: 'blue',
    url: 'https://krmangalam.edu.in/transport',
  },
  {
    title: 'Hostel',
    desc: 'Room & mess management',
    icon: Home,
    color: 'emerald',
    url: 'https://krmangalam.edu.in/hostel',
  },
  {
    title: 'Payments',
    desc: 'Fee & financial records',
    icon: CreditCard,
    color: 'purple',
    url: 'https://payment.collexo.com/user/login/?dest=/kr-mangalam-university-sohna-haryana-43490/applicant/',
  },
];

const ResourcePortals: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="cd-portals">
      <h2 className={`cd-portals-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <span className="cd-portals-title-bar" />
        University Resources
      </h2>
      <div className="cd-portals-grid">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <motion.a
              key={portal.title}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8, scale: 1.02 }}
              className={`cd-portal-card cd-portal-card--${portal.color} ${isDark ? 'cd-portal-card--dark' : 'cd-portal-card--light'}`}
            >
              <div className={`cd-portal-bg cd-portal-bg--${portal.color} ${isDark ? 'cd-portal-bg--dark' : 'cd-portal-bg--light'}`} />
              <div className="cd-portal-content">
                <div className={`cd-portal-icon cd-portal-icon--${portal.color} ${isDark ? 'cd-portal-icon--dark' : 'cd-portal-icon--light'}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className={`cd-portal-name ${isDark ? 'text-white' : 'text-gray-900'}`}>{portal.title} Portal</h3>
                <p className={`cd-portal-desc ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{portal.desc}</p>
                <div className={`cd-portal-link ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span>Open Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcePortals;

