import * as Location from 'expo-location';
import { subscribeAlerts } from './firebase';
import { Platform } from 'react-native';
import { submitReport } from './firebase'; // use a special collection for user locations

let backgroundSubscription = null;

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Location permission denied');
  return await Location.getCurrentPositionAsync({});
}

// Call this once when app starts
export async function startBackgroundTracking(userId) {
  if (backgroundSubscription) return;

  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Background location permission denied');
    return;
  }

  backgroundSubscription = await Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // updates every 10 meters
    async (loc) => {
      console.log('Background location update:', loc.coords);

      // Send location to Firebase (userLocations collection)
      try {
        await submitReport({
          userId,
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          timestamp: Date.now(),
          type: 'locationUpdate'
        });
      } catch (e) {
        console.error('Failed to send location update:', e);
      }
    }
  );
}

// Call this to stop tracking
export function stopBackgroundTracking() {
  if (backgroundSubscription) {
    backgroundSubscription.remove();
    backgroundSubscription = null;
  }
}
