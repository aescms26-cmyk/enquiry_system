import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  Send,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/krmuniv/', label: 'Facebook', color: '#1877F2' },
    { icon: Twitter, href: 'https://x.com/krmuniversity?lang=en', label: 'Twitter', color: '#1DA1F2' },
    { icon: Instagram, href: 'https://www.instagram.com/krmuniv/', label: 'Instagram', color: '#E4405F' },
    { icon: Linkedin, href: 'https://in.linkedin.com/school/krmuniv/', label: 'LinkedIn', color: '#0A66C2' },
  ];

  const quickLinks = [
    { label: 'Student Portal', href: '/StudentPortal', external: false },
    { label: 'Admissions', href: 'https://krmangalam.edu.in/admissions', external: true },
    { label: 'Transport Portal', href: 'https://truthful-cabbage-82fd27e8f6.media.strapiapp.com/KRMU_ROUTE_2025_baf93cd00b.pdf', external: true },
    { label: 'Hostel Portal', href: 'https://krmangalam.edu.in/hostel', external: true },
    { label: 'Payment Portal', href: 'https://payment.collexo.com/user/login/?dest=/kr-mangalam-university-sohna-haryana-43490/applicant/', external: true },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Sohna Road, Gurugram, Delhi-NCR, India' },
    { icon: Phone, text: '+91 11 4888 4888' },
    { icon: Mail, text: 'admissions@krmangalam.edu.in' },
  ];

  return (
    <footer className="layout-footer">
      {/* Background Effects */}
      <div className="footer-gradient-top" />
      <div className="footer-blur-red" />
      <div className="footer-blur-blue" />

      <div className="footer-inner">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-icon">
                <img
                  src="src/assets/K.R._Mangalam_University_logo.webp"
                  alt="KRMU Logo"
                  className="login-brand__logo"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="footer-brand-text">
                <h3 className="footer-brand-title">K.R. Mangalam University</h3>
                <p className="footer-brand-subtitle">Excellence in Education</p>
              </div>
            </div>
            <p className="footer-brand-description">
              A premier institution of higher education in India, renowned for academic 
              excellence, innovation, and holistic student development.
            </p>
            <div className="footer-brand-stats">
              <div className="footer-stat">
                <span className="footer-stat-value">12K+</span>
                <span className="footer-stat-label">Students</span>
              </div>
              <div className="footer-stat-divider" />
              <div className="footer-stat">
                <span className="footer-stat-value">800+</span>
                <span className="footer-stat-label">Recruiters</span>
              </div>
              <div className="footer-stat-divider" />
              <div className="footer-stat">
                <span className="footer-stat-value">92%</span>
                <span className="footer-stat-label">Placement</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">
                <span className="footer-title-line" />
                Quick Links
              </h4>
              <ul className="footer-column-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-column-link"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link to={link.href} className="footer-column-link">
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column">
              <h4 className="footer-column-title">
                <span className="footer-title-line" />
                Contact Us
              </h4>
              <ul className="footer-column-list">
                {contactInfo.map((item) => (
                  <li key={item.text} className="footer-contact-row">
                    <div className="footer-contact-icon-wrap">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="footer-contact-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-column">
              <h4 className="footer-column-title">
                <span className="footer-title-line" />
                Newsletter
              </h4>
              <p className="footer-newsletter-desc">
                Stay updated with the latest news, events, and opportunities at KRMU.
              </p>
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <div className="footer-input-wrap">
                  <Mail className="footer-input-icon h-4 w-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="footer-newsletter-input"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`footer-newsletter-btn ${subscribed ? 'footer-newsletter-btn--success' : ''}`}
                  aria-label="Subscribe"
                >
                  {subscribed ? (
                    <span className="footer-btn-text">Subscribed!</span>
                  ) : (
                    <>
                      <span className="footer-btn-text">Subscribe</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Bar */}
        <div className="footer-social-bar">
          <div className="footer-social-label">
            <span>Follow Us</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div className="footer-social-links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
                aria-label={social.label}
                style={{ '--social-color': social.color } as React.CSSProperties}
              >
                <social.icon className="h-5 w-5" />
                <span className="footer-social-name">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {new Date().getFullYear()} K.R. Mangalam University. All rights reserved.
            </p>
          </div>
          <div className="footer-bottom-right">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-bottom-dot" />
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <span className="footer-bottom-dot" />
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

