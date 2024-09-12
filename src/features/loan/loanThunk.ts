import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Import your axios instance
import { LoanReq } from '../../types/LoanType';
import { AxiosError } from 'axios';

// Async actions using createAsyncThunk
export const fetchLoans = createAsyncThunk('loan/fetchAll', async () => {
    const response = await axios.get('/loans'); // Backend endpoint to fetch loans
    return response.data;
  });

  export const fetchLoanById = createAsyncThunk('loan/fetchById', async (id: string) => {
    const response = await axios.get(`/loans/${id}`); // Backend endpoint to fetch loan
    return response.data;
  });

  export const addLoan = createAsyncThunk('loan/addLoan', async (loan: LoanReq, { rejectWithValue }) => {
    try {
      const response = await axios.post('/loans', loan);
      
      return response.data;
    } catch (_err) {
      const err = (_err as AxiosError)
      return rejectWithValue(err.response?.data || 'Failed to add loan');
    }
  });

  export const deleteLoan = createAsyncThunk('loan/delete', async (id: string) => {
    await axios.delete(`/loans/${id}`); // Backend endpoint to delete loan
    return id;
  });
  