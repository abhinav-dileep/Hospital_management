import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { Lock, AtSign, Loader2, LogIn } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.identifier || !formData.password) {
            toast.error('Please enter both email/phone and password');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/login', formData);
            toast.success('Login successful!');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex min-vh-100">

                
                <div
                    className="d-none d-md-flex flex-column justify-content-center align-items-center p-5 text-white"
                    style={{ flex: 1, background: 'linear-gradient(145deg, #0369a1 0%, #0ea5e9 50%, #06b6d4 100%)' }}
                >
                    
                    <h1 className="fw-bold mb-3" style={{ fontSize: '2.2rem' }}>MediCare+</h1>
                    <p className="text-center opacity-75" style={{ maxWidth: '300px', lineHeight: '1.7' }}>
                        Your trusted Hospital Management System
                    </p>
                </div>

             
                <div className="d-flex justify-content-center align-items-center p-4" style={{ flex: 1, background: '#f0f9ff' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="card shadow border-0 p-4"
                        style={{ width: '100%', maxWidth: '420px', borderRadius: '20px', border: '1px solid #e0f2fe' }}
                    >
                        <div className="mb-4">
                            <h2 className="fw-bold" style={{ color: '#0f172a' }}>Welcome Back</h2>
                            <p className="text-muted small mb-0">Sign in to access your hospital dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            
                            <div className="mb-3">
                                <label htmlFor="identifier" className="form-label fw-semibold small">
                                    Email or Phone Number
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{ color: '#94a3b8' }}>
                                        <AtSign size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        id="identifier"
                                        name="identifier"
                                        placeholder="you@hospital.com"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        className="form-control border-start-0 bg-light"
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                    />
                                </div>
                            </div>

                           
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold small">
                                    Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{ color: '#94a3b8' }}>
                                        <Lock size={16} />
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control border-start-0 bg-light"
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="btn w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                                style={{
                                    background: loading ? '#7dd3fc' : 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        Sign In
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <hr className="my-4" />

                        <p className="text-center mb-2">
                            <span className="text-muted small">New to MediCare+? </span>
                            <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: '#0ea5e9' }}>
                                Create an account →
                            </Link>
                        </p>

                        <p className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
                            🔒 Secure login — Your data is protected by hospital-grade encryption
                        </p>
                    </motion.div>
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </>
    );
};

export default Login;
