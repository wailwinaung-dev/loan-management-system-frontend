// store.ts
import { configureStore } from '@reduxjs/toolkit';
import borrowerReducer from '../features/borrower/borrowerSlice';  // example slice
import loanReducer from '../features/loan/loanSlice'

export const store = configureStore({
  reducer: {
    borrower: borrowerReducer,  // add your slices here
    loan: loanReducer
  }
});

// For TypeScript, export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
