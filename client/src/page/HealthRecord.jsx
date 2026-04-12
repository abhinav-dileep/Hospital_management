import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  History, HeartPulse, ShieldPlus,
  Loader2, RefreshCw, ChevronDown, ChevronUp,
  FileText, FlaskConical, Pill, Syringe, ClipboardList,
  Calendar as CalIcon, User, ExternalLink,
} from "lucide-react";
import AppointmentCard from "../components/appointment/AppointmentCard";
import "./HealthRecord.css";

const API_BASE = "http://localhost:4000/api";

/* Only completed/cancelled go to history; active ones live on the Appointment page */
const DONE_STATUSES = ["Completed", "Cancelled"];

/* ── API helpers ── */
const fetchMyAppointments = async (patientId) => {
  try {
    const res = await axios.get(`${API_BASE}/appointments/my/${patientId}`);
    return res.data.appointments || [];
  } catch { return []; }
};

const cancelAppointmentApi = async (id) => {
  try {
    const res = await axios.patch(`${API_BASE}/appointments/${id}/cancel`);
    return { success: true, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

const fetchHealthRecords = async (patientId) => {
  try {
    const res = await axios.get(`${API_BASE}/admin/health-records/${patientId}`);
    return res.data.records || [];
  } catch { return []; }
};

/* ── Record type config ── */
const TYPE_CONFIG = {
  "Scan Report":       { icon: <FileText    size={16} />, color: "#6366f1", bg: "#eef2ff" },
  "Prescription":      { icon: <Pill         size={16} />, color: "#10b981", bg: "#d1fae5" },
  "Lab Result":        { icon: <FlaskConical  size={16} />, color: "#f59e0b", bg: "#fef3c7" },
  "Discharge Summary": { icon: <ClipboardList size={16} />, color: "#0ea5e9", bg: "#e0f2fe" },
  "Vaccination":       { icon: <Syringe       size={16} />, color: "#ec4899", bg: "#fce7f3" },
  "Other":             { icon: <HeartPulse    size={16} />, color: "#64748b", bg: "#f1f5f9" },
};
const TYPES = ["All", ...Object.keys(TYPE_CONFIG)];

/* ══════════════════════
   HEALTH RECORD CARD
══════════════════════ */
const RecordCard = ({ record }) => {
  const cfg = TYPE_CONFIG[record.type] || TYPE_CONFIG["Other"];
  return (
    <div className="hr-card">
      <div className="hr-card-top" style={{ borderLeftColor: cfg.color }}>
        <div className="hr-icon" style={{ background: cfg.bg, color: cfg.color }}>
          {cfg.icon}
        </div>
        <div className="hr-card-info">
          <span className="hr-type-badge" style={{ background: cfg.bg, color: cfg.color }}>
            {record.type}
          </span>
          <h4 className="hr-title">{record.title}</h4>
          <div className="hr-meta">
            <span><CalIcon size={12} /> {record.date}</span>
            {record.doctor && <span><User size={12} /> {record.doctor}</span>}
          </div>
        </div>
      </div>
      {record.description && <p className="hr-description">{record.description}</p>}
      {record.notes && (
        <div className="hr-notes"><span>📝 Notes: </span>{record.notes}</div>
      )}
      {record.fileUrl && (
        <a
          href={`http://localhost:4000/${record.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hr-pdf-btn"
        >
          <ExternalLink size={13} /> View PDF Report
        </a>
      )}
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN HEALTH RECORD PAGE
══════════════════════════════════════ */
const HealthRecord = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab, setActiveTab] = useState("history");

  /* ── Appointments state ── */
  const [appts, setAppts]           = useState([]);
  const [apptLoading, setApptLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [showAll, setShowAll]       = useState(false);

  /* ── Health records state ── */
  const [records, setRecords]       = useState([]);
  const [hrLoading, setHrLoading]   = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");

  /* ── Load appointments (only done = Completed / Cancelled) ── */
  const loadAppts = useCallback(async () => {
    if (!user._id) return;
    setApptLoading(true);
    const all = await fetchMyAppointments(user._id);
    setAppts(all.filter(a => DONE_STATUSES.includes(a.status)));
    setApptLoading(false);
  }, [user._id]);

  /* ── Load health records ── */
  const loadRecords = useCallback(async () => {
    if (!user._id) return;
    setHrLoading(true);
    setRecords(await fetchHealthRecords(user._id));
    setHrLoading(false);
  }, [user._id]);

  useEffect(() => { loadAppts(); loadRecords(); }, [loadAppts, loadRecords]);

  /* ── Cancel appointment ── */
  const handleCancel = async (id) => {
    setCancellingId(id);
    const result = await cancelAppointmentApi(id);
    setCancellingId(null);
    if (result.success) { toast.success("Appointment cancelled"); loadAppts(); }
    else toast.error(result.message || "Failed to cancel");
  };

  /* ── Derived ── */
  const shownAppts  = showAll ? appts : appts.slice(0, 3);
  const hasMore     = appts.length > 3;
  const shownRecs   = typeFilter === "All" ? records : records.filter(r => r.type === typeFilter);

  if (!user._id) {
    return (
      <div className="hr-page">
        <div className="hr-not-logged">
          <div style={{ fontSize: "3rem" }}>🔒</div>
          <h2>Login Required</h2>
          <p>Please <a href="/login">log in</a> to view your health records and appointment history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-page">

      {/* ── Page Hero ── */}
      <div className="hr-hero">
        <div className="hr-hero-inner container">
          <div className="hr-hero-icon">
            <ShieldPlus size={32} color="#fff" />
          </div>
          <div>
            <h1>My Health Portal</h1>
            <p>View your appointment history and all health records added by your doctor.</p>
          </div>
          <div className="hr-hero-stats">
            <div className="hr-stat">
              <span className="hr-stat-num">{appts.length}</span>
              <span className="hr-stat-lbl">Appointments</span>
            </div>
            <div className="hr-stat">
              <span className="hr-stat-num">{records.length}</span>
              <span className="hr-stat-lbl">Health Records</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container hr-body">

        {/* ── Tabs ── */}
        <nav className="hr-tabs">
          <button
            className={`hr-tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <History size={17} /> Appointment History
            {appts.length > 0 && (
              <span className="hr-tab-badge">{appts.length}</span>
            )}
          </button>
          <button
            className={`hr-tab-btn ${activeTab === "records" ? "active" : ""}`}
            onClick={() => setActiveTab("records")}
          >
            <HeartPulse size={17} /> Health Records
            {records.length > 0 && (
              <span className="hr-tab-badge" style={{ background: "#ef4444" }}>{records.length}</span>
            )}
          </button>
        </nav>

        {/* ═══════════════════════════
            TAB: APPOINTMENT HISTORY
        ═══════════════════════════ */}
        {activeTab === "history" && (
          <div className="hr-section">
            <div className="hr-section-head">
              <h2><History size={18} color="#0ea5e9" /> Appointment History</h2>
              <button className="hr-refresh-btn" onClick={loadAppts}>
                <RefreshCw size={13} className={apptLoading ? "spin" : ""} /> Refresh
              </button>
            </div>

            {apptLoading ? (
              <div className="hr-loading"><Loader2 size={20} className="spin" /> Loading appointments…</div>
            ) : appts.length === 0 ? (
              <div className="hr-empty">
                <div>📅</div>
                <h3>No appointments yet</h3>
                <p>Go to the <a href="/appointment">Appointment</a> page to view your current bookings, or book a new one.</p>
              </div>
            ) : (
              <>
                <div className="hr-appt-grid">
                  {shownAppts.map(appt => (
                    <AppointmentCard
                      key={appt._id}
                      appt={appt}
                      onCancel={handleCancel}
                      cancelling={cancellingId === appt._id}
                    />
                  ))}
                </div>
                {hasMore && (
                  <button className="hr-show-more" onClick={() => setShowAll(!showAll)}>
                    {showAll
                      ? <><ChevronUp size={15} /> Show Less</>
                      : <><ChevronDown size={15} /> Show All {appts.length} Appointments</>}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* ═══════════════════════════
            TAB: HEALTH RECORDS
        ═══════════════════════════ */}
        {activeTab === "records" && (
          <div className="hr-section">
            <div className="hr-section-head">
              <h2><HeartPulse size={18} color="#ef4444" /> Health Records</h2>
              <button className="hr-refresh-btn" onClick={loadRecords}>
                <RefreshCw size={13} className={hrLoading ? "spin" : ""} /> Refresh
              </button>
            </div>

            {/* Type filter pills */}
            <div className="hr-type-filters">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`hr-filter-pill ${typeFilter === t ? "active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {hrLoading ? (
              <div className="hr-loading" style={{ color: "#ef4444" }}>
                <Loader2 size={20} className="spin" /> Loading health records…
              </div>
            ) : shownRecs.length === 0 ? (
              <div className="hr-empty">
                <div>🩺</div>
                <h3>No records found</h3>
                <p>Your doctor will add scan reports, prescriptions and test results here.</p>
              </div>
            ) : (
              <div className="hr-records-grid">
                {shownRecs.map(r => <RecordCard key={r._id} record={r} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecord;
