const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  inputData: {
    hour: Number,
    day_of_week: Number,
    month: Number,
    district: Number,
    weather: String,
    temperature: Number,
    population_density: Number,
    poverty_rate: Number,
    unemployment_rate: Number,
    is_weekend: Number
  },
  result: {
    prediction: String,
    severity: Number,
    confidence: Number,
    risk_level: String,
    description: String,
    top_predictions: Array
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
