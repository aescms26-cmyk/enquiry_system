import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { User, Enquiry, TimeLog, EnquiryStatus } from '../types';

interface CounsellorStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export function useCounsellorData(user: User) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [activeLog, setActiveLog] = useState<TimeLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState(0);
  const [onBreak, setOnBreak] = useState(user.onBreak || false);
  const [breakTimer, setBreakTimer] = useState(0);
  const [breakDuration, setBreakDuration] = useState(user.breakDurationMins || 30);
  const [isUpdatingDuration, setIsUpdatingDuration] = useState(false);

  const stats: CounsellorStats = {
    total: enquiries.length,
    pending: enquiries.filter((e: Enquiry) => e.status === 'Pending').length,
    inProgress: enquiries.filter((e: Enquiry) => e.status === 'In Progress').length,
    completed: enquiries.filter((e: Enquiry) => e.status === 'Completed').length,
  };

  /* ------------------ Fetch enquiries ------------------ */
  const fetchEnquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('counsellor_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching enquiries:', error);
    } else if (data) {
      setEnquiries(
        data.map(
          (e: any) =>
            ({
              id: e.id,
              tokenId: e.token_id,
              studentName: e.student_name,
              fatherName: e.father_name || '',
              lastInstitution: e.last_institution || '',
              address: e.address || '',
              state: e.state || '',
              pincode: e.pincode || '',
              studentEmail: e.student_email,
              studentPhone: e.student_phone,
              course: e.course,
              category: e.category || '',
              marks12th: e.marks_12th,
              marksGrad: e.marks_grad,
              city: e.city || '',
              message: e.message || '',
              status: e.status,
              createdAt: e.created_at,
              counsellorId: e.counsellor_id,
              teamLeadId: e.team_lead_id,
              lastUpdated: e.last_updated,
              notes: e.notes,
            } as Enquiry)
        )
      );
    }
    setLoading(false);
  }, [user.id]);

  /* ------------------ Fetch user break status ------------------ */
  const fetchUserStatus = useCallback(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('on_break, break_start_time, break_duration_mins')
      .eq('id', user.id)
      .single();

    if (data) {
      setOnBreak(data.on_break);
      setBreakDuration(data.break_duration_mins || 30);
      if (data.on_break && data.break_start_time) {
        const start = new Date(data.break_start_time).getTime();
        const now = Date.now();
        const durationMs = (data.break_duration_mins || 30) * 60 * 1000;
        const elapsed = now - start;
        const remaining = Math.max(0, Math.floor((durationMs - elapsed) / 1000));
        setBreakTimer(remaining);
      }
    }
    if (error) console.error('Error fetching user status:', error);
  }, [user.id]);

  /* ------------------ Initial fetch + subscriptions ------------------ */
  useEffect(() => {
    fetchEnquiries();
    fetchUserStatus();

    const enquiriesChannel = supabase
      .channel('enquiries_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enquiries',
          filter: `counsellor_id=eq.${user.id}`,
        },
        (payload) => {
          fetchEnquiries();
          // New enquiry notification
          if (payload.eventType === 'INSERT') {
            const newEnquiry = payload.new;
            toast('New Enquiry #' + newEnquiry.token_id + ' - ' + newEnquiry.student_name, {
              description: newEnquiry.course,
              duration: 5000,
              icon: true
            });
          }
        }
      )
      .subscribe();

    const userChannel = supabase
      .channel('user_status_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          const data = payload.new as any;
          setOnBreak(data.on_break);
          setBreakDuration(data.break_duration_mins || 30);
          if (data.on_break && data.break_start_time) {
            const start = new Date(data.break_start_time).getTime();
            const now = Date.now();
            const durationMs = (data.break_duration_mins || 30) * 60 * 1000;
            const elapsed = now - start;
            const remaining = Math.max(0, Math.floor((durationMs - elapsed) / 1000));
            setBreakTimer(remaining);
          } else {
            setBreakTimer(0);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(enquiriesChannel);
      supabase.removeChannel(userChannel);
    };
  }, [user.id, fetchEnquiries, fetchUserStatus]);

  /* ------------------ Session timer ------------------ */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeLog) {
      interval = setInterval(() => {
        const start = new Date(activeLog.startTime).getTime();
        setTimer(Math.floor((Date.now() - start) / 1000));
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeLog]);

  /* ------------------ Break timer ------------------ */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (onBreak && breakTimer > 0) {
      interval = setInterval(() => {
        setBreakTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [onBreak, breakTimer]);

  /* ------------------ Actions ------------------ */
  const startSession = async (enquiry: Enquiry) => {
    try {
      const startTime = new Date().toISOString();
      const { data, error } = await supabase
        .from('time_logs')
        .insert([
          {
            enquiry_id: enquiry.id,
            counsellor_id: user.id,
            start_time: startTime,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setActiveLog({
        id: data.id,
        enquiryId: data.enquiry_id,
        counsellorId: data.counsellor_id,
        startTime: data.start_time,
      } as TimeLog);
      setActiveEnquiry(enquiry);
      setNotes(enquiry.notes || '');

      if (enquiry.status === 'Pending') {
        setEnquiries((prev: Enquiry[]) =>
          prev.map((e: Enquiry) => (e.id === enquiry.id ? { ...e, status: 'In Progress' as EnquiryStatus } : e))
        );
        if (activeEnquiry?.id === enquiry.id) {
          setActiveEnquiry((prev: Enquiry | null) => (prev ? { ...prev, status: 'In Progress' as EnquiryStatus } : null));
        }
        await supabase
          .from('enquiries')
          .update({ status: 'In Progress', last_updated: new Date().toISOString() })
          .eq('id', enquiry.id);
      }
    } catch (err: any) {
      console.error('Error starting timer:', err);
    }
  };

  const stopSession = async () => {
    if (!activeLog || !activeEnquiry) return;

    try {
      const endTime = new Date().toISOString();
      const startTime = new Date(activeLog.startTime).getTime();
      const totalTime = new Date(endTime).getTime() - startTime;

      await supabase
        .from('time_logs')
        .update({ end_time: endTime, total_time: totalTime })
        .eq('id', activeLog.id);

      await supabase
        .from('enquiries')
        .update({ notes, last_updated: new Date().toISOString() })
        .eq('id', activeEnquiry.id);

      setActiveLog(null);
      setActiveEnquiry(null);
      setNotes('');
    } catch (err: any) {
      console.error('Error stopping timer:', err);
    }
  };

  const updateStatus = async (enquiryId: string, status: EnquiryStatus) => {
    try {
      setEnquiries((prev: Enquiry[]) => prev.map((e: Enquiry) => (e.id === enquiryId ? { ...e, status } : e)));
      if (activeEnquiry?.id === enquiryId) {
        setActiveEnquiry((prev: Enquiry | null) => (prev ? { ...prev, status } : null));
      }

      const { error } = await supabase
        .from('enquiries')
        .update({ status, last_updated: new Date().toISOString() })
        .eq('id', enquiryId);

      if (error) throw error;
    } catch (err: any) {
      console.error('Error updating status:', err);
    }
  };

  const toggleBreak = async () => {
    if (activeLog) {
      alert('Please stop your current session before taking a break.');
      return;
    }

    try {
      const newBreakStatus = !onBreak;
      const startTime = newBreakStatus ? new Date().toISOString() : null;

      const response = await fetch('/api/users/toggle-break', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          onBreak: newBreakStatus,
          startTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error: any = new Error(errorData.error || 'Failed to update break status');
        if (errorData.sql) error.sql = errorData.sql;
        throw error;
      }

      setOnBreak(newBreakStatus);
      setBreakTimer(newBreakStatus ? breakDuration * 60 : 0);

      const storedUser = localStorage.getItem('crm_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.onBreak = newBreakStatus;
        localStorage.setItem('crm_user', JSON.stringify(parsedUser));
      }
    } catch (err: any) {
      console.error('Error toggling break:', err);
      const errorMessage = typeof err === 'object' ? err.message || JSON.stringify(err) : String(err);
      const sqlMessage = err.sql ? `\n\nSQL to run:\n${err.sql}` : '';
      alert(`Failed to update break status: ${errorMessage}${sqlMessage}`);
    }
  };

  const updateBreakDuration = async (newDuration: number) => {
    if (newDuration < 5 || newDuration > 120) return;

    setIsUpdatingDuration(true);
    try {
      const response = await fetch('/api/users/update-break-duration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, duration: newDuration }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error: any = new Error(errorData.error || 'Failed to update break duration');
        if (errorData.sql) error.sql = errorData.sql;
        throw error;
      }

      setBreakDuration(newDuration);
    } catch (err: any) {
      console.error('Error updating break duration:', err);
      const errorMessage = typeof err === 'object' ? err.message || JSON.stringify(err) : String(err);
      const sqlMessage = err.sql ? `\n\nSQL to run:\n${err.sql}` : '';
      alert(`Failed to update break duration: ${errorMessage}${sqlMessage}`);
    } finally {
      setIsUpdatingDuration(false);
    }
  };

  const selectEnquiry = (enquiry: Enquiry) => {
    if (!activeLog) {
      setActiveEnquiry(enquiry);
      setNotes(enquiry.notes || '');
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
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
    setActiveEnquiry,
    startSession,
    stopSession,
    updateStatus,
    toggleBreak,
    updateBreakDuration,
    selectEnquiry,
    formatTime,
  };
}

