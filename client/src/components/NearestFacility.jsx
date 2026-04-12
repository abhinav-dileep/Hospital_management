import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Building2,
  Star,
  ChevronRight,
  Locate,
} from "lucide-react";

const facilities = [
  {
    id: "central",
    name: "MediCare+ Central Hospital",
    address: "12, MG Road, Connaught Place, New Delhi – 110001",
    distance: "1.2 km",
    timing: "Open 24/7",
    phone: "+91 11-4001-2345",
    rating: 4.9,
    reviews: 3240,
    type: "Multi-Specialty",
    open: true,
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.2)",
    gradient: "linear-gradient(135deg, #0369a1, #0ea5e9)",
    badge: "Nearest",
  },
  {
    id: "north",
    name: "MediCare+ North Wing",
    address: "45, Rajouri Garden, New Delhi – 110027",
    distance: "3.8 km",
    timing: "7:00 AM – 10:00 PM",
    phone: "+91 11-4007-8901",
    rating: 4.7,
    reviews: 1820,
    type: "Diagnostics & OPD",
    open: true,
    color: "#10b981",
    glow: "rgba(16,185,129,0.2)",
    gradient: "linear-gradient(135deg, #047857, #10b981)",
    badge: null,
  },
  {
    id: "east",
    name: "MediCare+ East Clinic",
    address: "9, Laxmi Nagar, New Delhi – 110092",
    distance: "5.5 km",
    timing: "8:00 AM – 8:00 PM",
    phone: "+91 11-4009-1122",
    rating: 4.6,
    reviews: 980,
    type: "General OPD",
    open: false,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    gradient: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
    badge: null,
  },

];

const INITIAL_COUNT = 3;

const NearestFacility = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [located, setLocated] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleFacilities = showAll ? facilities : facilities.slice(0, INITIAL_COUNT);

  const handleLocate = () => {
    setLocated(true);
    setTimeout(() => setLocated(false), 3000);
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e8f4fd 100%)",
        padding: "5rem 0",
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
              <MapPin size={14} color="#0ea5e9" />
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#0369a1",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Near You
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
              Nearest{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0369a1, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Facilities
              </span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                maxWidth: "460px",
                lineHeight: 1.7,
              }}
            >
              Find a MediCare+ hospital or clinic closest to you — with
              real-time availability and directions.
            </p>
          </div>

          {/* Locate Me button */}
          <button
            onClick={handleLocate}
            className="d-flex align-items-center gap-2 btn"
            style={{
              background: located
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: "0.9rem",
              border: "none",
              boxShadow: located
                ? "0 6px 20px rgba(16,185,129,0.35)"
                : "0 6px 20px rgba(3,105,161,0.3)",
              whiteSpace: "nowrap",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Locate size={16} />
            {located ? "Location Detected!" : "Use My Location"}
          </button>
        </div>

        {/* Facility Cards Grid */}
        <div className="row g-4">
          {visibleFacilities.map((facility) => {
            const isHovered = hoveredId === facility.id;
            return (
              <div className="col-12 col-md-6 col-lg-4" key={facility.id}>
                <div
                  onMouseEnter={() => setHoveredId(facility.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: `1.5px solid ${isHovered ? facility.color : "#e2e8f0"}`,
                    boxShadow: isHovered
                      ? `0 20px 48px ${facility.glow}`
                      : "0 4px 16px rgba(0,0,0,0.06)",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Coloured top strip */}
                  <div
                    style={{
                      background: facility.gradient,
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "transform 0.3s",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <Building2 size={24} color="#fff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h6
                        style={{
                          fontWeight: 700,
                          color: "#fff",
                          fontSize: "0.95rem",
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {facility.name}
                      </h6>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: 500,
                        }}
                      >
                        {facility.type}
                      </span>
                    </div>
                    {facility.badge && (
                      <span
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          border: "1px solid rgba(255,255,255,0.45)",
                          color: "#fff",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          borderRadius: "50px",
                          padding: "3px 10px",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {facility.badge}
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Rating + Status row */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-1">
                        <Star size={13} color="#f59e0b" fill="#f59e0b" />
                        <span
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                            fontSize: "0.82rem",
                          }}
                        >
                          {facility.rating}
                        </span>
                        <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                          ({facility.reviews.toLocaleString()})
                        </span>
                      </div>
                      <span
                        style={{
                          background: facility.open
                            ? "rgba(16,185,129,0.1)"
                            : "rgba(239,68,68,0.1)",
                          color: facility.open ? "#059669" : "#dc2626",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          borderRadius: "50px",
                          padding: "3px 10px",
                          border: `1px solid ${facility.open ? "#10b98133" : "#ef444433"
                            }`,
                        }}
                      >
                        {facility.open ? "● Open" : "● Closed"}
                      </span>
                    </div>

                    {/* Info rows */}
                    {[
                      { Icon: MapPin, value: `${facility.distance} away` },
                      { Icon: Clock, value: facility.timing },
                      { Icon: Phone, value: facility.phone },
                    ].map(({ Icon, value }) => (
                      <div
                        key={value}
                        className="d-flex align-items-center gap-2"
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px",
                            background: `${facility.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={13} color={facility.color} />
                        </div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#475569",
                            fontWeight: 500,
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                    {/* Address */}
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                        lineHeight: 1.55,
                        margin: 0,
                        paddingTop: "4px",
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      {facility.address}
                    </p>

                    {/* Action buttons */}
                    <div className="d-flex gap-2 mt-auto pt-2">
                      <button
                        className="btn flex-fill d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: facility.gradient,
                          color: "#fff",
                          borderRadius: "10px",
                          padding: "9px 12px",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          border: "none",
                          boxShadow: `0 4px 14px ${facility.glow}`,
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = `0 8px 20px ${facility.glow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = `0 4px 14px ${facility.glow}`;
                        }}
                      >
                        <Navigation size={14} />
                        Directions
                      </button>
                      <button
                        className="btn flex-fill d-flex align-items-center justify-content-center gap-1"
                        style={{
                          background: "transparent",
                          color: facility.color,
                          borderRadius: "10px",
                          padding: "9px 12px",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          border: `1.5px solid ${facility.color}55`,
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${facility.color}10`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        Details
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More / Less button */}
        {facilities.length > INITIAL_COUNT && (
          <div className="d-flex justify-content-center mt-5">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="btn d-flex align-items-center gap-2"
              style={{
                background: showAll
                  ? "transparent"
                  : "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
                color: showAll ? "#0369a1" : "#fff",
                border: showAll
                  ? "1.5px solid #0ea5e940"
                  : "none",
                borderRadius: "50px",
                padding: "12px 36px",
                fontWeight: 700,
                fontSize: "0.92rem",
                boxShadow: showAll
                  ? "none"
                  : "0 8px 24px rgba(3,105,161,0.32)",
                letterSpacing: "0.3px",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                if (!showAll) {
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(3,105,161,0.42)";
                } else {
                  e.currentTarget.style.background = "rgba(3,105,161,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (!showAll) {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(3,105,161,0.32)";
                } else {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {showAll ? (
                <>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  View More Facilities
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <span
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      borderRadius: "50px",
                      padding: "1px 9px",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      marginLeft: "2px",
                    }}
                  >
                    +{facilities.length - INITIAL_COUNT}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NearestFacility;
