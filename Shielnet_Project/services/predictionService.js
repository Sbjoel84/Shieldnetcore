import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.PREDICTION_SERVICE_URL;

export async function getRiskScore(lat, lng, description) {
  try {
    const response = await axios.post(API_URL, {
      lat,
      lng,
      description
    });
    return response.data; // { riskScore: ..., distance: ... }
  } catch (e) {
    console.error('Prediction API error:', e);
    return { riskScore: 0, distance: 0 };
  }
}
