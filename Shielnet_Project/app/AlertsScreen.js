import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import useStore from '../store/useStore';
import AlertCard from '../components/AlertCard';


export default function AlertsScreen() {
const alerts = useStore((s) => s.alerts);


return (
<View style={{ flex: 1 }}>
<Header title="Alerts" />
<FlatList
data={alerts}
keyExtractor={(i) => i.id}
renderItem={({ item }) => <AlertCard alert={item} />}
/>
</View>
);
}