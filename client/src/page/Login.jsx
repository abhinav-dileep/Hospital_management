import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { Lock, AtSign, Loader2, LogIn, HeartPulse, ShieldCheck, Star } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      toast.error('Please enter both email/phone and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/login', formData);
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: calc(100vh - 70px);
          display: flex;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        /* ── Left decorative panel ── */
        .auth-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem 2.5rem;
          background: linear-gradient(145deg, #0369a1 0%, #0ea5e9 55%, #06b6d4 100%);
          position: relative;
          overflow: hidden;
        }
        .auth-left::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          animation: blobFloat 7s ease-in-out infinite;
        }
        .auth-left::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          animation: blobFloat 9s ease-in-out 2s infinite;
        }
        @keyframes blobFloat {
          0%,100% { transform: scale(1) translateY(0); }
          50%      { transform: scale(1.08) translateY(-14px); }
        }

        /* ── Right form panel ── */
        .auth-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1.5rem;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 22px;
          padding: 2.5rem 2rem;
          box-shadow: 0 24px 60px rgba(14,165,233,0.12), 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(14,165,233,0.12);
          animation: slideUp 0.45s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-input-wrap { position: relative; }
        .auth-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }
        .auth-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 11px;
          font-size: 0.9rem;
          background: #f8fafc;
          color: #0f172a;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          font-family: inherit;
        }
        .auth-input:focus {
          border-color: #0ea5e9;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.18);
        }
        .auth-input::placeholder { color: #cbd5e1; }

        .auth-label {
          display: block;
          margin-bottom: 7px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.2px;
        }

        .btn-auth {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(14,165,233,0.35);
          transition: all 0.25s;
          font-family: inherit;
        }
        .btn-auth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(14,165,233,0.45);
        }
        .btn-auth:disabled { opacity: 0.7; cursor: not-allowed; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Responsive: stack panels on mobile ── */
        @media (max-width: 767px) {
          .auth-page { flex-direction: column; }
          .auth-left { display: none; }
          .auth-right {
            flex: 1;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          }
          .auth-card { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="auth-page">
        {/* ── Left Panel ── */}
        <div className="auth-left">
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.22)',
              borderRadius: '18px',
              padding: '18px',
              display: 'inline-flex',
              marginBottom: '1.5rem',
            }}>
              <HeartPulse size={40} color="white" />
            </div>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2.2rem', marginBottom: '0.75rem' }}>
              MediCare+
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.80)', lineHeight: 1.8, maxWidth: '280px', margin: '0 auto 2rem' }}>
              Your trusted Hospital Management System — anywhere, anytime.
            </p>
            {/* Trust badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              {[
                { icon: <ShieldCheck size={16} color="#86efac" />, text: 'NABH Accredited Hospital' },
                { icon: <Star size={16} color="#fbbf24" fill="#fbbf24" />, text: 'Trusted by 50,000+ Patients' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.14)',
                  borderRadius: '50px',
                  padding: '8px 18px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                }}>
                  {icon}
                  <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="auth-right">
          <div className="auth-card">
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.6rem', marginBottom: '6px' }}>
                Welcome Back
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Sign in to access your hospital dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '1.1rem' }}>
                <label className="auth-label" htmlFor="identifier">Email or Phone Number</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><AtSign size={16} /></span>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="you@example.com or +91 9999999999"
                    value={formData.identifier}
                    onChange={handleChange}
                    className="auth-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="auth-label" htmlFor="password">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={16} /></span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-auth">
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Signing In…
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '1.5rem 0' }} />

            <p style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748b', marginBottom: '8px' }}>
              New to MediCare+?{' '}
              <Link to="/register" style={{ color: '#0ea5e9', fontWeight: 700 }}>
                Create an account →
              </Link>
            </p>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
              🔒 Secure login — Your data is protected by hospital-grade encryption
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
