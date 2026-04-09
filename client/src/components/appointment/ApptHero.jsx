import React from "react";
import { Search, X } from "lucide-react";

const ApptHero = ({ search, onSearchChange, onClear }) => (
  <>
    <style>{`
      .appt-hero {
        background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #06b6d4 100%);
        padding: 4rem 1.5rem 5rem;
        text-align: center;
        color: #fff;
        position: relative;
        overflow: hidden;
      }
      .appt-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      .appt-hero h1 {
        font-size: clamp(1.9rem, 5vw, 2.8rem);
        font-weight: 900;
        margin: 0 0 0.5rem;
        letter-spacing: -0.02em;
      }
      .appt-hero > p {
        opacity: 0.85;
        font-size: 1rem;
        margin: 0 0 2rem;
      }
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: 2.5rem;
        flex-wrap: wrap;
        margin-top: 2rem;
      }
      .hero-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .hero-stat strong {
        font-size: 1.6rem;
        font-weight: 900;
        line-height: 1;
      }
      .hero-stat span {
        font-size: 0.78rem;
        opacity: 0.75;
        margin-top: 3px;
      }
      .hero-search-wrap {
        position: relative;
        max-width: 560px;
        margin: 0 auto;
      }
      .hero-search-wrap .hs-bar {
        background: #fff;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,.18);
      }
      .hero-search-wrap .hs-bar input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        padding: 15px 0;
        font-size: 0.93rem;
        font-family: inherit;
        color: #0f172a;
      }
      .hero-search-wrap .hs-bar input::placeholder { color: #94a3b8; }
      .hero-search-wrap .hs-clear {
        background: none; border: none; cursor: pointer;
        color: #94a3b8; padding: 4px; display: flex;
      }
      @media (max-width: 600px) {
        .appt-hero { padding: 2.5rem 1rem 3.5rem; }
        .hero-stats { gap: 1.5rem; }
      }
    `}</style>

    <div className="appt-hero">
      <h1>Find &amp; Book a Doctor</h1>
      <p>Search from 200+ specialist doctors across India</p>

      <div className="hero-search-wrap">
        <div className="hs-bar">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by doctor name, speciality, or hospital…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {search && (
            <button className="hs-clear" onClick={onClear}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="hero-stats">
        {[
          { value: "200+", label: "Specialist Doctors" },
          { value: "15+", label: "Specialities" },
          { value: "50k+", label: "Happy Patients" },
          { value: "24/7", label: "Support" },
        ].map(({ value, label }) => (
          <div className="hero-stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default ApptHero;
