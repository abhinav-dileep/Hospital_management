import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Patient-facing pages
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Appointment from './page/Appointment';
import Emergency from './page/Emergency';
import HealthRecord from './page/HealthRecord';
import Profile from './page/Profile';

// Admin
import AdminLayout from './admin/AdminLayout';
import AdminGuard from './admin/AdminGuard';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminDoctors from './admin/pages/AdminDoctors';
import AdminAppointments from './admin/pages/AdminAppointments';
import AdminPatients from './admin/pages/AdminPatients';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HospitalNavbar from './components/Nav_Bar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Toaster position="top-center" richColors />
            <Routes>
                {/* ── Admin routes (no navbar/footer) ── */}
                <Route
                    path="/admin"
                    element={
                        <AdminGuard>
                            <AdminLayout />
                        </AdminGuard>
                    }
                >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard"    element={<AdminDashboard />} />
                    <Route path="doctors"      element={<AdminDoctors />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                    <Route path="patients"     element={<AdminPatients />} />
                </Route>

                {/* ── Patient-facing routes ── */}
                <Route
                    path="*"
                    element={
                        <div className="App">
                            <HospitalNavbar />
                            <Routes>
                                <Route path="/"              element={<Home />} />
                                <Route path="/home"          element={<Home />} />
                                <Route path="/dashboard"     element={<Home />} />
                                <Route path="/appointment"   element={<Appointment />} />
                                <Route path="/emergency"     element={<Emergency />} />
                                <Route path="/health-record" element={<HealthRecord />} />
                                <Route path="/profile"       element={<Profile />} />
                                <Route path="/login"         element={<Login />} />
                                <Route path="/register"      element={<Register />} />
                                <Route path="*"              element={<Navigate to="/" replace />} />
                            </Routes>
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;