import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Brain,
  Eye,
  Ear,
  Bone,
  Baby,
  Activity,
  Microscope,
  ArrowRight,
  Search,
} from "lucide-react";

const departments = [
  {
    id: "cardiology",
    icon: Heart,
    label: "Cardiology",
    description: "Heart & vascular care",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.2)",
    bg: "rgba(239,68,68,0.08)",
    doctors: 12,
  },
  {
    id: "neurology",
    icon: Brain,
    label: "Neurology",
    description: "Brain & nervous system",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    bg: "rgba(139,92,246,0.08)",
    doctors: 8,
  },
  {
    id: "ophthalmology",
    icon: Eye,
    label: "Ophthalmology",
    description: "Eyes & vision care",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.2)",
    bg: "rgba(14,165,233,0.08)",
    doctors: 10,
  },
  {
    id: "ent",
    icon: Ear,
    label: "ENT",
    description: "Ear, nose & throat",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    bg: "rgba(245,158,11,0.08)",
    doctors: 7,
  },
  {
    id: "orthopedics",
    icon: Bone,
    label: "Orthopedics",
    description: "Bones, joints & muscles",
    color: "#10b981",
    glow: "rgba(16,185,129,0.2)",
    bg: "rgba(16,185,129,0.08)",
    doctors: 15,
  },
  {
    id: "pediatrics",
    icon: Baby,
    label: "Pediatrics",
    description: "Child health & care",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.2)",
    bg: "rgba(244,63,94,0.08)",
    doctors: 9,
  },
  {
    id: "endocrinology",
    icon: Activity,
    label: "Endocrinology",
    description: "Hormones & metabolism",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.2)",
    bg: "rgba(6,182,212,0.08)",
    doctors: 6,
  },
  {
    id: "pathology",
    icon: Microscope,
    label: "Pathology",
    description: "Lab & diagnostic tests",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
    bg: "rgba(168,85,247,0.08)",
    doctors: 5,
  },
];

const FindDoctor = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "5rem 0 4rem",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-3 mb-5">
          <div>
            <div
              className="d-inline-flex align-items-center gap-2 mb-3"
              style={{
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.25)",
                borderRadius: "50px",
                padding: "6px 18px",
              }}
            >
              <Search size={14} color="#0ea5e9" />
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#0369a1",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Specialities
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
              }}
            >
              Find a Doctor by{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0369a1, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Speciality
              </span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Browse departments and connect with certified specialists who match your health needs.
            </p>
          </div>
          <button
            onClick={() => navigate("/appointment")}
            className="d-flex align-items-center gap-2 btn"
            style={{
              background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: "0.9rem",
              border: "none",
              boxShadow: "0 6px 20px rgba(3,105,161,0.3)",
              whiteSpace: "nowrap",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(3,105,161,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(3,105,161,0.3)";
            }}
          >
            View All Doctors
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Department Grid */}
        <div className="row g-3">
          {departments.map((dept) => {
            const Icon = dept.icon;
            const isHovered = hoveredId === dept.id;
            return (
              <div className="col-6 col-md-4 col-lg-3" key={dept.id}>
                <div
                  onClick={() => navigate(`/appointment?speciality=${encodeURIComponent(dept.label)}`)}
                  onMouseEnter={() => setHoveredId(dept.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: isHovered ? dept.bg : "#f8fafc",
                    borderRadius: "18px",
                    padding: "1.5rem 1.25rem",
                    border: `1.5px solid ${isHovered ? dept.color : "#e2e8f0"}`,
                    boxShadow: isHovered
                      ? `0 12px 32px ${dept.glow}`
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "0.75rem",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      background: isHovered ? dept.color : "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      boxShadow: isHovered ? `0 6px 18px ${dept.glow}` : "none",
                    }}
                  >
                    <Icon size={26} color={isHovered ? "#fff" : dept.color} />
                  </div>

                  <div>
                    <h6
                      style={{
                        fontWeight: 700,
                        color: "#0f172a",
                        fontSize: "0.95rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {dept.label}
                    </h6>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.78rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {dept.description}
                    </p>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: dept.color,
                        background: dept.bg,
                        borderRadius: "50px",
                        padding: "2px 10px",
                        border: `1px solid ${dept.color}33`,
                      }}
                    >
                      {dept.doctors} Doctors
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
