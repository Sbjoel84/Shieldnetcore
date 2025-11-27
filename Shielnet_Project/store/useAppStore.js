import create from 'zustand';
import { subscribeAlerts } from '../services/firebase';
import { startBackgroundTracking } from '../services/locationService';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });

    // Start background tracking automatically when user is set
    if (user?.id) startBackgroundTracking(user.id);
  },
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
  startAlertSync: () => {
    return subscribeAlerts((alerts) => set({ alerts }));
  }
}));

export default useStore;
