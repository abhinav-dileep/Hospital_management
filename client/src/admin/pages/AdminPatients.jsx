import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Search, Loader2, Users, Trash2, Mail, Phone, Calendar,
  HeartPulse, ChevronDown, ChevronUp, Plus, X, FileText,
  FlaskConical, Pill, Syringe, ClipboardList, ExternalLink,
} from 'lucide-react';

const API_BASE = 'http://localhost:4000/api';
const adminHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return { 'x-user': JSON.stringify(user) };
};

const fetchAllPatients = () =>
  axios.get(`${API_BASE}/admin/users`, { headers: adminHeaders() });

const deletePatientById = (id) =>
  axios.delete(`${API_BASE}/admin/users/${id}`, { headers: adminHeaders() });

const fetchPatientRecords = (patientId) =>
  axios.get(`${API_BASE}/admin/users/${patientId}/health-records`, { headers: adminHeaders() });

const addRecord = (patientId, formData) =>
  axios.post(`${API_BASE}/admin/users/${patientId}/health-records`, formData, {
    headers: adminHeaders(), // ⚠️ Do NOT set Content-Type manually — axios/browser adds multipart boundary automatically
  });

const deleteRecord = (recordId) =>
  axios.delete(`${API_BASE}/admin/health-records/${recordId}`, { headers: adminHeaders() });

/* ── Constants ── */
const RECORD_TYPES = [
  "Scan Report", "Prescription", "Lab Result",
  "Discharge Summary", "Vaccination", "Other",
];

const TYPE_CONFIG = {
  "Scan Report":        { icon: <FileText    size={14} />, color: "#6366f1", bg: "#eef2ff" },
  "Prescription":       { icon: <Pill         size={14} />, color: "#10b981", bg: "#d1fae5" },
  "Lab Result":         { icon: <FlaskConical  size={14} />, color: "#f59e0b", bg: "#fef3c7" },
  "Discharge Summary":  { icon: <ClipboardList size={14} />, color: "#0ea5e9", bg: "#e0f2fe" },
  "Vaccination":        { icon: <Syringe       size={14} />, color: "#ec4899", bg: "#fce7f3" },
  "Other":              { icon: <HeartPulse    size={14} />, color: "#64748b", bg: "#f1f5f9" },
};

const EMPTY_FORM = {
  type: RECORD_TYPES[0], title: '', date: '', doctor: '', description: '', notes: '',
  pdfFile: null,
};

/* ════════════════════════════════════
   HEALTH RECORDS PANEL (per patient)
════════════════════════════════════ */
const HealthPanel = ({ patient }) => {
  const [records, setRecords]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchPatientRecords(patient._id);
      setRecords(res.data.records || []);
    } catch { setRecords([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [patient._id]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) { toast.error('Title and date are required'); return; }
    setSaving(true);
    try {
      /* Build FormData so the PDF file is included */
      const fd = new FormData();
      fd.append('type',        form.type);
      fd.append('title',       form.title);
      fd.append('date',        form.date);
      fd.append('doctor',      form.doctor);
      fd.append('description', form.description);
      fd.append('notes',       form.notes);
      if (form.pdfFile) fd.append('pdf', form.pdfFile);

      await addRecord(patient._id, fd);
      toast.success('Health record added');
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch { toast.error('Failed to add record'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this health record?')) return;
    try {
      await deleteRecord(id);
      toast.success('Record deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const inp = {
    border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '8px 12px',
    fontSize: '0.82rem', width: '100%', outline: 'none',
    background: '#f8fafc', fontFamily: 'inherit',
  };

  return (
    <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 14, paddingTop: 14 }}>

      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>
          <HeartPulse size={15} color="#ef4444" /> Health Records
          <span style={{ background: '#fee2e2', color: '#b91c1c', fontSize: '0.68rem', fontWeight: 700, padding: '1px 7px', borderRadius: 20 }}>
            {records.length}
          </span>
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', border: 'none', borderRadius: 8, background: '#0ea5e9', color: '#fff', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}
        >
          {showForm ? <><X size={13} /> Cancel</> : <><Plus size={13} /> Add Record</>}
        </button>
      </div>

      {/* Add Record Form */}
      {showForm && (
        <form onSubmit={handleAdd} style={{ background: '#f8fafc', borderRadius: 12, padding: '14px', marginBottom: 14, border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Type *</label>
              <select style={inp} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {RECORD_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Date *</label>
              <input type="date" style={inp} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Title *</label>
              <input style={inp} placeholder="e.g. Blood Test Report, Chest X-Ray" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Doctor / Issued By</label>
              <input style={inp} placeholder="Dr. Name" value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Description</label>
              <input style={inp} placeholder="Brief summary" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Notes</label>
              <textarea style={{ ...inp, resize: 'vertical', minHeight: 56 }} placeholder="Additional notes for the patient" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            {/* PDF Upload */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>
                📎 Attach PDF Report (optional, max 10 MB)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '9px 14px', border: '1.5px dashed #cbd5e1', borderRadius: 8, background: '#f8fafc', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0ea5e9'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                <span style={{ fontSize: '1.2rem' }}>📄</span>
                <span style={{ fontSize: '0.78rem', color: form.pdfFile ? '#0f172a' : '#94a3b8', fontWeight: form.pdfFile ? 700 : 400 }}>
                  {form.pdfFile ? form.pdfFile.name : 'Click to choose a PDF file…'}
                </span>
                <input type="file" accept="application/pdf" style={{ display: 'none' }}
                  onChange={e => setForm({ ...form, pdfFile: e.target.files[0] || null })} />
              </label>
              {form.pdfFile && (
                <button type="button" onClick={() => setForm({ ...form, pdfFile: null })}
                  style={{ marginTop: 5, fontSize: '0.72rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ✕ Remove file
                </button>
              )}
            </div>
          </div>
          <button type="submit" disabled={saving}
            style={{ padding: '9px', border: 'none', borderRadius: 8, background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {saving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</> : <><Plus size={14} /> Add Health Record</>}
          </button>
        </form>
      )}

      {/* Records list */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0ea5e9', fontSize: '0.8rem', padding: '8px 0' }}>
          <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Loading records…
        </div>
      ) : records.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0, fontStyle: 'italic' }}>No health records added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {records.map(r => {
            const cfg = TYPE_CONFIG[r.type] || TYPE_CONFIG['Other'];
            return (
              <div key={r._id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#fff', borderRadius: 10, border: '1.5px solid #f1f5f9' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, color: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '1px 8px', borderRadius: 20, background: cfg.bg, color: cfg.color }}>{r.type}</span>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{r.date}</span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</p>
                  {r.doctor && <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>👨‍⚕️ {r.doctor}</p>}
                  {r.description && <p style={{ fontSize: '0.72rem', color: '#374151', margin: '3px 0 0' }}>{r.description}</p>}
                  {/* PDF link */}
                  {r.fileUrl && (
                    <a href={`http://localhost:4000/${r.fileUrl}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: '0.7rem', fontWeight: 700, color: '#0ea5e9', textDecoration: 'none', background: '#e0f2fe', borderRadius: 6, padding: '3px 8px' }}>
                      <ExternalLink size={11} /> View PDF
                    </a>
                  )}
                </div>
                <button onClick={() => handleDelete(r._id)}
                  style={{ padding: 5, border: 'none', background: '#fef2f2', borderRadius: 6, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                  <Trash2 size={13} color="#ef4444" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════
   MAIN ADMIN PATIENTS PAGE
════════════════════════════════════ */
const AdminPatients = () => {
  const [patients, setPatients]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [expandedId, setExpandedId]   = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllPatients()
      .then(res => setPatients(res.data.users || []))
      .catch(() => toast.error('Failed to load patients'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete patient ${name}? This cannot be undone.`)) return;
    try {
      await deletePatientById(id);
      toast.success('Patient removed');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const filtered = patients.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search)
  );

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .pat-card { background: #fff; border-radius: 14px; padding: 18px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); border: 1.5px solid #f1f5f9; transition: transform 0.2s, box-shadow 0.2s; }
        .pat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Patients</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{patients.length} registered patients</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 400 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone…"
          style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', background: '#f8fafc', outline: 'none' }} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <Loader2 size={36} color="#0ea5e9" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 16 }}>
          <Users size={48} color="#e2e8f0" style={{ marginBottom: 12 }} />
          <p style={{ color: '#64748b', fontWeight: 600 }}>No patients found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(p => (
            <div key={p._id} className="pat-card">
              {/* Patient info row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#dbeafe,#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#4f46e5' }}>{p.name?.[0]?.toUpperCase()}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.78rem', color: '#64748b', marginTop: 3 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{p.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{p.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8', fontSize: '0.72rem' }}>
                      <Calendar size={11} />Joined {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => setExpandedId(expandedId === p._id ? null : p._id)}
                    style={{ padding: '6px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: expandedId === p._id ? '#fef2f2' : '#f0f9ff', color: expandedId === p._id ? '#ef4444' : '#0ea5e9', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <HeartPulse size={13} />
                    {expandedId === p._id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    Health
                  </button>
                  <button onClick={() => handleDelete(p._id, p.name)} title="Delete"
                    style={{ padding: 7, border: 'none', borderRadius: 8, background: '#fef2f2', cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                    <Trash2 size={15} color="#ef4444" />
                  </button>
                </div>
              </div>

              {/* Expandable Health Records Panel */}
              {expandedId === p._id && <HealthPanel patient={p} />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminPatients;
