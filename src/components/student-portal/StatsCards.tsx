import React from 'react';
import { Trees, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './StatsCards.css';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: StatColor;
}

const StatsCards: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stats: StatItem[] = [
    {
      icon: <Trees className="h-8 w-8" />,
      value: '28+',
      label: 'Acres Smart Green Campus'
    },
    {
      icon: (
        <img
          src="https://www.krmangalam.edu.in/_next/image?url=%2FKRMU-Logo-NAAC.webp&w=750&q=75"
          alt="KRMU NAAC Logo"
          className="h-8 w-auto object-contain"
          referrerPolicy="no-referrer"
          loading="lazy" />),
      value: 'NAAC A',
      label: 'Highest Quality Grading'

    },
    {
      icon: <Zap className="h-8 w-8" />,
      value: '92%',
      label: 'Placement Assistance'
    },
  ];

  return (
    <section className="stats-section">

      <div className="stats-grid">

        {stats.map((stat, index) => {
          const lightSuffix = `-${stat.color}`;

          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`stat-card ${isDark ? 'stat-card-dark' : `stat-card-light${lightSuffix}`}`}            >

              <div className={`stat-icon stat-icon-${stat.color}`}>
                {stat.icon}
              </div>

              <h3 className={`stat-value ${isDark ? 'stat-value-dark' : `stat-value-light${lightSuffix}`}`}              >
                {stat.value}
              </h3>

              <p className={`stat-label ${isDark ? 'stat-label-dark' : `stat-label-light${lightSuffix}`}`}              >
                {stat.label}
              </p>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsCards;