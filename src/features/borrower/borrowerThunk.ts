import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Import your axios instance
import { BorrowerRes } from '../../types/BorrowerType';
import { AxiosError } from 'axios';

// Async actions using createAsyncThunk
export const fetchBorrowers = createAsyncThunk('borrower/fetchAll', async () => {
  const response = await axios.get('/borrowers'); // Backend endpoint to fetch borrowers
  return response.data;
});

export const addBorrower = createAsyncThunk('borrower/addBorrower', async (borrower: BorrowerRes, { rejectWithValue }) => {
  try {
    const response = await axios.post('/borrowers', borrower);

    return response.data;
  } catch (_err) {
    const err = (_err as AxiosError)
    return rejectWithValue(err.response?.data || 'Failed to add borrower');
  }
});
export const updateBorrower = createAsyncThunk('borrower/update', async (borrower: BorrowerRes, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, ...updateData } = borrower;
    const response = await axios.patch(`/borrowers/${borrower._id}`, updateData); // Backend endpoint to update borrower
    return response.data;
  } catch (_err) {
    const err = (_err as AxiosError);
    return rejectWithValue(err.response?.data || 'Fail to edit borrower')
  }
});

export const deleteBorrower = createAsyncThunk('borrower/delete', async (id: string, { rejectWithValue }) => {
  try {
    await axios.delete(`/borrowers/${id}`); // Backend endpoint to delete borrower
    return id;
  } catch(_err) {
    const err = (_err as AxiosError);
    return rejectWithValue(err.response?.data || 'Fail to delete borrower')
  }

});
