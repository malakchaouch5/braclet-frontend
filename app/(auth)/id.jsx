import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'; // Expo Vector Icons
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import axios from 'axios';

const BraceletSearchPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [braceletid, setBraceletid] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { username } = useLocalSearchParams();

  const searchBracelet = async () => {
    if (!braceletid.trim()) {
      alert("Bracelet ID cannot be empty!");
      return false; // Return false if bracelet ID is empty
    }

    setLoading(true);
    setSuccessMessage(''); // Reset success message before making the request

    try {
      const response = await axios.put(`http://10.0.2.2:8080/req/addBraceletId`, {
        username:username,
        braceletid: braceletid
      });

      setLoading(false);

      if (response.status === 202) {
        setSuccessMessage("Bracelet successfully associated!");
        return true;
      } else {
        alert("Failed to associate bracelet!");
        return false;
      }
    } catch (error) {
      setLoading(false);
      alert("Failed to associate bracelet!");
      console.error(error);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="search" size={70} color="#2260FF" />

      {/* Title */}
      <Text style={styles.title}>Bracelet around me</Text>

      {/* Bracelet ID Input */}
      <TextInput
        style={styles.input}
        placeholder="Entrez l'ID du bracelet"
        value={braceletid}
        onChangeText={(text) => setBraceletid(text)}
        keyboardType="numeric"
      />

      {/* Connect Button */}
      <Button
        title="Connect"
        onPress={async () => {
          const success = await searchBracelet();
          if (success) {
            console.log("Bracelet ID being sent:", braceletid);
            console.log("username  being sent:", username);
            router.push('/loadingpage'); // Navigate to the next page after success (replace '/nextPage' with actual route)
          }
        }}
      />

      {/* Display loading indicator */}
      {loading && <ActivityIndicator size="large" color="#2260FF" style={styles.loader} />}

      {/* Display success message */}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
    </SafeAreaView>
  );
};

// Styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 240,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchText: {
    fontSize: 30,
    color: 'white',
  },
  title: {
    color: '#2260FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#2260FF',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingLeft: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  success: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  }
});

export default BraceletSearchPage;
