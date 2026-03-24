"use client";

import { useState } from "react";

const contacts = [
  {
    name: "Abhishek Kaushik",
    role: "Registration Related Query",
    phone: "+91 97986 87024",
    email: "abhishekkumar89647@gmail.com",
    image: "/contact/abhishek.jpg",
    linkedin: "https://www.linkedin.com/in/abhishek-kaushik-836435282",
    tag: "REGISTER.NODE",
    color: "var(--pink)",
  },
  {
    name: "Sujal Kumar",
    role: "Payment Related Query",
    phone: "+91 91188 41006",
    email: "amrishrock2002@gmail.com",
    image: "/contact/amrish.jpg",
    linkedin: "https://www.linkedin.com/in/amrish-yadav-363b63289",
    tag: "FINANCE.NODE",
    color: "var(--yellow)",
  },
  {
    name: "Priyanshu Raj",
    role: "Event Related Query",
    phone: "+91 89571 44430",
    email: "pr@gmail.com",
    image: "/contact/harshit.jpg",
    linkedin: "https://www.linkedin.com/in/harshit-shrivastav-8b513127a",
    tag: "PRESIDENT.NODE",
    color: "var(--cyan)",
  },
  {
    name: "Ayush Verma",
    role: "General Query",
    phone: "+91 62016 68754",
    email: "av@gmail.com",
    image: "/contact/murli.jpg",
    linkedin: "https://www.linkedin.com/in/murli-dharan-614b89298",
    tag: "EVENTS.NODE",
    color: "var(--purple)",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          background:
            linear-gradient(rgba(0,3,20,0.75), rgba(0,3,20,0.65)),
            url('/contact/cyberpunk-bg.jpeg') center/cover no-repeat fixed;
          color: #e0e8ff;
          padding-top: 70px;
          position: relative;
          overflow-x: hidden;
        }
        .contact-page::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .contact-page::after {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
          );
        }

        /* ── HERO ── */
        .contact-hero {
          position: relative; z-index: 1;
          padding: 70px 5rem 60px;
          text-align: center;
          border-bottom: 1px solid rgba(0,245,255,0.08);
        }
        .contact-hero-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 5px;
          color: var(--pink); text-transform: uppercase;
          display: block; margin-bottom: 1rem;
        }
        .contact-hero-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 900; color: #fff;
          letter-spacing: 6px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .contact-hero-title span { color: var(--cyan); text-shadow: 0 0 28px rgba(0,245,255,0.6); }
        .contact-hero-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem; letter-spacing: 3px;
          color: rgba(180,200,255,0.45);
        }

        /* ── CONTACT CARDS ── */
        .contact-cards-section {
          position: relative; z-index: 1;
          padding: 70px 5rem;
          border-bottom: 1px solid rgba(0,245,255,0.06);
        }
        .contact-section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.68rem; letter-spacing: 4px;
          color: var(--pink); display: block; margin-bottom: 2.5rem;
        }
        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .contact-card {
          border: 1px solid rgba(0,245,255,0.12);
          background: rgba(0,3,20,0.85);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .contact-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--card-accent, var(--cyan));
          box-shadow: 0 0 12px var(--card-accent, var(--cyan));
        }
        .contact-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,245,255,0.35);
          box-shadow: 0 16px 50px rgba(0,0,0,0.4), 0 0 30px rgba(0,245,255,0.08);
        }
        .contact-card-img-wrap {
          position: relative; height: 260px; overflow: hidden; flex-shrink: 0;
        }
        .contact-card-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          filter: grayscale(15%) brightness(0.85);
          transition: filter 0.4s, transform 0.4s;
        }
        .contact-card:hover .contact-card-img {
          filter: grayscale(0%) brightness(1.05);
          transform: scale(1.05);
        }
        .contact-card-sep {
          height: 2px;
          background: linear-gradient(90deg, var(--card-accent, var(--cyan)), transparent);
          opacity: 0.5;
        }
        .contact-card-corner {
          position: absolute; width: 14px; height: 14px; z-index: 2;
          opacity: 0; transition: opacity 0.3s;
        }
        .contact-card:hover .contact-card-corner { opacity: 1; }
        .contact-card-corner.tl {
          top: 10px; left: 10px;
          border-top: 2px solid var(--card-accent, var(--cyan));
          border-left: 2px solid var(--card-accent, var(--cyan));
        }
        .contact-card-corner.br {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid var(--card-accent, var(--cyan));
          border-right: 2px solid var(--card-accent, var(--cyan));
        }
        .contact-card-body {
          padding: 1.2rem 1.4rem 1.5rem;
          display: flex; flex-direction: column; flex: 1;
        }
        .contact-card-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem; letter-spacing: 3px;
          color: var(--card-accent, var(--cyan));
          display: block; margin-bottom: 0.5rem;
        }
        .contact-card-name {
          font-family: 'Orbitron', monospace;
          font-size: 0.92rem; font-weight: 700;
          color: #fff; letter-spacing: 1px; margin-bottom: 0.3rem;
        }
        .contact-card-role {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.62rem; letter-spacing: 2px;
          color: var(--card-accent, var(--cyan));
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .contact-card-details {
          display: flex; flex-direction: column; gap: 0.45rem;
          border-top: 1px solid rgba(0,245,255,0.08);
          padding-top: 0.9rem; margin-top: auto;
        }
        .contact-card-detail {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem; color: rgba(180,200,255,0.6);
          text-decoration: none; display: flex; align-items: center; gap: 0.5rem;
          transition: color 0.2s;
        }
        .contact-card-detail:hover { color: #e0e8ff; }
        .contact-card-linkedin {
          font-family: 'Orbitron', monospace;
          font-size: 0.56rem; letter-spacing: 2px;
          color: var(--card-accent, var(--cyan));
          text-decoration: none; transition: opacity 0.2s;
          margin-top: 0.3rem; display: inline-block;
        }
        .contact-card-linkedin:hover { opacity: 0.7; }

        /* ══════════════════════════════════════
           ── INFO + FORM  (matches screenshot) ──
        ══════════════════════════════════════ */
        .contact-bottom {
          position: relative; z-index: 1;
          padding: 70px 5rem;
          border-bottom: 1px solid rgba(0,245,255,0.06);
        }
        .contact-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* --- Info blocks --- */
        .info-stack { display: flex; flex-direction: column; gap: 1rem; }

        .info-block {
          background: rgba(8, 10, 28, 0.85);
          border: 1px solid rgba(0, 230, 255, 0.28);
          border-radius: 12px;
          padding: 1.3rem 1.5rem;
          position: relative;
          backdrop-filter: blur(12px);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .info-block:hover {
          border-color: rgba(255, 0, 255, 0.55);
          box-shadow:
            0 0 10px #ff00ff,
            0 0 20px rgba(255,0,255,0.3);
          transform: translateY(-2px);
        }

        /* hide the old label */
        .info-block-label { display: none; }

        .info-block-title {
          font-size: 1.05rem; font-weight: 700;
          color: #00e5ff;
          margin-bottom: 0.65rem;
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'Segoe UI', sans-serif;
        }
        .info-block-text {
          font-size: 0.88rem;
          color: rgba(220, 230, 255, 0.85);
          line-height: 1.85;
          font-family: 'Segoe UI', sans-serif;
        }
        .info-block-text a {
          color: rgba(220,230,255,0.85);
          text-decoration: none;
          transition: color 0.2s;
        }
        .info-block-text a:hover { color: #00e5ff; }

        /* --- Contact Form --- */
        .contact-form-wrap {
          background: rgba(8, 10, 28, 0.85);
          border: 1px solid rgba(0, 230, 255, 0.28);
          border-radius: 12px;
          padding: 1.8rem 2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .contact-form-wrap:hover {
          box-shadow:
            0 0 10px #ff00ff,
            0 0 20px rgba(255,0,255,0.25);
          border-color: rgba(255,0,255,0.5);
        }

        .contact-form-header {
          margin-bottom: 1.4rem;
        }
        .contact-form-title {
          font-size: 1.5rem; font-weight: 700;
          color: #00e5ff;
          font-family: 'Segoe UI', sans-serif;
        }

        .contact-form-inner {
          display: flex; flex-direction: column; gap: 1rem;
        }

        /* hide old field labels */
        .form-field-label { display: none; }

        .contact-input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(5, 8, 22, 0.7);
          border: 1px solid rgba(0, 220, 255, 0.35);
          border-radius: 8px;
          outline: none;
          color: #e0e8ff;
          font-family: 'Segoe UI', sans-serif;
          font-size: 0.93rem;
          box-sizing: border-box;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .contact-input::placeholder { color: rgba(160,180,220,0.45); }
        .contact-input:focus {
          border-color: #ff00ff;
          box-shadow: 0 0 10px #ff00ff, 0 0 18px rgba(255,0,255,0.2);
        }
        textarea.contact-input { resize: vertical; min-height: 120px; }

        .contact-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #ff00ff, #00e5ff);
          border: none;
          border-radius: 8px;
          font-family: 'Orbitron', monospace;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
          margin-top: 0.2rem;
        }
        .contact-submit:hover {
          transform: scale(1.04);
          box-shadow: 0 0 18px #00e5ff, 0 0 35px rgba(0,229,255,0.35);
        }
        .contact-submit-success {
          background: linear-gradient(90deg, #00ff88, #00e5ff) !important;
        }

        /* ── MAP ── */
        .contact-map-section {
          position: relative; z-index: 1;
          padding: 70px 5rem;
        }
        .contact-map-wrap {
          border: 1px solid rgba(0,245,255,0.15);
          background: rgba(0,3,20,0.85);
          position: relative; overflow: hidden;
          margin-top: 2rem;
        }
        .contact-map-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, var(--cyan), var(--pink), transparent);
        }
        .contact-map-bar {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.8rem 1.4rem;
          border-bottom: 1px solid rgba(0,245,255,0.1);
          background: rgba(0,245,255,0.03);
        }
        .contact-map-bar span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem; color: rgba(0,245,255,0.4); letter-spacing: 1px;
        }
        .contact-map-bar .map-status {
          margin-left: auto; color: #00ff88; font-size: 0.6rem; letter-spacing: 2px;
          display: flex; align-items: center; gap: 6px;
        }
        .map-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00ff88; box-shadow: 0 0 8px #00ff88;
          animation: map-pulse 1.5s ease infinite;
        }
        @keyframes map-pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .contact-map-wrap iframe {
          display: block; width: 100%; height: 380px; border: none;
          filter: grayscale(20%) invert(5%);
        }
        .form-dots { display: flex; gap: 5px; }
        .form-dots span { width: 9px; height: 9px; border-radius: 50%; }
        .form-dots span:nth-child(1) { background: #ff5f57; box-shadow: 0 0 5px #ff5f57; }
        .form-dots span:nth-child(2) { background: #febc2e; box-shadow: 0 0 5px #febc2e; }
        .form-dots span:nth-child(3) { background: #28c840; box-shadow: 0 0 5px #28c840; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .contact-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .contact-hero { padding: 60px 2rem 50px; }
          .contact-cards-section { padding: 50px 2rem; }
          .contact-bottom { padding: 50px 2rem; }
          .contact-map-section { padding: 50px 2rem; }
          .contact-bottom-grid { grid-template-columns: 1fr; }
          .contact-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .contact-cards-grid { grid-template-columns: 1fr; }
          .contact-hero-title { letter-spacing: 3px; }
        }
      `}</style>

      <div className="contact-page">

        {/* ── HERO ── */}
        <section className="contact-hero">
          <span className="contact-hero-label">// contact.init()</span>
          <h1 className="contact-hero-title">
            Contact <span>Us</span>
          </h1>
          <p className="contact-hero-sub">// REACH_OUT · COLLABORATE · CONNECT</p>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="contact-cards-section">
          <span className="contact-section-label">// team.contacts()</span>
          <div className="contact-cards-grid">
            {contacts.map((c, i) => (
              <div
                key={i}
                className="contact-card"
                style={{ "--card-accent": c.color, position: "relative" } as React.CSSProperties}
              >
                <div className="contact-card-img-wrap">
                  <img src={c.image} alt={c.name} className="contact-card-img" />
                  <div className="contact-card-corner tl" />
                  <div className="contact-card-corner br" />
                </div>
                <div className="contact-card-sep" />
                <div className="contact-card-body">
                  <span className="contact-card-tag">// {c.tag}</span>
                  <h3 className="contact-card-name">{c.name}</h3>
                  <p className="contact-card-role">{c.role}</p>
                  <div className="contact-card-details">
                    <a href={`tel:${c.phone}`} className="contact-card-detail">
                      <span>☎</span> {c.phone}
                    </a>
                    <a href={`mailto:${c.email}`} className="contact-card-detail">
                      <span>✉</span> {c.email}
                    </a>
                    <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card-linkedin">
                      ▶ LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INFO + FORM ── */}
        <section className="contact-bottom">
          <span className="contact-section-label">// sys.connect()</span>
          <div className="contact-bottom-grid">

            {/* Left: Info blocks */}
            <div className="info-stack">
              <div className="info-block">
                <span className="info-block-label">// location.get()</span>
                <div className="info-block-title">📍 Address</div>
                <div className="info-block-text">
                  Society of Computer Science and Engineering<br />
                  National Institute of Technology<br />
                  Adityapur, Jamshedpur, Jharkhand<br />
                  831014, India
                </div>
              </div>

              <div className="info-block">
                <span className="info-block-label">// sponsor.connect()</span>
                <div className="info-block-title">💼 Sponsorship</div>
                <div className="info-block-text">
                  For sponsorship and collaboration:<br />
                  <a href="mailto:scse.nit@gmail.com">scse.nit@gmail.com</a>
                </div>
              </div>

              <div className="info-block">
                <span className="info-block-label">// social.links()</span>
                <div className="info-block-title">🔗 Follow Us</div>
                <div className="info-block-text">
                  <a href="https://www.instagram.com/scse.nitjsr" target="_blank" rel="noreferrer">Instagram — @scse.nitjsr</a><br />
                  <a href="https://www.linkedin.com/company/scse-nitjsr" target="_blank" rel="noreferrer">LinkedIn — SCSE NITJSR</a><br />
                  <a href="https://www.youtube.com/channel/UChVrvyEjDkUEhqoBezJLxpw" target="_blank" rel="noreferrer">YouTube — SCSE Channel</a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrap">
              <div className="contact-form-header">
                <div className="contact-form-title">Send Message</div>
              </div>
              <div className="contact-form-inner">
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="contact-input" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="contact-input" required />
                <input name="mobile" placeholder="eg.: +91 9876543210" onChange={handleChange} className="contact-input" />
                <textarea name="message" placeholder="Your Query..." rows={5} onChange={handleChange} className="contact-input" required />
                <button onClick={handleSubmit} className={`contact-submit ${submitted ? "contact-submit-success" : ""}`}>
                  {submitted ? "✓ MESSAGE SENT" : "SEND MESSAGE"}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── MAP ── */}
        <section className="contact-map-section">
          <span className="contact-section-label">// location.render()</span>
          <div className="contact-map-wrap">
            <div className="contact-map-bar">
              <div className="form-dots"><span /><span /><span /></div>
              <span>maps@nitjsr:~/location$ get_coordinates --nit-jamshedpur</span>
              <span className="map-status">
                <span className="map-dot" /> SIGNAL LOCKED
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14714.846067448243!2d86.1446394!3d22.77608485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4daa475a5cd%3A0xd87b53fadcd771a1!2sNational%20Institute%20of%20Technology%20Jamshedpur%20(NIT%20Jamshedpur)!5e0!3m2!1sen!2sin!4v1774279951019!5m2!1sen!2sin"
              loading="lazy"
              title="NIT Jamshedpur Map"
            />
          </div>
        </section>

      </div>
    </>
  );
}