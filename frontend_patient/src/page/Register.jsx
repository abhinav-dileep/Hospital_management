import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { User, Mail, Phone, Lock, Loader2, UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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

        if (!formData.name || !formData.email || !formData.password || !formData.phone) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/register', formData);
            toast.success(response.data.message || 'Registration successful!');
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { label: 'Full Name', id: 'name', type: 'text', placeholder: 'User Name', icon: <User size={16} /> },
        { label: 'Email Address', id: 'email', type: 'email', placeholder: 'Email', icon: <Mail size={16} /> },
        { label: 'Phone Number', id: 'phone', type: 'tel', placeholder: '+91 9999999999', icon: <Phone size={16} /> },
        { label: 'Password', id: 'password', type: 'password', placeholder: '••••••••', icon: <Lock size={16} /> },
    ];

    return (
        <>
            <div className="d-flex min-vh-100">

                {/* Left panel */}
                <div
                    className="d-none d-md-flex flex-column justify-content-center align-items-center p-5 text-white"
                    style={{ flex: 1, background: 'linear-gradient(145deg, #065f46 0%, #059669 50%, #10b981 100%)' }}
                >
                    <h1 className="fw-bold mb-3" style={{ fontSize: '2.2rem' }}>Join MediCare+</h1>
                    <p className="text-center opacity-75" style={{ maxWidth: '300px', lineHeight: '1.7' }}>
                        Create your account and start self care.
                    </p>
                </div>

                {/* Right panel */}
                <div className="d-flex justify-content-center align-items-center p-4" style={{ flex: 1, background: '#f0f9ff' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="card shadow border-0 p-4"
                        style={{ width: '100%', maxWidth: '440px', borderRadius: '20px', border: '1px solid #d1fae5' }}
                    >
                        <div className="mb-4">
                            <h2 className="fw-bold" style={{ color: '#0f172a' }}>Create Account</h2>
                            <p className="text-muted small mb-0">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div className="mb-3" key={field.id}>
                                    <label htmlFor={field.id} className="form-label fw-semibold small">
                                        {field.label}
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0" style={{ color: '#94a3b8' }}>
                                            {field.icon}
                                        </span>
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            name={field.id}
                                            placeholder={field.placeholder}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            className="form-control border-start-0 bg-light"
                                            style={{ outline: 'none', boxShadow: 'none' }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="btn w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                                style={{
                                    background: loading ? '#6ee7b7' : 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 14px rgba(5,150,105,0.35)',
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Create Account
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <hr className="my-4" />

                        <p className="text-center mb-2">
                            <span className="text-muted small">Already registered? </span>
                            <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: '#059669' }}>
                                Sign in to your account →
                            </Link>
                        </p>

                        <p className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
                            🔒 Your information is secured with hospital-grade encryption
                        </p>
                    </motion.div>
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </>
    );
};

export default Register;
