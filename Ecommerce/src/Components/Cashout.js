import './Cashout.css'

import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../Config/Config';
import { CartContext } from '../Global/CartContext';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const Cashout = (props) => {
    const history = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                const userRef = doc(db, 'SignedUpUsersData', user.uid);
                onSnapshot(userRef, snapshot => {
                    if (snapshot.exists()) {
                        const userData = snapshot.data();
                        setName(userData?.Name || '');
                        setEmail(userData?.Email || '');
                    }
                });
            } else {
                history('/login');
            }
        });

        // Cleanup
        return () => unsub();
    }, [history]);

    const cashoutSubmit = (e) => {
        e.preventDefault();
        onAuthStateChanged(auth, user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                const buyerInfoRef = doc(db, 'Buyer-info ' + user.uid, '_' + time);
                setDoc(buyerInfoRef, {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                }).then(() => {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been placed successfully');
                    setTimeout(() => {
                        history('/')
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    }

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    );
}
