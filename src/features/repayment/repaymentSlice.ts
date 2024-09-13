// src/slices/borrowerSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RepaymentState } from '../../types/RepaymentType';
import { fetchRepayments, addRepayment, deleteRepayment } from './repaymentThunk';

const initialState: RepaymentState = {
    repayments: [],
    loading: false,
    error: undefined,
    successMessage: '', // <-- New success message field
};

const repaymentSlice = createSlice({
    name: 'repayment',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = undefined;
            state.successMessage = '';  // <-- Clear both success and error
        },
    },
    extraReducers: (builder) => {
        // Fetch all repayments
        builder.addCase(fetchRepayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRepayments.fulfilled, (state, action) => {
            state.repayments = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchRepayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Add repayment
        builder.addCase(addRepayment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addRepayment.fulfilled, (state, action) => {
            state.repayments.push(action.payload);
            state.loading = false;
            state.successMessage = 'Repayment added successfully!';  // <-- Success message
        });
        builder.addCase(addRepayment.rejected, (state, action) => {
            state.loading = false;

            // Handle unexpected error format
            state.error = action.error.message || 'An unexpected error occurred';

        });

        // Delete repayment
        builder.addCase(deleteRepayment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteRepayment.fulfilled, (state, action) => {
            state.repayments = state.repayments.filter((repayment) => repayment._id !== action.payload);
            state.loading = false;
            state.successMessage = 'Repayment deleted successfully!';  // <-- Success message
        });
        builder.addCase(deleteRepayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { clearMessages } = repaymentSlice.actions;  // <-- Export clearMessages action
export default repaymentSlice.reducer;
