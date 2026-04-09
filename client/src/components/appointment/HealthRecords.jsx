import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HeartPulse, FileText, FlaskConical, Pill, Syringe,
  Loader2, RefreshCw, ClipboardList, Calendar, User, ExternalLink,
} from "lucide-react";

const API_BASE = "http://localhost:4000/api";

const TYPE_CONFIG = {
  "Scan Report":        { icon: <FileText   size={16} />, color: "#6366f1", bg: "#eef2ff" },
  "Prescription":       { icon: <Pill        size={16} />, color: "#10b981", bg: "#d1fae5" },
  "Lab Result":         { icon: <FlaskConical size={16} />, color: "#f59e0b", bg: "#fef3c7" },
  "Discharge Summary":  { icon: <ClipboardList size={16} />, color: "#0ea5e9", bg: "#e0f2fe" },
  "Vaccination":        { icon: <Syringe     size={16} />, color: "#ec4899", bg: "#fce7f3" },
  "Other":              { icon: <HeartPulse  size={16} />, color: "#64748b", bg: "#f1f5f9" },
};

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
            <span><Calendar size={12} /> {record.date}</span>
            {record.doctor && <span><User size={12} /> {record.doctor}</span>}
          </div>
        </div>
      </div>
      {record.description && (
        <p className="hr-description">{record.description}</p>
      )}
      {record.notes && (
        <div className="hr-notes">
          <span>📝 Notes: </span>{record.notes}
        </div>
      )}
      {/* PDF Download Button */}
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

const HealthRecords = ({ patientId }) => {
  const [records, setRecords]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("All");

  const TYPES = ["All", ...Object.keys(TYPE_CONFIG)];

  const load = async () => {
    if (!patientId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/health-records/${patientId}`);
      setRecords(res.data.records || []);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [patientId]);

  const shown = filter === "All" ? records : records.filter(r => r.type === filter);

  return (
    <div className="hr-section">
      {/* Header */}
      <div className="section-heading">
        <h2>
          <HeartPulse size={20} color="#ef4444" />
          Health Records
          {records.length > 0 && (
            <span style={{
              background: "#ef4444", color: "#fff",
              borderRadius: 20, padding: "1px 9px",
              fontSize: "0.72rem", fontWeight: 700,
            }}>
              {records.length}
            </span>
          )}
        </h2>
        <button
          onClick={load}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem" }}
        >
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {/* Filter pills */}
      <div className="hr-filters">
        {TYPES.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`spec-pill ${filter === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#ef4444", padding: "1.5rem 0", fontSize: "0.9rem" }}>
          <Loader2 size={20} className="spin" /> Loading health records…
        </div>
      ) : shown.length === 0 ? (
        <div style={{ background: "#fff", border: "1.5px dashed #e2e8f0", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🩺</div>
          <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>No health records yet</p>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>
            Your doctor will add your scan reports, prescriptions and test results here.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1rem" }}>
          {shown.map(r => <RecordCard key={r._id} record={r} />)}
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
