import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveOffline(key, data) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getOffline(key) {
  const item = await AsyncStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
