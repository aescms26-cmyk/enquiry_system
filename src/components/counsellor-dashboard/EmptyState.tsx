import React from 'react';
import { motion } from 'motion/react';
import { User as UserIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const EmptyState: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`cd-empty-detail ${isDark ? 'cd-empty-detail--dark' : 'cd-empty-detail--light'}`}>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`cd-empty-icon ${isDark ? 'cd-empty-icon--dark' : 'cd-empty-icon--light'}`}
      >
        <UserIcon className={`h-20 w-20 ${isDark ? 'text-white/10' : 'text-gray-200'}`} />
      </motion.div>
      <h3 className={`cd-empty-title ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready for the next student?</h3>
      <p className={`cd-empty-desc ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
        Select a student from your queue to view their profile and begin a professional counselling session.
      </p>
    </div>
  );
};

export default EmptyState;

