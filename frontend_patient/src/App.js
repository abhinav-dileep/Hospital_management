import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Appointment from './page/Appointment';
import About from './page/About';
import Emergency from './page/Emergency';
import HealthRecord from './page/HealthRecord';
import Profile from './page/Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HospitalNavbar from './components/Nav_Bar';

function App() {
    return (
        <Router>
            <Toaster position="top-center" richColors />
            <div className="App">
                <HospitalNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/health-record" element={<HealthRecord />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Catch-all fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;