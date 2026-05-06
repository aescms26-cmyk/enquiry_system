import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import {
  LogIn,
  Shield,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Lock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/pages/Login.css';
import Layout from '../components/layout/Layout';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { theme } = useTheme();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [success, setSuccess] = useState('');
  const [tableMissing, setTableMissing] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/supabase-health');
        const result = await response.json();
        if (result.status === 'error') {
          if (result.message.includes('relation "public.users" does not exist')) {
            setTableMissing(true);
          } else {
            setError(`Database connection issue: ${result.message}`);
          }
        }
      } catch (err) {
        console.error('Health check failed:', err);
        setError('Could not connect to the backend server. Please ensure the dev server is running.');
      }
    };
    checkHealth();
  }, []);

  const handleBootstrap = async () => {
    setIsBootstrapping(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/admin/bootstrap', { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        setSuccess('Admin account created successfully! You can now log in.');
      } else {
        setError(result.error || 'Bootstrap failed');
        if (result.details) {
          console.error('Bootstrap details:', result.details);
        }
      }
    } catch (err) {
      console.error('Bootstrap error:', err);
      setError('Network error during bootstrap. Please check the console.');
    } finally {
      setIsBootstrapping(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (result.success) {
        onLogin({
          id: result.user.id,
          userId: result.user.user_id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          teamLeadId: result.user.team_lead_id,
          assignedCourses: result.user.assigned_courses,
          mobileNo: result.user.mobile_no,
          photoURL: result.user.photo_url,
          createdAt: result.user.created_at,
        });
      } else {
        setError(result.error || 'Invalid User ID or Name');
        if (result.code === 'TABLE_MISSING') {
          setTableMissing(true);
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.name === 'AbortError') {
        setError('Login request timed out. The database might be slow or unreachable.');
      } else {
        setError('Network error. Please ensure the server is running and the database is connected.');
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <BarChart3 size={18} />, text: 'Track admissions in real-time' },
    { icon: <Users size={18} />, text: 'Manage student enquiries efficiently' },
    { icon: <ShieldCheck size={18} />, text: 'Secure role-based access control' },
    { icon: <Zap size={18} />, text: 'Instant notifications & updates' },
  ];

  return (
    <Layout>
      <div className="login-page">
        {/* Floating orbs for visual depth */}
        <div className="login-page__orb login-page__orb--1" />
        <div className="login-page__orb login-page__orb--2" />

        <div className="login-container">
          {/* Left Panel - Branding (desktop only) */}
          <div className="login-brand">
            <div className="login-brand__content">
              <div className="login-brand__logo-wrap">
                <img
                  src="src/assets/image.webp"
                  alt="KRMU Logo"
                  className="login-brand__logo"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="login-brand__title">
                Welcome to{' '}
                <span className="login-brand__title-accent">KRMU</span>
                <br />
                Staff Portal
              </h1>
              <p className="login-brand__subtitle">
                Empowering our team with intelligent tools to manage admissions,
                enquiries, and student engagement seamlessly.
              </p>
              <div className="login-brand__features">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="login-brand__feature"
                  >
                    <div className="login-brand__feature-icon">{feature.icon}</div>
                    <span className="login-brand__feature-text">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="login-form-section">
            {/* Mobile branding (visible only on small screens) */}
            <div className="login-mobile-brand">
              <img
                src="src/assets/image.webp"
                alt="KRMU Logo"
                className="login-mobile-brand__logo"
                referrerPolicy="no-referrer"
              />
              <h2 className="login-mobile-brand__title">KRMU Staff Portal</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="login-card"
            >
              {/* Card Header */}
              <div className="login-card__header">
                <div className="login-card__icon-wrap">
                  <Lock size={24} />
                </div>
                <h2 className="login-card__title">Internal Login</h2>
                <p className="login-card__subtitle">Access your dashboard to manage enquiries</p>
              </div>

              {/* Alerts */}
              {error && (
                <div className="login-alert login-alert--error">
                  <AlertCircle className="login-alert__icon" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="login-alert login-alert--success">
                  <CheckCircle2 className="login-alert__icon" />
                  <p>{success}</p>
                </div>
              )}

              {tableMissing && (
                <div className="login-alert login-alert--warning">
                  <AlertCircle className="login-alert__icon" />
                  <div className="login-alert__content">
                    <p className="login-alert__title">Database Tables Missing</p>
                    <p className="login-alert__text">
                      Please run the SQL script in your Supabase SQL Editor to create the "users"
                      table. Without this, you cannot log in.
                    </p>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="login-form">
                <div className="login-field">
                  <label className="login-label">
                    User ID (4 Digits) <span className="login-label__required">*</span>
                  </label>
                  <div className="login-input-wrap">
                    <Shield className="login-input__icon" />
                    <input
                      required
                      type="text"
                      maxLength={4}
                      pattern="\d{4}"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="login-input"
                      placeholder="e.g. 1001"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="login-field">
                  <label className="login-label">
                    Full Name <span className="login-label__required">*</span>
                  </label>
                  <div className="login-input-wrap">
                    <LogIn className="login-input__icon" />
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="login-input"
                      placeholder="Enter your name"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="login-submit">
                  {loading ? (
                    <>
                      <span className="login-submit__spinner" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Account</span>
                      <LogIn size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Bootstrap section (admin only) */}
              {userId === '1001' && (
                <div className="login-bootstrap">
                  <button
                    type="button"
                    onClick={handleBootstrap}
                    disabled={isBootstrapping}
                    className="login-bootstrap__btn"
                  >
                    <Shield size={16} />
                    <span>{isBootstrapping ? 'Setting up...' : 'Setup Admin Account'}</span>
                  </button>
                </div>
              )}

              <p className="login-hint">Authorized personnel only. Unauthorized access is prohibited.</p>
            </motion.div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Login;

