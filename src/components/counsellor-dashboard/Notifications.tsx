import { toast, Toaster } from 'sonner';
import { Bell, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface NewEnquiryToastProps {
  enquiry: any;
}

const NewEnquiryToast = ({ enquiry }: NewEnquiryToastProps) => (
  <div className="flex items-center gap-3 p-4">
    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
      <Bell className="h-6 w-6 text-blue-400" />
    </div>
    <div>
      <h4 className="font-bold text-lg">New Enquiry #{enquiry.tokenId}</h4>
      <p className="text-sm opacity-90">{enquiry.studentName} - {enquiry.course}</p>
    </div>
  </div>
);

export const Notifications = () => {
  // This will be used in dashboard for realtime new enquiry toast
  return <Toaster richColors position="top-right" />;
};

export default Notifications;

export { NewEnquiryToast };

