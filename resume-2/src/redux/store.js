import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loadingReducer from './loadingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

// Expose the store to the window for debugging in development mode
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
