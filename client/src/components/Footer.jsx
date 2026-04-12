import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/dashboard" },
  { label: "Book Appointment", to: "/appointment" },
  { label: "Emergency Services", to: "/emergency" },
  { label: "Health Records", to: "/health-record" },
  { label: "My Profile", to: "/profile" },
];

const services = [
  "Hospital Appointment",
  "Video Consultation",
  "Consult Doctor Now",
  "Radiology & Scans",
  "Emergency Care",
  "Health Check-ups",
];

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "ENT",
  "Endocrinology",
];

const socials = [
  { Icon: Facebook, label: "Facebook", color: "#1877f2" },
  { Icon: Twitter, label: "Twitter", color: "#1da1f2" },
  { Icon: Instagram, label: "Instagram", color: "#e1306c" },
  { Icon: Youtube, label: "YouTube", color: "#ff0000" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #060d1a 100%)",
        color: "#94a3b8",
        fontFamily: "'Poppins', sans-serif",
      }}
    >


      {/* ── Main footer body ── */}
      <div className="container" style={{ padding: "3.5rem 1.5rem 2.5rem" }}>
        <div className="row gy-5">

          {/* Col 1 – Brand / About */}
          <div className="col-12 col-lg-4">
            {/* Logo */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #0369a1, #0ea5e9)",
                  borderRadius: "10px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartPulse size={22} color="#fff" />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "#fff",
                  letterSpacing: "0.4px",
                }}
              >
                MediCare+
              </span>
            </div>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "#64748b",
                maxWidth: "340px",
                marginBottom: "1.5rem",
              }}
            >
              MediCare+ is a modern healthcare management platform dedicated to
              redefining smart healthcare with heart. We combine advanced medical
              technology with compassionate care to deliver seamless and efficient
              healthcare services across India.
            </p>

            {/* Social icons */}
            <div className="d-flex gap-2 mt-3">
              {socials.map(({ Icon, label, color }) => (
                <button
                  key={label}
                  aria-label={label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    color: "#94a3b8",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}22`;
                    e.currentTarget.style.borderColor = `${color}66`;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6
              style={{
                color: "#f0f6ff",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Quick Links
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: "0.6rem" }}>
                  <Link
                    to={link.to}
                    style={{
                      color: "#64748b",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.2s, gap 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#7dd3fc";
                      e.currentTarget.style.gap = "10px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#64748b";
                      e.currentTarget.style.gap = "6px";
                    }}
                  >
                    <ArrowRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Services */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6
              style={{
                color: "#f0f6ff",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Services
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {services.map((s) => (
                <li key={s} style={{ marginBottom: "0.6rem" }}>
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#0ea5e9",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Departments + Contact */}
          <div className="col-12 col-md-6 col-lg-4">
            {/* Departments */}
            <h6
              style={{
                color: "#f0f6ff",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Departments
            </h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {departments.map((d) => (
                <span
                  key={d}
                  style={{
                    background: "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.2)",
                    borderRadius: "6px",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    color: "#7dd3fc",
                    fontWeight: 500,
                    cursor: "default",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Contact */}
            <h6
              style={{
                color: "#f0f6ff",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Contact Us
            </h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[
                {
                  Icon: MapPin,
                  text: "12, MG Road, Bangalore, Karnataka – 560001",
                },
                { Icon: Phone, text: "+91 9048814118 (24/7 Helpline)" },
                { Icon: Mail, text: "medicareplus@gmail.com" },
                { Icon: Clock, text: "OPD: Mon–Sat, 8:00 AM – 8:00 PM" },
              ].map(({ Icon, text }) => (
                <div key={text} className="d-flex align-items-start gap-3">
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "rgba(14,165,233,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <Icon size={14} color="#0ea5e9" />
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.55 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            margin: "2.5rem 0 1.5rem",
          }}
        />

        {/* ── Bottom bar ── */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-md-between gap-2">
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#475569" }}>
            © {year} MediCare+. All rights reserved
          </p>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "0.78rem",
                  color: "#475569",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7dd3fc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
