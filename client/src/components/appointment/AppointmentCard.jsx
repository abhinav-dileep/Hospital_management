import React from "react";
import { Clock, CalendarDays, Stethoscope, AlertCircle, Loader2, XCircle, Clock3, CheckCircle2 } from "lucide-react";

const avatarColor = (name = "") => {
  const colors = ["#0ea5e9","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#f43f5e","#6366f1"];
  return colors[name.charCodeAt(0) % colors.length];
};
const initials = (name = "") => name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
const fmtDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return new Date(+y, +m - 1, +d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
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
const STATUS_CONFIG = {
  Pending:   { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", icon: <Clock3 size={13} /> },
  Confirmed: { color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", icon: <CheckCircle2 size={13} /> },
  Completed: { color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0", icon: <CheckCircle2 size={13} /> },
  Cancelled: { color: "#ef4444", bg: "#fef2f2", border: "#fecaca", icon: <XCircle size={13} /> },
};

const AppointmentCard = ({ appt, onCancel, cancelling }) => {
  const cfg = STATUS_CONFIG[appt.status] || STATUS_CONFIG.Pending;
  const doc = appt.doctor || {};

  return (
    <div className="my-appt-card">
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        borderRadius: 20, padding: "3px 10px",
        fontSize: "0.72rem", fontWeight: 700, color: cfg.color,
        marginBottom: 12,
      }}>
        {cfg.icon} {appt.status}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: avatarColor(doc.name || "D"),
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: "0.95rem",
        }}>
          {initials(doc.name || "Dr")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem", margin: 0 }}>{doc.name || "Doctor"}</p>
          <p style={{ color: "#0ea5e9", fontSize: "0.78rem", fontWeight: 600, margin: "2px 0" }}>{appt.speciality}</p>
          {doc.hospital && (
            <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
              <Stethoscope size={11} /> {doc.hospital}
            </p>
          )}
        </div>
      </div>

      <div style={{ borderTop: "1px dashed #e2e8f0", margin: "12px 0" }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "4px 10px" }}>
          <CalendarDays size={12} /> {fmtDate(appt.date)}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "4px 10px" }}>
          <Clock size={12} /> {fmtSlot(appt.slot)}
        </span>
        {appt.reason && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "4px 10px" }}>
            <AlertCircle size={12} /> {appt.reason.slice(0, 30)}{appt.reason.length > 30 ? "…" : ""}
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
          {cancelling ? "Cancelling…" : "Cancel Appointment"}
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
