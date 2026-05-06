import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Download, User as UserIcon } from 'lucide-react';
import { Enquiry } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { downloadCSV } from '../../utils/csvExport';

interface EnquiryQueueProps {
  enquiries: Enquiry[];
  activeEnquiry: Enquiry | null;
  activeLog: boolean;
  loading: boolean;
  userName: string;
  onSelect: (enquiry: Enquiry) => void;
}

const EnquiryQueue: React.FC<EnquiryQueueProps> = ({
  enquiries,
  activeEnquiry,
  activeLog,
  loading,
  userName,
  onSelect,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="cd-queue">
      <div className="cd-queue-header">
        <h2 className={`cd-queue-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span className="cd-queue-title-bar" />
          Active Queue
        </h2>
        <button
          onClick={() => downloadCSV(enquiries, `enquiries_${userName.replace(/\s+/g, '_').toLowerCase()}`)}
          className={`cd-queue-download ${isDark ? 'cd-queue-download--dark' : 'cd-queue-download--light'}`}
          title="Download Enquiries"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="cd-queue-list">
        {enquiries.map((e, i) => {
          const isActive = activeEnquiry?.id === e.id;
          const isDisabled = activeLog && activeEnquiry?.id !== e.id;

          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !activeLog && onSelect(e)}
              className={`cd-enquiry-card ${
                isActive
                  ? isDark
                    ? 'cd-enquiry-card--active-dark'
                    : 'cd-enquiry-card--active-light'
                  : isDark
                  ? 'cd-enquiry-card--dark'
                  : 'cd-enquiry-card--light'
              } ${isDisabled ? 'cd-enquiry-card--disabled' : ''}`}
            >
              {isActive && <div className={`cd-enquiry-card-orb ${isDark ? 'cd-enquiry-card-orb--dark' : 'cd-enquiry-card-orb--light'}`} />}

              <div className="cd-enquiry-card-header">
                <div>
                  <span className={`cd-enquiry-name ${isActive && !isDark ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'}`}>
                    {e.studentName}
                  </span>
                  <span className={`cd-enquiry-token ${isActive && !isDark ? 'text-blue-100' : isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {e.tokenId}
                  </span>
                </div>
                <span className={`cd-enquiry-status cd-enquiry-status--${e.status.toLowerCase().replace(' ', '-')} ${isActive && !isDark ? 'cd-enquiry-status--active-light' : ''}`}>
                  {e.status}
                </span>
              </div>

              <div className="cd-enquiry-meta">
                <div className={`cd-enquiry-tag ${isActive && !isDark ? 'cd-enquiry-tag--active-light' : isDark ? 'cd-enquiry-tag--dark' : 'cd-enquiry-tag--light'}`}>
                  <BookOpen className={`h-3.5 w-3.5 ${isActive && !isDark ? 'text-white' : isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className="truncate max-w-[150px]">{e.course}</span>
                </div>
                <div className={`cd-enquiry-date ${isActive && !isDark ? 'text-blue-100' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {enquiries.length === 0 && !loading && (
          <div className={`cd-empty-queue ${isDark ? 'cd-empty-queue--dark' : 'cd-empty-queue--light'}`}>
            <div className={`cd-empty-queue-icon ${isDark ? 'cd-empty-queue-icon--dark' : 'cd-empty-queue-icon--light'}`}>
              <UserIcon className={`h-8 w-8 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
            </div>
            <p className="cd-empty-queue-text">No enquiries assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryQueue;

