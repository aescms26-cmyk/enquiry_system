import React, { ReactNode } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import HighlightsBar from './HighlightsBar';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  userRole?: string;
  userName?: string;
  userId?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, userName, userId }) => {
  return (
    <div className="layout-container">
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          document.getElementById('enquire-section')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="fab"
        aria-label="Enquire"
      >
        <Send className="h-6 w-6" />
      </motion.button>

      <HighlightsBar />
      <Header userRole={userRole} userName={userName} userId={userId} />
      <main className="layout-main">{children}</main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Layout;