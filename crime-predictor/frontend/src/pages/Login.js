import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    const result = isLogin
      ? await login(form.email, form.password)
      : await register(form.name, form.email, form.password);

    if (result.success) navigate('/predict');
    else setError(result.message);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 420 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--accent)', marginBottom: 8 }}>
          // ACCESS CONTROL
        </p>
        <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32 }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        {!isLogin && (
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>

        {error && (
          <div style={{ marginBottom: 16, padding: 12, background: 'rgba(255,58,58,0.1)', border: '1px solid var(--accent)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>
            {error}
          </div>
        )}

        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }} onClick={handleSubmit} disabled={loading}>
          {loading ? '⟳ PROCESSING...' : isLogin ? '→ SIGN IN' : '→ CREATE ACCOUNT'}
        </button>

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            {isLogin ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
