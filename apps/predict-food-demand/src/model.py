import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import pickle

MODEL_FILENAME = 'model/random_forest_model.pkl'
ENCODER_FILENAME = 'model/encoder.pkl'

class RandomForest:

    def __init__(self):
        self.encoder = self.load_encoder()
        self.model = self.load_model()

    def load_model(self):
        if os.path.exists(MODEL_FILENAME):
            print("Model file exists. Loading the model...")
            # Load the model from the file
            with open(MODEL_FILENAME, 'rb') as file:
                return pickle.load(file)
        else:
            return self.train_model()

    def load_encoder(self):
        if os.path.exists(ENCODER_FILENAME):
            print("Encoder file exists. Loading the encoder...")
            # Load the encoder from the file
            with open(ENCODER_FILENAME, 'rb') as file:
                return pickle.load(file)
        else:
            return None

    def train_model(self):
        df = pd.read_csv('restaurant_food_data.csv')

        # Feature Engineering
        df['date'] = pd.to_datetime(df['date'])
        df['day_of_week'] = df['date'].dt.dayofweek
        df['month'] = df['date'].dt.month
        df['day'] = df['date'].dt.day

        # Categorical Encoding
        self.encoder = OneHotEncoder(sparse_output=False, drop='first')
        encoded_features = self.encoder.fit_transform(df[['restaurant', 'food_item']])

        # Save the encoder
        with open(ENCODER_FILENAME, 'wb') as file:
            pickle.dump(self.encoder, file)

        # Create a new DataFrame with encoded features
        encoded_df = pd.DataFrame(encoded_features, columns=self.encoder.get_feature_names_out(['restaurant', 'food_item']))

        # Combine with the original DataFrame
        X = pd.concat([df[['day_of_week', 'month', 'day']], encoded_df], axis=1)
        y = df['quantity']

        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

        # Train the Random Forest model
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        rf_model.fit(X_train, y_train)

        # Save the model using pickle
        with open(MODEL_FILENAME, 'wb') as file:
            pickle.dump(rf_model, file)

        return rf_model
    
    def predict(self, future_data):
        if self.encoder is None:
            raise ValueError("Encoder not found. Ensure the model is trained or loaded properly.")

        # Convert future_data to DataFrame
        future_data = pd.DataFrame(future_data)

        # Feature Engineering for future data
        future_data['date'] = pd.to_datetime(future_data['date'])
        future_data['day_of_week'] = future_data['date'].dt.dayofweek
        future_data['month'] = future_data['date'].dt.month
        future_data['day'] = future_data['date'].dt.day

        # Categorical Encoding for future data
        encoded_future = self.encoder.transform(future_data[['restaurant', 'food_item']])
        encoded_future_df = pd.DataFrame(encoded_future, columns=self.encoder.get_feature_names_out(['restaurant', 'food_item']))

        # Combine with future DataFrame
        X_future = pd.concat([future_data[['day_of_week', 'month', 'day']], encoded_future_df], axis=1)

        # Predict with the loaded Random Forest model
        future_pred_rf_loaded = self.model.predict(X_future)

        predictions = dict(zip(future_data['food_item'], future_pred_rf_loaded))
        return predictions
    
