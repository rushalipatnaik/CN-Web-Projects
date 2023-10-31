const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case 'INCREASE':
    case 'DECREASE':
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload) {
            const updatedAmount =
              action.type === 'INCREASE'
                ? cartItem.amount + 1
                : cartItem.amount - 1;

            return { ...cartItem, amount: updatedAmount };
          }
          return cartItem;
        }),
      };

    case 'GET_TOTALS':
      const { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      const formattedTotal = parseFloat(total.toFixed(2));

      return { ...state, total: formattedTotal, amount };

    case 'LOADING':
      return { ...state, loading: true };

    case 'DISPLAY_ITEMS':
      return { ...state, cart: action.payload, loading: false };

    case 'TOGGLE_AMOUNT':
      return {
        ...state,
        cart: state.cart
          .map((cartItem) => {
            if (cartItem.id === action.payload.id) {
              const updatedAmount =
                action.payload.type === 'inc'
                  ? cartItem.amount + 1
                  : cartItem.amount - 1;

              return { ...cartItem, amount: updatedAmount };
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.amount !== 0),
      };

    default:
      throw new Error('No matching action type');
  }
};

export default reducer;
