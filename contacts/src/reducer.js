const initialState = [
    { id: 0, name: "Coding Ninja", email: "codingninjas@codingninjas.com", phone: "98725161833" },
  ];
  
  export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        return [...state, action.payload];
      case "DELETE_CONTACT":
        return state.filter((contact) => contact.id !== action.payload);
      case "UPDATE_CONTACT":
        return state.map((contact) =>
          contact.id === action.payload.id ? { ...contact, ...action.payload } : contact
        );
      case "RESET_CONTACT":
        return [{ name: null, email: null, phone: null }];
      default:
        return state;
    }
  };
  