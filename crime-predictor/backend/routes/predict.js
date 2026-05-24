const express = require('express');
const axios = require('axios');
const Prediction = require('../models/Prediction');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const ML_URL = process.env.ML_SERVICE_URL || 'http://ml-service:5000';

// POST /api/predict - send to ML service and save
router.post('/', async (req, res) => {
  try {
    const mlResponse = await axios.post(`${ML_URL}/predict`, req.body, { timeout: 15000 });
    const result = mlResponse.data;

    // Save prediction to DB
    const prediction = new Prediction({
      userId: req.user ? req.user._id : null,
      inputData: req.body,
      result
    });
    await prediction.save();

    res.json({ ...result, predictionId: prediction._id });
  } catch (err) {
    console.error('ML service error:', err.message);
    res.status(500).json({ message: 'Prediction failed', error: err.message });
  }
});

// GET /api/predict/history - get last 20 predictions
router.get('/history', async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'name email');
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/predict/stats - ML stats
router.get('/stats', async (req, res) => {
  try {
    const mlResponse = await axios.get(`${ML_URL}/stats`, { timeout: 10000 });
    
    // Also add DB stats
    const totalPredictions = await Prediction.countDocuments();
    const recentPredictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      ...mlResponse.data,
      total_predictions_made: totalPredictions,
      recent_predictions: recentPredictions
    });
  } catch (err) {
    res.status(500).json({ message: 'Stats fetch failed', error: err.message });
  }
});

module.exports = router;
