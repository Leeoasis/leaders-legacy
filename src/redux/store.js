import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './auth/registerSlice';
import loginReducer from './auth/loginSlice';
import authReducer from './auth/authSlice';
import userReducer from './features/userSlice';
import caseReducer from './features/caseSlice';

const store = configureStore({
  reducer: {
    data: authReducer,
    login: loginReducer,
    sign_up: registrationReducer,
    user: userReducer,
    case: caseReducer,
  },
});

export default store;