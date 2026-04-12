import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { CalendarCheck2, Loader2, RefreshCw } from "lucide-react";
import ApptHero from "../components/appointment/ApptHero";
import FindDoctorSection from "../components/appointment/FindDoctorSection";
import BookingModal from "../components/appointment/BookingModal";
import AppointmentCard from "../components/appointment/AppointmentCard";
import "./Appointment.css";

const API_BASE = "http://localhost:4000/api";

const ACTIVE_STATUSES = ["Pending", "Confirmed"];

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
    if (filters.search) params.append("search", filters.search);
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
          {appts.map(appt => (
            <AppointmentCard
              key={appt._id}
              appt={appt}
              onCancel={onCancel}
              cancelling={cancellingId === appt._id}
            />
          ))}
        </div>
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

  /* ── Doctor search ── */
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selSpec, setSelSpec] = useState(
    () => new URLSearchParams(location.search).get("speciality") || ""
  );
  const [modalDoctor, setModalDoctor] = useState(null);

  /* ── Current bookings ── */
  const [allAppts, setAllAppts] = useState([]);
  const [apptLoading, setApptLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const activeAppts = allAppts.filter(a => ACTIVE_STATUSES.includes(a.status));

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

  /* ── Fetch current bookings ── */
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
      toast.success("Appointment cancelled — moved to Appointment History");
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
