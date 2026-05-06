import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, BookOpen, BarChart3, Bus, Home, ExternalLink, CreditCard, RefreshCw, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Course, Enquiry } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface DashboardOverviewProps {
  user: User;
  users: User[];
  courses: Course[];
  enquiries: Enquiry[];
  realtimeStatus: { table_name: string; enabled: boolean }[];
  checkingRealtime: boolean;
  showRpcSql: boolean;
  onCheckRealtime: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  user,
  users,
  courses,
  enquiries,
  realtimeStatus,
  checkingRealtime,
  showRpcSql,
  onCheckRealtime
}) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>System Overview</h2>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1`}>Welcome back, {user.name}</p>
        </div>
        <div className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'} font-medium`}>
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>System Live</span>
        </div>
      </div>

      {/* Quick Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 ${theme === 'dark' ? 'shadow-blue-900/20' : 'shadow-blue-100'}`}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <div className="bg-white/20 p-3 rounded-xl inline-block mb-4">
              <Bus className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Transport Portal</h3>
            <p className="text-blue-100 mb-6 max-w-[240px]">Manage university bus routes, schedules, and student transport registrations.</p>
            <span className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold inline-flex items-center space-x-2 hover:bg-blue-50 transition-colors">
              <span>Manage Transport</span>
              <Bus className="h-4 w-4" />
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer bg-gradient-to-br from-emerald-600 to-emerald-700 ${theme === 'dark' ? 'shadow-emerald-900/20' : 'shadow-emerald-100'}`}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <div className="bg-white/20 p-3 rounded-xl inline-block mb-4">
              <Home className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Hostel Portal</h3>
            <p className="text-emerald-100 mb-6 max-w-[240px]">Oversee room allocations, mess management, and hostel facility requests.</p>
            <a href="https://krmangalam.edu.in/hostel" target="_blank" className="bg-white text-emerald-600 px-6 py-2 rounded-xl font-bold inline-flex items-center space-x-2 hover:bg-emerald-50 transition-colors">
              <span>Access Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer bg-gradient-to-br from-purple-600 to-purple-700 ${theme === 'dark' ? 'shadow-purple-900/20' : 'shadow-purple-100'}`}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <div className="bg-white/20 p-3 rounded-xl inline-block mb-4">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Payment Portal</h3>
            <p className="text-purple-100 mb-6 max-w-[240px]">Process tuition fees, exam charges, and other university financial transactions.</p>
            <a href="https://payment.collexo.com/user/login/?dest=/kr-mangalam-university-sohna-haryana-43490/applicant/" target="_blank" className="bg-white text-purple-600 px-6 py-2 rounded-xl font-bold inline-flex items-center space-x-2 hover:bg-purple-50 transition-colors">
              <span>Access Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm'} p-6 rounded-2xl border`}>
          <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-blue-700'} text-[10px] font-black uppercase tracking-widest mb-2`}>Total Users</p>
          <h4 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>{users.length}</h4>
          <div className="mt-3 flex items-center text-[10px] text-green-600 font-black uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2"></span>
            <span>Active System</span>
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-sm'} p-6 rounded-2xl border`}>
          <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-emerald-700'} text-[10px] font-black uppercase tracking-widest mb-2`}>Total Enquiries</p>
          <h4 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-emerald-900'}`}>{enquiries.length}</h4>
          <div className="mt-3 flex items-center text-[10px] text-blue-600 font-black uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
            <span>Live Tracking</span>
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-sm'} p-6 rounded-2xl border`}>
          <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-purple-700'} text-[10px] font-black uppercase tracking-widest mb-2`}>Courses</p>
          <h4 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>{courses.length}</h4>
          <div className="mt-3 flex items-center text-[10px] text-purple-600 font-black uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mr-2"></span>
            <span>Available Catalog</span>
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm'} p-6 rounded-2xl border`}>
          <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-red-700'} text-[10px] font-black uppercase tracking-widest mb-2`}>Pending Actions</p>
          <h4 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-red-900'}`}>{enquiries.filter(e => e.status === 'Pending').length}</h4>
          <div className="mt-3 flex items-center text-[10px] text-red-600 font-black uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            <span>Requires Attention</span>
          </div>
        </div>
        {user.role === 'admin' && (
          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-sm'} p-6 rounded-2xl border`}>
            <div className="flex justify-between items-start mb-2">
              <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-orange-700'} text-[10px] font-black uppercase tracking-widest`}>System Health</p>
              <button onClick={onCheckRealtime} disabled={checkingRealtime} className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-orange-50 shadow-sm'}`} title="Check Real-time Sync">
                <RefreshCw className={`h-3 w-3 ${checkingRealtime ? 'animate-spin' : ''} ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Database className={`h-5 w-5 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
              <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-orange-900'}`}>Real-time Sync</h4>
            </div>
            {realtimeStatus.length > 0 ? (
              <div className="mt-4 space-y-2">
                {realtimeStatus.map(status => (
                  <div key={status.table_name} className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">{status.table_name}</span>
                    {status.enabled ? (
                      <span className="flex items-center text-[9px] font-black text-green-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                        Enabled
                      </span>
                    ) : (
                      <span className="flex items-center text-[9px] font-black text-red-600 uppercase tracking-widest">
                        <AlertCircle className="h-2.5 w-2.5 mr-1" />
                        Disabled
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : showRpcSql ? (
              <div className="mt-3 flex items-center text-[10px] text-orange-600 font-black uppercase tracking-wider">
                <span className="h-1.5 w-1.5 bg-orange-500 rounded-full mr-2"></span>
                <span>Click refresh to check status</span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Recent Activity Chart */}
      <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} p-8 rounded-2xl border`}>
        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-6`}>Enquiry Trends</h3>
        <div className="w-full" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enquiries.slice(0, 10).reverse()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#F1F5F9'} />
              <XAxis dataKey="createdAt" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: theme === 'dark' ? '0 20px 25px -5px rgb(0 0 0 / 0.3)' : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                  padding: '12px'
                }}
                itemStyle={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="status" stroke="#D32F2F" strokeWidth={3} dot={{ r: 4, fill: '#D32F2F', strokeWidth: 2, stroke: theme === 'dark' ? '#0A1133' : '#ffffff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
