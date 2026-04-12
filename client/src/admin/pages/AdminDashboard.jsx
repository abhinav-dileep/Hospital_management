import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Users, Stethoscope, CalendarDays, CalendarCheck,
  Activity,
} from 'lucide-react';

const API_BASE = 'http://localhost:4000/api';
const adminHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return { 'x-user': JSON.stringify(user) };
};

const fetchAdminStats = () =>
  axios.get(`${API_BASE}/admin/stats`, { headers: adminHeaders() });


const StatCard = ({ icon: Icon, label, value, color, bg, trend }) => (
  <div style={{
    background: '#fff', borderRadius: 18, padding: '22px 24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex',
    alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ background: bg, borderRadius: 14, padding: 14, display: 'flex' }}>
      <Icon size={26} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
      <p style={{ color: '#0f172a', fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{value}</p>
    </div>
    {trend && <div style={{ position: 'absolute', top: 14, right: 16, background: trend > 0 ? '#dcfce7' : '#fee2e2', color: trend > 0 ? '#16a34a' : '#dc2626', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
      {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
    </div>}
    <div style={{ position: 'absolute', right: -15, bottom: -15, width: 80, height: 80, borderRadius: '50%', background: bg, opacity: 0.5 }} />
  </div>
);

const StatusBadge = ({ label, value, color, bg }) => (
  <div style={{ background: bg, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
    <div>
      <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 600 }}>{label}</div>
      <div style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 800 }}>{value}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.role !== 'admin') { navigate('/login'); return; }
    fetchAdminStats()
      .then(res => setStats(res.data.stats))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
        <p style={{ color: '#64748b', fontWeight: 500 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  if (!stats) return <p style={{ color: '#ef4444' }}>Failed to load stats.</p>;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0;transform:translateY(16px) } to { opacity:1;transform:translateY(0) } }
        .dash-section { animation: fadeUp 0.4s ease forwards; }
        .spec-bar-fill { transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 4 }}>Welcome back, {JSON.parse(localStorage.getItem('user') || '{}')?.name}. Here's what's happening today.</p>
      </div>

      {/* Today's highlight pill */}
      <div style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', borderRadius: 16, padding: '16px 24px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, color: '#fff' }}>
        <CalendarCheck size={32} />
        <div>
          <div style={{ fontSize: '0.78rem', opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Today's Appointments</div>
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stats.todayAppts}</div>
        </div>
        <div style={{ marginLeft: 'auto', opacity: 0.9, fontSize: '0.85rem' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dash-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 18, marginBottom: 28 }}>
        <StatCard icon={Users}       label="Total Patients"     value={stats.totalUsers}       color="#0ea5e9" bg="#e0f2fe" trend={8} />
        <StatCard icon={Stethoscope} label="Total Doctors"      value={stats.totalDoctors}     color="#8b5cf6" bg="#ede9fe" />
        <StatCard icon={Activity}    label="Active Doctors"     value={stats.activeDoctors}    color="#10b981" bg="#d1fae5" />
        <StatCard icon={CalendarDays}label="Total Appointments" value={stats.totalAppointments}color="#f59e0b" bg="#fef3c7" trend={12} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Appointment Status */}
        <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Appointment Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <StatusBadge label="Pending"   value={stats.pendingAppts}   color="#f59e0b" bg="#fef9ec" />
            <StatusBadge label="Confirmed" value={stats.confirmedAppts} color="#0ea5e9" bg="#f0f9ff" />
            <StatusBadge label="Completed" value={stats.completedAppts} color="#10b981" bg="#f0fdf4" />
            <StatusBadge label="Cancelled" value={stats.cancelledAppts} color="#ef4444" bg="#fef2f2" />
          </div>
        </div>

        {/* Speciality Distribution */}
        <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Top Specialities</h2>
          {stats.specialityStats?.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No appointment data yet.</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stats.specialityStats?.map((s, i) => {
              const colors = ['#0ea5e9','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4'];
              const pct = Math.round((s.count / (stats.totalAppointments || 1)) * 100);
              return (
                <div key={s._id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{s._id}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{s.count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 7, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                    <div className="spec-bar-fill" style={{ width: `${pct}%`, height: '100%', background: colors[i % colors.length], borderRadius: 10 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminDashboard;
