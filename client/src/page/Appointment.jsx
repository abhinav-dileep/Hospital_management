import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  CalendarCheck2, Loader2, RefreshCw, History,
  CheckCircle2, XCircle, ScanLine,
} from "lucide-react";
import ApptHero from "../components/appointment/ApptHero";
import FindDoctorSection from "../components/appointment/FindDoctorSection";
import BookingModal from "../components/appointment/BookingModal";
import AppointmentCard from "../components/appointment/AppointmentCard";
import ScanSection from "../components/appointment/ScanSection";
import "./Appointment.css";

const API_BASE = "http://localhost:4000/api";

const ACTIVE_STATUSES   = ["Pending", "Confirmed"];
const HISTORY_STATUSES  = ["Completed", "Cancelled"];

const getDoctorSpecialities = async () => {
  try {
    const res = await axios.get(`${API_BASE}/doctors/specialities`);
    return res.data.specialities || [];
  } catch { return []; }
};

const getDoctors = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.speciality) params.append("speciality", filters.speciality);
    if (filters.search)     params.append("search",     filters.search);
    const res = await axios.get(`${API_BASE}/doctors?${params.toString()}`);
    return res.data.doctors || [];
  } catch { return []; }
};

const getMyAppointments = async (patientId) => {
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

/* ══════════════════════════════════
   SCAN BOOKING CARD  (no doctor)
══════════════════════════════════ */
const ScanCard = ({ appt, onCancel, cancelling }) => {
  const scanName = appt.reason?.split("—")[0]?.trim() || "Diagnostic Scan";
  const fmtDate = (d) => {
    if (!d) return "";
    const [y, m, day] = d.split("-");
    return new Date(+y, +m - 1, +day).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const STATUS = {
    Pending:   { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", label: "Pending",   icon: "🕐" },
    Confirmed: { color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", label: "Confirmed", icon: "✅" },
    Completed: { color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0", label: "Completed", icon: "✔️" },
    Cancelled: { color: "#ef4444", bg: "#fef2f2", border: "#fecaca", label: "Cancelled", icon: "❌" },
  };
  const cfg = STATUS[appt.status] || STATUS.Pending;

  return (
    <div className="my-appt-card">
      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        borderRadius: 20, padding: "3px 10px",
        fontSize: "0.72rem", fontWeight: 700, color: cfg.color, marginBottom: 12,
      }}>
        {cfg.icon} {cfg.label}
      </div>

      {/* Icon + info */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: "rgba(124,58,237,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem",
        }}>
          🧲
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem", margin: 0 }}>{scanName}</p>
          <p style={{ color: "#7c3aed", fontSize: "0.78rem", fontWeight: 600, margin: "2px 0 0" }}>Diagnostic Scan</p>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed #e2e8f0", margin: "12px 0" }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 10 }}>
        <span style={{ fontSize: "0.78rem", color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "4px 10px" }}>
          📅 {fmtDate(appt.date)}
        </span>
        <span style={{ fontSize: "0.78rem", color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "4px 10px" }}>
          🕐 {appt.slot}
        </span>
        {appt.reason && (
          <span style={{ fontSize: "0.75rem", color: "#64748b", background: "#f8f5ff", borderRadius: 6, padding: "4px 10px", fontStyle: "italic" }}>
            📋 {appt.reason.length > 50 ? appt.reason.slice(0, 50) + "…" : appt.reason}
          </span>
        )}
      </div>

      {appt.status === "Pending" && (
        <button
          disabled={cancelling}
          onClick={() => onCancel(appt._id)}
          style={{
            width: "100%", padding: "7px", borderRadius: 8,
            border: "1.5px solid #fecaca", background: "#fff5f5",
            color: "#ef4444", fontWeight: 600, fontSize: "0.8rem",
            cursor: cancelling ? "not-allowed" : "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            transition: "all .2s", opacity: cancelling ? 0.7 : 1,
          }}
        >
          {cancelling ? <Loader2 size={14} className="spin" /> : <XCircle size={14} />}
          {cancelling ? "Cancelling…" : "Cancel Booking"}
        </button>
      )}
    </div>
  );
};

/* ══════════════════════════════════
   CURRENT BOOKINGS SECTION
══════════════════════════════════ */
const CurrentBookings = ({ appts, loading, cancellingId, onCancel, onRefresh }) => {
  if (!appts.length && !loading) return null;

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <div className="section-heading">
        <h2>
          <CalendarCheck2 size={20} color="#0ea5e9" />
          Current Bookings
          {appts.length > 0 && (
            <span style={{ background: "#0ea5e9", color: "#fff", borderRadius: 20, padding: "1px 9px", fontSize: "0.72rem", fontWeight: 700 }}>
              {appts.length}
            </span>
          )}
        </h2>
        <button onClick={onRefresh} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem" }}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0ea5e9", fontSize: "0.9rem", padding: "1rem 0" }}>
          <Loader2 size={20} className="spin" /> Loading your bookings…
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1rem" }}>
          {appts.map(appt =>
            !appt.doctor ? (
              <ScanCard
                key={appt._id}
                appt={appt}
                onCancel={onCancel}
                cancelling={cancellingId === appt._id}
              />
            ) : (
              <AppointmentCard
                key={appt._id}
                appt={appt}
                onCancel={onCancel}
                cancelling={cancellingId === appt._id}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════
   APPOINTMENT HISTORY SECTION
══════════════════════════════════ */
const AppointmentHistory = ({ appts, loading }) => {
  const [expanded, setExpanded] = useState(false);

  if (loading || !appts.length) return null;

  const shown = expanded ? appts : appts.slice(0, 3);

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <div className="section-heading">
        <h2>
          <History size={20} color="#8b5cf6" />
          Appointment History
          <span style={{ background: "#8b5cf6", color: "#fff", borderRadius: 20, padding: "1px 9px", fontSize: "0.72rem", fontWeight: 700 }}>
            {appts.length}
          </span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1rem" }}>
        {shown.map(appt =>
          !appt.doctor ? (
            <ScanCard key={appt._id} appt={appt} onCancel={() => {}} cancelling={false} />
          ) : (
            <AppointmentCard key={appt._id} appt={appt} onCancel={() => {}} cancelling={false} />
          )
        )}
      </div>

      {appts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: "1rem", display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "1.5px solid #e2e8f0", borderRadius: 10,
            padding: "8px 18px", cursor: "pointer", fontFamily: "inherit",
            fontSize: "0.82rem", fontWeight: 700, color: "#64748b",
            transition: "all 0.18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.color = "#8b5cf6"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}
        >
          {expanded ? "Show less ▲" : `Show all ${appts.length} records ▼`}
        </button>
      )}
    </div>
  );
};

/* ══════════════════════════════════
   APPOINTMENT PAGE
══════════════════════════════════ */
const Appointment = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const location = useLocation();

  /* ── Scroll to top on mount/navigate ── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* ── Auto-scroll to scan section if ?section=scans ── */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("section") === "scans" && scanRef.current) {
      setTimeout(() => {
        scanRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [location.search]);

  /* ── Doctor search ── */
  const [doctors, setDoctors]       = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [selSpec, setSelSpec]       = useState(
    () => new URLSearchParams(location.search).get("speciality") || ""
  );
  const [modalDoctor, setModalDoctor] = useState(null);
  const scanRef = useRef(null);

  /* ── All appointments ── */
  const [allAppts, setAllAppts]         = useState([]);
  const [apptLoading, setApptLoading]   = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const activeAppts  = allAppts.filter(a => ACTIVE_STATUSES.includes(a.status));
  const historyAppts = allAppts.filter(a => HISTORY_STATUSES.includes(a.status));

  /* ── Fetch specialities ── */
  useEffect(() => {
    getDoctorSpecialities().then(setSpecialities);
  }, []);

  /* ── Fetch doctors ── */
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setDoctors(await getDoctors({ speciality: selSpec, search }));
    setLoading(false);
  }, [selSpec, search]);

  useEffect(() => {
    const t = setTimeout(fetchDoctors, 350);
    return () => clearTimeout(t);
  }, [fetchDoctors]);

  /* ── Fetch appointments ── */
  const fetchAppts = useCallback(async () => {
    if (!user._id) return;
    setApptLoading(true);
    setAllAppts(await getMyAppointments(user._id));
    setApptLoading(false);
  }, [user._id]);

  useEffect(() => { fetchAppts(); }, [fetchAppts]);

  /* ── Cancel ── */
  const handleCancel = async (id) => {
    setCancellingId(id);
    const result = await cancelAppointmentApi(id);
    setCancellingId(null);
    if (result.success) {
      toast.success("Booking cancelled — moved to Appointment History");
      fetchAppts();
    } else {
      toast.error(result.message || "Failed to cancel");
    }
  };

  /* ── After booking, refresh the list ── */
  const handleBookingSuccess = () => {
    setModalDoctor(null);
    toast.success("Appointment booked! You can see it in Current Bookings.");
    fetchAppts();
  };

  return (
    <div className="appt-page">

      {/* Hero / Search */}
      <ApptHero
        search={search}
        onSearchChange={setSearch}
        onClear={() => setSearch("")}
      />

      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>

        {/* ── Find a Doctor ── */}
        <FindDoctorSection
          doctors={doctors}
          specialities={specialities}
          loading={loading}
          selSpec={selSpec}
          onSpecChange={setSelSpec}
          onBook={setModalDoctor}
          onClearFilters={() => { setSearch(""); setSelSpec(""); }}
        />

        {/* ── Diagnostic Scans ── */}
        <ScanSection ref={scanRef} onScanBooked={fetchAppts} />

        {/* ── Current Bookings (logged-in users only) ── */}
        {user._id && (
          <CurrentBookings
            appts={activeAppts}
            loading={apptLoading}
            cancellingId={cancellingId}
            onCancel={handleCancel}
            onRefresh={fetchAppts}
          />
        )}

        {/* ── Appointment History (logged-in users only) ── */}
        {user._id && (
          <AppointmentHistory
            appts={historyAppts}
            loading={apptLoading}
          />
        )}
      </div>

      {/* Booking Modal */}
      {modalDoctor && (
        <BookingModal
          doctor={modalDoctor}
          onClose={() => setModalDoctor(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Appointment;
