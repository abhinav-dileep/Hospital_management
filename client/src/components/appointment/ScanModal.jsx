import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { X, User, Mail, Phone, CreditCard, CalendarDays } from "lucide-react";

const today = () => new Date().toISOString().split("T")[0];

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

const ScanModal = ({ scan, onClose }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [date, setDate] = useState(today());
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({
    name:   user.name  || "",
    phone:  user.phone || "",
    email:  user.email || "",
    age:    "",
    gender: "Male",
    notes:  "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slot)             { toast.error("Please select a time slot"); return; }
    if (!form.name.trim()) { toast.error("Please enter your name");    return; }
    if (!form.phone.trim()){ toast.error("Please enter phone number"); return; }
    if (!user._id)         { toast.error("Please log in first");       return; }

    navigate("/payment", {
      state: {
        doctorName:      scan.name,
        speciality:      "Diagnostic Scan",
        fee:             scan.fee,
        date,
        slot,
        appointmentType: "in-person",
        patientName:     form.name,
        appointmentData: {
          patient:      user._id,
          patientName:  form.name,
          patientPhone: form.phone,
          patientEmail: form.email,
          age:          Number(form.age) || undefined,
          gender:       form.gender,
          doctor:       null,           // no doctor for scans
          date,
          slot,
          reason:       `${scan.name} — ${form.notes || "No additional notes"}`,
          appointmentType: "in-person",
        },
      },
    });
    onClose();
  };

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <style>{scanModalCss}</style>
      <div className="appt-modal-card" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="sm-header">
          <div className="sm-header-left">
            <div className="sm-icon-badge" style={{ background: scan.color }}>
              <span className="sm-emoji">{scan.icon}</span>
            </div>
            <div>
              <h3 className="sm-title">Book {scan.name}</h3>
              <p className="sm-sub">{scan.desc} · Est. ₹{scan.fee}</p>
            </div>
          </div>
          <button className="sm-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="sm-form">

          {/* Date */}
          <div className="appt-field">
            <label><CalendarDays size={13} /> Preferred Date</label>
            <input
              type="date"
              value={date}
              min={today()}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time slots */}
          <div>
            <label className="appt-field-label">Select Time Slot</label>
            <div className="sm-slots">
              {TIME_SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`appt-slot-btn${slot === s ? " selected" : ""}`}
                  onClick={() => setSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Patient info */}
          <div className="sm-grid">
            <div className="appt-field sm-full">
              <label><User size={13} /> Full Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="appt-field">
              <label><Phone size={13} /> Phone</label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="+91 9999999999"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="appt-field">
              <label>Age</label>
              <input
                name="age"
                type="number"
                placeholder="25"
                min={1} max={120}
                value={form.age}
                onChange={handleChange}
              />
            </div>

            <div className="appt-field">
              <label><Mail size={13} /> Email (optional)</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="appt-field">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="appt-field">
            <label>Additional Notes (optional)</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Any specific concerns or prior reports…"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          {/* Fee notice */}
          <div className="sm-fee-notice">
            <span>💳</span>
            <span>Estimated cost: <strong>₹{scan.fee}</strong> — payable at the centre.</span>
          </div>

          <button type="submit" className="appt-submit-btn">
            <CreditCard size={17} /> Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

const scanModalCss = `
  .sm-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 10px;
  }
  .sm-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sm-icon-badge {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .sm-emoji { font-size: 1.5rem; }
  .sm-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 2px;
  }
  .sm-sub {
    font-size: 0.78rem;
    color: #64748b;
    margin: 0;
  }
  .sm-close {
    background: #f1f5f9;
    border: none;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    color: #64748b;
    flex-shrink: 0;
  }
  .sm-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .sm-slots {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
  .sm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .sm-full { grid-column: 1 / -1; }
  .sm-fee-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 9px;
    padding: 9px 13px;
    font-size: 0.82rem;
    color: #0369a1;
  }
`;

export default ScanModal;
