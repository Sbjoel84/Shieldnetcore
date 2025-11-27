import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import { submitReport } from '../services/firebase';
import { getRiskScore } from '../services/predictionService';
import { getCurrentLocation } from '../services/locationService';

export default function ReportScreen() {
  const [description, setDescription] = useState('');

  const send = async () => {
    try {
      // Get user's current location
      const loc = await getCurrentLocation();

      // Call prediction service to get risk score
      const { riskScore } = await getRiskScore(
        loc.coords.latitude,
        loc.coords.longitude,
        description
      );

      // Submit report to Firebase including riskScore and location
      await submitReport({
        description,
        timestamp: Date.now(),
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        riskScore
      });

      alert(`Report submitted with risk score: ${riskScore}`);
      setDescription('');
    } catch (e) {
      console.error(e);
      alert('Failed to submit report');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Report Danger" />
      <Text style={styles.label}>Describe the danger</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="e.g. suspicious group near market"
        multiline
      />
      <Button title="Submit Report" onPress={send} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { minHeight: 100, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, padding: 8 },
  label: { marginBottom: 8 }
});
