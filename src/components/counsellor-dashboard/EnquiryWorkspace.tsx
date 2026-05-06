import React from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  Play,
  Square,
  AlertCircle,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface EnquiryWorkspaceProps {
  enquiry: Enquiry;
  activeLog: boolean;
  timer: number;
  notes: string;
  onNotesChange: (notes: string) => void;
  onStartSession: (enquiry: Enquiry) => void;
  onStopSession: () => void;
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
  formatTime: (seconds: number) => string;
}

const infoFields = [
  { label: 'Full Name', key: 'studentName', color: 'blue' },
  { label: 'Contact Number', key: 'studentPhone', color: 'emerald' },
  { label: 'Email Address', key: 'studentEmail', color: 'purple' },
  { label: "Father's Name", key: 'fatherName', color: 'amber' },
  { label: 'Last Institution', key: 'lastInstitution', color: 'slate' },
  { label: 'Category', key: 'category', color: 'indigo' },
  { label: '12th Marks (%)', key: 'marks12th', color: 'rose' },
  { label: 'Graduation Marks (%)', key: 'marksGrad', color: 'cyan' },
] as const;

const EnquiryWorkspace: React.FC<EnquiryWorkspaceProps> = ({
  enquiry,
  activeLog,
  timer,
  notes,
  onNotesChange,
  onStartSession,
  onStopSession,
  onUpdateStatus,
  formatTime,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fullAddress = `${enquiry.address}, ${enquiry.city}, ${enquiry.state} - ${enquiry.pincode}`;

  return (
    <motion.div
      key={enquiry.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`cd-workspace ${isDark ? 'cd-workspace--dark' : 'cd-workspace--light'}`}
    >
      {/* Timer Header */}
      <div className={`cd-timer-header ${activeLog ? 'cd-timer-header--active' : isDark ? 'cd-timer-header--dark' : 'cd-timer-header--light'}`}>
        <div className="cd-timer-header-left">
          <div className={`cd-timer-icon ${activeLog ? 'cd-timer-icon--active' : isDark ? 'cd-timer-icon--dark' : 'cd-timer-icon--light'}`}>
            <Clock className="h-8 w-8" />
          </div>
          <div>
            <p className={`cd-timer-label ${activeLog ? 'text-white/60' : isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Session Duration
            </p>
            <p className="cd-timer-value">{formatTime(timer)}</p>
          </div>
        </div>

        {activeLog ? (
          <button onClick={onStopSession} className="cd-session-btn cd-session-btn--stop">
            <Square className="h-6 w-6 fill-current" />
            <span>End Session</span>
          </button>
        ) : (
          <button onClick={() => onStartSession(enquiry)} className="cd-session-btn cd-session-btn--start">
            <Play className="h-6 w-6 fill-current" />
            <span>Start Session</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="cd-workspace-body">
        <div className="cd-workspace-grid">
          {/* Left Column — Student Profile */}
          <div className="cd-workspace-col">
            <h3 className={`cd-section-title ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              <span className={`cd-section-bar ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
              Student Profile
            </h3>

            <div className="cd-info-grid">
              {infoFields.map((field) => (
                <div
                  key={field.key}
                  className={`cd-info-item cd-info-item--${field.color} ${isDark ? 'cd-info-item--dark' : 'cd-info-item--light'}`}
                >
                  <p className="cd-info-label">{field.label}</p>
                  <p className={`cd-info-value ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {(enquiry as any)[field.key] || 'N/A'}
                  </p>
                </div>
              ))}
              <div className={`cd-info-item cd-info-item--slate cd-info-item--full ${isDark ? 'cd-info-item--dark' : 'cd-info-item--light'}`}>
                <p className="cd-info-label">Full Address</p>
                <p className={`cd-info-value ${isDark ? 'text-white' : 'text-slate-900'}`}>{fullAddress}</p>
              </div>
            </div>

            {/* Academic Interest */}
            <h3 className={`cd-section-title ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              <span className={`cd-section-bar ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
              Academic Interest
            </h3>
            <div className="cd-course-card">
              <div className="cd-course-card-header">
                <div className="cd-course-icon">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="cd-course-label">Target Course</p>
                  <p className="cd-course-name">{enquiry.course}</p>
                </div>
              </div>
              <div className="cd-course-divider" />
              <p className="cd-course-quote">
                "{enquiry.message || 'No specific message or requirements provided by the student.'}"
              </p>
            </div>
          </div>

          {/* Right Column — Session Records */}
          <div className="cd-workspace-col">
            <div className="cd-session-records-header">
              <h3 className={`cd-section-title ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                <span className={`cd-section-bar ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                Session Records
              </h3>
              <div className="cd-status-selector">
                <span className="cd-status-selector-label">Status</span>
                <select
                  value={enquiry.status}
                  onChange={(e) => onUpdateStatus(enquiry.id, e.target.value as EnquiryStatus)}
                  className={`cd-status-select ${isDark ? 'cd-status-select--dark' : 'cd-status-select--light'}`}
                >
                  <option value="Pending" className={isDark ? 'bg-slate-900' : ''}>Pending</option>
                  <option value="In Progress" className={isDark ? 'bg-slate-900' : ''}>In Progress</option>
                  <option value="Completed" className={isDark ? 'bg-slate-900' : ''}>Completed</option>
                </select>
              </div>
            </div>

            <div className="cd-notes-wrap">
              <div className={`cd-notes-icon ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
                <MessageSquare className="h-6 w-6" />
              </div>
              <textarea
                rows={12}
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                disabled={!activeLog}
                className={`cd-notes-textarea ${isDark ? 'cd-notes-textarea--dark' : 'cd-notes-textarea--light'}`}
                placeholder={activeLog ? 'Document your interaction with the student here...' : 'Activate session to begin documentation'}
              />
              {!activeLog && (
                <div className={`cd-notes-overlay ${isDark ? 'bg-black/20' : 'bg-gray-50/50'}`}>
                  <div className={`cd-notes-overlay-inner ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-gray-200'}`}>
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>Start session to edit notes</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnquiryWorkspace;

