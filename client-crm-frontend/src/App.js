import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          
          <Route path="/leads" element={
            <PrivateRoute>
              <LeadsPage />
            </PrivateRoute>
          } />
          
          {/* IMPORTANT: Both routes point to same component */}
          <Route path="/lead/new" element={
            <PrivateRoute>
              <LeadDetailPage />
            </PrivateRoute>
          } />
          
          <Route path="/lead/:id" element={
            <PrivateRoute>
              <LeadDetailPage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;