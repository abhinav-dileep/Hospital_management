import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Search, Loader2, CalendarDays, ChevronDown, Filter } from 'lucide-react';

const API_BASE = 'http://localhost:4000/api';
const adminHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return { 'x-user': JSON.stringify(user) };
};

const fetchAdminAppointments = (params = {}) =>
  axios.get(`${API_BASE}/admin/appointments`, { params, headers: adminHeaders() });

const updateAdminAppointmentStatus = (id, status) =>
  axios.patch(`${API_BASE}/admin/appointments/${id}/status`, { status }, { headers: adminHeaders() });

const STATUSES = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const statusStyle = {
  Pending:   { bg: '#fef9ec', color: '#b45309', dot: '#f59e0b' },
  Confirmed: { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  Completed: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  Cancelled: { bg: '#fef2f2', color: '#b91c1c', dot: '#ef4444' },
};

const StatusSelect = ({ current, onChange, appointmentId }) => {
  const [open, setOpen] = useState(false);
  const s = statusStyle[current] || {};
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: s.bg, color: s.color, border: `1.5px solid ${s.dot}33`, borderRadius: 20, fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
        {current}
        <ChevronDown size={12} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, minWidth: 140, overflow: 'hidden' }}>
          {STATUSES.filter(s => s !== 'All').map(st => {
            const ss = statusStyle[st];
            return (
              <button key={st} onClick={() => { onChange(appointmentId, st); setOpen(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 14px', background: st === current ? ss.bg : '#fff', color: ss.color, border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, textAlign: 'left' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ss.dot, flexShrink: 0 }} /> {st}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    fetchAdminAppointments({ status: status !== 'All' ? status : undefined, search: search || undefined })
      .then(res => setAppointments(res.data.appointments || []))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [status]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminAppointmentStatus(id, newStatus);
      toast.success(`Appointment marked as ${newStatus}`);
      load();
    } catch { toast.error('Status update failed'); }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .apt-row { transition: background 0.15s; }
        .apt-row:hover { background: #f8fafc; }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Appointments</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{appointments.length} total appointments</p>
        </div>
      </div>

      {/* Status tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatus(s)}
            style={{ padding: '8px 18px', borderRadius: 20, border: `1.5px solid ${status === s ? '#0ea5e9' : '#e2e8f0'}`, background: status === s ? 'linear-gradient(135deg,#0369a1,#0ea5e9)' : '#fff', color: status === s ? '#fff' : '#64748b', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()}
            placeholder="Search by patient, doctor, speciality…"
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', background: '#f8fafc', outline: 'none' }} />
        </div>
        <button onClick={load}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', border: 'none', borderRadius: 10, background: '#0ea5e9', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <Loader2 size={36} color="#0ea5e9" style={{ animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <CalendarDays size={48} color="#e2e8f0" style={{ marginBottom: 12 }} />
            <p style={{ color: '#64748b', fontWeight: 600 }}>No appointments found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['Patient','Doctor','Speciality','Date & Slot','Status','Actions'].map(h => (
                    <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', whiteSpace: 'nowrap', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={a._id} className="apt-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{a.patientName}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{a.patientPhone}</div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{a.doctor?.name || '—'}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{a.doctor?.hospital || ''}</div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: '#ede9fe', color: '#6d28d9', fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>
                        {a.speciality}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{a.date}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>🕐 {a.slot}</div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <StatusSelect current={a.status} onChange={handleStatusChange} appointmentId={a._id} />
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {new Date(a.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAppointments;
