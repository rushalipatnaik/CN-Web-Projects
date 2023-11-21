import React, { useState } from 'react';
import { auth, db } from '../Config/Config';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Signup.css'; // Import your CSS file for styling

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useNavigate();

    const signup = async (e) => {
        e.preventDefault();

        // Basic validation checks
        if (!name || !email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        }

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);

            const userRef = doc(db, 'SignedUpUsersData', cred.user.uid);
            await setDoc(userRef, {
                Name: name,
                Email: email,
                // Storing passwords in the database is a security risk. Consider hashing or storing only the uid.
                Password: password,
            });

            toast.success('Signup successful. Redirecting to login...');
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            history('/login');
        } catch (err) {
            // Check for specific errors here
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use.');
            } else {
                toast.error('Signup failed.');
            }
            setError(err.message);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>
                    SUBMIT
                </button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>
                Already have an account? Login
                <Link to="/login"> Here</Link>
            </span>
        </div>
    );
};
