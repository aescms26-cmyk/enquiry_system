import React from 'react';
import { Clock, Timer, Coffee } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface DashboardHeaderProps {
  userName: string;
  onBreak: boolean;
  breakTimer: number;
  breakDuration: number;
  isUpdatingDuration: boolean;
  onToggleBreak: () => void;
  onUpdateDuration: (duration: number) => void;
  formatTime: (seconds: number) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onBreak,
  breakTimer,
  breakDuration,
  isUpdatingDuration,
  onToggleBreak,
  onUpdateDuration,
  formatTime,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="cd-header">
      <div className="cd-header-text">
        <h1 className={`cd-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Counsellor Portal
        </h1>
        <p className={`cd-subtitle ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Welcome back, <span className="cd-name-highlight">{userName}</span>. Here's your workload for today.
        </p>
      </div>

      <div className="cd-header-actions">
        {/* Break Duration Setting */}
        <div className={`cd-break-input ${isDark ? 'cd-break-input--dark' : 'cd-break-input--light'}`}>
          <Clock className="h-4 w-4 text-slate-500" />
          <div className="cd-break-input-inner">
            <input
              type="number"
              min={5}
              max={120}
              value={breakDuration}
              onChange={(e) => onUpdateDuration(parseInt(e.target.value) || 0)}
              disabled={onBreak || isUpdatingDuration}
              className={`cd-break-input-field ${isDark ? 'text-white' : 'text-gray-900'}`}
            />
            <span className="cd-break-input-unit">min</span>
          </div>
        </div>

        {onBreak && (
          <div className="cd-break-timer">
            <Timer className="h-5 w-5" />
            <span className="cd-break-timer-value">{formatTime(breakTimer)}</span>
          </div>
        )}

        <button
          onClick={onToggleBreak}
          className={`cd-break-btn ${
            onBreak
              ? 'cd-break-btn--on'
              : isDark
              ? 'cd-break-btn--off-dark'
              : 'cd-break-btn--off-light'
          }`}
        >
          <Coffee className={`h-5 w-5 ${onBreak ? 'fill-current' : ''}`} />
          <span>{onBreak ? 'End Break' : 'Lunch Break'}</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;

