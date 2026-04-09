import React from "react";
import { History, Loader2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

const MyAppointments = ({
  myAppts, apptLoading, cancellingId,
  showAllAppts, setShowAllAppts,
  onCancel, onRefresh,
}) => {
  const shownAppts = showAllAppts ? myAppts : myAppts.slice(0, 3);
  const hasMore = myAppts.length > 3;

  return (
    <div style={{ marginBottom: "2.5rem" }}>

      {/* Section heading */}
      <div className="section-heading">
        <h2>
          <History size={20} color="#0ea5e9" />
          Appointment History
          {myAppts.length > 0 && (
            <span style={{
              background: "#0ea5e9", color: "#fff",
              borderRadius: 20, padding: "1px 9px",
              fontSize: "0.72rem", fontWeight: 700,
            }}>
              {myAppts.length}
            </span>
          )}
        </h2>
        <button
          onClick={onRefresh}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#94a3b8", display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem",
          }}
        >
          <RefreshCw size={14} className={apptLoading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {apptLoading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0ea5e9", padding: "1.5rem 0", fontSize: "0.9rem" }}>
          <Loader2 size={20} className="spin" /> Loading your appointments…
        </div>
      ) : myAppts.length === 0 ? (
        <div style={{
          background: "#fff", border: "1.5px dashed #e2e8f0",
          borderRadius: 16, padding: "2rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📅</div>
          <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>No appointments yet</p>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>
            Book a doctor below and your appointments will appear here.
          </p>
        </div>
      ) : (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1rem",
          }}>
            {shownAppts.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appt={appt}
                onCancel={onCancel}
                cancelling={cancellingId === appt._id}
              />
            ))}
          </div>

          {hasMore && (
            <button className="show-more-btn" onClick={() => setShowAllAppts(!showAllAppts)}>
              {showAllAppts
                ? <><ChevronUp size={16} /> Show Less</>
                : <><ChevronDown size={16} /> Show All {myAppts.length} Appointments</>}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MyAppointments;
