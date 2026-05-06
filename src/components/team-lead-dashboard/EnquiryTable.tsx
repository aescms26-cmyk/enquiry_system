import React from 'react';
import { Download } from 'lucide-react';
import { downloadCSV } from '../../utils/csvExport';
import { Enquiry } from '../../types';
import './EnquiryTable.css';

interface EnquiryTableProps {
  teamEnquiries: Enquiry[];
  counsellors: any[];
  userId: string;
  theme: string;
}

export const EnquiryTable: React.FC<EnquiryTableProps> = ({ 
  teamEnquiries, 
  counsellors, 
  userId, 
  theme 
}) => (
  <>
    <div className="flex justify-between items-center mb-8">
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Team Enquiries
      </h2>
      <button
        onClick={() => downloadCSV(teamEnquiries, 'team_enquiries')}
        className={`csv-btn flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all ${theme === 'dark' ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm'}`}
        aria-label="Download team enquiries as CSV"
      >
        <Download className="h-4 w-4" />
        <span>Download CSV</span>
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full enquiry-table">
        <thead>
          <tr className={`text-left border-b ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50/50'}`}>
            <th className="table-header px-4 py-4 font-bold text-[10px] tracking-widest uppercase">Token</th>
            <th className="table-header px-4 py-4 font-bold text-[10px] tracking-widest uppercase">Student</th>
            <th className="table-header px-4 py-4 font-bold text-[10px] tracking-widest uppercase">Counsellor</th>
            <th className="table-header px-4 py-4 font-bold text-[10px] tracking-widest uppercase">Status</th>
            <th className="table-header px-4 py-4 font-bold text-[10px] tracking-widest uppercase">Date</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-50'}`}>
          {teamEnquiries.map((e) => (
            <tr key={e.id} className={`table-row hover:${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50/80'} transition-colors`}>
              <td className="px-4 py-4 font-mono font-bold text-blue-600 text-sm">{e.tokenId}</td>
              <td className={`px-4 py-4 font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>{e.studentName}</td>
              <td className={`px-4 py-4 text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                {e.counsellorId === userId ? 'Me (TL)' : (counsellors.find((c: any) => c.id === e.counsellorId)?.name || 'Unknown')}
              </td>
              <td className="px-4 py-4">
                <span className={`status-badge px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  e.status === 'Completed' 
                    ? theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                    : e.status === 'In Progress' 
                      ? theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                      : theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                }`}>
                  {e.status}
                </span>
              </td>
              <td className="px-4 py-4 text-xs font-bold text-gray-400">
                {new Date(e.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

