import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'; // Expo Vector Icons
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingPage = () => {
  const router = useRouter();
  
    // Simuler un temps d'attente avant d'aller à la page de succès
    useEffect(() => {
      setTimeout(() => {
        router.push('/success'); // Navigation vers la page de succès
      }, 4000); // Temps d'attente de 2 secondes
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
         <MaterialIcons name="bluetooth" size={120} color="#2260FF" /> 

         <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Connecting</Text>
         <ActivityIndicator size="large" color="#2260FF" />
        <Text>Please wait...</Text>
      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      marginTop: 150,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
  });
export default LoadingPage;