import React from 'react';
import './Cart.css'

import CartItem from './CartItem';
import { useGlobalContext } from './context';

const CartContainer = () => {
  const { cart, total, clearCart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>Products In Cart</h2>
          <h4 className='empty-cart'>Your cart is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <header>
        <h2>Products In Cart</h2>
      </header>
      <div>
        {cart.map((item) => (
          <CartItem id={item.id} title={item.title} price={item.price} amount={item.amount} img={item.img}  />
        ))}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            Total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={clearCart}>
          Clear Cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
