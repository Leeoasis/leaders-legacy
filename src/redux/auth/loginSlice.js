import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { setAuth } from './authSlice';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

export const fetchlogin = createAsyncThunk(
  'login/fetchlogin',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // ✅ Send only the required Devise-JWT format
      const response = await axiosInstance.post('/login', {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
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

      notifySuccess('Login successful!');
      return user;
    } catch (err) {
      notifyError('Login failed.');
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

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: {},
    error: undefined,
    isLoading: false,
    serverErrors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchlogin.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.serverErrors = null;
      })
      .addCase(fetchlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
      })
      .addCase(fetchlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.serverErrors = action.payload || null;
      });
  },
});

export default loginSlice.reducer;
