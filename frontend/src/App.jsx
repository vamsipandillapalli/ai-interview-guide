import React from 'react';
import {BrowserRouter as Router ,UNSAFE_DataRouterStateContext,Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import Interviewprep from './pages/interviewPrep/Interviewprep';
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<Interviewprep />} />
        </Routes>
          </Router>
      <Toaster
      toastOptions = {{
        className: '',
        style: {
          fontSize : '13px',

        },
      }}
      />
    </div>
    </UserProvider>
  );
}
export default App;