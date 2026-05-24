import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def train_model():
    print("Loading dataset...")
    df = pd.read_csv('/app/dataset/crime_data.csv')

    # Encode categoricals
    le_crime = LabelEncoder()
    le_weather = LabelEncoder()
    le_district = LabelEncoder()

    df['crime_type_enc'] = le_crime.fit_transform(df['crime_type'])
    df['weather_enc'] = le_weather.fit_transform(df['weather'])

    features = [
        'hour', 'day_of_week', 'month', 'district',
        'weather_enc', 'temperature', 'population_density',
        'poverty_rate', 'unemployment_rate', 'is_weekend'
    ]

    X = df[features]
    y = df['crime_type_enc']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    scaler = StandardScaler()
    X_train_sc = scaler.fit_transform(X_train)
    X_test_sc = scaler.transform(X_test)

    print("Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    model.fit(X_train_sc, y_train)

    y_pred = model.predict(X_test_sc)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {acc:.2%}")

    os.makedirs('/app/models', exist_ok=True)
    joblib.dump(model, '/app/models/crime_model.pkl')
    joblib.dump(scaler, '/app/models/scaler.pkl')
    joblib.dump(le_crime, '/app/models/label_encoder.pkl')
    joblib.dump(le_weather, '/app/models/weather_encoder.pkl')
    joblib.dump(features, '/app/models/features.pkl')

    print("Models saved successfully!")
    return acc

if __name__ == '__main__':
    train_model()
