import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Header from '../components/Header';
import useStore from '../store/useStore';
import { getCurrentLocation, startBackgroundTracking } from '../services/locationService';
import { MAPBOX_TOKEN } from '../services/mapbox';


MapboxGL.setAccessToken(MAPBOX_TOKEN);


export default function MapScreen() {
const [location, setLocation] = useState(null);
const alerts = useStore((s) => s.alerts);


useEffect(() => {
(async () => {
const loc = await getCurrentLocation();
setLocation(loc);
})();


// start background tracking (implementation queued in service)
startBackgroundTracking();
}, []);


return (
<View style={styles.container}>
<Header title="Map" />
{location ? (
<View style={{flex:1}}>
<MapboxGL.MapView style={styles.map}>
<MapboxGL.Camera
zoomLevel={13}
centerCoordinate={[location.coords.longitude, location.coords.latitude]}
/>
<MapboxGL.PointAnnotation
id="user"
coordinate={[location.coords.longitude, location.coords.latitude]}
/>
{/* Render alert markers */}
{alerts.map((a) => (
<MapboxGL.PointAnnotation
key={a.id}
id={`alert-${a.id}`}
coordinate={[a.lng, a.lat]}
/>
))}
</MapboxGL.MapView>
</View>
) : (
<Text>Getting location...</Text>
)}
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1 },
map: { flex: 1 }
});