import React from 'react';
import {BrowserRouter as Router ,UNSAFE_DataRouterStateContext,Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/home/Dashboard';
import Interviewprep from './pages/interviewPrep/Interviewprep';

const App = () => {
  return (
    <div className="App">
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
  );
}
export default App;