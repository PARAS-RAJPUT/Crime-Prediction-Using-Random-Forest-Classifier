import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../context/AuthContext';

const WEATHER_OPTIONS = ['Clear', 'Cloudy', 'Rain', 'Fog'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const RiskBadge = ({ level }) => {
  const colors = { LOW: '#2ecc71', MODERATE: '#f1c40f', HIGH: '#e67e22', 'VERY HIGH': '#e74c3c', CRITICAL: '#ff0040' };
  return (
    <span style={{
      background: colors[level] || '#666',
      color: '#000',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 700,
      padding: '4px 10px',
      letterSpacing: 2,
      borderRadius: 2
    }}>{level}</span>
  );
};

const Predict = () => {
  const [form, setForm] = useState({
    hour: 14, day_of_week: 1, month: 6, district: 1,
    weather: 'Clear', temperature: 25,
    population_density: 7000, poverty_rate: 0.20,
    unemployment_rate: 0.10, is_weekend: 0
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: isNaN(value) || value === '' ? value : Number(value) }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/api/predict`, form);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed. Is the ML service running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '48px', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--accent)', marginBottom: 8 }}>
        // CRIME RISK PREDICTION ENGINE
      </p>
      <h1 style={{ fontWeight: 800, fontSize: 36, marginBottom: 40 }}>Run Prediction</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Form */}
        <div className="card">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--text2)', marginBottom: 24 }}>INPUT PARAMETERS</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Hour (0–23)</label>
              <input type="number" name="hour" min={0} max={23} value={form.hour} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Day of Week</label>
              <select name="day_of_week" value={form.day_of_week} onChange={handleChange}>
                {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Month</label>
              <select name="month" value={form.month} onChange={handleChange}>
                {MONTHS.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>District (1–5)</label>
              <input type="number" name="district" min={1} max={5} value={form.district} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Weather</label>
              <select name="weather" value={form.weather} onChange={handleChange}>
                {WEATHER_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Temperature (°C)</label>
              <input type="number" name="temperature" value={form.temperature} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Population Density</label>
              <input type="number" name="population_density" value={form.population_density} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Poverty Rate (0–1)</label>
              <input type="number" name="poverty_rate" min={0} max={1} step={0.01} value={form.poverty_rate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Unemployment Rate</label>
              <input type="number" name="unemployment_rate" min={0} max={1} step={0.01} value={form.unemployment_rate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Weekend?</label>
              <select name="is_weekend" value={form.is_weekend} onChange={handleChange}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}>
            {loading ? '⟳ ANALYZING...' : '⚡ PREDICT CRIME RISK'}
          </button>

          {error && (
            <div style={{ marginTop: 16, padding: 12, background: 'rgba(255,58,58,0.1)', border: '1px solid var(--accent)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>
              {error}
            </div>
          )}
        </div>

        {/* Result */}
        <div>
          {!result && !loading && (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              border: '1px dashed var(--border)', borderRadius: 8, padding: 48
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', letterSpacing: 2 }}>
                AWAITING INPUT DATA
              </p>
            </div>
          )}

          {loading && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', borderRadius: 8, padding: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 16, animation: 'spin 1s linear infinite' }}>⟳</div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', letterSpacing: 2 }}>RUNNING ML MODEL...</p>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Main result */}
              <div className="card" style={{ border: '1px solid var(--accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', letterSpacing: 3, marginBottom: 6 }}>PREDICTED CRIME TYPE</p>
                    <h2 style={{ fontWeight: 800, fontSize: 28, color: 'var(--accent)' }}>{result.prediction}</h2>
                  </div>
                  <RiskBadge level={result.risk_level} />
                </div>
                <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 16 }}>{result.description}</p>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text2)' }}>CONFIDENCE</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent3)' }}>{result.confidence}%</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text2)' }}>SEVERITY</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700 }} className={`severity-${result.severity}`}>{result.severity}/5</p>
                  </div>
                </div>
              </div>

              {/* Top predictions */}
              <div className="card">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--text2)', marginBottom: 16 }}>TOP PREDICTIONS</p>
                {result.top_predictions?.map((pred, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{pred.crime_type}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)' }}>{pred.probability}%</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--bg)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${pred.probability}%`,
                        background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--accent2)' : 'var(--border)',
                        borderRadius: 2,
                        transition: 'width 0.8s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Predict;
