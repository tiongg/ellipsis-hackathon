# Project Documentation

## Overview

This project uses a Random Forest model to predict food quantities needed at a restaurant based on historical data. The model is trained to forecast how much of each food item (e.g., Burger, Pizza, Salad, Sushi) is required on a specific day for a given restaurant. This in turns help to prevent foo waste

### Random Forest Model

#### What It Does

- **Training**: The Random Forest model is trained on historical data that includes information about dates, restaurants, food items, and quantities.
- **Prediction**: Given a restaurant and a date, the model predicts the quantities of various food items that are needed.

#### How It Works

1. **Data Preparation**: Historical data is processed to extract features such as the day of the week, month, and day. Categorical features like restaurant names and food items are encoded using OneHotEncoder.
2. **Model Training**: The Random Forest Regressor is trained on the processed features and quantity targets.
3. **Prediction**: For new inputs (i.e., a specific restaurant and date), the model predicts the required quantities of predefined food items.

## Running the FastAPI Application with Poetry

To run the FastAPI application using Poetry, follow these steps:

### Prerequisites

- Ensure you have [Poetry](https://python-poetry.org/docs/) installed.
- Ensure you have [Python](https://www.python.org/downloads/) installed.

### Setup
2. **Install Dependencies**:
   Use Poetry to install the dependencies listed in your `pyproject.toml` file.
   ```bash
   poetry install
   ```

3. **Run the Application**:
   Use Poetry to run the FastAPI application. This command will start the FastAPI server.
   ```bash
   poetry run dev
   ```


4. **Access the API**:
   - **Swagger UI**: Open your browser and navigate to `http://127.0.0.1:8000/docs` to access the Swagger UI, where you can test your API endpoints.
   - **Redirection**: By default, accessing `http://127.0.0.1:8000/` will redirect you to the `/docs` endpoint.

### Endpoints

- **GET /predict**: Predicts food quantities based on the provided restaurant name and date.
  - **Parameters**:
    - `restaurant`: Name of the restaurant (e.g., "Restaurant_A")
    - `date`: Date in `YYYY-MM-DD` format (e.g., "2024-06-01")
  - **Response**: A JSON object with predicted quantities for predefined food items.

### Example Request

```http
GET http://127.0.0.1:8000/predict?restaurant=Restaurant_A&date=2024-06-01
```

### Example Response

```json
{
  "predictions": {
    "Burger": 150.0,
    "Pizza": 100.0,
    "Salad": 50.0,
    "Sushi": 30.0
  }
}
```

>> The following data represents for the inputted restuarant and given future date how much food should be made in order to meet the demand of users 

## Troubleshooting

- **Model Not Found**: Ensure that the model file (`random_forest_model.pkl`) exists in the model directory.
- **Encoder Issues**: Make sure the OneHotEncoder used for prediction is the same as the one used during training. Re-training the model may be necessary if discrepancies arise.

## Future Scalability

### Overview
We think that potential improvements with advanced techniques such as Transformers could make the model more accurate.

### Transition to Advanced Techniques

1. **Using Transformers**:
   - Transformers, such as those implemented in the Hugging Face `transformers` library, are state-of-the-art for handling complex sequences and have shown exceptional performance in various domains.
 


### Future Considerations
1. **Continuous Improvement**:
   - **Model Retraining**: Regularly update and retrain your models with new data to maintain accuracy and adapt to changing patterns.
   - **Feedback Loops**: Incorporate feedback mechanisms to continuously refine and improve the model based on real-world performance.





