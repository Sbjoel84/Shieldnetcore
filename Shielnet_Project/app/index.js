import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import useStore from '../store/useStore';
import { initFirebase } from '../services/firebase';


export default function Home() {
const router = useRouter();
const setUser = useStore((s) => s.setUser);


useEffect(() => {
initFirebase();
// placeholder: anonymous sign-in for now
setUser({ id: 'anon' });
}, []);


return (
<View style={styles.container}>
<Header title="ShieldNet AI" />
<Text style={styles.text}>Welcome to ShieldNet AI</Text>
<Button title="Open Map" onPress={() => router.push('/MapScreen')} />
<Button title="Alerts" onPress={() => router.push('/AlertsScreen')} />
<Button title="Report Danger" onPress={() => router.push('/ReportScreen')} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
text: { fontSize: 18, marginVertical: 12 }
});