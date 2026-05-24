require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const predictRoutes = require('./routes/predict');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'backend' }));

// MongoDB connection
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://mongo:27017/crimedb';
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB connected');
      break;
    } catch (err) {
      retries--;
      console.log(`MongoDB connection failed. Retries left: ${retries}`);
      if (!retries) throw err;
      await new Promise(r => setTimeout(r, 5000));
    }
  }
};

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
