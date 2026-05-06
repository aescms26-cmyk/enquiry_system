import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './StatsOverview.css';

interface StatsOverviewProps {
  teamEnquiries: any[]; // Enquiry[]
  counsellors: any[]; // User[]
  theme: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ teamEnquiries, counsellors, theme }) => {
  const getCounsellorStats = (counsellorId: string) => {
    const enquiries = teamEnquiries.filter((e: any) => e.counsellorId === counsellorId);
    return {
      total: enquiries.length,
      completed: enquiries.filter((e: any) => e.status === 'Completed').length,
      pending: enquiries.filter((e: any) => e.status === 'Pending').length,
      inProgress: enquiries.filter((e: any) => e.status === 'In Progress').length,
    };
  };

  const stats = {
    total: teamEnquiries.length,
    completed: teamEnquiries.filter((e: any) => e.status === 'Completed').length,
    pending: teamEnquiries.filter((e: any) => e.status === 'Pending').length,
    inProgress: teamEnquiries.filter((e: any) => e.status === 'In Progress').length,
  };

  return (
    <div className="space-y-8">
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Team Performance
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`stat-card stat-card--blue p-6 rounded-2xl border ${theme === 'dark' ? 'dark' : ''}`}>
          <p className="stat-label uppercase tracking-widest mb-1">Total Enquiries</p>
          <p className="stat-value text-4xl">{stats.total}</p>
        </div>
        <div className={`stat-card stat-card--green p-6 rounded-2xl border ${theme === 'dark' ? 'dark' : ''}`}>
          <p className="stat-label uppercase tracking-widest mb-1">Completed</p>
          <p className="stat-value text-4xl">{stats.completed}</p>
        </div>
        <div className={`stat-card stat-card--amber p-6 rounded-2xl border ${theme === 'dark' ? 'dark' : ''}`}>
          <p className="stat-label uppercase tracking-widest mb-1">In Progress</p>
          <p className="stat-value text-4xl">{stats.inProgress}</p>
        </div>
        <div className={`stat-card stat-card--red p-6 rounded-2xl border ${theme === 'dark' ? 'dark' : ''}`}>
          <p className="stat-label uppercase tracking-widest mb-1">Pending</p>
          <p className="stat-value text-4xl">{stats.pending}</p>
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-700'}`}>
          Counsellor Workload Distribution
        </h3>
        <div className="space-y-4">
          {counsellors.map((c: any) => {
            const cStats = getCounsellorStats(c.id);
            const percentage = teamEnquiries.length ? Math.round((cStats.total / teamEnquiries.length) * 100) : 0;
            return (
              <div key={c.id} className={`workload-card p-4 rounded-xl border ${theme === 'dark' ? 'dark' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="workload-name font-bold">{c.name}</span>
                  <span className="text-xs font-bold text-gray-500">{cStats.total} Enquiries ({percentage}%)</span>
                </div>
                <div className="workload-bar h-2 rounded-full overflow-hidden flex bg-gray-200 dark:bg-white/10">
                  <div className="workload-segment h-full bg-green-500" style={{ width: `${cStats.total ? (cStats.completed / cStats.total) * 100 : 0}%` }} />
                  <div className="workload-segment h-full bg-yellow-500" style={{ width: `${cStats.total ? (cStats.inProgress / cStats.total) * 100 : 0}%` }} />
                  <div className="workload-segment h-full bg-blue-500" style={{ width: `${cStats.total ? (cStats.pending / cStats.total) * 100 : 0}%` }} />
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500" />Done: {cStats.completed}
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />Active: {cStats.inProgress}
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />New: {cStats.pending}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

