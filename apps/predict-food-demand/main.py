from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from src import random_forest

app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class PredictionRequest(BaseModel):
    date: str
    restaurant: str

@app.get("/")
async def index():
   return RedirectResponse(url='/docs')

@app.get("/predict")
async def predict(
    restaurant: str = Query("Restaurant_A", description="Name of the restaurant"),
    date: str = Query("2024-06-01", description="Date in YYYY-MM-DD format")
):
    try:
        future_data = {
            'date': [date] * 4,
            'restaurant': [restaurant] * 4,
            'food_item': ['Burger', 'Pizza', 'Salad', 'Sushi']
        }
        print(future_data)
        future_predictions = random_forest.predict(future_data)
        return {"prediction": future_predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))