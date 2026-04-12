import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  User, Mail, Phone, Edit3,
  Save, X, Loader2, HeartPulse, LogOut, Lock,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000/api";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
  });

  /* ── helpers ── */
  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`${API_BASE}/update/users/${storedUser._id}`, form);
      const updated = { ...storedUser, ...form };
      localStorage.setItem("user", JSON.stringify(updated));
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: storedUser.name || "", email: storedUser.email || "", phone: storedUser.phone || "" });
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  /* ── guard ── */
  if (!storedUser._id) {
    return (
      <div className="pf-page">
        <style>{styles}</style>
        <div className="pf-locked">
          <div className="pf-locked-icon">🔒</div>
          <h2>Login Required</h2>
          <p>Please <a href="/login">sign in</a> to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="pf-page">

        {/* ── Hero Banner ── */}
        <div className="pf-hero">
          <div className="pf-hero-inner container">
            <div className="pf-avatar">
              <User size={36} color="#fff" />
            </div>
            <div className="pf-hero-text">
              <h1>{storedUser.name}</h1>
              <p className="pf-hero-sub">MediCare+ Patient</p>
            </div>
            <div className="pf-hero-actions">
              {!editing && (
                <button className="pf-btn-edit" onClick={() => setEditing(true)}>
                  <Edit3 size={15} /> Edit Profile
                </button>
              )}
              <button className="pf-btn-logout" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="container pf-body">
          <div className="pf-grid">

            {/* ── Left: Info / Edit Card ── */}
            <div className="pf-card pf-card-main">
              <div className="pf-card-header">
                <span className="pf-card-title">
                  <User size={18} /> Personal Information
                </span>
                {editing && <span className="pf-edit-badge">Editing</span>}
              </div>

              <div className="pf-fields">

                {/* Name */}
                <div className="pf-field">
                  <label className="pf-label"><User size={14} /> Full Name</label>
                  {editing ? (
                    <input
                      className="pf-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  ) : (
                    <div className="pf-value">{storedUser.name || "—"}</div>
                  )}
                </div>

                {/* Email */}
                <div className="pf-field">
                  <label className="pf-label"><Mail size={14} /> Email Address</label>
                  {editing ? (
                    <input
                      className="pf-input"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  ) : (
                    <div className="pf-value">{storedUser.email || "—"}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="pf-field">
                  <label className="pf-label"><Phone size={14} /> Phone Number</label>
                  {editing ? (
                    <input
                      className="pf-input"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 9999999999"
                    />
                  ) : (
                    <div className="pf-value">{storedUser.phone || "—"}</div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              {editing && (
                <div className="pf-actions">
                  <button className="pf-btn-save" onClick={handleSave} disabled={saving}>
                    {saving
                      ? <><Loader2 size={15} className="pf-spin" /> Saving…</>
                      : <><Save size={15} /> Save Changes</>}
                  </button>
                  <button className="pf-btn-cancel" onClick={handleCancel} disabled={saving}>
                    <X size={15} /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Stats / Meta ── */}
            <div className="pf-side">

              {/* Account Overview */}
              <div className="pf-card pf-card-stats">
                <div className="pf-card-header">
                  <span className="pf-card-title">
                    <HeartPulse size={18} /> Account Overview
                  </span>
                </div>
                <div className="pf-stat-list">
                  <div className="pf-stat-row">
                    <CalendarDays size={16} />
                    <div>
                      <div className="pf-stat-label">Member Since</div>
                      <div className="pf-stat-value">{formatDate(storedUser.createdAt)}</div>
                    </div>
                  </div>
                  <div className="pf-stat-row">
                    <Mail size={16} />
                    <div>
                      <div className="pf-stat-label">Email</div>
                      <div className="pf-stat-value pf-truncate">{storedUser.email}</div>
                    </div>
                  </div>
                  <div className="pf-stat-row">
                    <Phone size={16} />
                    <div>
                      <div className="pf-stat-label">Contact</div>
                      <div className="pf-stat-value">{storedUser.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security notice */}
              <div className="pf-card pf-card-security">
                <div className="pf-security-icon"><Lock size={22} /></div>
                <h3>Secure Account</h3>
                <p>Your data is protected with hospital-grade encryption. Only you can edit your personal details.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════════
   STYLES
════════════════════════════════════════════ */
const styles = `
  .pf-page {
    min-height: calc(100vh - 64px);
    background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 60%, #f8fafc 100%);
  }

  /* ── Hero ── */
  .pf-hero {
    background: linear-gradient(145deg, #0369a1 0%, #0ea5e9 55%, #06b6d4 100%);
    padding: 3rem 1.5rem 4.5rem;
  }

  .pf-hero-inner {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  /* Avatar */
  .pf-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.20);
    border: 3px solid rgba(255,255,255,0.50);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }

  .pf-hero-text { flex: 1; min-width: 0; }
  .pf-hero-text h1 {
    color: #fff;
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 800;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }
  .pf-hero-sub {
    color: rgba(255,255,255,0.80);
    font-size: 0.9rem;
    margin: 0;
  }

  .pf-hero-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    margin-left: auto;
  }
  .pf-btn-edit {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.20);
    color: #fff;
    border: 1.5px solid rgba(255,255,255,0.45);
    border-radius: 11px;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    font-family: inherit;
  }
  .pf-btn-edit:hover { background: rgba(255,255,255,0.32); }

  .pf-btn-logout {
    display: flex;
    align-items: center;
    gap: 7px;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #fff;
    border: none;
    border-radius: 11px;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(244,63,94,0.35);
    transition: box-shadow 0.2s;
    font-family: inherit;
  }
  .pf-btn-logout:hover { box-shadow: 0 8px 22px rgba(244,63,94,0.45); }

  /* ── Body ── */
  .pf-body {
    margin-top: -2.5rem;
    padding-bottom: 3rem;
  }

  .pf-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 1.5rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .pf-grid { grid-template-columns: 1fr; }
  }

  /* ── Cards ── */
  .pf-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(14,165,233,0.10), 0 2px 12px rgba(0,0,0,0.05);
    border: 1px solid rgba(14,165,233,0.10);
    overflow: hidden;
  }
  .pf-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%);
  }
  .pf-card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    color: #0f172a;
  }
  .pf-card-title svg { color: #0ea5e9; }

  .pf-edit-badge {
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 50px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* ── Fields ── */
  .pf-fields { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1.1rem; }

  .pf-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.775rem;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .pf-value {
    font-size: 0.975rem;
    font-weight: 500;
    color: #0f172a;
    padding: 10px 12px;
    background: #f8fafc;
    border-radius: 9px;
    border: 1.5px solid #f1f5f9;
  }
  .pf-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: inherit;
    background: #f8fafc;
    color: #0f172a;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .pf-input:focus {
    border-color: #0ea5e9;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
  }

  /* ── Action buttons ── */
  .pf-actions {
    display: flex;
    gap: 10px;
    padding: 1rem 1.5rem 1.5rem;
  }
  .pf-btn-save {
    display: flex;
    align-items: center;
    gap: 7px;
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: #fff;
    border: none;
    border-radius: 11px;
    padding: 11px 24px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(14,165,233,0.35);
    transition: box-shadow 0.2s;
    font-family: inherit;
  }
  .pf-btn-save:hover:not(:disabled) { box-shadow: 0 10px 28px rgba(14,165,233,0.45); }
  .pf-btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

  .pf-btn-cancel {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #f1f5f9;
    color: #64748b;
    border: 1.5px solid #e2e8f0;
    border-radius: 11px;
    padding: 11px 20px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    font-family: inherit;
  }
  .pf-btn-cancel:hover:not(:disabled) { background: #e2e8f0; color: #374151; }

  /* ── Side cards ── */
  .pf-side { display: flex; flex-direction: column; gap: 1.25rem; }

  .pf-stat-list { padding: 1.1rem 1.5rem; display: flex; flex-direction: column; }
  .pf-stat-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 0.85rem 0;
    border-bottom: 1px solid #f1f5f9;
    color: #0ea5e9;
  }
  .pf-stat-row:last-child { border-bottom: none; }
  .pf-stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }
  .pf-stat-value {
    font-size: 0.88rem;
    font-weight: 600;
    color: #0f172a;
  }
  .pf-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  /* Security card */
  .pf-card-security {
    padding: 1.5rem;
    text-align: center;
    background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%);
    border: 1px solid rgba(14,165,233,0.15);
  }
  .pf-security-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0 auto 1rem;
    box-shadow: 0 6px 18px rgba(14,165,233,0.35);
  }
  .pf-card-security h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.4rem;
  }
  .pf-card-security p {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.65;
    margin: 0;
  }

  /* Locked state */
  .pf-locked {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
  }
  .pf-locked-icon { font-size: 3rem; }
  .pf-locked h2 { font-size: 1.4rem; font-weight: 800; color: #0f172a; }
  .pf-locked p { color: #64748b; font-size: 0.9rem; }
  .pf-locked a { color: #0ea5e9; font-weight: 700; }

  /* Spinner */
  @keyframes pf-spin { to { transform: rotate(360deg); } }
  .pf-spin { animation: pf-spin 1s linear infinite; }
`;

export default Profile;
