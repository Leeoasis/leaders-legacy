import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { notifySuccess, notifyError } from '../../utils/NotificationSystem';

export const createCase = createAsyncThunk(
  'case/createCase',
  async ({ userId, caseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/${userId}/cases`, {
        case: caseData,
      });
      notifySuccess("Case created successfully!");
      return response.data;
    } catch (err) {
      notifyError("Failed to create case.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchUnassignedCasesForAdmin = createAsyncThunk(
  "case/fetchUnassignedCasesForAdmin",
  async (adminId) => {
    const response = await axiosInstance.get(`/admin-cases`, {
      params: { user_id: adminId }
    });
    return response.data;
  }
);

export const fetchCases = createAsyncThunk(
  'case/fetchCases',
  async (userId) => {
    const response = await axiosInstance.get(`/cases?user_id=${userId}`);
    return response.data;
  }
);

export const fetchAvailableCases = createAsyncThunk(
  'case/fetchAvailableCases',
  async (lawyerId) => {
    const response = await axiosInstance.get(`/api/lawyer/${lawyerId}/available_cases`);
    return response.data;
  }
);

export const acceptCase = createAsyncThunk(
  'case/acceptCase',
  async ({ caseId, lawyerId }) => {
    const response = await axiosInstance.post(`/cases/${caseId}/accept`, {
      lawyer_id: lawyerId,
    });
    notifySuccess("Case accepted successfully!");
    return { caseId, lawyerId, ...response.data };
  }
);

export const updateCase = createAsyncThunk(
  'case/updateCase',
  async ({ userId, caseId, caseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cases/${caseId}?user_id=${userId}`, {
        case: caseData,
      });
      notifySuccess("Case updated successfully!");
      return response.data;
    } catch (err) {
      notifyError("Failed to update case.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCase = createAsyncThunk(
  'case/deleteCase',
  async ({ userId, caseId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cases/${caseId}?user_id=${userId}`);
      notifySuccess("Case deleted successfully!");
      return caseId;
    } catch (err) {
      notifyError("Failed to delete case.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const caseSlice = createSlice({
  name: 'case',
  initialState: {
    cases: [],
    availableCases: [],
    loading: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      return {
        ...state,
        cases: [],
        availableCases: [],
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.cases = action.payload;
      })
      .addCase(fetchAvailableCases.fulfilled, (state, action) => {
        state.availableCases = action.payload;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.cases.push(action.payload);
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        const index = state.cases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.cases[index] = action.payload;
      })
      .addCase(acceptCase.fulfilled, (state, action) => {
        const index = state.cases.findIndex((c) => c.id === action.payload.caseId);
        if (index !== -1) {
          state.cases[index].status = 'claimed';
          state.cases[index].lawyer_id = action.payload.lawyerId;
        } else {
          const acceptedCase = state.availableCases.find(c => c.id === action.payload.caseId);
          if (acceptedCase) {
            acceptedCase.status = 'claimed';
            acceptedCase.lawyer_id = action.payload.lawyerId;
            state.cases.push(acceptedCase);
            state.availableCases = state.availableCases.filter(c => c.id !== action.payload.caseId);
          }
        }
      })
      .addCase(fetchUnassignedCasesForAdmin.fulfilled, (state, action) => {
       state.cases = action.payload;
      })

      .addCase(deleteCase.fulfilled, (state, action) => {
        state.cases = state.cases.filter((c) => c.id !== action.payload);
      });
  },
});

export const { reset } = caseSlice.actions;
export default caseSlice.reducer;
