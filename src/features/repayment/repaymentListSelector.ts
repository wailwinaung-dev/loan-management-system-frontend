import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

// Select repayments from the state
export const selectRepayments = (state: RootState) => state.repayment.repayments;

// Memoized selector to filter repayments based on loanId
export const selectRepaymentsByLoanId = createSelector(
    [selectRepayments, (state: RootState, loanId: string) => loanId],
    (repayments, loanId) =>
        repayments.filter((repayment) => repayment.loan._id === loanId)
);
