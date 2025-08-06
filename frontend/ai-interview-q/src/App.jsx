import React from 'react';
import {BrowserRouter as Router ,UNSAFE_DataRouterStateContext,Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage';
import Interviewprep from './pages/interviewPrep/Interviewprep';
const App = () => {
  return (
    <div className="App">
      <h1 className="text-5ml ">
        AI Interview Questions
      </h1>
    </div>
  );
}
export default App;