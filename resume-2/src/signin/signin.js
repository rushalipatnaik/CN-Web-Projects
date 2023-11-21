import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../config_db/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../redux/authSlice';
import { setLoading } from '../redux/loadingSlice';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const loading = useSelector(state => state.loading.loading);
  const authStatus = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const folioData = JSON.parse(localStorage.getItem('folio')) || {};
    dispatch(authenticate(!!folioData.uid));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const storeUserIdInLocalStorage = (uid) => {
    const folioData = JSON.parse(localStorage.getItem('folio')) || {};
    folioData.uid = uid;
    localStorage.setItem('folio', JSON.stringify(folioData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      storeUserIdInLocalStorage(user.uid);
      dispatch(setLoading(false));
      toast.success('Signed in successfully');
      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid email or password');
      } else {
        toast.error('Error signing in');
      }
    }
    checkAuthentication();
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2 className='Signintext'>Sign In</h2>
        <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
