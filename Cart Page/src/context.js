import React, { useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const actionType = {
  CLEAR_CART: 'CLEAR_CART',
  REMOVE: 'REMOVE',
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  LOADING: 'LOADING',
  DISPLAY_ITEMS: 'DISPLAY_ITEMS',
  TOGGLE_AMOUNT: 'TOGGLE_AMOUNT',
  GET_TOTALS: 'GET_TOTALS',
};

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchAction = (type, payload) => {
    dispatch({ type, payload });
  };

  const clearCart = () => {
    dispatchAction(actionType.CLEAR_CART);
  };

  const remove = (id) => {
    dispatchAction(actionType.REMOVE, id);
  };

  const increase = (id) => {
    dispatchAction(actionType.INCREASE, id);
  };

  const decrease = (id) => {
    dispatchAction(actionType.DECREASE, id);
  };

  const fetchData = async () => {
    dispatchAction(actionType.LOADING);
    const response = await fetch(url);
    const cart = await response.json();
    dispatchAction(actionType.DISPLAY_ITEMS, cart);
  };

  const toggleAmount = (id, type) => {
    dispatchAction(actionType.TOGGLE_AMOUNT, { id, type });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatchAction(actionType.GET_TOTALS);
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
