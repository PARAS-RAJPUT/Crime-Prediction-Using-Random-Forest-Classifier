import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          background: 'var(--accent)',
          color: 'white',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          padding: '4px 10px',
          fontSize: 14,
          letterSpacing: 2
        }}>CRIME</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text)', letterSpacing: 1 }}>LENS</span>
      </Link>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {[
          { to: '/', label: 'HOME' },
          { to: '/predict', label: 'PREDICT' },
          { to: '/dashboard', label: 'DASHBOARD' },
          { to: '/history', label: 'HISTORY' }
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 2,
            textDecoration: 'none',
            padding: '6px 14px',
            color: pathname === to ? 'var(--accent)' : 'var(--text2)',
            borderBottom: pathname === to ? '2px solid var(--accent)' : '2px solid transparent',
            transition: 'all 0.2s'
          }}>{label}</Link>
        ))}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)' }}>
              {user.name.toUpperCase()}
            </span>
            <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: 11 }} onClick={logout}>
              LOGOUT
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 11, marginLeft: 8 }}>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
