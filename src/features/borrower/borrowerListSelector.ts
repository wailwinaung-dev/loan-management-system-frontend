import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

export const selectBorrowers = (state: RootState) => state.borrower.borrowers;

export const borrowersList = createSelector(
  [selectBorrowers],
  (borrowers) =>
    borrowers.map(b => ({
      value: b._id,
      label: b.name,
    }))
);
