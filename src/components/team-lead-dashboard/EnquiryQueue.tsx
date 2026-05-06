import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Enquiry } from '../../types';
import './EnquiryQueue.css';

interface EnquiryQueueProps {
  myEnquiries: Enquiry[];
  activeEnquiryId: string | null;
  onSelectEnquiry: (enquiry: Enquiry | null) => void;
  hasActiveLog: boolean;
  theme: string;
  loading: boolean;
}

export const EnquiryQueue: React.FC<EnquiryQueueProps> = ({
  myEnquiries,
  activeEnquiryId,
  onSelectEnquiry,
  hasActiveLog,
  theme,
  loading
}) => {
  if (loading) {
    return (
      <div className="skeleton-queue space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-card p-4 rounded-xl border animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className={`text-xl font-bold flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <UserIcon className="h-5 w-5 text-blue-600" />
        <span>My Students</span>
      </h2>
      
      <div className="queue-container space-y-3 max-h-[500px] overflow-y-auto pr-2">
        <AnimatePresence>
          {myEnquiries.map((e) => (
            <motion.div
              key={e.id}
              layoutId={`enquiry-${e.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => !hasActiveLog && onSelectEnquiry(e)}
              className={`enquiry-card p-4 rounded-xl border-2 cursor-pointer transition-all group relative overflow-hidden ${
                activeEnquiryId === e.id
                  ? theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                    : 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : theme === 'dark'
                    ? 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'
                    : 'border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-200'
              } ${hasActiveLog && activeEnquiryId !== e.id ? 'opacity-50 pointer-events-none' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Select ${e.studentName} enquiry`}
              aria-pressed={activeEnquiryId === e.id}
            >
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className={`enquiry-name font-bold ${
                  activeEnquiryId === e.id && theme !== 'dark' ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {e.studentName}
                </span>
                <span className={`status-tag px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  e.status === 'Completed' 
                    ? (activeEnquiryId === e.id && theme !== 'dark' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700')
                    : e.status === 'In Progress'
                      ? (activeEnquiryId === e.id && theme !== 'dark' ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-700')
                      : (activeEnquiryId === e.id && theme !== 'dark' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700')
                }`}>
                  {e.status}
                </span>
              </div>
              <div className={`flex items-center space-x-2 text-xs ${
                activeEnquiryId === e.id && theme !== 'dark' ? 'text-blue-100' : 'text-gray-500'
              } mb-1 relative z-10`}>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{e.course}</span>
              </div>
              <div className={`flex items-center space-x-2 text-xs ${
                activeEnquiryId === e.id && theme !== 'dark' ? 'text-blue-100' : 'text-gray-500'
              } relative z-10`}>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {myEnquiries.length === 0 && !loading && (
          <div className={`empty-state text-center py-12 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <UserIcon className={`h-12 w-12 mx-auto mb-6 text-gray-400 ${theme === 'dark' ? 'text-slate-500' : ''}`} />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>No enquiries assigned to you yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

