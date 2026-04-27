import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Enquiry } from '../../types';
import { Send, CheckCircle2, AlertCircle, BookOpen, User, Phone, Mail, MapPin, GraduationCap, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import './EnquiryForm.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Puducherry', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep'
];

const CATEGORIES = ['General', 'SC', 'ST', 'OBC', 'EWS'];

/* Fallback course list used when Supabase courses table is not available */
const FALLBACK_COURSES = [
  { id: 'btech-cse', name: 'B.Tech. Computer Science and Engineering' },
  { id: 'bca', name: 'BCA (AI & Data Science)' },
  { id: 'bba', name: 'BBA (HR/Mktng/Fin/IB/Travel & Tourism)' },
  { id: 'bcom', name: 'B.Com. (Hons.)' },
  { id: 'bsc-phy', name: 'B.Sc. (Hons.) Physics' },
  { id: 'bpharm', name: 'B.Pharm.' },
  { id: 'mba', name: 'MBA with academic support of IBM' },
  { id: 'llb', name: 'BBA LL.B. (Hons.)' },
  { id: 'barch', name: 'Bachelor of Architecture (B.Arch)' },
  { id: 'bed', name: 'Bachelor of Education (B.Ed.)' },
];

const initialFormData = {
  studentName: '', fatherName: '', lastInstitution: '', address: '', state: '',
  pincode: '',
  studentEmail: '',
  studentPhone: '',
  course: '',
  category: '',
  marks12th: '',
  marksGrad: '',
  city: '',
  message: '',
};

let tokenCounter = 0;

const generateTokenId = () => {
  const prefix = 'KRMU';
  const year = new Date().getFullYear();
  const count = tokenCounter % 1001;
  tokenCounter++;
  return `${prefix}-${year}-${count}`;
};
  
const assignCounsellor = async (course: string) => {
  try {
    const { data: counsellors, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'counsellor')
      .eq('on_break', false);

    if (error || !counsellors || counsellors.length === 0) {
      return { counsellorId: null, teamLeadId: null };
    }

    const courseCounsellors = counsellors.filter((c: any) =>
      c.assigned_courses?.includes(course)
    );

    const pool = courseCounsellors.length > 0 ? courseCounsellors : counsellors;

    const { data: counts, error: countError } = await supabase
      .from('enquiries')
      .select('counsellor_id, count')
      .in('counsellor_id', pool.map((c: any) => c.id))
      .eq('status', 'Pending');

    if (countError) {
      const random = pool[Math.floor(Math.random() * pool.length)];
      return { counsellorId: random.id, teamLeadId: random.team_lead_id };
    }

    const countMap: Record<string, number> = {};
    counts?.forEach((row: any) => {
      countMap[row.counsellor_id] = (countMap[row.counsellor_id] || 0) + 1;
    });

    const sorted = [...pool].sort((a: any, b: any) => {
      const countA = countMap[a.id] || 0;
      const countB = countMap[b.id] || 0;
      return countA - countB;
    });

    const selected = sorted[0];
    return { counsellorId: selected.id, teamLeadId: selected.team_lead_id };
  } catch {
    return { counsellorId: null, teamLeadId: null };
  }
};

const EnquiryForm: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { 
    const fetchCourses = async () => {
      setCoursesLoading(true);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('id, name, is_active')
          .order('name');
        if (error) {
          throw error;
        }
        if (data) {
          const activeCourses = data.filter((c: any) => c.is_active !== false);
          setCourses(activeCourses);
        }
      } catch (err: any) {
        console.error('Course fetch error:', err);
        /* If the courses table doesn't exist, use fallback list */
        setCourses(FALLBACK_COURSES);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tokenId = generateTokenId();
      const { counsellorId, teamLeadId } = await assignCounsellor(formData.course);

      const enquiryData = {
        token_id: tokenId,
        student_name: formData.studentName,
        father_name: formData.fatherName,
        last_institution: formData.lastInstitution,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        student_email: formData.studentEmail,
        student_phone: formData.studentPhone,
        course: formData.course,
        category: formData.category,
        marks_12th: formData.marks12th,
        marks_grad: formData.marksGrad,
        city: formData.city,
        message: formData.message,
        counsellor_id: counsellorId,
        team_lead_id: teamLeadId,
        status: 'Pending',
      };

      const { data, error: submitError } = await supabase
        .from('enquiries')
        .insert([enquiryData])
        .select()
        .single();

      if (submitError) throw submitError;

      setSubmittedEnquiry({
        id: data.id,
        tokenId: data.token_id,
        studentName: data.student_name,
        fatherName: data.father_name,
        lastInstitution: data.last_institution,
        address: data.address,
        state: data.state,
        pincode: data.pincode,
        studentEmail: data.student_email,
        studentPhone: data.student_phone,
        course: data.course,
        category: data.category,
        marks12th: data.marks_12th,
        marksGrad: data.marks_grad,
        city: data.city,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        counsellorId: data.counsellor_id,
        teamLeadId: data.team_lead_id,
        lastUpdated: data.last_updated,
      } as Enquiry);

      setFormData(initialFormData);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  const inputBaseClass = `enquiry-input ${isDark ? 'enquiry-input-dark' : 'enquiry-input-light'}`;
  const labelBaseClass = `enquiry-label ${isDark ? 'enquiry-label-dark' : 'enquiry-label-light'}`;
return (
  <div id="enquire-section" className="enquiry-section">
    <div className="enquiry-header">
      <span className="enquiry-overline">Get Started</span>
      <h2 className={`enquiry-title ${isDark ? 'enquiry-title-dark' : 'enquiry-title-light'}`}>
        Enquire Now
      </h2>
      <p className={`enquiry-desc ${isDark ? 'enquiry-desc-dark' : 'enquiry-desc-light'}`}>
        Fill out the form below and our admissions team will reach out to you shortly.
      </p>
    </div>

    <AnimatePresence mode="wait">
      {submittedEnquiry ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`enquiry-success ${isDark ? 'enquiry-success-dark' : 'enquiry-success-light'}`}
        >
          <div className="enquiry-success-icon">
            <CheckCircle2 />
          </div>

          <h3 className={`enquiry-success-title ${isDark ? 'enquiry-success-title-dark' : 'enquiry-success-title-light'}`}>
            Enquiry Submitted!
          </h3>

          <p className={`enquiry-success-text ${isDark ? 'enquiry-success-text-dark' : 'enquiry-success-text-light'}`}>
            Your token ID is <span className="enquiry-success-token">{submittedEnquiry.tokenId}</span>
          </p>

          <p className={`enquiry-success-hint ${isDark ? 'enquiry-success-hint-dark' : 'enquiry-success-hint-light'}`}>
            Please save this token ID to track your admission status.
          </p>

          <button
            onClick={() => setSubmittedEnquiry(null)}
            className="enquiry-success-btn"
          >
            Submit Another Enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className={`enquiry-form ${isDark ? 'enquiry-form-dark' : 'enquiry-form-light'}`}
        >
          {error && (
            <div className={`enquiry-error ${isDark ? 'enquiry-error-dark' : 'enquiry-error-light'}`}>
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="enquiry-form-grid">

            {/* Row 1: Name, Father's Name, Phone */}
            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Full Name *</label>
              <div className="enquiry-input-wrapper">
                <User className="enquiry-input-icon" />
                <input
                  required
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Father's Name *</label>
              <div className="enquiry-input-wrapper">
                <User className="enquiry-input-icon" />
                <input
                  required
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12`}
                  placeholder="Enter father's name"
                />
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Phone Number *</label>
              <div className="enquiry-input-wrapper">
                <Phone className="enquiry-input-icon" />
                <input
                  required
                  type="tel"
                  name="studentPhone"
                  value={formData.studentPhone}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12`}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Row 2: Email, Category, Last Institution */}
            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Email Address *</label>
              <div className="enquiry-input-wrapper">
                <Mail className="enquiry-input-icon" />
                <input
                  required
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Category *</label>
              <div className="enquiry-input-wrapper">
                <GraduationCap className="enquiry-input-icon" />
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12 enquiry-select`}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Last Institution *</label>
              <input
                required
                name="lastInstitution"
                value={formData.lastInstitution}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="School/College name"
              />
            </div>

            {/* Row 3: Interested Course, 12th Marks, Graduation Marks */}
            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Interested Course *</label>
              <div className="enquiry-input-wrapper">
                <BookOpen className="enquiry-input-icon" />
                <select
                  required
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={coursesLoading}
                  className={`${inputBaseClass} pl-12 enquiry-select`}
                >
                  {coursesLoading ? (
                    <option value="">Loading courses...</option>
                  ) : courses.length === 0 ? (
                    <option value="">No courses available</option>
                  ) : (
                    <>
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>12th Marks (%) *</label>
              <input
                required
                type="number"
                name="marks12th"
                value={formData.marks12th}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. 85"
              />
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Graduation Marks (%)</label>
              <input
                type="number"
                name="marksGrad"
                value={formData.marksGrad}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. 75"
              />
            </div>

            {/* Row 4: State, City, Pincode */}
            <div className="enquiry-form-group">
              <label className={labelBaseClass}>State *</label>
              <select
                required
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`${inputBaseClass} enquiry-select`}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>City *</label>
              <div className="enquiry-input-wrapper">
                <MapPin className="enquiry-input-icon" />
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`${inputBaseClass} pl-12`}
                  placeholder="Your city"
                />
              </div>
            </div>

            <div className="enquiry-form-group">
              <label className={labelBaseClass}>Pincode *</label>
              <input
                required
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={inputBaseClass}
                placeholder="e.g. 122102"
              />
            </div>

            {/* Row 5: Address (full width) */}
            <div className="enquiry-form-group enquiry-form-group-full">
              <label className={labelBaseClass}>Full Address</label>
              <div className="enquiry-input-wrapper">
                <MapPin className="enquiry-input-icon enquiry-input-icon-textarea" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputBaseClass} pl-12 enquiry-textarea`}
                  placeholder="Enter your complete address"
                />
              </div>
            </div>

            {/* Row 6: Message (full width) */}
            <div className="enquiry-form-group enquiry-form-group-full">
              <label className={labelBaseClass}>Message</label>
              <div className="enquiry-input-wrapper">
                <MessageSquare className="enquiry-input-icon enquiry-input-icon-textarea" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputBaseClass} pl-12 enquiry-textarea`}
                  placeholder="Any specific questions or requirements..."
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="enquiry-submit"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 enquiry-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Submit Enquiry</span>
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  </div>
);
};

export default EnquiryForm;
