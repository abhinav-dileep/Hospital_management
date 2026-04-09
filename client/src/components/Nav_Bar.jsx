import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  HeartPulse,
  House,
  NotepadText,
  ClipboardPenLine,
  CircleUser,
} from "lucide-react";

const navLinks = [
  { label: "Home",          to: "/dashboard",    icon: <House size={18} /> },
  { label: "Appointment",   to: "/appointment",  icon: <NotepadText size={18} /> },
  { label: "Health Record", to: "/health-record",icon: <ClipboardPenLine size={18} /> },
  { label: "Profile",       to: "/profile",      icon: <CircleUser size={18} /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [isAuthenticated, setIsAuth]      = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const drawerRef  = useRef(null);

  /* ── auth state ── */
  useEffect(() => {
    setIsAuth(!!localStorage.getItem("user"));
  }, [location]);

  /* ── scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── close menu on outside click ── */
  useEffect(() => {
    const fn = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  /* ── close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuth(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (to) => location.pathname === to;

  /* ─────────────── styles ─────────────── */
  const NAV_BG     = "linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #06b6d4 100%)";
  const LINK_BASE  = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 14px",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.88)",
    textDecoration: "none",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <style>{`
        /* ── nav hover effects ── */
        .med-nav-link:hover {
          color: #fff !important;
          background: rgba(255,255,255,0.16) !important;
        }
        .med-nav-link.active-link {
          color: #fff !important;
          background: rgba(255,255,255,0.22) !important;
          font-weight: 700 !important;
        }

        /* ── mobile drawer ── */
        .med-drawer {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .med-drawer.open {
          max-height: 640px;
          opacity: 1;
        }

        /* ── toggler ── */
        .med-toggler {
          background: rgba(255,255,255,0.18);
          border: none;
          border-radius: 10px;
          padding: 8px 10px;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .med-toggler:hover { background: rgba(255,255,255,0.28); }

        /* ── logout / login btns ── */
        .btn-logout {
          background: linear-gradient(135deg, #f43f5e, #e11d48);
          color: #fff;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 700;
          font-size: 0.875rem;
          border: none;
          box-shadow: 0 4px 14px rgba(244,63,94,0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .btn-logout:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(244,63,94,0.45);
        }
        .btn-login-nav {
          background: rgba(255,255,255,0.18);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.42);
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.25s;
          white-space: nowrap;
          backdrop-filter: blur(6px);
        }
        .btn-login-nav:hover {
          background: rgba(255,255,255,0.28);
          transform: translateY(-2px);
        }

        /* ── mobile link in drawer ── */
        @media (max-width: 767px) {
          .med-drawer-inner {
            background: rgba(3,105,161,0.97);
            backdrop-filter: blur(16px);
            padding: 1rem 1.25rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid rgba(255,255,255,0.12);
          }
          .med-nav-link {
            padding: 11px 16px !important;
            border-radius: 11px !important;
          }
          .med-drawer-auth {
            margin-top: 6px;
            padding-top: 12px;
            border-top: 1px solid rgba(255,255,255,0.12);
          }
          .btn-logout, .btn-login-nav {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <nav
        style={{
          background: NAV_BG,
          borderBottom: "1px solid rgba(6,182,212,0.25)",
          boxShadow: scrolled ? "0 4px 24px rgba(3,105,161,0.45)" : "0 2px 12px rgba(3,105,161,0.25)",
          position: "sticky",
          top: 0,
          zIndex: 1050,
          transition: "box-shadow 0.3s",
        }}
        ref={drawerRef}
      >
        <div
          className="container-fluid"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.7rem 1.5rem",
            gap: "1rem",
          }}
        >
          {/* ── Brand ── */}
          <Link
            to="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.24)",
                borderRadius: "9px",
                padding: "7px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HeartPulse size={20} color="white" />
            </span>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#fff",
                letterSpacing: "0.3px",
              }}
            >
              MediCare+
            </span>
          </Link>

          {/* ── Desktop menu ── */}
          <div
            className="d-none d-md-flex align-items-center gap-1"
            style={{ flex: 1, justifyContent: "center" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`med-nav-link ${isActive(link.to) ? "active-link" : ""}`}
                style={LINK_BASE}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop Auth ── */}
          <div className="d-none d-md-flex align-items-center" style={{ flexShrink: 0 }}>
            {isAuthenticated ? (
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={15} />
                Logout
              </button>
            ) : (
              <button className="btn-login-nav" onClick={() => navigate("/login")}>
                <LogIn size={15} />
                Login
              </button>
            )}
          </div>

          {/* ── Mobile Toggler ── */}
          <button
            className="med-toggler d-md-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <div className={`med-drawer d-md-none ${menuOpen ? "open" : ""}`}>
          <div className="med-drawer-inner">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`med-nav-link ${isActive(link.to) ? "active-link" : ""}`}
                style={LINK_BASE}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="med-drawer-auth">
              {isAuthenticated ? (
                <button className="btn-logout" onClick={handleLogout}>
                  <LogOut size={15} />
                  Logout
                </button>
              ) : (
                <button className="btn-login-nav" onClick={() => navigate("/login")}>
                  <LogIn size={15} />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
