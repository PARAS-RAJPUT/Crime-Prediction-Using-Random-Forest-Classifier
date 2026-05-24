import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🧠', title: 'ML-Powered', desc: 'Random Forest classifier trained on real crime patterns' },
  { icon: '⚡', title: 'Real-time', desc: 'Instant predictions via Flask microservice' },
  { icon: '📊', title: 'Visual Analytics', desc: 'Crime distribution charts and trend analysis' },
  { icon: '🔐', title: 'Secure', desc: 'JWT auth with encrypted passwords via bcrypt' },
  { icon: '🐳', title: 'Dockerized', desc: 'Full stack containerized with Docker Compose' },
  { icon: '🗄️', title: 'Persistent', desc: 'MongoDB stores all predictions and user data' }
];

const Home = () => (
  <div style={{ minHeight: 'calc(100vh - 60px)' }}>
    {/* Hero */}
    <div style={{
      padding: '100px 48px 80px',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(255,58,58,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 4, color: 'var(--accent)', marginBottom: 20 }}>
        // AI-POWERED CRIME ANALYSIS SYSTEM
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(40px, 6vw, 80px)',
        lineHeight: 1.05,
        marginBottom: 24,
        maxWidth: 700
      }}>
        PREDICT.<br />
        <span style={{ color: 'var(--accent)' }}>PREVENT.</span><br />
        PROTECT.
      </h1>
      <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 500, marginBottom: 40, lineHeight: 1.6 }}>
        Machine learning crime prediction using Random Forest classifier. 
        Input location and time parameters to get AI-driven crime risk assessment.
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link to="/predict" className="btn btn-primary" style={{ fontSize: 13 }}>
          ⚡ RUN PREDICTION
        </Link>
        <Link to="/dashboard" className="btn btn-secondary" style={{ fontSize: 13 }}>
          📊 VIEW ANALYTICS
        </Link>
      </div>
    </div>

    {/* Stats strip */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      borderBottom: '1px solid var(--border)'
    }}>
      {[
        { num: '7', label: 'Crime Types' },
        { num: '5', label: 'Districts' },
        { num: '10', label: 'ML Features' },
        { num: '100%', label: 'Dockerized' }
      ].map(({ num, label }, i) => (
        <div key={i} style={{
          padding: '32px',
          borderRight: i < 3 ? '1px solid var(--border)' : 'none',
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>{num}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--text2)', marginTop: 4 }}>{label.toUpperCase()}</div>
        </div>
      ))}
    </div>

    {/* Features */}
    <div style={{ padding: '64px 48px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--text2)', marginBottom: 40 }}>
        // SYSTEM CAPABILITIES
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 1,
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden'
      }}>
        {FEATURES.map(({ icon, title, desc }, i) => (
          <div key={i} style={{
            padding: '32px',
            background: 'var(--card)',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            transition: 'background 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#1c1c28'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--card)'}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{title}</div>
            <div style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Home;
