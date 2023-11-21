import React, { createContext, useEffect, useReducer } from 'react';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 });

  useEffect(() => {
  }, []); // Empty dependency array means this useEffect will run once on mount

  return (
      <CartContext.Provider value={{ ...cart, dispatch }}>
        {props.children}
      </CartContext.Provider>
  );
};
