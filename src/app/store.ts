// store.ts
import { configureStore } from '@reduxjs/toolkit';
import borrowerReducer from '../features/borrower/borrowerSlice';  // example slice

export const store = configureStore({
  reducer: {
    borrower: borrowerReducer,  // add your slices here
  }
});

// For TypeScript, export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
