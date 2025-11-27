import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function AlertCard({ alert }) {
return (
<View style={styles.card}>
<Text style={styles.title}>{alert.title || 'Danger'}</Text>
<Text>{alert.description}</Text>
<Text style={styles.meta}>{new Date(alert.timestamp).toLocaleString()}</Text>
</View>
);
}


const styles = StyleSheet.create({
card: { padding: 12, borderBottomColor: '#eee', borderBottomWidth: 1 },
title: { fontWeight: '700' },
meta: { color: '#666', fontSize: 12, marginTop: 6 }
});