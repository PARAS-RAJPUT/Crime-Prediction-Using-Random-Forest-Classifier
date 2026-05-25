import React from 'react';
import { Link } from 'react-router-dom';

const FLOW = [
  {
    icon: '🧠',
    title: 'ML ENGINE',
    desc: 'Random Forest model trained on real-world crime datasets'
  },
  {
    icon: '⚡',
    title: 'REALTIME API',
    desc: 'Flask microservice processes live prediction requests'
  },
  {
    icon: '📊',
    title: 'ANALYTICS',
    desc: 'Crime heatmaps, trends, and intelligent visual insights'
  },
  {
    icon: '🔐',
    title: 'SECURITY',
    desc: 'JWT authentication with bcrypt encrypted passwords'
  },
  {
    icon: '🐳',
    title: 'DOCKERIZED',
    desc: 'Fully containerized scalable deployment architecture'
  },
  {
    icon: '🗄️',
    title: 'DATABASE',
    desc: 'MongoDB stores users, predictions, and analytics'
  }
];

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#08080d',
        color: 'white',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at top right, rgba(255,58,58,0.12), transparent 30%),
            radial-gradient(circle at bottom left, rgba(0,150,255,0.08), transparent 30%)
          `,
          pointerEvents: 'none'
        }}
      />

      {/* HERO */}
      <section
        style={{
          padding: '100px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 5
        }}
      >
        <p
          style={{
            color: '#ff3a3a',
            letterSpacing: 5,
            fontSize: 12,
            marginBottom: 24,
            fontFamily: 'monospace'
          }}
        >
          // AI CRIME PREDICTION SYSTEM
        </p>

        <h1
          style={{
            fontSize: 'clamp(46px, 7vw, 100px)',
            lineHeight: 0.95,
            fontWeight: 900,
            marginBottom: 28
          }}
        >
          PREDICT.
          <br />
          <span
            style={{
              color: '#ff3a3a',
              textShadow: '0 0 25px rgba(255,58,58,0.5)'
            }}
          >
            PREVENT.
          </span>
          <br />
          PROTECT.
        </h1>

        <p
          style={{
            maxWidth: 760,
            margin: '0 auto',
            color: '#9ca3af',
            lineHeight: 1.8,
            fontSize: 17
          }}
        >
          Interactive machine learning crime intelligence system with realtime
          prediction infrastructure, visual analytics, secure authentication,
          and scalable cloud-native architecture.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            marginTop: 40,
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/predict"
            style={{
              padding: '16px 28px',
              borderRadius: 14,
              background: '#ff3a3a',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            ⚡ RUN PREDICTION
          </Link>

          <Link
            to="/dashboard"
            style={{
              padding: '16px 28px',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            📊 VIEW ANALYTICS
          </Link>
        </div>
      </section>

      {/* FLOW SECTION */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '80px 20px 140px'
        }}
      >
        {/* CENTER DOTTED LINE */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 4,
            transform: 'translateX(-50%)',
            background: `
              repeating-linear-gradient(
                to bottom,
                #ff3a3a 0px,
                #ff3a3a 10px,
                transparent 10px,
                transparent 22px
              )
            `,
            opacity: 0.8,
            boxShadow: '0 0 18px rgba(255,58,58,0.35)'
          }}
        />

        {FLOW.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: 110
              }}
            >
              {/* CONNECTOR */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: isLeft ? '50%' : 'auto',
                  right: isLeft ? 'auto' : '50%',
                  width: 120,
                  height: 2,
                  transform: 'translateY(-50%)',
                  background: `
                    repeating-linear-gradient(
                      to right,
                      #ff3a3a 0px,
                      #ff3a3a 8px,
                      transparent 8px,
                      transparent 16px
                    )
                  `
                }}
              />

              {/* CENTER NODE */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#0a0a0f',
                  border: '4px solid #ff3a3a',
                  boxShadow: `
                    0 0 25px rgba(255,58,58,0.8),
                    0 0 60px rgba(255,58,58,0.3)
                  `,
                  zIndex: 20
                }}
              />

              {/* CARD */}
              <div
                className="flow-card"
                style={{
                  width: '40%',
                  minWidth: 300,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(14px)',
                  transition: 'all 0.35s ease',
                  cursor: 'pointer'
                }}
              >
                {/* GLOW */}
                <div
                  style={{
                    position: 'absolute',
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: 'rgba(255,58,58,0.08)',
                    top: -70,
                    right: -60,
                    animation: 'pulse 5s infinite'
                  }}
                />

                <div
                  style={{
                    fontSize: 46,
                    marginBottom: 18
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    marginBottom: 12,
                    letterSpacing: 1
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    color: '#9ca3af',
                    lineHeight: 1.8,
                    fontSize: 14
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* STATS */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: 20,
          padding: '0 30px 80px',
          maxWidth: 1200,
          margin: '0 auto'
        }}
      >
        {[
          { num: '7+', label: 'Crime Types' },
          { num: '5', label: 'Districts' },
          { num: '10+', label: 'ML Features' },
          { num: '100%', label: 'Dockerized' }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: 30,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: '#ff3a3a',
                marginBottom: 10
              }}
            >
              {item.num}
            </div>

            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: '#9ca3af'
              }}
            >
              {item.label.toUpperCase()}
            </div>
          </div>
        ))}
      </section>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.1;
            }
            100% {
              transform: scale(0.8);
              opacity: 0.4;
            }
          }

          .flow-card:hover {
            transform: translateY(-10px) scale(1.03);
            border-color: #ff3a3a !important;
            background: rgba(255,255,255,0.07) !important;
            box-shadow: 0 20px 50px rgba(255,58,58,0.25);
          }

          @media (max-width: 768px) {
            .flow-card {
              width: 100% !important;
              min-width: unset !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
