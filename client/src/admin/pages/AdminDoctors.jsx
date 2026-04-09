import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Plus, Pencil, Trash2, X, Check, Search, Loader2,
  Stethoscope, Star, MapPin, Building2, ChevronDown, ChevronUp,
  Clock, ToggleLeft, ToggleRight,
} from 'lucide-react';

const API_BASE = 'http://localhost:4000/api';

const fetchAllDoctors = (params = {}) =>
  axios.get(`${API_BASE}/doctors`, { params });

const addNewDoctor = (data) =>
  axios.post(`${API_BASE}/doctors`, data);

const updateDoctorById = (id, data) =>
  axios.put(`${API_BASE}/doctors/${id}`, data);

const deleteDoctorById = (id) =>
  axios.delete(`${API_BASE}/doctors/${id}`);

const SPECIALITIES = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology",
  "ENT", "Gynecology", "Ophthalmology", "Psychiatry", "General Physician",
  "Endocrinology", "Gastroenterology", "Urology", "Oncology", "Pulmonology",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const ALL_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
];

const emptyForm = {
  name: '', speciality: SPECIALITIES[0], qualification: '', experience: ''
  , location: '', fee: '', bio: '', isActive: true,
  availability: [],
};

const DoctorForm = ({ initial, onSave, onCancel, saving }) => {
  const [form, setForm] = useState(initial || emptyForm);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const toggleDay = (day) => {
    const exists = form.availability.find(a => a.day === day);
    if (exists) {
      set('availability', form.availability.filter(a => a.day !== day));
    } else {
      const defaultSlots = ALL_SLOTS.slice(1, 10);
      set('availability', [...form.availability, { day, slots: defaultSlots }]);
    }
  };

  const updateTimeRange = (day, type, value) => {
    set('availability', form.availability.map(a => {
      if (a.day !== day) return a;

      let currentStart = a.slots.length > 0 ? a.slots[0] : ALL_SLOTS[0];
      let currentEnd = a.slots.length > 0 ? a.slots[a.slots.length - 1] : ALL_SLOTS[0];

      let newStart = type === 'start' ? value : currentStart;
      let newEnd = type === 'end' ? value : currentEnd;

      let startIndex = ALL_SLOTS.indexOf(newStart);
      let endIndex = ALL_SLOTS.indexOf(newEnd);

      if (startIndex > endIndex) {
        if (type === 'start') endIndex = startIndex;
        else startIndex = endIndex;
      }

      return { ...a, slots: ALL_SLOTS.slice(startIndex, endIndex + 1) };
    }));
  };

  const isDayActive = (day) => form.availability.some(a => a.day === day);
  const daySlots = (day) => form.availability.find(a => a.day === day)?.slots || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.qualification || !form.location || !form.experience || !form.fee) {
      toast.error('Please fill all required fields'); return;
    }
    onSave(form);
  };

  const inp = {
    border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '10px 14px',
    fontSize: '0.88rem', width: '100%', outline: 'none', background: '#f8fafc',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
  };
  const lbl = { fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' };

  return (
    <>
      <style>{`
        .df-input:focus { border-color: #0ea5e9 !important; background: #fff !important; }
        .slot-chip { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 4px 10px; font-size: 0.75rem; cursor: pointer; transition: all 0.18s; background: #f8fafc; }
        .slot-chip:hover { border-color: #0ea5e9; }
        .slot-chip.active { background: #0ea5e9; color: #fff; border-color: #0ea5e9; font-weight: 600; }
        .day-chip { border: 2px solid #e2e8f0; border-radius: 10px; padding: 6px 14px; font-size: 0.8rem; cursor: pointer; transition: all 0.18s; background: #f8fafc; font-weight: 600; }
        .day-chip:hover { border-color: #0ea5e9; }
        .day-chip.active { background: linear-gradient(135deg, #0369a1, #0ea5e9); color: #fff; border-color: transparent; }
      `}</style>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={lbl}>Doctor Name *</label>
            <input className="df-input" style={inp} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. John Smith" required />
          </div>
          <div>
            <label style={lbl}>Speciality *</label>
            <select className="df-input" style={inp} value={form.speciality} onChange={e => set('speciality', e.target.value)}>
              {SPECIALITIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Qualification *</label>
            <input className="df-input" style={inp} value={form.qualification} onChange={e => set('qualification', e.target.value)} placeholder="MBBS, MD" required />
          </div>
          <div>
            <label style={lbl}>Experience (years) *</label>
            <input className="df-input" style={inp} type="number" min="0" value={form.experience} onChange={e => set('experience', e.target.value)} placeholder="10" required />
          </div>
          <div>
            <label style={lbl}>Location (City) *</label>
            <input className="df-input" style={inp} value={form.location} onChange={e => set('location', e.target.value)} placeholder="New Delhi" required />
          </div>
          <div>
            <label style={lbl}>Consultation Fee (₹) *</label>
            <input className="df-input" style={inp} type="number" min="0" value={form.fee} onChange={e => set('fee', e.target.value)} placeholder="800" required />
          </div>
          <div>
            <label style={lbl}>Status</label>
            <button type="button" onClick={() => set('isActive', !form.isActive)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: form.isActive ? '#dcfce7' : '#fee2e2', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', color: form.isActive ? '#16a34a' : '#dc2626' }}>
              {form.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              {form.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
        <div>
          <label style={lbl}>Bio / About</label>
          <textarea className="df-input" style={{ ...inp, minHeight: 72, resize: 'vertical' }} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Brief description of the doctor's expertise…" />
        </div>


        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <button type="button" onClick={() => setScheduleOpen(!scheduleOpen)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontWeight: 700, color: '#374151', fontSize: '0.88rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={16} color="#0ea5e9" /> Schedule Builder</span>
            {scheduleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {scheduleOpen && (
            <div style={{ padding: 16, borderTop: '1.5px solid #e2e8f0' }}>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 12 }}>Select working days, then pick available slots for each day.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {DAYS.map(day => (
                  <button key={day} type="button" className={`day-chip ${isDayActive(day) ? 'active' : ''}`} onClick={() => toggleDay(day)}>
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
              {form.availability.map(({ day }) => (
                <div key={day} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e40af', marginBottom: 8 }}>{day}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <select
                      className="df-input"
                      style={{ ...inp, width: 'auto', padding: '6px 10px' }}
                      value={daySlots(day)[0] || ALL_SLOTS[0]}
                      onChange={e => updateTimeRange(day, 'start', e.target.value)}
                    >
                      {ALL_SLOTS.map(slot => <option key={`start-${slot}`} value={slot}>{slot}</option>)}
                    </select>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>to</span>
                    <select
                      className="df-input"
                      style={{ ...inp, width: 'auto', padding: '6px 10px' }}
                      value={daySlots(day)[daySlots(day).length - 1] || ALL_SLOTS[0]}
                      onChange={e => updateTimeRange(day, 'end', e.target.value)}
                    >
                      {ALL_SLOTS.map(slot => <option key={`end-${slot}`} value={slot}>{slot}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
          <button type="button" onClick={onCancel}
            style={{ padding: '10px 20px', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600, color: '#64748b', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            <X size={16} /> Cancel
          </button>
          <button type="submit" disabled={saving}
            style={{ padding: '10px 24px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={16} />}
            {saving ? 'Saving…' : 'Save Doctor'}
          </button>
        </div>
      </form>
    </>
  );
};

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSpec, setFilterSpec] = useState('All');
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllDoctors({ search: search || undefined })
      .then(res => setDoctors(res.data.doctors || []))
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (modal === 'add') {
        await addNewDoctor(formData);
        toast.success('Doctor added successfully');
      } else {
        await updateDoctorById(modal.doctor._id, formData);
        toast.success('Doctor updated successfully');
      }
      setModal(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete Dr. ${name}? This cannot be undone.`)) return;
    try {
      await deleteDoctorById(id);
      toast.success('Doctor removed');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const filtered = doctors.filter(d => {
    const matchSpec = filterSpec === 'All' || d.speciality === filterSpec;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || (d.hospital && d.hospital.toLowerCase().includes(search.toLowerCase()));
    return matchSpec && matchSearch;
  });

  const specColors = { Cardiology: '#ef4444', Neurology: '#8b5cf6', Orthopedics: '#f59e0b', Pediatrics: '#10b981', Dermatology: '#ec4899', ENT: '#0ea5e9', Gynecology: '#f97316', Ophthalmology: '#06b6d4', Psychiatry: '#6366f1', 'General Physician': '#14b8a6', Endocrinology: '#84cc16', Gastroenterology: '#a855f7', Urology: '#0284c7', Oncology: '#dc2626', Pulmonology: '#059669' };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .dr-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 14px rgba(0,0,0,0.06); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; border: 1.5px solid #f1f5f9; }
        .dr-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.1); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(3px); }
        .modal-box { background: #fff; border-radius: 20px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 24px 60px rgba(0,0,0,0.18); animation: fadeUp 0.3s ease; }
        @keyframes fadeUp { from { opacity:0;transform:translateY(20px) } to { opacity:1;transform:translateY(0) } }
      `}</style>


      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Manage Doctors</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{doctors.length} doctors registered</p>
        </div>
        <button onClick={() => setModal('add')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(14,165,233,0.35)' }}>
          <Plus size={18} /> Add Doctor
        </button>
      </div>


      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()}
            placeholder="Search doctors, hospitals…"
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', background: '#f8fafc', outline: 'none' }} />
        </div>
        <select value={filterSpec} onChange={e => setFilterSpec(e.target.value)}
          style={{ padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', background: '#f8fafc', outline: 'none', cursor: 'pointer' }}>
          <option value="All">All Specialities</option>
          {SPECIALITIES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={load}
          style={{ padding: '10px 16px', border: 'none', borderRadius: 10, background: '#0ea5e9', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
          Refresh
        </button>
      </div>


      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <Loader2 size={36} color="#0ea5e9" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 16 }}>
          <Stethoscope size={48} color="#e2e8f0" style={{ marginBottom: 12 }} />
          <p style={{ color: '#64748b', fontWeight: 600 }}>No doctors found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {filtered.map(doc => (
            <div key={doc._id} className="dr-card">

              <div style={{ height: 6, background: `linear-gradient(90deg, ${specColors[doc.speciality] || '#0ea5e9'}, ${specColors[doc.speciality] || '#38bdf8'}99)` }} />
              <div style={{ padding: 18 }}>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${specColors[doc.speciality] || '#0ea5e9'}22, ${specColors[doc.speciality] || '#0ea5e9'}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Stethoscope size={24} color={specColors[doc.speciality] || '#0ea5e9'} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 3 }}>{doc.name}</h3>
                    <span style={{ background: `${specColors[doc.speciality] || '#0ea5e9'}18`, color: specColors[doc.speciality] || '#0ea5e9', fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>{doc.speciality}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal({ doctor: doc })} title="Edit"
                      style={{ padding: 7, border: 'none', borderRadius: 8, background: '#f0f9ff', cursor: 'pointer', display: 'flex' }}>
                      <Pencil size={15} color="#0ea5e9" />
                    </button>
                    <button onClick={() => handleDelete(doc._id, doc.name)} title="Delete"
                      style={{ padding: 7, border: 'none', borderRadius: 8, background: '#fef2f2', cursor: 'pointer', display: 'flex' }}>
                      <Trash2 size={15} color="#ef4444" />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: '0.8rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Building2 size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{doc.hospital || 'MediCare+'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <MapPin size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{doc.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" /> {doc.rating} ({doc.reviews} reviews)
                    </span>
                    <span style={{ fontWeight: 700, color: '#0ea5e9' }}>₹{doc.fee}</span>
                  </div>
                </div>


                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: doc.isActive ? '#dcfce7' : '#fee2e2', color: doc.isActive ? '#16a34a' : '#dc2626' }}>
                    {doc.isActive ? '● Active' : '● Inactive'}
                  </span>
                  <button onClick={() => setExpandedId(expandedId === doc._id ? null : doc._id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}>
                    <Clock size={13} /> Schedule {expandedId === doc._id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>

                {expandedId === doc._id && (
                  <div style={{ marginTop: 12, background: '#f8fafc', borderRadius: 10, padding: 12 }}>
                    {doc.availability?.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>No schedule set</p>
                    ) : (
                      doc.availability.map(({ day, slots }) => (
                        <div key={day} style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: 4 }}>{day}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {slots.map(s => (
                              <span key={s} style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 6 }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}


      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <div>
                <h2 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.3rem' }}>
                  {modal === 'add' ? '➕ Add New Doctor' : '✏️ Edit Doctor'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.82rem' }}>Fill in the details and set schedule below</p>
              </div>
              <button onClick={() => setModal(null)} style={{ border: 'none', background: '#f1f5f9', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
                <X size={18} color="#64748b" />
              </button>
            </div>
            <DoctorForm
              initial={modal === 'add' ? null : { ...modal.doctor, experience: modal.doctor.experience?.toString(), fee: modal.doctor.fee?.toString() }}
              onSave={handleSave}
              onCancel={() => setModal(null)}
              saving={saving}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDoctors;
