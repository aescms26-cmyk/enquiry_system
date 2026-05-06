﻿import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import logoImage from '../../assets/image.webp';
import { LogOut, LogIn, RefreshCw, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useRefresh } from '../../contexts/RefreshContext';
import './Header.css';

interface HeaderProps {
  userRole?: string;
  userName?: string;
  userId?: string;
}

const Header: React.FC<HeaderProps> = ({ userRole, userName, userId }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { refresh, isRefreshing } = useRefresh();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('crm_user');
      supabase.auth.signOut().catch((err) => console.error('Sign out error:', err));
      window.location.href = '/';
    }
    catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/studentPortal') {
      navigate('/studentPortal');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="app-header">
      <div className="app-header__main">
        <div className="app-header__logo">
          <Link to="/" className="app-header__logo-wrap app-header__logo-wrap--desktop">
            <img
              src={logoImage}
              alt="KRMU Logo"
              className="app-header__logo-img"
              referrerPolicy="no-referrer"
            />
          </Link>
          <a
            href="https://in.pinterest.com/pin/kr-mangalam-university-logo--967429563679559300/"
            target="_blank"
            rel="noopener noreferrer"
            className="app-header__logo-wrap app-header__logo-wrap--mobile"
          >
            <img
              src={logoImage}
              alt="KRMU Logo"
              className="app-header__logo-img"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        <div className="app-header__right">
          <nav className="app-header__nav">
            <Link to="/studentPortal" className="app-header__nav-link app-header__nav-link--active">
              Home
            </Link>

            <button
              onClick={() => scrollToSection('enquire-section')}
              className="app-header__nav-link"
            >
              Enquire
            </button>

            <button
              onClick={() => scrollToSection('track-section')}
              className="app-header__nav-link"
            >
              Track
            </button>
          </nav>

          <div className="app-header__actions">
            <button
              onClick={refresh}
              className={`app-header__icon-btn ${
                isRefreshing ? 'app-header__icon-btn--spinning' : ''
              }`}
              aria-label="Refresh data"
            >
              <RefreshCw />
            </button>

            <button
              onClick={toggleTheme}
              className="app-header__icon-btn"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>

            {userName ? (
              <div className="app-header__user">
                <div className="app-header__user-info">
                  <span className="app-header__user-name">{userName}</span>

                  <div className="app-header__user-meta">
                    {userId && (
                      <div className="app-header__user-id-wrap">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(userId);
                            const el = document.getElementById(`copy-${userId}`);
                            if (el) {
                              el.style.opacity = '1';
                              setTimeout(() => (el.style.opacity = '0'), 2000);
                            }
                          }}
                          className="app-header__user-id"
                        >
                          ID: {userId.slice(0, 8)}…
                        </button>

                        <span
                          id={`copy-${userId}`}
                          className="app-header__copy-toast"
                        >
                          COPIED
                        </span>
                      </div>
                    )}

                    <span className="app-header__user-role">
                      {userRole?.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="app-header__icon-btn"
                  aria-label="Logout"
                >
                  <LogOut />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="app-header__login-btn"
              >
                <LogIn />
                <span>Staff Access</span>
              </button>
            )}

            <button
              className="app-header__menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="app-header__mobile-nav">
          <Link
            to="/studentPortal"
            className="app-header__mobile-nav-link app-header__mobile-nav-link--active"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <button
            onClick={() => scrollToSection('enquire-section')}
            className="app-header__mobile-nav-link"
          >
            Enquire
          </button>

          <button
            onClick={() => scrollToSection('track-section')}
            className="app-header__mobile-nav-link"
          >
            Track
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;

