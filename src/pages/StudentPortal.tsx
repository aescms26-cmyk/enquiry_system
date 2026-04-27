import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/student-portal/HeroSection';
import StatsCards from '../components/student-portal/StatsCards';
import QuickPortals from '../components/student-portal/QuickPortals';
import EnquiryForm from '../components/student-portal/EnquiryForm';
import TrackAdmission from '../components/student-portal/TrackAdmission';
import ContactCards from '../components/student-portal/ContactCards';
import '../styles/pages/StudentPortal.css';

const StudentPortal: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsCards />
      <QuickPortals />
      <EnquiryForm />
      <TrackAdmission />
      <ContactCards />
    </Layout>
  );
};

export default StudentPortal;

