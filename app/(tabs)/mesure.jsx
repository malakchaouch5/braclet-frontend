import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const PatientStatusPage = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    heartRate: { value: 85, range: '60-100 BPM', normal: true },
    temperature: { value: 37.1, range: '36.5-37.5°C', normal: true },
    bloodOxygen: { value: 98, range: '95-100%', normal: true },
    bloodPressure: { value: '120/80 mmHg', normal: true },
  });

  const updateMeasures = () => {
    Alert.alert('Measures Updated', 'Health data has been refreshed.');
    setData({
      heartRate: { value: 88, range: '60-100 BPM', normal: true },
      temperature: { value: 37.0, range: '36.5-37.5°C', normal: true },
      bloodOxygen: { value: 99, range: '95-100%', normal: true },
      bloodPressure: { value: '122/82 mmHg', normal: true },
    });
  };

  const navigateToDashboard = (measure) => {
    navigation.navigate('Dashboard', { measure });
  };

  const renderHealthCard = (title, data, icon) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}:</Text>
      <Text style={styles.cardContent}>
        Current: {data.value} (Normal Range: {data.range || 'N/A'})
      </Text>
      <Text style={styles.cardStatus}>
        {data.normal ? '✔️ Normal' : '❌ Abnormal'}
      </Text>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigateToDashboard(title)}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patient Status Overview</Text>
      <TouchableOpacity style={styles.updateButton} onPress={updateMeasures}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Real-Time Health Data Monitored By Your elderly's Bracelet.
      </Text>
      <Text style={styles.lastUpdated}>Last Updated: {new Date().toLocaleString()}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderHealthCard('Heart Rate', data.heartRate, '❤️')}
        {renderHealthCard('Temperature', data.temperature, '🌡️')}
        {renderHealthCard('Blood Oxygen (SpO2)', data.bloodOxygen, '🩸')}
        {renderHealthCard('Blood Pressure', data.bloodPressure, '💓')}
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    alignItems: 'center',
    width:100,
    marginLeft:120,
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  cardStatus: {
    fontSize: 14,
    marginBottom: 10,
    color: '#28A745',
  },
  moreButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default PatientStatusPage;
