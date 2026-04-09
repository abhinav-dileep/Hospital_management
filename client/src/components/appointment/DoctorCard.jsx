import React from "react";
import { Clock, MapPin, Stethoscope, IndianRupee, ChevronRight } from "lucide-react";

const avatarColor = (name = "") => {
  const colors = ["#0ea5e9","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#f43f5e","#6366f1"];
  return colors[name.charCodeAt(0) % colors.length];
};
const initials = (name = "") => name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

const DoctorCard = ({ doctor, onBook }) => (
  <div className="appt-doctor-card" onClick={() => onBook(doctor)}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
      <div style={{
        width: 56, height: 56, borderRadius: "14px",
        background: avatarColor(doctor.name),
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0,
      }}>
        {initials(doctor.name)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem", margin: 0, lineHeight: 1.3 }}>{doctor.name}</p>
        <p style={{ color: "#0ea5e9", fontSize: "0.8rem", fontWeight: 600, margin: "2px 0" }}>{doctor.speciality}</p>
        <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0 }}>{doctor.qualification}</p>
      </div>
    </div>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
      {[
        { icon: <Clock size={12} color="#64748b" />, text: `${doctor.experience} yrs exp` },
        { icon: <MapPin size={12} color="#64748b" />, text: doctor.location },
      ].map(({ icon, text }) => (
        <span key={text} style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          background: "#f1f5f9", borderRadius: "6px",
          padding: "3px 9px", fontSize: "0.73rem", color: "#475569",
        }}>
          {icon} {text}
        </span>
      ))}
    </div>

    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}>
      <Stethoscope size={13} /> {doctor.hospital}
    </p>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: 3 }}>
        <IndianRupee size={14} /> {doctor.fee}
        <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: "0.78rem" }}> / visit</span>
      </span>
      <button className="appt-book-btn">
        Book Now <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

export default DoctorCard;
