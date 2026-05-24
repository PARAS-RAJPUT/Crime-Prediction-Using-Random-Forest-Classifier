import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../context/AuthContext';

const RiskBadge = ({ level }) => {
  const colors = { LOW: '#2ecc71', MODERATE: '#f1c40f', HIGH: '#e67e22', 'VERY HIGH': '#e74c3c', CRITICAL: '#ff0040' };
  return (
    <span style={{
      background: colors[level] || '#666', color: '#000',
      fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
      padding: '2px 8px', letterSpacing: 1, borderRadius: 2
    }}>{level}</span>
  );
};

const History = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/predict/history`)
      .then(r => setPredictions(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '48px', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--accent)', marginBottom: 8 }}>
        // PREDICTION LOG
      </p>
      <h1 style={{ fontWeight: 800, fontSize: 36, marginBottom: 40 }}>History</h1>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>LOADING...</p>
      ) : predictions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, border: '1px dashed var(--border)', borderRadius: 8 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', letterSpacing: 2 }}>NO PREDICTIONS YET</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {predictions.map((p, i) => (
            <div key={i} className="card" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: 16 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--accent)', marginBottom: 2 }}>{p.result?.prediction}</p>
                <p style={{ fontSize: 11, color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(p.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', marginBottom: 2 }}>CONFIDENCE</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.result?.confidence}%</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', marginBottom: 2 }}>SEVERITY</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }} className={`severity-${p.result?.severity}`}>{p.result?.severity}/5</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', marginBottom: 4 }}>RISK</p>
                <RiskBadge level={p.result?.risk_level} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', marginBottom: 2 }}>DISTRICT</p>
                <p style={{ fontFamily: 'var(--font-mono)' }}>D{p.inputData?.district} / H{p.inputData?.hour}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
