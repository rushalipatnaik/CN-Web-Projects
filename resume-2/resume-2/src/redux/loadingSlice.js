import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Using immer.js to directly mutate the state in a readable way
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Destructuring the actions for better readability
export const { setLoading } = loadingSlice.actions;

// Exporting the reducer
export default loadingSlice.reducer;
