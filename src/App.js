import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { rehydrate } from './redux/auth/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './components/landingSite/WelcomePage';


const App = () => {
  const dispatch = useDispatch();

  // ✅ Rehydrate Redux state from localStorage on load
  useEffect(() => {
    dispatch(rehydrate());
  }, [dispatch]);

  return (
    <Router>
      <>
        <ToastContainer />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Landing />} />

     
       
        </Routes>
      </>
    </Router>
  );
};

export default App;
