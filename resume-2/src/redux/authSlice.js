import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Using immer.js to directly mutate the state in a readable way
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Destructuring the actions for better readability
export const { authenticate } = authSlice.actions;

// Exporting the reducer
export default authSlice.reducer;
