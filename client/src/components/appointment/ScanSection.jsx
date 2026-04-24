import React, { useState, forwardRef } from "react";
import { ScanLine } from "lucide-react";
import ScanModal from "./ScanModal";

export const SCANS = [
  {
    id: "mri",
    name: "MRI Scan",
    icon: "🧲",
    color: "rgba(139,92,246,0.12)",
    accent: "#7c3aed",
    desc: "Magnetic Resonance Imaging — brain, spine, joints",
    fee: 3500,
    duration: "45–60 min",
    prep: "Remove metal objects. Fast 4h before if abdomen.",
  },
  {
    id: "ct",
    name: "CT Scan",
    icon: "🔬",
    color: "rgba(14,165,233,0.12)",
    accent: "#0369a1",
    desc: "Computed Tomography — chest, abdomen, pelvis",
    fee: 2500,
    duration: "10–20 min",
    prep: "May require contrast dye. Avoid eating 2h before.",
  },
  {
    id: "xray",
    name: "X-Ray",
    icon: "🦴",
    color: "rgba(100,116,139,0.12)",
    accent: "#475569",
    desc: "Bone fractures, chest, dental imaging",
    fee: 500,
    duration: "5–10 min",
    prep: "Remove jewellery and metal items.",
  },
  {
    id: "ultrasound",
    name: "Ultrasound",
    icon: "📡",
    color: "rgba(34,197,94,0.12)",
    accent: "#16a34a",
    desc: "Abdomen, pelvis, obstetric, thyroid",
    fee: 1200,
    duration: "20–30 min",
    prep: "Full bladder for pelvic scan. Fast 6h for abdomen.",
  },
  {
    id: "ecg",
    name: "ECG",
    icon: "❤️",
    color: "rgba(239,68,68,0.12)",
    accent: "#dc2626",
    desc: "Electrocardiogram — heart rhythm & activity",
    fee: 300,
    duration: "5–10 min",
    prep: "Lie still. Avoid lotions on chest.",
  },
  {
    id: "pet",
    name: "PET Scan",
    icon: "⚛️",
    color: "rgba(249,115,22,0.12)",
    accent: "#ea580c",
    desc: "Positron Emission Tomography — cancer detection",
    fee: 18000,
    duration: "2–3 hours",
    prep: "Fast 6h. No strenuous exercise 24h before.",
  },
  {
    id: "dexa",
    name: "DEXA Scan",
    icon: "🦷",
    color: "rgba(20,184,166,0.12)",
    accent: "#0d9488",
    desc: "Bone density — osteoporosis screening",
    fee: 1800,
    duration: "10–20 min",
    prep: "Avoid calcium supplements 24h before.",
  },
  {
    id: "mammogram",
    name: "Mammogram",
    icon: "🩻",
    color: "rgba(236,72,153,0.12)",
    accent: "#db2777",
    desc: "Breast cancer screening & diagnosis",
    fee: 1500,
    duration: "15–20 min",
    prep: "Avoid deodorant, powder on the day.",
  },
];

const ScanSection = forwardRef(({ onScanBooked }, ref) => {
  const [selectedScan, setSelectedScan] = useState(null);

  return (
    <div ref={ref} style={{ marginTop: "2.5rem" }}>

      {/* Section heading */}
      <div className="section-heading">
        <h2>
          <ScanLine size={20} color="#7c3aed" />
          Diagnostic Scans &amp; Imaging
        </h2>
        <span style={{
          fontSize: "0.75rem", color: "#64748b",
          background: "#f1f5f9", borderRadius: 20,
          padding: "3px 11px", fontWeight: 600,
        }}>
          No referral needed
        </span>
      </div>

      <p style={{ fontSize: "0.84rem", color: "#64748b", margin: "0 0 1.25rem" }}>
        Book diagnostic imaging directly — no doctor visit required for self-referral scans.
      </p>

      {/* Cards grid */}
      <div className="scan-grid">
        {SCANS.map((scan) => (
          <div key={scan.id} className="scan-card">
            {/* Icon */}
            <div className="scan-card-icon" style={{ background: scan.color }}>
              <span style={{ fontSize: "1.6rem" }}>{scan.icon}</span>
            </div>

            <div className="scan-card-body">
              <div className="scan-card-name">{scan.name}</div>
              <div className="scan-card-desc">{scan.desc}</div>

              <div className="scan-card-meta">
                <span>⏱ {scan.duration}</span>
                <span style={{ color: scan.accent, fontWeight: 700 }}>₹{scan.fee.toLocaleString()}</span>
              </div>

              <div className="scan-card-prep">
                <span>📋 </span>{scan.prep}
              </div>
            </div>

            <button
              className="scan-book-btn"
              style={{ background: `linear-gradient(135deg, ${scan.accent}cc, ${scan.accent})` }}
              onClick={() => setSelectedScan(scan)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Scan booking modal */}
      {selectedScan && (
        <ScanModal
          scan={selectedScan}
          onClose={() => setSelectedScan(null)}
          onBooked={onScanBooked}
        />
      )}

      {/* Inline styles for scan grid */}
      <style>{`
        .scan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }
        .scan-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: all 0.22s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .scan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.10);
          border-color: #bae6fd;
        }
        .scan-card-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .scan-card-body { flex: 1; }
        .scan-card-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 3px;
        }
        .scan-card-desc {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .scan-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 6px;
        }
        .scan-card-prep {
          font-size: 0.72rem;
          color: #94a3b8;
          line-height: 1.4;
          background: #f8fafc;
          border-radius: 7px;
          padding: 5px 8px;
        }
        .scan-book-btn {
          width: 100%;
          padding: 9px;
          color: #fff;
          border: none;
          border-radius: 9px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .scan-book-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
});

export default ScanSection;
