import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Video,
  Stethoscope,
  ScanLine,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "book-appointment",
    icon: CalendarCheck,
    title: "Book Hospital Appointment",
    description:
      "Schedule an in-person visit with our specialist doctors at your convenience.",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.25)",
    gradient: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    tag: "Most Popular",
    route: "/appointment",
  },
  {
    id: "video-consultation",
    icon: Video,
    title: "Video Consultation",
    description:
      "Connect with top doctors from home via secure HD video calls. Available 24/7.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.25)",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
    tag: "No Wait Time",
    route: "/appointment",
  },
  {
    id: "consult-doctor-now",
    icon: Stethoscope,
    title: "Consult Doctor Now",
    description:
      "Instant access to on-call doctors for urgent advice and quick prescriptions.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    gradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    tag: "Instant",
    route: "/appointment?speciality=General%20Physician",
  },
  {
    id: "radiology-scan",
    icon: ScanLine,
    title: "Book Radiology Scan",
    description:
      "Schedule MRI, CT scan, X-ray, Ultrasound, and more at our certified centres.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    tag: "Quick Results",
    route: "/appointment?speciality=Radiology",
  },
];

const BookService = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e8f4fd 100%)",
        padding: "5rem 0 4rem",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          {/* <div
            className="d-inline-flex align-items-center gap-2 mb-3"
            style={{
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.3)",
              borderRadius: "50px",
              padding: "6px 18px",
            }}
          >
            <Sparkles size={15} color="#0ea5e9" />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#0369a1",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Our Services
            </span>
          </div> */}
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Book a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0369a1, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Service
            </span>
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: "1rem",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Quick, reliable access to world-class healthcare—right when you need it.
          </p>
        </div>

        {/* Service Cards */}
        <div className="row g-4 justify-content-center">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;
            return (
              <div className="col-12 col-sm-6 col-lg-3" key={service.id}>
                <div
                  onClick={() => navigate(service.route)}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "2rem 1.5rem",
                    border: `1.5px solid ${isHovered ? service.color : "rgba(14,165,233,0.15)"}`,
                    boxShadow: isHovered
                      ? `0 20px 40px ${service.glow}`
                      : "0 4px 20px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: service.gradient,
                      borderRadius: "50px",
                      padding: "3px 10px",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {service.tag}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      background: service.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                      boxShadow: `0 8px 20px ${service.glow}`,
                      transition: "transform 0.3s",
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <Icon size={28} color="#fff" />
                  </div>

                  <h5
                    style={{
                      fontWeight: 700,
                      color: "#0f172a",
                      fontSize: "1.05rem",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {service.title}
                  </h5>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                      flexGrow: 1,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    className="d-flex align-items-center gap-1"
                    style={{
                      color: service.color,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Book Now
                    <ChevronRight
                      size={16}
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.3s",
                      }}
                    />
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

export default BookService;
