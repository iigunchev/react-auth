import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom';

import './App.css';
import { Login } from './features/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
  const userEmail = useSelector(state => state.auth.email)
  console.log(userEmail)
  return (
    <div className="App">
      <Browser>
        <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route path='login' element={<Login />} />
        </Routes>
      </Browser>
    </div>
  );
}

export default App;
