import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Config/Config';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Global/CartContext';

import './Navbar.css';

export const Navbar = () => {
    const history = useNavigate();
    const { totalQty } = useContext(CartContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history('/login');
        });
    };

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src="logobg.png" alt="" />
            </div>
            {!user ? (
                <div className='rightside'>
                    <span>
                        <Link to='signup' className='navlink'>
                            SIGN UP
                        </Link>
                    </span>
                    <span>
                        <Link to='login' className='navlink'>
                            LOGIN
                        </Link>
                    </span>
                </div>
            ) : (
                <div className='rightside'>
                    <span>
                        <Link to='/' className='navlink'>
                            {user.displayName || user.email}
                        </Link>
                    </span>
                    <span>
                        <Link to='/cartproducts' className='navlink cart-icon'>
                            <Icon icon={cart} />
                        </Link>
                    </span>
                    <span className='no-of-products'>{totalQty}</span>
                    <span>
                        <button className='logout-btn' onClick={handleLogout}>
                            Logout
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};
