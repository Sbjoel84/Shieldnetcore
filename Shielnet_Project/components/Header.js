import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Header({ title }) {
return (
<View style={styles.header}>
<Text style={styles.title}>{title}</Text>
</View>
);
}


const styles = StyleSheet.create({
header: { padding: 16, backgroundColor: '#0b5', alignItems: 'center' },
title: { fontSize: 18, fontWeight: '700', color: 'white' }
});