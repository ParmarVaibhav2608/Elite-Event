import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Clients from './pages/Clients'
import Staff from './pages/Staff'
import Inventory from './pages/Inventory'
import Settings from './pages/Settings'
import GalleryPage from './pages/GalleryPage' 
import LeadsPage from './pages/LeadsPage'

// Importing New Financial ERP Enterprise Pages
import ExpensesPage from './pages/ExpensesPage'
import QuotationsPage from './pages/QuotationsPage'
import PaymentsPage from './pages/PaymentsPage'

import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        
        {/* New Financial ERP Module Protected Routes */}
        <Route path="/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
        <Route path="/quotations" element={<ProtectedRoute><QuotationsPage /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
        
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        
        {/* Unified Gallery Management Hub */}
        <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
