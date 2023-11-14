import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config_db/firebase';
import { LoadingContext } from '../contexts/loadingContext';

const Resume = () => {
  const [resumeData, setResumeData] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchResumeData = async () => {
      setLoading(true);

      const folioData = JSON.parse(localStorage.getItem('folio'));
      if (folioData && folioData.uid) {
        const resumeDocRef = doc(db, 'resumes', folioData.uid);
        const userDocRef = doc(db, 'users', folioData.uid);

        try {
          const [resumeDocSnap, userDocSnap] = await Promise.all([getDoc(resumeDocRef), getDoc(userDocRef)]);

          // Merge data from both documents
          const mergedData = {
            ...resumeDocSnap.data(),
            name: userDocSnap.data()?.displayName || '',
            dob: userDocSnap.data()?.dob || '',
            gender: userDocSnap.data()?.gender || '',
            email: userDocSnap.data()?.email || '',
          };

          setResumeData(mergedData);
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      }

      setLoading(false);
    };

    fetchResumeData();
  }, [setLoading]);

  return (
    <div className="profile-container">
      <img
        src={resumeData.profilePicURL || 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'}
        alt="Profile Picture"
        className="profile-pic"
      />

      <div className="info-container">
        <InfoItem label="Name" value={resumeData.name} />
        <InfoItem label="Email" value={resumeData.email} />
        <InfoItem label="Date of Birth" value={resumeData.dob} />
        <InfoItem label="Gender" value={resumeData.gender} />
        <InfoItem label="Objective" value={resumeData.objective} />
        <InfoItem label="Experience" value={resumeData.experience} />
        <InfoItem label="Education" value={resumeData.education} />
        <InfoItem label="Skills" value={resumeData.skills} />
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <h1>{label}:</h1>
    <p>{value}</p>
  </div>
);

export default Resume;
