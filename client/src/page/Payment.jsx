import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  CreditCard, Smartphone, Building2,
  CheckCircle2, Lock, Loader2, ArrowLeft,
  IndianRupee,
} from "lucide-react";

const API_BASE = "http://localhost:4000/api";

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

/* ─────────────────────────────────────────
   PAYMENT PAGE
───────────────────────────────────────── */
const Payment = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const booking   = location.state || {};

  const [method,  setMethod]  = useState("card");
  const [paying,  setPaying]  = useState(false);
  const [success, setSuccess] = useState(false);

  /* card */
  const [cardNo,   setCardNo]   = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry,   setExpiry]   = useState("");
  const [cvv,      setCvv]      = useState("");

  /* upi */
  const [upiId, setUpiId] = useState("");

  /* net-banking */
  const [bank, setBank] = useState("HDFC Bank");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!booking.fee && !booking.doctorName) {
      toast.error("No booking info. Book an appointment first.");
      navigate("/appointment");
    }
  }, []); // eslint-disable-line

  const fmtCard = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const fmtExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const validate = () => {
    if (method === "card") {
      if (cardNo.replace(/\s/g, "").length < 16)
        return toast.error("Enter a valid 16-digit card number"), false;
      if (!cardName.trim())
        return toast.error("Enter cardholder name"), false;
      if (expiry.length < 5)
        return toast.error("Enter valid expiry MM/YY"), false;
      if (cvv.length < 3)
        return toast.error("Enter valid CVV"), false;
    }
    if (method === "upi" && !upiId.match(/^[\w.\-]+@[\w]+$/))
      return toast.error("Enter a valid UPI ID (e.g. name@upi)"), false;
    return true;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPaying(true);
    await new Promise((r) => setTimeout(r, 2000));
    if (booking.appointmentData) {
      try { await axios.post(`${API_BASE}/appointments`, booking.appointmentData); }
      catch (_) {}
    }
    setPaying(false);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── SUCCESS SCREEN ─────────────────────── */
  if (success) {
    return (
      <>
        <style>{css}</style>
        <div className="py-page">
          <div className="py-success-wrap">
            <div className="py-success-card">
              <div className="py-tick">
                <CheckCircle2 size={48} color="#16a34a" />
              </div>
              <h1 className="py-success-h1">Payment Successful!</h1>
              <p className="py-success-sub">
                Your appointment is confirmed. Check your email for details.
              </p>

              <div className="py-receipt">
                <Row label="Doctor"    value={booking.doctorName  || "—"} />
                <Row label="Date"      value={fmtDate(booking.date)} />
                <Row label="Slot"      value={booking.slot         || "—"} />
                <Row label="Patient"   value={booking.patientName  || "—"} />
                <Row label="Amount Paid" value={`₹${booking.fee   || "—"}`} bold />
              </div>

              <div className="py-success-btns">
                <button className="py-btn-primary" onClick={() => navigate("/appointment")}>
                  My Appointments
                </button>
                <button className="py-btn-outline" onClick={() => navigate("/")}>
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── PAYMENT FORM ───────────────────────── */
  return (
    <>
      <style>{css}</style>
      <div className="py-page">
        <div className="py-center">

          {/* Back */}
          <button className="py-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={15} /> Back
          </button>

          <div className="py-card">

            {/* ── Order info header ── */}
            <div className="py-order-header">
              <div className="py-order-logo">
                <IndianRupee size={22} color="#fff" />
              </div>
              <div>
                <div className="py-order-name">{booking.doctorName || "Doctor Appointment"}</div>
                <div className="py-order-sub">
                  {booking.speciality || "Consultation"} &middot; {fmtDate(booking.date)} &middot; {booking.slot || ""}
                </div>
              </div>
              <div className="py-order-amount">₹{booking.fee || "—"}</div>
            </div>

            {/* ── Method selector ── */}
            <div className="py-methods">
              {[
                { id: "card",       Icon: CreditCard,  label: "Card" },
                { id: "upi",        Icon: Smartphone,  label: "UPI" },
                { id: "netbanking", Icon: Building2,   label: "Net Banking" },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`py-method-btn${method === id ? " py-method-active" : ""}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handlePay} className="py-form">

              {method === "card" && (
                <>
                  <div className="py-field">
                    <label>Card Number</label>
                    <input
                      id="py-card-number"
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNo}
                      onChange={(e) => setCardNo(fmtCard(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="py-field">
                    <label>Cardholder Name</label>
                    <input
                      id="py-card-name"
                      type="text"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="py-row">
                    <div className="py-field">
                      <label>Expiry</label>
                      <input
                        id="py-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(fmtExpiry(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    <div className="py-field">
                      <label>CVV</label>
                      <input
                        id="py-cvv"
                        type="password"
                        placeholder="•••"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </>
              )}

              {method === "upi" && (
                <div className="py-field">
                  <label>UPI ID</label>
                  <input
                    id="py-upi-id"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <span className="py-hint">e.g. 9876543210@ybl</span>
                </div>
              )}

              {method === "netbanking" && (
                <>
                  <div className="py-bank-grid">
                    {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBank(b)}
                        className={`py-bank-chip${bank === b ? " py-bank-active" : ""}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="py-field">
                    <label>Other banks</label>
                    <select
                      id="py-bank-select"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                    >
                      {["HDFC Bank","SBI","ICICI Bank","Axis Bank","Kotak","PNB","Bank of Baroda","Canara Bank","IDBI Bank"].map(b=>(
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <button
                id="py-pay-btn"
                type="submit"
                className="py-pay-btn"
                disabled={paying}
              >
                {paying
                  ? <><Loader2 size={17} className="py-spin" /> Processing…</>
                  : <><Lock size={15} /> Pay ₹{booking.fee || "—"}</>
                }
              </button>
            </form>

            {/* footer */}
            <div className="py-secure-note">
              <Lock size={12} /> Secured by 256-bit SSL encryption
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

/* ── tiny receipt row ── */
const Row = ({ label, value, bold }) => (
  <div className={`py-receipt-row${bold ? " py-receipt-total" : ""}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

/* ─────────────────────────────────────────
   CSS
───────────────────────────────────────── */
const css = `
  .py-page {
    min-height: calc(100vh - 64px);
    background: #f1f5f9;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2.5rem 1rem 4rem;
  }

  .py-center { width: 100%; max-width: 480px; }

  /* back button */
  .py-back {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1rem;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;
  }
  .py-back:hover { color: #0369a1; }

  /* main card */
  .py-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.09);
    overflow: hidden;
  }

  /* order header */
  .py-order-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: #fff;
  }
  .py-order-logo {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: rgba(255,255,255,0.20);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .py-order-name {
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1.3;
  }
  .py-order-sub {
    font-size: 0.75rem;
    opacity: 0.80;
    margin-top: 1px;
  }
  .py-order-amount {
    margin-left: auto;
    font-size: 1.4rem;
    font-weight: 900;
    flex-shrink: 0;
  }

  /* method tabs */
  .py-methods {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
  }
  .py-method-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 13px 6px;
    border: none;
    border-bottom: 2.5px solid transparent;
    background: none;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.18s;
  }
  .py-method-btn:hover { color: #0369a1; }
  .py-method-active {
    color: #0369a1 !important;
    border-bottom-color: #0ea5e9 !important;
    background: #f0f9ff;
  }

  /* form */
  .py-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .py-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .py-field label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #374151;
  }
  .py-field input,
  .py-field select {
    width: 100%;
    padding: 11px 13px;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-size: 0.9rem;
    font-family: inherit;
    background: #f8fafc;
    color: #0f172a;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .py-field input:focus,
  .py-field select:focus {
    border-color: #0ea5e9;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
  }
  .py-hint {
    font-size: 0.72rem;
    color: #94a3b8;
  }

  /* row of two fields */
  .py-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  /* bank chips */
  .py-bank-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .py-bank-chip {
    padding: 8px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.16s;
  }
  .py-bank-chip:hover { border-color: #0ea5e9; }
  .py-bank-active {
    border-color: #0ea5e9 !important;
    background: #eff6ff !important;
    color: #0369a1 !important;
  }

  /* pay button */
  .py-pay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    box-shadow: 0 6px 20px rgba(14,165,233,0.35);
    transition: box-shadow 0.2s, transform 0.2s;
    margin-top: 0.25rem;
  }
  .py-pay-btn:hover:not(:disabled) {
    box-shadow: 0 10px 28px rgba(14,165,233,0.45);
    transform: translateY(-1px);
  }
  .py-pay-btn:disabled { opacity: 0.72; cursor: not-allowed; }

  /* secure note */
  .py-secure-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0.75rem 1.5rem 1rem;
    font-size: 0.72rem;
    color: #94a3b8;
    border-top: 1px solid #f1f5f9;
  }

  /* ── success ── */
  .py-success-wrap {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f1f5f9;
  }
  .py-success-card {
    background: #fff;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    max-width: 440px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 24px rgba(0,0,0,0.09);
  }
  .py-tick {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: #f0fdf4;
    border: 2px solid #bbf7d0;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem;
    animation: py-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes py-pop {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  .py-success-h1 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #0f172a;
    margin: 0 0 0.4rem;
  }
  .py-success-sub {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0 0 1.5rem;
  }

  /* receipt */
  .py-receipt {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 0.25rem 1rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  .py-receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.84rem;
  }
  .py-receipt-row:last-child { border-bottom: none; }
  .py-receipt-row span:first-child { color: #64748b; }
  .py-receipt-row span:last-child  { font-weight: 700; color: #0f172a; }
  .py-receipt-total span:last-child { color: #0369a1; font-size: 0.95rem; }

  /* success buttons */
  .py-success-btns { display: flex; flex-direction: column; gap: 10px; }
  .py-btn-primary {
    width: 100%; padding: 12px;
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: #fff; border: none; border-radius: 10px;
    font-size: 0.92rem; font-weight: 800;
    cursor: pointer; font-family: inherit;
    box-shadow: 0 4px 16px rgba(14,165,233,0.30);
    transition: box-shadow 0.2s;
  }
  .py-btn-primary:hover { box-shadow: 0 8px 24px rgba(14,165,233,0.40); }
  .py-btn-outline {
    width: 100%; padding: 11px;
    background: none; color: #64748b;
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    font-size: 0.88rem; font-weight: 700;
    cursor: pointer; font-family: inherit;
    transition: border-color 0.2s, color 0.2s;
  }
  .py-btn-outline:hover { border-color: #94a3b8; color: #374151; }

  /* spinner */
  @keyframes py-spin { to { transform: rotate(360deg); } }
  .py-spin { animation: py-spin 0.9s linear infinite; }
`;

export default Payment;
