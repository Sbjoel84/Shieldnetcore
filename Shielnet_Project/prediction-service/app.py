from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlertPrediction(BaseModel):
    lat: float
    lng: float
    description: str

@app.post("/predict")
def predict_alert(data: AlertPrediction):
    # placeholder: simple mock risk score
    risk_score = 0
    if "danger" in data.description.lower():
        risk_score = 90
    else:
        risk_score = 30
    return {"riskScore": risk_score, "distance": 1000}
