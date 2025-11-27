import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function SafeRouteOverlay({ routeInfo }){
if(!routeInfo) return null;
return (
<View style={styles.box}>
<Text style={{fontWeight:'700'}}>Recommended Safe Route</Text>
<Text>Distance: {Math.round(routeInfo.distance)}m</Text>
<Text>Risk score: {routeInfo.riskScore}</Text>
</View>
);
}


const styles = StyleSheet.create({
box: { position:'absolute', bottom:20, left:20, right:20, padding:12, backgroundColor:'rgba(255,255,255,0.95)', borderRadius:8 }
});