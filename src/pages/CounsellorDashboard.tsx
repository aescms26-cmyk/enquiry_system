import React from 'react';
import { User } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useCounsellorData } from '../hooks/useCounsellorData';
import Layout from '../components/layout/Layout';
import DashboardHeader from '../components/counsellor-dashboard/DashboardHeader';
import StatsOverview from '../components/counsellor-dashboard/StatsOverview';
import EnquiryQueue from '../components/counsellor-dashboard/EnquiryQueue';
import EnquiryWorkspace from '../components/counsellor-dashboard/EnquiryWorkspace';
import EmptyState from '../components/counsellor-dashboard/EmptyState';
import ResourcePortals from '../components/counsellor-dashboard/ResourcePortals';
import Notifications from '../components/counsellor-dashboard/Notifications';
import { AnimatePresence } from 'motion/react';
import { downloadCSV } from '../utils/csvExport';
import { toast } from 'sonner';
import '../styles/components/counsellor-dashboard/index.css';

interface Props {
  user: User;
}

const CounsellorDashboard: React.FC<Props> = ({ user }) => {
  const { theme } = useTheme();
  const {
    enquiries,
    activeEnquiry,
    activeLog,
    loading,
    notes,
    timer,
    onBreak,
    breakTimer,
    breakDuration,
    isUpdatingDuration,
    stats,
    setNotes,
    startSession,
    stopSession,
    updateStatus,
    toggleBreak,
    updateBreakDuration,
    selectEnquiry,
    formatTime,
  } = useCounsellorData(user);

  return (
    <Layout userRole={user.role} userName={user.name} userId={user.userId}>
      {/* ====== Dashboard Header ====== */}
      <DashboardHeader
        userName={user.name}
        onBreak={onBreak}
        breakTimer={breakTimer}
        breakDuration={breakDuration}
        isUpdatingDuration={isUpdatingDuration}
        onToggleBreak={toggleBreak}
        onUpdateDuration={updateBreakDuration}
        formatTime={formatTime}
      />

      {/* ====== Stats Overview ====== */}
      <StatsOverview stats={stats} />

      {/* ====== Main Layout ====== */}
      <div className="couns-layout">
        {/* Enquiry Queue Sidebar */}
        <div className="couns-queue-wrapper">
          <EnquiryQueue
            enquiries={enquiries}
            activeEnquiry={activeEnquiry}
            activeLog={activeLog}
            loading={loading}
            userName={user.name}
            onSelect={selectEnquiry}
            onDownload={() =>
              downloadCSV(enquiries, `enquiries_${user.name.replace(/\s+/g, '_').toLowerCase()}`)
            }
          />
        </div>

        {/* Enquiry Workspace / Empty State */}
        <div className="couns-workspace-wrapper">
          <AnimatePresence mode="wait">
            {activeEnquiry ? (
              <EnquiryWorkspace
                key={activeEnquiry.id}
                enquiry={activeEnquiry}
                activeLog={activeLog}
                timer={timer}
                notes={notes}
                onNotesChange={setNotes}
                onStartSession={() => startSession(activeEnquiry)}
                onStopSession={stopSession}
                onUpdateStatus={updateStatus}
                formatTime={formatTime}
              />
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ====== Resource Portals ====== */}
      <ResourcePortals />
    </Layout>
  );
};

export default CounsellorDashboard;

