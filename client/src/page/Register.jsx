import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { User, Mail, Phone, Lock, Loader2, UserPlus, HeartPulse, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/register', formData);
      toast.success(res.data.message || 'Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Full Name',     id: 'name',     type: 'text',     placeholder: 'John Doe',              icon: <User size={16} /> },
    { label: 'Email Address', id: 'email',    type: 'email',    placeholder: 'you@example.com',       icon: <Mail size={16} /> },
    { label: 'Phone Number',  id: 'phone',    type: 'tel',      placeholder: '+91 9999999999',        icon: <Phone size={16} /> },
    { label: 'Password',      id: 'password', type: 'password', placeholder: '••••••••',              icon: <Lock size={16} /> },
  ];

  const perks = [
    'Instant appointment booking',
    'Access to 200+ specialists',
    'Secure health records',
    '24/7 emergency support',
  ];

  return (
    <>
      <style>{`
        .auth-page {
          min-height: calc(100vh - 70px);
          display: flex;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }

        .auth-left-reg {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem 2.5rem;
          background: linear-gradient(145deg, #065f46 0%, #059669 55%, #10b981 100%);
          position: relative;
          overflow: hidden;
        }
        .auth-left-reg::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          animation: blobFloat 7s ease-in-out infinite;
        }
        .auth-left-reg::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          animation: blobFloat 9s ease-in-out 2s infinite;
        }
        @keyframes blobFloat {
          0%,100% { transform: scale(1) translateY(0); }
          50%      { transform: scale(1.08) translateY(-14px); }
        }

        .auth-right-reg {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1.5rem;
        }

        .auth-card-reg {
          width: 100%;
          max-width: 440px;
          background: #fff;
          border-radius: 22px;
          padding: 2.25rem 2rem;
          box-shadow: 0 24px 60px rgba(5,150,105,0.10), 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(5,150,105,0.12);
          animation: slideUp 0.45s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .reg-input-wrap { position: relative; }
        .reg-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }
        .reg-input {
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
        .reg-input:focus {
          border-color: #059669;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(5,150,105,0.16);
        }
        .reg-input::placeholder { color: #cbd5e1; }

        .reg-label {
          display: block;
          margin-bottom: 7px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.2px;
        }

        .btn-reg {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #065f46 0%, #059669 100%);
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
          box-shadow: 0 6px 20px rgba(5,150,105,0.35);
          transition: all 0.25s;
          font-family: inherit;
        }
        .btn-reg:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(5,150,105,0.45);
        }
        .btn-reg:disabled { opacity: 0.7; cursor: not-allowed; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 767px) {
          .auth-page { flex-direction: column; }
          .auth-left-reg { display: none; }
          .auth-right-reg {
            flex: 1;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          }
          .auth-card-reg { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="auth-page">
        {/* ── Left Panel ── */}
        <div className="auth-left-reg">
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.20)',
              borderRadius: '18px',
              padding: '18px',
              display: 'inline-flex',
              marginBottom: '1.5rem',
            }}>
              <HeartPulse size={40} color="white" />
            </div>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2rem', marginBottom: '0.6rem' }}>
              Join MediCare+
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, maxWidth: '270px', margin: '0 auto 2rem' }}>
              Create your account and experience the future of healthcare.
            </p>
            {/* Perk list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%', maxWidth: '260px' }}>
              {perks.map((perk) => (
                <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#86efac" />
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.85rem', fontWeight: 500 }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="auth-right-reg">
          <div className="auth-card-reg">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.55rem', marginBottom: '6px' }}>
                Create Account
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {fields.map((field) => (
                <div key={field.id} style={{ marginBottom: '1rem' }}>
                  <label className="reg-label" htmlFor={field.id}>{field.label}</label>
                  <div className="reg-input-wrap">
                    <span className="reg-input-icon">{field.icon}</span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className="reg-input"
                    />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.5rem' }}>
                <button type="submit" disabled={loading} className="btn-reg">
                  {loading ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Creating Account…
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '1.5rem 0' }} />

            <p style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748b', marginBottom: '8px' }}>
              Already registered?{' '}
              <Link to="/login" style={{ color: '#059669', fontWeight: 700 }}>
                Sign in to your account →
              </Link>
            </p>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
              🔒 Your information is secured with hospital-grade encryption
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
