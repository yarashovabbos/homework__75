// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import SignIn from './components/SignIN';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Students from './page/Students';
import Teachers from './page/Teachers';
import ProfilePage from './page/ProfilePage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="" element={<h1>Hello MUI Dashboard</h1>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  </AuthProvider>
);

export default App;
