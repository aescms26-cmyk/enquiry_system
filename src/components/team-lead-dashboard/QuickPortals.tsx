import React from 'react';
import { Bus, Home, CreditCard, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import './QuickPortals.css';

interface QuickPortalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  color: string;
  theme: string;
}

const QuickPortal: React.FC<QuickPortalProps> = ({ icon, title, description, url, color, theme }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`portal-card rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer ${color}`}
  >
    <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
    <div className="relative z-10">
      <div className="bg-white/20 p-3 rounded-xl inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-white/90 mb-6 max-w-[240px]">{description}</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`portal-link bg-white px-6 py-2 rounded-xl font-bold inline-flex items-center space-x-2 hover:bg-opacity-90 transition-colors`}
        style={{ color: color === 'portal-blue' ? '#2563eb' : color === 'portal-emerald' ? '#059669' : '#7c3aed' }}
      >
        <span>Access Portal</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  </motion.div>
);

export const QuickPortals: React.FC<{ theme: string }> = ({ theme }) => (
  <div className="mt-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <QuickPortal
        icon={<Bus className="h-8 w-8" />}
        title="Transport Portal"
        description="Manage university bus routes, schedules, and student transport registrations."
        url="https://krmangalam.edu.in/transport"
        color="portal-blue"
        theme={theme}
      />
      <QuickPortal
        icon={<Home className="h-8 w-8" />}
        title="Hostel Portal"
        description="Oversee room allocations, mess management, and hostel facility requests."
        url="https://krmangalam.edu.in/hostel"
        color="portal-emerald"
        theme={theme}
      />
      <QuickPortal
        icon={<CreditCard className="h-8 w-8" />}
        title="Payment Portal"
        description="Access student fee records, online payments, and financial aid information."
        url="https://payment.collexo.com/user/login/?dest=/kr-mangalam-university-sohna-haryana-43490/applicant/"
        color="portal-purple"
        theme={theme}
      />
    </div>
  </div>
);

