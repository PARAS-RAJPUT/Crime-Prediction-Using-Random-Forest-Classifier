import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { API } from '../context/AuthContext';

const COLORS = ['#ff3a3a', '#ff6b35', '#ffd23f', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/predict/stats`)
      .then(r => setStats(r.data))
      .catch(() => setError('Could not load stats. Make sure all services are running.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: 48, textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>LOADING ANALYTICS...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: 48 }}>
      <div style={{ padding: 24, background: 'rgba(255,58,58,0.1)', border: '1px solid var(--accent)', borderRadius: 8, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
        {error}
      </div>
    </div>
  );

  const crimeData = stats ? Object.entries(stats.crime_distribution).map(([k, v]) => ({ name: k, count: v })) : [];
  const hourlyData = stats ? Object.entries(stats.hourly_distribution)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([k, v]) => ({ hour: `${k}:00`, count: v })) : [];
  const districtData = stats ? Object.entries(stats.district_distribution).map(([k, v]) => ({ name: `District ${k}`, value: v })) : [];

  return (
    <div style={{ padding: '48px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--accent)', marginBottom: 8 }}>
        // CRIME ANALYTICS DASHBOARD
      </p>
      <h1 style={{ fontWeight: 800, fontSize: 36, marginBottom: 40 }}>Analytics</h1>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Records', val: stats?.total_records || 0, icon: '📁' },
          { label: 'Crime Types', val: crimeData.length, icon: '🔴' },
          { label: 'Predictions Made', val: stats?.total_predictions_made || 0, icon: '🧠' },
          { label: 'Avg Severity', val: stats?.avg_severity || 0, icon: '⚠️' }
        ].map(({ label, val, icon }, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>{val}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text2)', marginTop: 4 }}>{label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--text2)', marginBottom: 20 }}>CRIME TYPE DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={crimeData}>
              <XAxis dataKey="name" tick={{ fill: '#9090a0', fontSize: 10, fontFamily: 'Space Mono' }} />
              <YAxis tick={{ fill: '#9090a0', fontSize: 10, fontFamily: 'Space Mono' }} />
              <Tooltip contentStyle={{ background: '#16161f', border: '1px solid #2a2a3a', fontFamily: 'Space Mono', fontSize: 12 }} />
              <Bar dataKey="count" fill="var(--accent)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--text2)', marginBottom: 20 }}>DISTRICT BREAKDOWN</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={districtData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {districtData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#16161f', border: '1px solid #2a2a3a', fontFamily: 'Space Mono', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly chart */}
      <div className="card">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--text2)', marginBottom: 20 }}>CRIMES BY HOUR OF DAY</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourlyData}>
            <XAxis dataKey="hour" tick={{ fill: '#9090a0', fontSize: 9, fontFamily: 'Space Mono' }} />
            <YAxis tick={{ fill: '#9090a0', fontSize: 10, fontFamily: 'Space Mono' }} />
            <Tooltip contentStyle={{ background: '#16161f', border: '1px solid #2a2a3a', fontFamily: 'Space Mono', fontSize: 12 }} />
            <Bar dataKey="count" fill="var(--accent2)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
