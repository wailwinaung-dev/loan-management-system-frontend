// src/slices/borrowerSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { FetchLoanByIdPayload, LoanState } from '../../types/LoanType';
import { fetchLoans, addLoan, deleteLoan, fetchLoanById } from './loanThunk';
import { ErrorResponse } from '../../types/ErrorResponseType';

const initialState: LoanState = {
  loans: [],
  loan: null,
  loading: false,
  error: undefined,
  successMessage: '', // <-- New success message field
  validationErrors: {},
  repaymentSchedule: []
};

const loanSlice = createSlice({
  name: 'loan',
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
    // Fetch all loans
    builder.addCase(fetchLoans.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.loans = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLoans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch loan by id
    builder.addCase(fetchLoanById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoanById.fulfilled, (state, action) => {
      if (action.payload && 'loan' in action.payload && 'repaymentSchedule' in action.payload) {
        const { loan, repaymentSchedule } = action.payload as FetchLoanByIdPayload;
        state.loan = loan;
        state.repaymentSchedule = repaymentSchedule;
      } else {
        // Handle unexpected payload structure
        state.error = 'Unexpected response structure';
      }
      state.loading = false;
    });
    builder.addCase(fetchLoanById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add loan
    builder.addCase(addLoan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addLoan.fulfilled, (state, action) => {
      state.loans.push(action.payload);
      state.loading = false;
      state.successMessage = 'Loan added successfully!';  // <-- Success message
    });
    builder.addCase(addLoan.rejected, (state, action) => {
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

    // Delete loan
    builder.addCase(deleteLoan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLoan.fulfilled, (state, action) => {
      state.loans = state.loans.filter((loan) => loan._id !== action.payload);
      state.loading = false;
      state.successMessage = 'Loan deleted successfully!';  // <-- Success message
    });
    builder.addCase(deleteLoan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearMessages, clearValidationMessages } = loanSlice.actions;  // <-- Export clearMessages action
export default loanSlice.reducer;
