from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import subprocess

app = Flask(__name__)
CORS(app)

model = None
scaler = None
label_encoder = None
weather_encoder = None
features = None

CRIME_SEVERITY = {
    'THEFT': 2, 'VANDALISM': 1, 'DRUG_OFFENSE': 3,
    'ASSAULT': 3, 'ROBBERY': 4, 'BURGLARY': 4, 'MURDER': 5
}

CRIME_DESCRIPTIONS = {
    'THEFT': 'Petty or grand theft of property',
    'VANDALISM': 'Destruction or defacement of property',
    'DRUG_OFFENSE': 'Drug possession or distribution',
    'ASSAULT': 'Physical attack or threat of violence',
    'ROBBERY': 'Theft involving force or intimidation',
    'BURGLARY': 'Unlawful entry into a structure',
    'MURDER': 'Unlawful killing of a person'
}

def load_models():
    global model, scaler, label_encoder, weather_encoder, features
    model_path = '/app/models/crime_model.pkl'
    if not os.path.exists(model_path):
        print("Models not found, training now...")
        subprocess.run(['python', '/app/train.py'], check=True)
    model = joblib.load('/app/models/crime_model.pkl')
    scaler = joblib.load('/app/models/scaler.pkl')
    label_encoder = joblib.load('/app/models/label_encoder.pkl')
    weather_encoder = joblib.load('/app/models/weather_encoder.pkl')
    features = joblib.load('/app/models/features.pkl')
    print("Models loaded successfully!")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'models_loaded': model is not None})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        weather_val = data.get('weather', 'Clear')
        try:
            weather_enc = weather_encoder.transform([weather_val])[0]
        except:
            weather_enc = 0

        input_features = [[
            int(data.get('hour', 12)),
            int(data.get('day_of_week', 1)),
            int(data.get('month', 6)),
            int(data.get('district', 1)),
            weather_enc,
            float(data.get('temperature', 20)),
            float(data.get('population_density', 7000)),
            float(data.get('poverty_rate', 0.20)),
            float(data.get('unemployment_rate', 0.10)),
            int(data.get('is_weekend', 0))
        ]]

        scaled = scaler.transform(input_features)
        pred_enc = model.predict(scaled)[0]
        proba = model.predict_proba(scaled)[0]

        pred_crime = label_encoder.inverse_transform([pred_enc])[0]
        
        # Top 3 predictions
        top3_idx = np.argsort(proba)[-3:][::-1]
        top3 = []
        for idx in top3_idx:
            crime = label_encoder.inverse_transform([idx])[0]
            top3.append({
                'crime_type': crime,
                'probability': round(float(proba[idx]) * 100, 1),
                'severity': CRIME_SEVERITY.get(crime, 2),
                'description': CRIME_DESCRIPTIONS.get(crime, '')
            })

        return jsonify({
            'prediction': pred_crime,
            'severity': CRIME_SEVERITY.get(pred_crime, 2),
            'description': CRIME_DESCRIPTIONS.get(pred_crime, ''),
            'confidence': round(float(max(proba)) * 100, 1),
            'top_predictions': top3,
            'risk_level': get_risk_level(CRIME_SEVERITY.get(pred_crime, 2))
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/stats', methods=['GET'])
def stats():
    """Return dataset statistics"""
    import pandas as pd
    df = pd.read_csv('/app/dataset/crime_data.csv')
    
    crime_counts = df['crime_type'].value_counts().to_dict()
    district_counts = df['district'].value_counts().to_dict()
    hourly = df.groupby('hour').size().to_dict()
    
    return jsonify({
        'total_records': len(df),
        'crime_distribution': crime_counts,
        'district_distribution': {str(k): v for k, v in district_counts.items()},
        'hourly_distribution': {str(k): v for k, v in hourly.items()},
        'avg_severity': round(df['severity'].mean(), 2)
    })

def get_risk_level(severity):
    if severity <= 1: return 'LOW'
    elif severity <= 2: return 'MODERATE'
    elif severity <= 3: return 'HIGH'
    elif severity <= 4: return 'VERY HIGH'
    else: return 'CRITICAL'

if __name__ == '__main__':
    load_models()
    app.run(host='0.0.0.0', port=5000, debug=False)
else:
    load_models()
