import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import FacilitiesPage from './pages/FacilitiesPage';
import SimplifiedOutput from './pages/SimplifiedOutput';
import NearbyHospitalsPage from './pages/NearbyHospitalsPage';
import GeneralMedicinesPage from './pages/GeneralMedicinesPage';
import DoctorsConsultationPage from './pages/DoctorsConsultationPage';
import HealthyDietPage from './pages/HealthyDietPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/facilities" 
          element={
            <ProtectedRoute>
              <FacilitiesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/simplified-output" 
          element={
            <ProtectedRoute>
              <SimplifiedOutput />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nearby-hospitals" 
          element={
            <ProtectedRoute>
              <NearbyHospitalsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/general-medicines" 
          element={
            <ProtectedRoute>
              <GeneralMedicinesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctors-consultation" 
          element={
            <ProtectedRoute>
              <DoctorsConsultationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/healthy-diet" 
          element={
            <ProtectedRoute>
              <HealthyDietPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;