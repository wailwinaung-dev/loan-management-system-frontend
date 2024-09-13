import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Import your axios instance
import { RepaymentReq } from '../../types/RepaymentType';
import { AxiosError } from 'axios';

// Async actions using createAsyncThunk
export const fetchRepayments = createAsyncThunk('repayment/fetchAll', async () => {
    const response = await axios.get('/repayments'); // Backend endpoint to fetch repayments
    return response.data;
  });

  export const fetchRepaymentById = createAsyncThunk('repayment/fetchById', async (id: string) => {
    const response = await axios.get(`/repayments/${id}`); // Backend endpoint to fetch repayment
    return response.data;
  });

  export const addRepayment = createAsyncThunk('repayment/addRepayment', async (repayment: RepaymentReq, { rejectWithValue }) => {
    try {
      const response = await axios.post('/repayments', repayment);
      
      return response.data;
    } catch (_err) {
      const err = (_err as AxiosError)
      return rejectWithValue(err.response?.data || 'Failed to add repayment');
    }
  });

  export const deleteRepayment = createAsyncThunk('repayment/delete', async (id: string) => {
    await axios.delete(`/repayments/${id}`); // Backend endpoint to delete repayment
    return id;
  });
  