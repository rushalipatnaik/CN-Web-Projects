import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config_db/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/loadingSlice';  // Import loading action

const Resume = () => {
  const [resumeData, setResumeData] = useState({});
  
  const loadingStatus = useSelector(state => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const folioData = JSON.parse(localStorage.getItem('folio'));

    if (folioData && folioData.uid) {
      const fetchResumeData = async () => {
        try {
          dispatch(setLoading(true)); // Using Redux action to set loading

          const resumeDocRef = doc(db, 'resumes', folioData.uid); 
          const userDocRef = doc(db, 'users', folioData.uid);
          
          const [resumeDocSnap, userDocSnap] = await Promise.all([
            getDoc(resumeDocRef),
            getDoc(userDocRef)
          ]);

          // Merge data from both documents
          const mergedData = {
            ...resumeDocSnap.data(),
            name: userDocSnap.data()?.displayName || '',
            dob: userDocSnap.data()?.dob || '',
            gender: userDocSnap.data()?.gender || '',
            email: userDocSnap.data()?.email || ''
          };

          dispatch(setLoading(false)); // Using Redux action to stop loading
          setResumeData(mergedData);
        } catch (error) {
          console.error('Error fetching documents:', error);
          dispatch(setLoading(false)); // Ensure loading is stopped even in case of an error
        }
      };

      fetchResumeData();
    }
  }, [dispatch]); // Added dispatch to the dependency array

  return (
    <div className="profile-container">
      <img src={resumeData.profilePicURL || 'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'} alt="Profile Picture" className="profile-pic"/>
      
      <div className="info-container">
        {/* Map over the resumeData object to dynamically display info */}
        {Object.entries(resumeData).map(([key, value]) => (
          <div key={key}>
            <h1>{capitalizeFirstLetter(key)}:</h1>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Resume;
