import { reset as resetUser } from '../features/userSlice';
import { reset as resetCases } from '../features/caseSlice';
import axiosInstance from '../../api/axiosInstance';

export const logout = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      await axiosInstance.delete("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    console.warn("Logout request failed (token may already be missing):", err.message);
  }

  dispatch(resetUser());
  dispatch(resetCases());
  localStorage.removeItem("token");
  localStorage.removeItem("data");
};
