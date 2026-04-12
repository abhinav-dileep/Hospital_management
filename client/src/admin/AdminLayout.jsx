import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Users, Stethoscope, CalendarDays, LogOut,
  HeartPulse, ChevronRight, Bell,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/doctors',   icon: Stethoscope,     label: 'Doctors' },
  { to: '/admin/appointments', icon: CalendarDays, label: 'Appointments' },
  { to: '/admin/patients',  icon: Users,           label: 'Patients' },
];

const AdminLayout = () => {
  const sidebarOpen = true;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .admin-root {
          display: flex;
          min-height: 100vh;
          background: #f0f4f8;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* ── Sidebar ── */
        .admin-sidebar {
          width: ${sidebarOpen ? '260px' : '72px'};
          min-height: 100vh;
          background: linear-gradient(175deg, #0f1f3d 0%, #1a3a6e 60%, #1e4799 100%);
          display: flex;
          flex-direction: column;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 100;
          box-shadow: 4px 0 24px rgba(0,0,0,0.18);
          overflow: hidden;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 22px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          min-height: 72px;
        }
        .sidebar-logo {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          border-radius: 12px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-brand {
          color: #fff;
          font-size: 1.15rem;
          font-weight: 800;
          white-space: nowrap;
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
          line-height: 1.2;
        }
        .sidebar-brand span { color: #38bdf8; }


        .sidebar-nav {
          flex: 1;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-section-label {
          color: rgba(255,255,255,0.35);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 10px 8px 6px;
          white-space: nowrap;
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 12px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
          position: relative;
        }
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .admin-nav-link.active {
          background: linear-gradient(90deg, rgba(56,189,248,0.25), rgba(56,189,248,0.08));
          color: #fff;
          border-left: 3px solid #38bdf8;
        }
        .admin-nav-link.active svg { color: #38bdf8; }
        .nav-label {
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
          flex: 1;
        }
        .nav-chevron {
          opacity: ${sidebarOpen ? 0.4 : 0};
          transition: opacity 0.2s;
        }
        .admin-nav-link:hover .nav-chevron { opacity: 0.8; }

        .sidebar-footer {
          padding: 16px 10px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 8px;
          border-radius: 12px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 8px;
        }
        .user-avatar {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.9rem;
          flex-shrink: 0;
        }
        .user-details {
          opacity: ${sidebarOpen ? 1 : 0};
          transition: opacity 0.2s;
          overflow: hidden;
        }
        .user-name {
          color: #fff; font-size: 0.82rem; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .user-role {
          color: #38bdf8; font-size: 0.7rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        .logout-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 10px 12px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          color: #f87171; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          white-space: nowrap;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.22); color: #fff; }
        .logout-label { opacity: ${sidebarOpen ? 1 : 0}; transition: opacity 0.2s; }

        /* ── Main content ── */
        .admin-main {
          margin-left: ${sidebarOpen ? '260px' : '72px'};
          flex: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        .admin-topbar {
          height: 64px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          position: sticky; top: 0; z-index: 90;
          box-shadow: 0 1px 8px rgba(0,0,0,0.06);
        }
        .topbar-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          flex: 1;
        }
        .topbar-pill {
          background: linear-gradient(135deg, #dbeafe, #ede9fe);
          color: #4f46e5;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
        .topbar-bell {
          position: relative;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          padding: 9px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex; align-items: center;
        }
        .topbar-bell:hover { background: #e2e8f0; }
        .bell-dot {
          position: absolute; top: 6px; right: 6px;
          width: 8px; height: 8px;
          background: #ef4444; border-radius: 50%;
          border: 2px solid #fff;
        }

        .admin-content {
          flex: 1;
          padding: 28px 24px;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .admin-sidebar { width: 72px; }
          .admin-main { margin-left: 72px; }
        }
      `}</style>

      <div className="admin-root">
        {/* ── Sidebar ── */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <HeartPulse size={22} color="white" />
            </div>
            <div className="sidebar-brand">
              Medi<span>Care+</span><br />
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Admin Panel</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Menu</div>
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className="admin-nav-link">
                <Icon size={20} />
                <span className="nav-label">{label}</span>
                <ChevronRight size={14} className="nav-chevron" />
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <div className="user-avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
              <div className="user-details">
                <div className="user-name">{user?.name || 'Administrator'}</div>
                <div className="user-role">Admin</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span className="logout-label">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="admin-main">
          <header className="admin-topbar">
            <span className="topbar-title">Hospital Management System</span>
            <span className="topbar-pill">🛡️ Admin</span>
            <button className="topbar-bell">
              <Bell size={18} color="#64748b" />
              <span className="bell-dot" />
            </button>
          </header>

          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
