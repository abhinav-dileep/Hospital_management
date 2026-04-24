import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  X, Loader2, User, Mail, IndianRupee, CreditCard, Video, Hospital,
} from "lucide-react";

const today = () => new Date().toISOString().split("T")[0];

const API_BASE = "http://localhost:4000/api";

const getBookedSlots = async (doctorId, date) => {
  try {
    const res = await axios.get(
      `${API_BASE}/appointments/booked-slots?doctorId=${doctorId}&date=${date}`
    );
    return {
      success: true,
      bookedSlots: res.data.bookedSlots ?? [],
      slotCounts: res.data.slotCounts ?? {},
    };
  } catch {
    return { success: false, bookedSlots: [], slotCounts: {} };
  }
};



/* ─── Styles unique to BookingModal (not in Appointment.css) ─────────────── */
const modalCSS = `
  /* Appointment type toggle buttons */
  .appt-type-btn {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 7px; padding: 10px 0; border-radius: 10px; border: 2px solid #e2e8f0;
    background: #f8fafc; cursor: pointer; font-size: 0.85rem; font-weight: 700;
    color: #64748b; transition: all 0.18s;
  }
  .appt-type-btn:hover { border-color: #0ea5e9; }
  .appt-type-btn.selected-inperson { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
  .appt-type-btn.selected-video    { background: #eff6ff; border-color: #1d4ed8; color: #1d4ed8; }

  /* Slot buttons */
  .appt-slot-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .appt-slot-btn.partial { border-color: #f59e0b; }
  .appt-slot-btn.selected .slot-cap { color: #bae6fd; }
  .slot-cap { font-size: 0.65rem; font-weight: 600; color: #94a3b8; }
  .slot-cap.low { color: #f59e0b; }
  .appt-modal-overlay { z-index: 1200 !important; }

  /* ── Unavailable day warning ── */
  .bm-warn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 9px;
    padding: 8px 12px;
    font-size: 0.78rem;
    color: #92400e;
    font-weight: 600;
  }
`;

/* ─── Component ──────────────────────────────────────────────────────────── */
const BookingModal = ({ doctor, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [date, setDate] = useState(today());
  const [slotCounts, setSlotCounts] = useState({});
  const [selectedSlot, setSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [form, setForm] = useState({
    patientName: user.name || "",
    patientPhone: user.phone || "",
    patientEmail: user.email || "",
    age: "",
    gender: "Male",
    reason: "",
  });

  const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
  const dayAvailability = doctor.availability?.find((a) => a.day === dayName);
  const availSlots = dayAvailability?.slots || [];
  const maxPerSlot = dayAvailability?.maxPatientsPerSlot ?? 1;

  useEffect(() => {
    if (!doctor._id || !date) return;
    setLoadingSlots(true);
    setSlot("");
    getBookedSlots(doctor._id, date).then(({ slotCounts: sc }) => {
      setSlotCounts(sc || {});
      setLoadingSlots(false);
    });
  }, [doctor._id, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) { toast.error("Please select a time slot"); return; }
    if (!user._id) { toast.error("Please log in first"); return; }
    if (appointmentType === "video-call" && !doctor.allowsVideoCall) {
      toast.error("This doctor does not offer video consultations"); return;
    }

    /* Navigate to the payment page — pass all booking info as state */
    navigate("/payment", {
      state: {
        doctorName: doctor.name,
        speciality: doctor.speciality,
        fee: doctor.fee,
        date,
        slot: selectedSlot,
        appointmentType,
        patientName: form.patientName,
        /* payload to POST after payment succeeds */
        appointmentData: {
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
          appointmentType,
        },
      },
    });
    onClose();
  };

  /* Render slot buttons */
  const renderSlots = () => {
    if (loadingSlots)
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: "0.85rem", padding: "8px 0" }}>
          <Loader2 size={16} className="spin" /> Loading slots…
        </div>
      );

    if (availSlots.length === 0)
      return (
        <p style={{ color: "#f59e0b", fontSize: "0.82rem", margin: "6px 0", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px" }}>
          ⚠ No slots available on {dayName}. Pick another date.
        </p>
      );

    const startSlot = availSlots[0];
    const endSlot = availSlots[availSlots.length - 1];

    // Create a single block for the entire shift
    const slotStr = startSlot === endSlot ? startSlot : `${startSlot} – ${endSlot}`;

    const slotPairs = [{
      slot: slotStr,
      label: slotStr,
    }];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
        {slotPairs.map(({ slot, label }) => {
          const booked = (slotCounts[slot] || 0) >= maxPerSlot;
          const remaining = maxPerSlot - (slotCounts[slot] || 0);
          const isPartial = !booked && remaining < maxPerSlot && maxPerSlot > 1;
          return (
            <button
              key={slot}
              type="button"
              disabled={booked}
              onClick={() => setSlot(slot)}
              className={`appt-slot-btn${selectedSlot === slot ? " selected" : ""}${booked ? " booked" : ""}${isPartial ? " partial" : ""}`}
            >
              <span>{label}</span>
              {maxPerSlot > 1 && (
                <span className={`slot-cap${remaining <= 2 && !booked ? " low" : ""}`}>
                  {booked ? "Full" : `${remaining} left`}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <style>{modalCSS}</style>
      <div className="appt-modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontWeight: 800, color: "#0f172a", margin: 0, fontSize: "1.1rem" }}>Book Appointment</h3>
            <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "3px 0 0" }}>
              {doctor.name} · {doctor.speciality}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "#64748b" }}>
            <X size={18} />
          </button>
        </div>


        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Appointment Type */}
          {doctor.allowsVideoCall && (
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#374151", marginBottom: 8 }}>
                Appointment Type
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setAppointmentType("in-person")}
                  className={`appt-type-btn${appointmentType === "in-person" ? " selected-inperson" : ""}`}
                >
                  <Hospital size={16} /> In-Person
                </button>
                <button
                  type="button"
                  onClick={() => setAppointmentType("video-call")}
                  className={`appt-type-btn${appointmentType === "video-call" ? " selected-video" : ""}`}
                >
                  <Video size={16} /> Video Call
                </button>
              </div>
              {appointmentType === "video-call" && (
                <p style={{ fontSize: "0.75rem", color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "7px 11px", marginTop: 8 }}>
                  🎥 A video link will be shared before your appointment.
                </p>
              )}
            </div>
          )}

          {/* Date */}
          <div className="appt-field">
            <label>Appointment Date</label>
            <input type="date" value={date} min={today()} onChange={(e) => setDate(e.target.value)} required />
          </div>

          {/* Unavailable day warning */}
          {doctor.availability?.length > 0 && !doctor.availability.find((a) => a.day === dayName) && (
            <div className="bm-warn">
              ⚠️ Dr. {doctor.name.split(" ")[0]} is not available on {dayName}s.
              Available days: {doctor.availability.map((a) => a.day.slice(0, 3)).join(", ")}.
            </div>
          )}

          {/* Slot picker */}
          <div>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#374151", marginBottom: 4 }}>
              <span>Select Time Slot</span>
              {maxPerSlot > 1 && availSlots.length > 0 && !loadingSlots && (
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: 10 }}>
                  Up to {maxPerSlot} patients per slot
                </span>
              )}
            </label>
            {renderSlots()}
          </div>

          {/* Patient info */}
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

          <div className="appt-field">
            <label>Reason / Symptoms (optional)</label>
            <textarea placeholder="Briefly describe your symptoms or reason for visit…" rows={3}
              value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          </div>

          {/* Fee notice */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 14px" }}>
            <IndianRupee size={14} color="#0369a1" />
            <span style={{ fontSize: "0.82rem", color: "#0369a1", fontWeight: 600 }}>
              Consultation fee: ₹{doctor.fee} — payable at the {appointmentType === "video-call" ? "time of call" : "hospital"}.
            </span>
          </div>

          <button type="submit" disabled={submitting} className="appt-submit-btn">
            <CreditCard size={17} /> Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
