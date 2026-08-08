import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check kar rahe hain ki browser ki memory mein login ka thappa (proof) hai ya nahi
  const isAuthenticated = localStorage.getItem("isAuth");

  if (!isAuthenticated) {
    // Agar nahi hai, toh turant login page par fenk do
    return <Navigate to="/login" />;
  }

  // Agar proof hai, toh page kholne do
  return children;
}