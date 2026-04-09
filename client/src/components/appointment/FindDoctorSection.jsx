import React from "react";
import { Stethoscope, Loader2 } from "lucide-react";
import DoctorCard from "./DoctorCard";

const SPEC_ICONS = {
  Cardiology: "❤️", Neurology: "🧠", Orthopedics: "🦴", Pediatrics: "👶",
  Dermatology: "🧴", ENT: "👂", Gynecology: "🌸", Ophthalmology: "👁️",
  Psychiatry: "🧘", "General Physician": "🩺", Endocrinology: "⚡",
  Gastroenterology: "🫁", Urology: "💧", Oncology: "🔬", Pulmonology: "🫁",
  Radiology: "🩻",
};

const FindDoctorSection = ({
  doctors, specialities, loading,
  selSpec, onSpecChange,
  onBook, onClearFilters,
}) => (
  <div>
    {/* Section heading */}
    <div className="section-heading">
      <h2>
        <Stethoscope size={20} color="#0ea5e9" />
        Find a Doctor
      </h2>
    </div>

    {/* Speciality pills */}
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "1.5rem" }}>
      <button
        className={`spec-pill ${selSpec === "" ? "active" : ""}`}
        onClick={() => onSpecChange("")}
      >
        🏥 All
      </button>
      {specialities.map((sp) => (
        <button
          key={sp}
          className={`spec-pill ${selSpec === sp ? "active" : ""}`}
          onClick={() => onSpecChange(selSpec === sp ? "" : sp)}
        >
          {SPEC_ICONS[sp] || "🩺"} {sp}
        </button>
      ))}
    </div>

    {/* Results count */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", margin: 0 }}>
        {loading ? "Loading doctors…" : `${doctors.length} Doctor${doctors.length !== 1 ? "s" : ""} Found`}
        {selSpec && <span style={{ color: "#0ea5e9", marginLeft: 8 }}>· {selSpec}</span>}
      </h3>
      {!loading && doctors.length > 0 && (
        <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Sorted by rating</span>
      )}
    </div>

    {/* Grid / empty / loading */}
    {loading ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 260, gap: 12, color: "#0ea5e9", fontSize: ".95rem" }}>
        <Loader2 size={24} className="spin" /> Loading doctors…
      </div>
    ) : doctors.length === 0 ? (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
        <h3 style={{ color: "#0f172a", marginBottom: ".5rem" }}>No doctors found</h3>
        <p style={{ color: "#64748b", fontSize: ".9rem" }}>Try a different speciality or search term.</p>
        <button className="appt-book-btn" style={{ margin: "1rem auto", padding: "10px 20px" }} onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    ) : (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} onBook={onBook} />
        ))}
      </div>
    )}
  </div>
);

export default FindDoctorSection;
