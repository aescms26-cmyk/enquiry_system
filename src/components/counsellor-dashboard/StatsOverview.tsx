import React from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { BookOpen, AlertCircle, Clock, CheckCircle2, BarChart3 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Stats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

interface StatsOverviewProps {
  stats: Stats;
}

interface ChartData {
  name: string;
  pending: number;
  inProgress: number;
  completed: number;
}

const statConfig = [
  { label: 'Total Enquiries', key: 'total' as const, color: 'blue', icon: BookOpen },
  { label: 'Pending', key: 'pending' as const, color: 'amber', icon: AlertCircle },
  { label: 'In Progress', key: 'inProgress' as const, color: 'indigo', icon: Clock },
  { label: 'Completed', key: 'completed' as const, color: 'emerald', icon: CheckCircle2 },
];

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData: ChartData[] = [
    { name: 'Today', pending: stats.pending, inProgress: stats.inProgress, completed: stats.completed },
  ];

  return (
    <div className="cd-stats-grid">
      {statConfig.map((stat, i) => {
        const Icon = stat.icon;
        const value = stats[stat.key];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`cd-stat-card cd-stat-card--${stat.color} ${isDark ? 'cd-stat-card--dark' : 'cd-stat-card--light'}`}
          >
            <div className={`cd-stat-icon cd-stat-icon--${stat.color} ${isDark ? 'cd-stat-icon--dark' : 'cd-stat-icon--light'}`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className={`cd-stat-label ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
            <p className={`cd-stat-value ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            <div className={`cd-stat-glow cd-stat-glow--${stat.color} ${isDark ? 'cd-stat-glow--dark' : 'cd-stat-glow--light'}`} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
