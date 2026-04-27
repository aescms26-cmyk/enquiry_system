import React, { useCallback } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './HeroSection.css';

interface HeroSectionProps {
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const blobCommon = {
    transition: {
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <section className="hero-section">

      <div className={`hero-background ${isDark ? 'hero-background-dark' : 'hero-background-light'}`}      >
        <motion.div          {...blobCommon} animate={{ scale: [1, 1.2, 1], opacity: isDark ? [0.1, 0.15, 0.1] : [0.3, 0.4, 0.3], }}
          transition={{ ...blobCommon.transition, duration: 10 }} className="hero-blob hero-blob-red" />

        <motion.div          {...blobCommon} animate={{ scale: [1, 1.1, 1], opacity: isDark ? [0.05, 0.08, 0.05] : [0.2, 0.3, 0.2], }}
          transition={{ ...blobCommon.transition, duration: 8, delay: 1 }} className="hero-blob hero-blob-blue" />

        <motion.div          {...blobCommon} animate={{ scale: [1, 1.3, 1], opacity: isDark ? [0.05, 0.1, 0.05] : [0.15, 0.25, 0.15], }}
          transition={{ ...blobCommon.transition, duration: 12, delay: 2 }} className="hero-blob hero-blob-emerald" />

        <div className={`hero-grid-pattern ${isDark ? 'hero-grid-pattern-dark' : 'hero-grid-pattern-light'}`} />
        <div className="hero-bottom-blend" />
      </div>


      <div className="hero-content">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-content-inner"        >
          <span className="hero-overline">
            Welcome to your academic future
          </span>

          <h1 className={`hero-title ${isDark ? 'hero-title-dark' : 'hero-title-light'}`}          >
            K.R. MANGALAM <br />            <span className="hero-title-accent">UNIVERSITY</span>
          </h1>

          <div className="hero-description">
            <div className="hero-description-bar" />
            <p className={`hero-description-text ${isDark ? 'hero-description-text-dark' : 'hero-description-text-light'}`}            >
              Visit our 28+ acres campus for on-ground consultation and academic              walkthroughs.
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" onClick={() => scrollTo('enquire-section')} className="hero-button hero-button-primary"            >              <Send className="hero-send-icon" />
              <span>Enquire Form</span>
            </button>

            <button type="button" onClick={() => scrollTo('track-section')} className={`hero-button ${isDark ? 'hero-button-secondary-dark' : 'hero-button-secondary-light'}`}            >
              Track My Admission
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="hero-scroll-indicator" aria-hidden />
      </div>
    </section>
  );
};

export default HeroSection;