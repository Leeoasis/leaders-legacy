import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { setAuth } from './authSlice';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

export const fetchreg = createAsyncThunk(
  'sign_up/fetchregistration',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { user, token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('data', JSON.stringify(user));
      }

      if (user && token) {
        dispatch(setAuth({ user, token }));
      }

      notifySuccess('Registration successful!');
      return user;
    } catch (err) {
      notifyError('Registration failed.');
      if (err.response) {
        return rejectWithValue({
          status: err.response.status,
          data: err.response.data,
        });
      }
      return rejectWithValue({ status: 0, message: err.message });
    }
  }
);

const initialState = {
  sign_up: {},
  error: undefined,
  isLoading: false,
  serverErrors: null,
};

const registrationSlice = createSlice({
  name: 'sign_up',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchreg.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.serverErrors = null;
      })
      .addCase(fetchreg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sign_up = action.payload;
      })
      .addCase(fetchreg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.serverErrors = action.payload || null;
      });
  },
});

export default registrationSlice.reducer;
