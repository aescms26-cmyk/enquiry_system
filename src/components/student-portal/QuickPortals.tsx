import React from 'react';
import { Bus, Home, CreditCard, ExternalLink, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './QuickPortals.css';

interface PortalItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  url: string;
}

const portals: PortalItem[] = [
  {
    title: 'Transport',
    desc: 'Bus routes & schedules',
    icon: Bus,
    url: 'https://truthful-cabbage-82fd27e8f6.media.strapiapp.com/KRMU_ROUTE_2025_baf93cd00b.pdf',
  },
  {
    title: 'Hostel',
    desc: 'Room & mess management',
    icon: Home,
    url: 'https://krmangalam.edu.in/hostel',
  },
  {
    title: 'Payments',
    desc: 'Fee & financial records',
    icon: CreditCard,
    url: 'https://payment.collexo.com/user/login/?dest=/kr-mangalam-university-sohna-haryana-43490/applicant/',
  },
];

const QuickPortals: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="quick-portals-section">
      {/* Header */}
      <div className="quick-portals-header">
        <div className="quick-portals-header-line" />
        <h2
          className={`quick-portals-header-text ${
            isDark
              ? 'quick-portals-header-text-dark'
              : 'quick-portals-header-text-light'
          }`}
        >
          Quick Portal Access
        </h2>
      </div>

      {/* Cards */}
      <div className="quick-portals-grid">
        {portals.map((portal, index) => (
          <motion.a
            key={portal.title}
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`portal-card ${
              isDark ? 'portal-card-dark' : 'portal-card-light'
            }`}
          >
            <div className="portal-card-header">
              <div className="portal-card-icon">
                <portal.icon className="portal-card-icon-size" />
              </div>
              <ExternalLink className="portal-card-arrow portal-card-arrow-size" />
            </div>

            <h3
              className={`portal-card-title ${
                isDark
                  ? 'portal-card-title-dark'
                  : 'portal-card-title-light'
              }`}
            >
              {portal.title} Portal
            </h3>

            <p
              className={`portal-card-desc ${
                isDark
                  ? 'portal-card-desc-dark'
                  : 'portal-card-desc-light'
              }`}
            >
              {portal.desc}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default QuickPortals;