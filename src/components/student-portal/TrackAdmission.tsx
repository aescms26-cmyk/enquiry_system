import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { Enquiry } from '../../types';
import { Search, AlertCircle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './TrackAdmission.css';

const TrackAdmission: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [tokenId, setTokenId] = useState('');
  const [trackedEnquiry, setTrackedEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenId.trim()) return;
    setLoading(true);
    setError('');
    setTrackedEnquiry(null);

    try {
      const { data, error: trackError } = await supabase
        .from('enquiries')
        .select('*')
        .eq('token_id', tokenId.trim())
        .single();

      if (trackError || !data) {
        setError('No enquiry found with this token ID. Please check and try again.');
        setLoading(false);
        return;
      }

      setTrackedEnquiry({
        id: data.id,
        tokenId: data.token_id,
        studentName: data.student_name,
        fatherName: data.father_name,
        lastInstitution: data.last_institution,
        address: data.address,
        state: data.state,
        pincode: data.pincode,
        studentEmail: data.student_email,
        studentPhone: data.student_phone,
        course: data.course,
        category: data.category,
        marks12th: data.marks_12th,
        marksGrad: data.marks_grad,
        city: data.city,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        counsellorId: data.counsellor_id,
        teamLeadId: data.team_lead_id,
        lastUpdated: data.last_updated,
        notes: data.notes,
      } as Enquiry);
    } catch (err: any) {
      setError(err.message || 'Failed to track enquiry');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'track-status-completed';
      case 'In Progress':
        return 'track-status-progress';
      default:
        return 'track-status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'Your enquiry has been processed. Our team will contact you shortly.';
      case 'In Progress':
        return 'Your enquiry is being processed by our admissions team.';
      default:
        return 'Your enquiry is pending review. We will get back to you soon.';
    }
  };

  return (
    <div id="track-section" className="track-section">
      <div className="track-header">
        <span className="track-overline">Track Status</span>
        <h2 className={`track-title ${isDark ? 'track-title-dark' : 'track-title-light'}`}>
          Track Admission
        </h2>
        <p className={`track-desc ${isDark ? 'track-desc-dark' : 'track-desc-light'}`}>
          Enter your token ID to check the status of your admission enquiry.
        </p>
      </div>

      <form onSubmit={handleTrack} className="track-form">
        <div className="track-input-row">
          <div className="track-input-wrapper">
            <Search className="track-input-icon" />
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter your token ID (e.g. KRMU-ABC123)"
              className={`track-input ${isDark ? 'track-input-dark' : 'track-input-light'}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !tokenId.trim()}
            className="track-btn"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 enquiry-spin" />
                <span>Tracking...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Track</span>
              </>
            )}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`track-error ${isDark ? 'track-error-dark' : 'track-error-light'}`}
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {trackedEnquiry && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`track-result ${isDark ? 'track-result-dark' : 'track-result-light'}`}
          >
            <div className="track-result-header">
              <div>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Token ID
                </p>
                <p className={`track-result-token ${isDark ? 'track-result-token-dark' : 'track-result-token-light'}`}>
                  {trackedEnquiry.tokenId}
                </p>
              </div>
              <span className={`track-status ${getStatusClass(trackedEnquiry.status)}`}>
                {trackedEnquiry.status}
              </span>
            </div>

            <div className="track-details-grid">
              <div className={`track-detail-item ${isDark ? 'track-detail-item-dark' : 'track-detail-item-light'}`}>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Student Name
                </p>
                <p className={`track-detail-value ${isDark ? 'track-detail-value-dark' : 'track-detail-value-light'}`}>
                  {trackedEnquiry.studentName}
                </p>
              </div>
              <div className={`track-detail-item ${isDark ? 'track-detail-item-dark' : 'track-detail-item-light'}`}>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Course
                </p>
                <p className={`track-detail-value ${isDark ? 'track-detail-value-dark' : 'track-detail-value-light'}`}>
                  {trackedEnquiry.course}
                </p>
              </div>
              <div className={`track-detail-item ${isDark ? 'track-detail-item-dark' : 'track-detail-item-light'}`}>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Submitted On
                </p>
                <p className={`track-detail-value ${isDark ? 'track-detail-value-dark' : 'track-detail-value-light'}`}>
                  {new Date(trackedEnquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`track-detail-item ${isDark ? 'track-detail-item-dark' : 'track-detail-item-light'}`}>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Last Updated
                </p>
                <p className={`track-detail-value ${isDark ? 'track-detail-value-dark' : 'track-detail-value-light'}`}>
                  {trackedEnquiry.lastUpdated ? new Date(trackedEnquiry.lastUpdated).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            {trackedEnquiry.notes && (
              <div className={`track-notes ${isDark ? 'track-notes-dark' : 'track-notes-light'}`}>
                <p className={`track-result-label ${isDark ? 'track-result-label-dark' : 'track-result-label-light'}`}>
                  Counsellor Notes
                </p>
                <p className={`track-notes-text ${isDark ? 'track-notes-text-dark' : 'track-notes-text-light'}`}>
                  {trackedEnquiry.notes}
                </p>
              </div>
            )}

            <div className="track-footer">
              {getStatusIcon(trackedEnquiry.status)}
              <p className={`track-footer-text ${isDark ? 'track-footer-text-dark' : 'track-footer-text-light'}`}>
                {getStatusMessage(trackedEnquiry.status)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackAdmission;

