import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../config_db/firebase';
import { LoadingContext } from '../contexts/loadingContext';
import { AuthContext } from '../contexts/authContext';

const Details = () => {
  const [resumeData, setResumeData] = useState({
    objective: '',
    experience: '',
    education: '',
    skills: '',
  });

  const { loading, setLoading } = useContext(LoadingContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState('');

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    const folioData = JSON.parse(localStorage.getItem('folio'));

    if (folioData?.uid) {
      const resumeDocRef = doc(db, 'resumes', folioData.uid);
      const docSnap = await getDoc(resumeDocRef);

      if (docSnap.exists()) {
        setResumeData(docSnap.data());
      } else {
        console.log('No resume data found for user');
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const uploadProfilePicture = async (uid) => {
    const storageRef = ref(storage, `profilePics/${uid}`);
    await uploadBytes(storageRef, profilePic);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResumeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const folioData = JSON.parse(localStorage.getItem('folio'));

    // Field validations
    if (!Object.values(resumeData).every(Boolean)) {
      toast.error('All fields are required!');
      return;
    }

    if (resumeData.objective.split(' ').length < 100) {
      toast.error('Objective should be at least 100 words');
      return;
    }

    // Check if user attempted to modify read-only fields
    const readOnlyFields = ['name', 'email', 'dob', 'gender'];
    if (readOnlyFields.some((field) => resumeData[field] !== folioData[field])) {
      toast.error('You cannot modify name, email, date of birth, or gender.');
      return;
    }

    if (folioData?.uid) {
      try {
        setLoading(true);

        if (profilePic) {
          const url = await uploadProfilePicture(folioData.uid);
          setProfilePicURL(url);
          resumeData.profilePicURL = url;
        }

        const resumeDocRef = doc(db, 'resumes', folioData.uid);
        await setDoc(resumeDocRef, resumeData, { merge: true });

        setLoading(false);
        toast.success('Resume updated successfully');
      } catch (error) {
        toast.error('Error updating resume');
      }
    } else {
      toast.error('You need to be authenticated to update resume');
    }

    fetchResumeData();
  };

  return (
    <>
      <div className="profile-pic-container-upload">
        <label>
          <img
            src={profilePicURL || 'https://w1.pngwing.com/pngs/132/484/png-transparent-circle-silhouette-avatar-user-upload-pixel-art-user-profile-document-black.png'}
            alt="Upload Profile"
            className="round-pic"
          />
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="resume-input-form">
          <div className="row">
            <label>
              Objective:
              <textarea name="objective" placeholder="Objective" value={resumeData.objective} onChange={handleChange}></textarea>
            </label>
            <label>
              Experience:
              <textarea name="experience" placeholder="Experience" value={resumeData.experience} onChange={handleChange}></textarea>
            </label>
          </div>
          <div className="row">
            <label>
              Education:
              <textarea name="education" placeholder="Education" value={resumeData.education} onChange={handleChange}></textarea>
            </label>
            <label>
              Skills:
              <textarea type="text" name="skills" placeholder="Skills (comma separated)" value={resumeData.skills} onChange={handleChange}></textarea>
            </label>
          </div>
          <div className="submit-row">
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Details;
