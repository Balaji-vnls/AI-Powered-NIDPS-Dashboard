import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
export function App() {
  return <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>;
}
// Protected route component to handle authentication
function ProtectedRoute({
  children
}) {
  const {
    isAuthenticated
  } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
// Import AuthContext after its declaration to avoid reference error
import { AuthContext } from './context/AuthContext';