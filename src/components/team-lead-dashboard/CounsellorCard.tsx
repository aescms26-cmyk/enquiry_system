import React from 'react';
import { Users, Coffee } from 'lucide-react';
import { User } from '../../types';
import './CounsellorCard.css';

interface CounsellorCardProps {
  counsellor: User;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
  onUpdateBreakDuration: (id: string, duration: number) => void;
  theme: string;
}

export const CounsellorCard: React.FC<CounsellorCardProps> = ({
  counsellor,
  stats,
  onUpdateBreakDuration,
  theme
}) => {
  return (
    <div className={`counsellor-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="counsellor-header flex items-center space-x-3 mb-4">
        <div className="counsellor-icon p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h3 className="counsellor-name font-bold">{counsellor.name}</h3>
          <p className="counsellor-email text-xs text-gray-500">{counsellor.email}</p>
        </div>
{counsellor.on_break && (
  <div className="counsellor-break ml-auto flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-bold uppercase animate-pulse">
    <Coffee className="h-3 w-3" />
    <span>On Break</span>
  </div>
)}

      </div>
      
      <div className="counsellor-stats space-y-4 mb-4">
        <div className="courses-section space-y-2">
          <p className="courses-label text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned Courses</p>
          <div className="flex flex-wrap gap-1">
            {counsellor.assignedCourses?.map((course: string) => (
              <span key={course} className={`course-tag px-2 py-0.5 rounded text-[10px] font-bold ${theme === 'dark' ? 'bg-white/10 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                {course}
              </span>
            ))}
          </div>
        </div>

        <div className="break-section space-y-2">
          <p className="break-label text-xs font-bold text-gray-400 uppercase tracking-widest">Lunch Break Duration (Mins)</p>
          <div className="flex items-center space-x-2">
            <input 
              type="number"
defaultValue={counsellor.break_duration_mins || 30}
onChange={(e) => onUpdateBreakDuration(counsellor.id, parseInt(e.target.value) || 30)} title="Lunch break duration in minutes"
              className={`break-input w-20 px-2 py-1 border rounded text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            />
            <span className="text-xs text-gray-400">Default: 30m</span>
          </div>
        </div>
      </div>

      <div className="stats-footer pt-4 border-t border-gray-50 dark:border-white/5 flex justify-between">
        <div className="text-center">
          <p className={`stats-num text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{stats.total}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Total</p>
        </div>
        <div className="text-center">
          <p className="stats-num text-lg font-bold text-green-600">{stats.completed}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Done</p>
        </div>
        <div className="text-center">
          <p className="stats-num text-lg font-bold text-blue-600">{stats.pending}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">New</p>
        </div>
      </div>
    </div>
  );
};

