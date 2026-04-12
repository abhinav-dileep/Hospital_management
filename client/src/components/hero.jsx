import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CalendarCheck,
  PhoneCall,
  ShieldCheck,
  Star,
  ArrowRight,
  Ambulance,
  ChevronDown,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Patients Served" },
  { value: "200+", label: "Specialists" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #0369a1 0%, #0284c7 30%, #0ea5e9 65%, #06b6d4 100%)",
        minHeight: "calc(100vh - 70px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          animation: "blobPulse 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          animation: "blobPulse 8s ease-in-out infinite 2s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "55%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          animation: "blobPulse 10s ease-in-out infinite 1s",
        }}
      />

      <style>{`
        @keyframes blobPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-cta-primary:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3) !important;
        }
        .hero-cta-outline:hover {
          background: rgba(255,255,255,0.2) !important;
          transform: translateY(-3px) !important;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.2) !important;
          transform: translateY(-3px) !important;
        }
      `}</style>

      <div className="container" style={{ position: "relative", zIndex: 2, padding: "4rem 1.5rem" }}>
        <div className="row align-items-center gy-5">
          {/* Left Column */}
          <div
            className="col-12 col-lg-6"
            style={{ animation: "floatUp 0.8s ease forwards" }}
          >
            {/* Main headline */}
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-0.5px",
              }}
            >
              Your Health,
              <br />
              <span
                style={{
                  color: "#bae6fd",
                }}
              >
                Our Priority.
              </span>
              <br />
              Always.
            </h1>

            {/* Subheading */}
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                lineHeight: 1.75,
                maxWidth: "500px",
                marginBottom: "2rem",
              }}
            >
              MediCare+ brings world-class specialists, instant consultations,
              and smart scheduling together — so you get the care you deserve,
              exactly when you need it.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <button
                className="hero-cta-primary btn d-flex align-items-center gap-2"
                onClick={() => navigate("/appointment")}
                style={{
                  background: "#ffffff",
                  color: "#0369a1",
                  borderRadius: "14px",
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <CalendarCheck size={18} />
                Book Appointment
                <ArrowRight size={16} />
              </button>
              <button
                className="hero-cta-outline btn d-flex align-items-center gap-2"
                onClick={() =>
                  toast.error(
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: "0.97rem" }}>🚨 Emergency Alert Received</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                        Our medical authority has been notified.<br />
                        <strong>We will contact you shortly.</strong>
                      </span>
                      <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>
                        For immediate help call: <strong>+91 1800-MEDICARE</strong>
                      </span>
                    </div>,
                    { duration: 7000, position: "top-center" }
                  )
                }
                style={{
                  background: "rgba(239,68,68,0.18)",
                  color: "#ffffff",
                  borderRadius: "14px",
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  border: "1.5px solid rgba(239,68,68,0.55)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s",
                }}
              >
                <Ambulance size={17} />
                Emergency
              </button>
            </div>

            {/* Emergency hotline strip */}
            <div
              className="d-inline-flex align-items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "14px",
                padding: "12px 20px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#ef4444",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneCall size={18} color="#fff" />
              </div>
              <div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.72rem",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Emergency Helpline
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "1rem",
                    margin: 0,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  +91 9048814118
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - stats & image card */}
          <div
            className="col-12 col-lg-6 d-flex flex-column align-items-center"
            style={{ animation: "floatUp 0.8s ease 0.2s both" }}
          >
            {/* Image card with glassmorphism */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <img
                src="/hero.png"
                alt="Healthcare Professionals at MediCare+"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

            </div>

            {/* Stats row */}
            <div className="row g-3 mt-3 w-100" style={{ maxWidth: "460px" }}>
              {stats.map((stat) => (
                <div className="col-6" key={stat.label}>
                  <div
                    className="stat-card"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "16px",
                      padding: "1rem",
                      textAlign: "center",
                      transition: "all 0.3s",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.6rem",
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.78rem",
                        margin: 0,
                        marginTop: "4px",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="d-flex justify-content-center mt-5"
          style={{ opacity: scrolled ? 0 : 1, transition: "opacity 0.4s" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "1px",
              textTransform: "uppercase",
              animation: "blobPulse 2s ease-in-out infinite",
            }}
          >
            <span>Scroll</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;