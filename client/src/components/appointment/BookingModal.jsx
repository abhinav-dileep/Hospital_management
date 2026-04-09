import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  X, Loader2, User, Mail, IndianRupee, CalendarCheck,
} from "lucide-react";

const today = () => new Date().toISOString().split("T")[0];
const fmtSlot = (slot) => {
  if (!slot) return slot;
  const [time, period] = slot.split(" ");
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10); const m = parseInt(mStr, 10);
  let h24 = period === "PM" && h !== 12 ? h + 12 : period === "AM" && h === 12 ? 0 : h;
  h24 = (h24 + 1) % 24;
  const endH = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${slot} to ${endH}:${String(m).padStart(2,"0")} ${h24 < 12 ? "AM" : "PM"}`;
};

const API_BASE = 'http://localhost:4000/api';

const getBookedSlots = async (doctorId, date) => {
  try {
    const res = await axios.get(`${API_BASE}/appointments/booked-slots?doctorId=${doctorId}&date=${date}`);
    return { success: true, bookedSlots: res.data.bookedSlots };
  } catch (err) {
    return { success: false, bookedSlots: [] };
  }
};

const bookAppointment = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/appointments`, data);
    return { success: true, appointment: res.data.appointment, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

const BookingModal = ({ doctor, onClose, onSuccess }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [date, setDate] = useState(today());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    patientName: user.name || "",
    patientPhone: user.phone || "",
    patientEmail: user.email || "",
    age: "", gender: "Male", reason: "",
  });

  const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
  const availSlots = (doctor.availability?.find((a) => a.day === dayName)?.slots) || [];

  useEffect(() => {
    if (!doctor._id || !date) return;
    setLoadingSlots(true);
    setSlot("");
    getBookedSlots(doctor._id, date).then(({ bookedSlots: bs }) => {
      setBookedSlots(bs || []);
      setLoadingSlots(false);
    });
  }, [doctor._id, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) { toast.error("Please select a time slot"); return; }
    if (!user._id) { toast.error("Please log in first"); return; }

    setSubmitting(true);
    const result = await bookAppointment({
      patient: user._id,
      patientName: form.patientName,
      patientPhone: form.patientPhone,
      patientEmail: form.patientEmail,
      age: Number(form.age) || undefined,
      gender: form.gender,
      doctor: doctor._id,
      date,
      slot: selectedSlot,
      reason: form.reason,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("Appointment booked! ✅");
      onSuccess();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div className="appt-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontWeight: 800, color: "#0f172a", margin: 0, fontSize: "1.1rem" }}>Book Appointment</h3>
            <p style={{ color: "#64748b", fontSize: "0.82rem", margin: 0 }}>
              {doctor.name} · {doctor.speciality}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "#64748b" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="appt-field">
            <label>Appointment Date</label>
            <input type="date" value={date} min={today()} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div>
            <label className="appt-field-label">Select Time Slot</label>
            {loadingSlots ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: "0.85rem", padding: "8px 0" }}>
                <Loader2 size={16} className="spin" /> Loading slots…
              </div>
            ) : availSlots.length === 0 ? (
              <p style={{ color: "#f59e0b", fontSize: "0.82rem", margin: "6px 0", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px" }}>
                ⚠ No slots available on {dayName}. Pick another date.
              </p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {availSlots.slice(0, -1).map((slot, i) => {
                  const label = `${slot} to ${availSlots[i + 1]}`;
                  const booked = bookedSlots.includes(slot);
                  return (
                    <button
                      key={slot} type="button"
                      disabled={booked}
                      onClick={() => setSlot(slot)}
                      className={`appt-slot-btn ${selectedSlot === slot ? "selected" : ""} ${booked ? "booked" : ""}`}
                    >
                      {label} {booked && "(Full)"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="appt-field" style={{ gridColumn: "1/-1" }}>
              <label><User size={13} /> Full Name</label>
              <input type="text" required placeholder="Your full name"
                value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
            </div>
            <div className="appt-field">
              <label>📞 Phone</label>
              <input type="tel" required placeholder="+91 9999999999"
                value={form.patientPhone} onChange={(e) => setForm({ ...form, patientPhone: e.target.value })} />
            </div>
            <div className="appt-field">
              <label>Age</label>
              <input type="number" placeholder="25" min={1} max={120}
                value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="appt-field">
              <label><Mail size={13} /> Email (optional)</label>
              <input type="email" placeholder="you@example.com"
                value={form.patientEmail} onChange={(e) => setForm({ ...form, patientEmail: e.target.value })} />
            </div>
            <div className="appt-field">
              <label>Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>

          <div className="appt-field" style={{ gridColumn: "1/-1" }}>
            <label>Reason / Symptoms (optional)</label>
            <textarea placeholder="Briefly describe your symptoms or reason for visit…" rows={3}
              value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 14px" }}>
            <IndianRupee size={14} color="#0369a1" />
            <span style={{ fontSize: "0.82rem", color: "#0369a1", fontWeight: 600 }}>
              Consultation fee: ₹{doctor.fee} — payable at the hospital.
            </span>
          </div>

          <button type="submit" disabled={submitting} className="appt-submit-btn">
            {submitting ? <><Loader2 size={17} className="spin" /> Booking…</> : <><CalendarCheck size={17} /> Confirm Appointment</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
