# 🔴 CrimeLens — AI Crime Prediction System

A full-stack crime prediction application using **Machine Learning + MERN stack + Docker**.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Docker Compose                    │
│                                                     │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │   Frontend   │    │        Backend           │   │
│  │  React +     │───▶│  Node.js + Express +    │   │
│  │  Recharts    │    │  Mongoose + JWT Auth     │   │
│  │  Port: 3000  │    │  Port: 5001              │   │
│  └──────────────┘    └───────────┬──────────────┘   │
│                                  │                  │
│          ┌───────────────────────┼──────────────┐   │
│          ▼                       ▼              │   │
│  ┌──────────────┐    ┌──────────────────────┐   │   │
│  │   ML Service │    │       MongoDB        │   │   │
│  │  Flask +     │    │  Stores predictions  │   │   │
│  │  scikit-learn│    │  & users             │   │   │
│  │  Port: 5000  │    │  Port: 27017         │   │   │
│  └──────────────┘    └──────────────────────┘   │   │
└─────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
crime-predictor/
├── docker-compose.yml          # Orchestrates all services
├── dataset/
│   └── crime_data.csv          # Crime training dataset
├── ml-service/                 # Python Flask + scikit-learn
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── train.py                # Model training script
│   └── app.py                  # Flask REST API
├── backend/                    # Node.js Express API
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Prediction.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── predict.js
│   └── middleware/
│       └── auth.js
└── frontend/                   # React SPA
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    └── src/
        ├── App.js
        ├── context/AuthContext.js
        ├── components/Navbar.js
        └── pages/
            ├── Home.js
            ├── Predict.js
            ├── Dashboard.js
            ├── History.js
            └── Login.js
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Docker Compose v2+

### Run Everything

```bash
# Clone / navigate to project
cd crime-predictor

# Start all 4 services
docker compose up --build

# Or run in background
docker compose up --build -d
```

### Access the App

| Service    | URL                           |
|------------|-------------------------------|
| Frontend   | http://localhost:3000         |
| Backend    | http://localhost:5001/health  |
| ML Service | http://localhost:5000/health  |
| MongoDB    | mongodb://localhost:27017     |

## 🧠 Machine Learning

**Model:** Random Forest Classifier (100 estimators)

**Features used:**
- `hour` — Time of day (0–23)
- `day_of_week` — Day (0=Sun, 6=Sat)
- `month` — Month of year
- `district` — Geographic district (1–5)
- `weather` — Weather condition (Clear/Cloudy/Rain/Fog)
- `temperature` — Temperature in °C
- `population_density` — People per sq km
- `poverty_rate` — Area poverty rate (0–1)
- `unemployment_rate` — Area unemployment (0–1)
- `is_weekend` — Weekend flag (0/1)

**Target classes:** THEFT, ASSAULT, ROBBERY, VANDALISM, BURGLARY, DRUG_OFFENSE, MURDER

**Training:** Auto-runs on first container start; model persisted via Docker volume.

## 🔌 API Endpoints

### ML Service (port 5000)
```
GET  /health          Health check
POST /predict         Run crime prediction
GET  /stats           Dataset statistics
```

### Backend (port 5001)
```
POST /api/auth/register    Register user
POST /api/auth/login       Login
POST /api/predict          Predict + save to DB
GET  /api/predict/history  Last 20 predictions
GET  /api/predict/stats    Analytics data
```

## 🛠️ Individual Service Commands

```bash
# View logs
docker compose logs ml-service
docker compose logs backend
docker compose logs frontend

# Restart one service
docker compose restart ml-service

# Stop everything
docker compose down

# Stop + remove volumes (reset DB)
docker compose down -v
```

## 🌐 Pages

- **Home** — Overview and feature list
- **Predict** — Input form → ML prediction with confidence + top-3 results
- **Dashboard** — Charts: crime distribution, district breakdown, hourly heatmap
- **History** — Log of all predictions stored in MongoDB
- **Login/Register** — JWT auth

## 🔧 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router, Recharts    |
| Backend   | Node.js, Express, Mongoose, JWT     |
| ML        | Python, Flask, scikit-learn, pandas |
| Database  | MongoDB 7                           |
| Server    | Nginx (frontend), Gunicorn (ML)     |
| Container | Docker, Docker Compose              |
