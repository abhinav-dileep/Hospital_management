import React from "react";

const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "50+", label: "Specialist Doctors" },
    { value: "20k+", label: "Patients Served" },
    { value: "98%", label: "Patient Satisfaction" },
];

const team = [
    { name: "Dr. Priya Sharma", role: "Cardiologist", emoji: "🫀" },
    { name: "Dr. Arjun Mehta", role: "Neurologist", emoji: "🧠" },
    { name: "Dr. Riya Kapoor", role: "Pediatrician", emoji: "👶" },
    { name: "Dr. Suresh Patel", role: "Orthopedic", emoji: "🦴" },
];

const About = () => {
    return (
        <div style={styles.page}>
            {/* Hero */}
            <div style={styles.hero}>
                <div style={styles.badge}>🏥 About Us</div>
                <h1 style={styles.heroTitle}>
                    Committed to Your <span style={styles.highlight}>Health & Wellbeing</span>
                </h1>
                <p style={styles.heroSub}>
                    MediCare+ is a premier multi-specialty hospital delivering compassionate,
                    world-class healthcare to every patient — every time.
                </p>
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
                {stats.map((s) => (
                    <div key={s.label} style={styles.statCard}>
                        <div style={styles.statValue}>{s.value}</div>
                        <div style={styles.statLabel}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Mission */}
            <div style={styles.section}>
                <div style={styles.missionCard}>
                    <h2 style={styles.sectionTitle}>Our Mission</h2>
                    <p style={styles.sectionText}>
                        At MediCare+, we believe healthcare is a fundamental right. Our mission is to
                        provide accessible, affordable, and advanced medical care using the latest
                        technology and the most compassionate professionals in the field.
                    </p>
                    <p style={styles.sectionText}>
                        From routine check-ups to complex surgeries, our integrated team of specialists
                        works together to ensure every patient receives a personalized treatment plan
                        tailored to their unique needs.
                    </p>
                </div>
            </div>

            {/* Team */}
            <div style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, textAlign: "center", marginBottom: "32px" }}>
                    Meet Our Specialists
                </h2>
                <div style={styles.teamGrid}>
                    {team.map((doc) => (
                        <div key={doc.name} style={styles.teamCard}>
                            <div style={styles.teamEmoji}>{doc.emoji}</div>
                            <div style={styles.teamName}>{doc.name}</div>
                            <div style={styles.teamRole}>{doc.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #0d2347 50%, #0a1a36 100%)" },
    hero: {
        textAlign: "center",
        padding: "80px 20px 60px",
        background: "linear-gradient(180deg, rgba(29,78,216,0.25) 0%, transparent 100%)",
    },
    badge: {
        display: "inline-block",
        background: "rgba(59,130,246,0.2)",
        border: "1px solid rgba(59,130,246,0.4)",
        color: "#60a5fa",
        borderRadius: "999px",
        padding: "6px 18px",
        fontSize: "0.85rem",
        fontWeight: 600,
        marginBottom: "18px",
    },
    heroTitle: { fontSize: "2.8rem", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.25 },
    highlight: { color: "#60a5fa" },
    heroSub: { color: "#93c5fd", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" },
    statsRow: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        padding: "0 20px 60px",
    },
    statCard: {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: "16px",
        padding: "28px 36px",
        textAlign: "center",
        minWidth: "160px",
        backdropFilter: "blur(10px)",
    },
    statValue: { fontSize: "2.2rem", fontWeight: 800, color: "#60a5fa", marginBottom: "6px" },
    statLabel: { color: "#93c5fd", fontSize: "0.875rem", fontWeight: 500 },
    section: { maxWidth: "900px", margin: "0 auto", padding: "0 20px 60px" },
    missionCard: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: "20px",
        padding: "40px",
        backdropFilter: "blur(12px)",
    },
    sectionTitle: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "18px" },
    sectionText: { color: "#93c5fd", lineHeight: 1.8, marginBottom: "14px", fontSize: "1rem" },
    teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "20px" },
    teamCard: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: "16px",
        padding: "28px 20px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        transition: "transform 0.2s",
    },
    teamEmoji: { fontSize: "2.5rem", marginBottom: "12px" },
    teamName: { color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: "6px" },
    teamRole: { color: "#60a5fa", fontSize: "0.875rem", fontWeight: 500 },
};

export default About;
