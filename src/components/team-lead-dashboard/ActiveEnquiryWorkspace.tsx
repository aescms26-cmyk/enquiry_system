import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Play, Square, MessageSquare } from 'lucide-react';
import { Enquiry, TimeLog } from '../../types';
import './ActiveEnquiryWorkspace.css';

interface ActiveEnquiryWorkspaceProps {
  activeEnquiry: Enquiry | null;
  activeLog: TimeLog | null;
  notes: string;
  timer: number;
  onStartTimer: (enquiry: Enquiry) => void;
  onStopTimer: () => void;
  onNotesChange: (notes: string) => void;
  onStatusChange: (status: Enquiry['status']) => void;
  theme: string;
}

export const ActiveEnquiryWorkspace: React.FC<ActiveEnquiryWorkspaceProps> = ({
  activeEnquiry,
  activeLog,
  notes,
  timer,
  onStartTimer,
  onStopTimer,
  onNotesChange,
  onStatusChange,
  theme
}) => {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!activeEnquiry) {
    return (
      <div className={`workspace-empty h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
      }`}>
        <motion.div 
          className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'} p-6 rounded-full mb-6`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6l4 2" />
          </svg>
        </motion.div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Select a Student</h3>
        <p className="text-gray-500 max-w-xs">Choose a student from the list on the left to view details and start a counselling session.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={`workspace-card rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'
      }`}
      layout
    >
      <div className={`timer-header p-6 flex items-center justify-between ${
        activeLog ? 'bg-red-500/10 text-red-400 border-b-red-500/20' : 
        theme === 'dark' ? 'bg-white/5 text-slate-200 border-b-white/10' : 'bg-gray-50 text-gray-700 border-b-gray-100'
      }`}>
        <div className="timer-display flex items-center space-x-4">
          <div className={`timer-icon p-3 rounded-full ${
            activeLog ? 'bg-red-500/20 animate-pulse' : theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
          }`}>
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="timer-label text-xs font-bold uppercase tracking-widest opacity-70">Session Timer</p>
            <p className="timer-value text-2xl font-mono font-bold">{formatTime(timer)}</p>
          </div>
        </div>
        
        {activeLog ? (
          <button
            onClick={onStopTimer}
            className="session-btn session-btn--stop bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all"
            aria-label="Stop current counselling session"
          >
            <Square className="h-5 w-5" />
            <span>Stop Session</span>
          </button>
        ) : (
          <button
            onClick={() => onStartTimer(activeEnquiry)}
            className="session-btn session-btn--start bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all"
            aria-label="Start counselling session for selected student"
          >
            <Play className="h-5 w-5" />
            <span>Start Session</span>
          </button>
        )}
      </div>

      <div className="workspace-content p-8">
        <div className="details-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="student-details space-y-4">
            <h3 className={`section-title text-lg font-bold pb-2 border-b ${
              theme === 'dark' ? 'text-white border-white/10' : 'text-slate-800 border-slate-200'
            }`}>
              Student Details
            </h3>
            <div className="detail-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="detail-card p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
                <p className="detail-label text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</p>
                <p className="detail-value text-sm font-bold text-slate-900">{activeEnquiry.studentName}</p>
              </div>
              <div className="detail-card p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                <p className="detail-label text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Number</p>
                <p className="detail-value text-sm font-bold text-slate-900">{activeEnquiry.studentPhone}</p>
              </div>
              {/* Additional detail cards for email, father's name, etc. - abbreviated for brevity */}
              <div className="detail-card p-3 rounded-xl col-span-1 sm:col-span-2">
                <p className="detail-label text-[10px] font-bold text-slate-500 uppercase mb-1">Full Address</p>
                <p className="detail-value text-sm font-bold text-slate-900">
                  {activeEnquiry.address}, {activeEnquiry.city}, {activeEnquiry.state} - {activeEnquiry.pincode}
                </p>
              </div>
            </div>
          </div>

          <div className="enquiry-info space-y-4">
            <h3 className={`section-title text-lg font-bold pb-2 border-b ${
              theme === 'dark' ? 'text-white border-white/10' : 'text-gray-800 border-gray-100'
            }`}>
              Enquiry Info
            </h3>
            <div className="info-section space-y-3">
              <p className="info-item text-sm"><strong>Token ID:</strong> <span className="font-mono font-bold text-blue-600">{activeEnquiry.tokenId}</span></p>
              <p className="info-item text-sm"><strong>Course:</strong> {activeEnquiry.course}</p>
              <p className="info-item text-sm"><strong>Message:</strong> {activeEnquiry.message || 'No message provided.'}</p>
            </div>
          </div>
        </div>

        <div className="notes-section space-y-4">
          <div className="notes-header flex items-center justify-between">
            <h3 className={`section-title text-lg font-bold flex items-center space-x-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <span>Counsellor Notes</span>
            </h3>
            <div className="status-controls flex items-center space-x-2">
              <span className="status-label text-xs font-bold text-gray-400 uppercase">Status:</span>
              <select
                value={activeEnquiry.status}
                onChange={(e) => onStatusChange(e.target.value as Enquiry['status'])}
                className={`status-select text-sm font-bold ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-white border-white/10' 
                    : 'bg-gray-50 text-gray-900 border-gray-200'
                } border rounded-lg focus:ring-2 focus:ring-blue-500`}
                aria-label="Update enquiry status"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <textarea
            rows={6}
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            disabled={!activeLog}
            className={`notes-textarea w-full p-4 rounded-xl border resize-vertical ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              !activeLog ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            placeholder={activeLog ? "Type your session notes here..." : "Start a session to edit notes"}
            aria-label="Counselling session notes"
          />
        </div>
      </div>
    </motion.div>
  );
};

