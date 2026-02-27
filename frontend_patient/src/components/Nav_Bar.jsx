import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Menu, X, LogOut, LogIn, HeartPulse, House, NotepadText, Ambulance, ClipboardPenLine, CircleUser } from "lucide-react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", to: "/dashboard", icon: (<House size={20} color="white" />) },
    { label: "Appointment", to: "/appointment", icon: (<NotepadText size={20} color="white" />) },
    { label: "Emergency", to: "/emergency", icon: (<Ambulance size={20} color="white" />) },
    { label: "Health Record", to: "/health-record", icon: (<ClipboardPenLine size={20} color="white" />) },
    { label: "Profile", to: "/profile", icon: (<CircleUser size={20} color="white" />) },
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-md"
        style={{
          background: "linear-gradient(145deg, #0369a1 0%, #0ea5e9 50%, #06b6d4 100%)",
          borderBottom: "1px solid rgba(6,182,212,0.3)",
          boxShadow: "0 4px 20px rgba(3,105,161,0.35)",
          position: "sticky",
          top: 0,
          zIndex: 1050,
          padding: "0.75rem 1.5rem",
          maxHeight: "70px",
        }}
      >

        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/dashboard"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.25)",
              borderRadius: "8px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeartPulse size={20} color="white" />
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#fff",
              letterSpacing: "0.5px",
            }}
          >
            MediCare+
          </span>
        </Link>


        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "6px 10px",
            color: "#fff",
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>


        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-md-center gap-md-1">
            {navLinks
              .filter((link) => !link.hidden)
              .map((link) => (
                <li className="nav-item" key={link.to}>
                  <Link
                    to={link.to}
                    className="nav-link"
                    onClick={closeMenu}
                    style={{
                      color: location.pathname === link.to ? "#fff" : "rgba(255,255,255,0.85)",
                      fontWeight: location.pathname === link.to ? 700 : 400,
                      background: location.pathname === link.to ? "rgba(255,255,255,0.2)" : "transparent",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      transition: "all 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.90rem"
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== link.to) {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== link.to) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                    {link.icon}
                  </Link>
                </li>
              ))}

            <li className="nav-item ms-md-2 mt-2 mt-md-0">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #f43f5e, #e11d48)",
                    color: "white",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    boxShadow: "0 4px 14px rgba(244,63,94,0.35)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(244,63,94,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(244,63,94,0.35)";
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 4px 14px rgba(3,105,161,0.3)",
                    transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(3,105,161,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(3,105,161,0.3)";
                  }}
                >
                  <LogIn size={16} />
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
