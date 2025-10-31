import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

// ========================================================
// ✅ Fetch Lawyers
// ========================================================
export const fetchLawyers = createAsyncThunk(
  'user/fetchLawyers',
  async (criteria) => {
    console.log("➡️ Calling /api/lawyers with criteria:", criteria);
    const response = await axiosInstance.get('/api/lawyers', { params: criteria });
    return response.data;
  }
);

// ========================================================
// ✅ Fetch Clients
// ========================================================
export const fetchClients = createAsyncThunk(
  'user/fetchClients',
  async (criteria = {}) => {
    const { lawyer_id } = criteria;
    const url = lawyer_id ? `/api/lawyer/${lawyer_id}/clients` : '/api/clients';
    const response = await axiosInstance.get(url);
    console.log('Fetched clients:', response.data);
    return response.data;
  }
);

// ========================================================
// ✅ Update Profile
// ========================================================
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/user/${id}`, profileData);
      localStorage.setItem('data', JSON.stringify(response.data));
      notifySuccess('Profile updated successfully');
      return response.data;
    } catch (err) {
      notifyError('Failed to update profile');
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ========================================================
// ✅ Fetch Profile
// ========================================================
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async ({ role, id }) => {
    const response = await axiosInstance.get(`/api/user/profile/${role}/${id}`);
    return response.data;
  }
);

// ========================================================
// ✅ Fetch Notifications
// ========================================================
export const fetchNotifications = createAsyncThunk(
  'user/fetchNotifications',
  async (userId) => {
    const response = await axiosInstance.get(`/api/notifications/${userId}`);
    return response.data;
  }
);

// ========================================================
// ✅ Rehydrate User (from localStorage)
// ========================================================
export const rehydrateUser = createAsyncThunk(
  'user/rehydrateUser',
  async () => {
    const user = JSON.parse(localStorage.getItem('data'));
    const token = localStorage.getItem('token');
    return { ...user, token };
  }
);

// ========================================================
// ✅ Approve Lawyer (NEW)
// Triggers backend mailer and optional WhatsApp notification
// ========================================================
export const approveLawyer = createAsyncThunk(
  'user/approveLawyer',
  async (lawyerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/users/${lawyerId}/approve`);
      notifySuccess('Lawyer approved — notification sent');
      return response.data;
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Failed to approve lawyer';
      notifyError(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

// ========================================================
// ✅ Initial State
// ========================================================
const initialState = {
  lawyers: [],
  clients: [],
  profile: JSON.parse(localStorage.getItem('data')) || {},
  notifications: [],
  loading: false,
  error: null,
  successMessage: '',
};

// ========================================================
// ✅ Slice Definition
// ========================================================
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    },
    reset: (state) => ({
      ...state,
      profile: {},
      notifications: [],
      lawyers: [],
      clients: [],
      successMessage: '',
      loading: false,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      // ====================================================
      // Fulfilled Handlers
      // ====================================================
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.lawyers = action.payload;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(rehydrateUser.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      // ====================================================
      // NEW — Approve Lawyer Fulfilled/Rejected
      // ====================================================
      .addCase(approveLawyer.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Lawyer approved';
      })
      .addCase(approveLawyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ====================================================
      // Generic Matchers
      // ====================================================
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

// ========================================================
// ✅ Exports
// ========================================================
export const { clearSuccessMessage, reset } = userSlice.actions;
export default userSlice.reducer;
