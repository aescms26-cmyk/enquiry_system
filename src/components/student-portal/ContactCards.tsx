import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './ContactCards.css';

type ContactCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  value: string;
  Icon: React.ElementType;
  color: 'red' | 'blue';
};

const CONTACT_CARDS: ContactCard[] = [
  {
    id: 'call',
    href: 'tel:+91114884888',
    title: 'Call Us',
    description: 'Speak directly with our admissions team for immediate assistance.',
    value: '+91 911148 84888',
    Icon: Phone,
    color: 'red',
  },
  {
    id: 'email',
    href: 'mailto:admissions@krmu.edu.in',
    title: 'Email Us',
    description: 'Send us your queries and we will get back to you within 24 hours.',
    value: 'admissions@krmu.edu.in',
    Icon: Mail,
    color: 'blue',
  },
];

const ContactCards: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="contact-grid">
      {CONTACT_CARDS.map(({ id, href, title, description, value, Icon, color }) => (
        <motion.a
          key={id}
          href={href}
          whileHover={{ scale: 1.02 }}
          className={`contact-card ${isDark
              ? `contact-card-dark-${color}`
              : `contact-card-light contact-card-light-${color}`
            }`}
        >
          <div
            className={`contact-card-glow ${isDark
                ? `contact-card-glow-dark-${color}`
                : `contact-card-glow-light-${color}`
              }`}
          />

          <div className="contact-card-content">
            <div
              className={`contact-icon ${isDark
                  ? `contact-icon-dark-${color}`
                  : `contact-icon-light-${color}`
                }`}
            >
              <Icon className="h-7 w-7" />
            </div>

            <h3 className={`contact-title ${isDark ? 'contact-title-dark' : 'contact-title-light'}`}>
              {title}
            </h3>

            <p className={`contact-desc ${isDark ? 'contact-desc-dark' : 'contact-desc-light'}`}>
              {description}
            </p>

            <div
              className={`contact-info ${isDark
                  ? 'contact-info-dark'
                  : `contact-info-light contact-info-light-${color}`
                }`}
            >
              <span>{value}</span>
              <Icon className="contact-info-icon" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default ContactCards;