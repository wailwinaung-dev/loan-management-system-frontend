// src/slices/borrowerSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BorrowerState } from '../../types/BorrowerType';
import { fetchBorrowers, addBorrower, updateBorrower, deleteBorrower } from './borrowerThunk';
import { ErrorResponse } from '../../types/ErrorResponseType';

const initialState: BorrowerState = {
  borrowers: [],
  loading: false,
  error: undefined,
  successMessage: '', // <-- New success message field
  validationErrors: {}
};

const borrowerSlice = createSlice({
  name: 'borrower',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = undefined;
      state.successMessage = '';  // <-- Clear both success and error
    },
    clearValidationMessages: (state) => {
      state.validationErrors = {}
    }
  },
  extraReducers: (builder) => {
    // Fetch all borrowers
    builder.addCase(fetchBorrowers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBorrowers.fulfilled, (state, action) => {
      state.borrowers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBorrowers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add borrower
    builder.addCase(addBorrower.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBorrower.fulfilled, (state, action) => {
      state.borrowers.push(action.payload);
      state.loading = false;
      state.successMessage = 'Borrower added successfully!';  // <-- Success message
    });
    builder.addCase(addBorrower.rejected, (state, action) => {
      state.loading = false;
      if (action.payload && typeof action.payload === 'object') {
        // Assuming the payload is an object with errors and/or message properties
        if ('errors' in action.payload) {
          const payload = action.payload as ErrorResponse;
          // Capture the validation errors
          state.validationErrors = payload.errors
        }
      } else {
        // Handle unexpected error format
        state.error = action.error.message || 'An unexpected error occurred';
      }
    });

    // Update borrower
    builder.addCase(updateBorrower.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBorrower.fulfilled, (state, action) => {
      const index = state.borrowers.findIndex((b) => b._id === action.payload._id);
      if (index !== -1) {
        state.borrowers[index] = action.payload;
      }
      state.loading = false;
      state.successMessage = 'Borrower updated successfully!';  // <-- Success message
    });
    builder.addCase(updateBorrower.rejected, (state, action) => {
      state.loading = false;
      if (action.payload && typeof action.payload === 'object') {
        // Assuming the payload is an object with errors and/or message properties
        if ('errors' in action.payload) {
          const payload = action.payload as ErrorResponse;
          // Capture the validation errors
          state.validationErrors = payload.errors
        }
      } else {
        // Handle unexpected error format
        state.error = action.error.message || 'An unexpected error occurred';
      }
    });

    // Delete borrower
    builder.addCase(deleteBorrower.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBorrower.fulfilled, (state, action) => {
      state.borrowers = state.borrowers.filter((borrower) => borrower._id !== action.payload);
      state.loading = false;
      state.successMessage = 'Borrower deleted successfully!';  // <-- Success message
    });
    builder.addCase(deleteBorrower.rejected, (state, action) => {
      state.loading = false;
      if (action.payload && typeof action.payload === 'object') {
        console.log('if payload is object')
        if ('error' in action.payload) {
          console.log('if error in payload')
          const payload = action.payload as {error: string};
          console.log(payload)
          state.error = payload.error
        }
      } else {
        // Handle unexpected error format
        state.error = action.error.message || 'An unexpected error occurred';
      }
    });
  },
});

export const { clearMessages, clearValidationMessages } = borrowerSlice.actions;  // <-- Export clearMessages action
export default borrowerSlice.reducer;
