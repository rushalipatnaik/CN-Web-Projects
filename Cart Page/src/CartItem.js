import React from 'react';
import './CartItem.css'
import { useGlobalContext } from './context';

// Reusable button component with an SVG icon
const ButtonWithIcon = ({ onClick, iconPath }) => (
  <button className='amount-btn' onClick={onClick}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
      <path d={iconPath} />
    </svg>
  </button>
);

const CartItem = ({ id, img, title, price, amount }) => {
  const { remove, increase, decrease, toggleAmount } = useGlobalContext();

  const increaseAmount = () => toggleAmount(id, 'inc');
  const decreaseAmount = () => toggleAmount(id, 'dec');

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>Rs. {price}</h4>
        <button className='remove-btn' onClick={() => remove(id)}>
          remove
        </button>
      </div>
      <div>
        <ButtonWithIcon onClick={increaseAmount} iconPath='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
        <p className='amount'>{amount}</p>
        <ButtonWithIcon onClick={decreaseAmount} iconPath='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
      </div>
    </article>
  );
};

export default CartItem;
