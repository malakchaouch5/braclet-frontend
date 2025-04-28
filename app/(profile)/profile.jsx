import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Correct import for Ionicons
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
 const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
        name="arrow-back"
        size={30}
        color="#2260FF"
        onPress={() => router.back()} // Naviguer vers la page précédente
        style={styles.icon}
      />
       <Text style={styles.title}>Profile</Text>
      </View>
      {/* Section du profil */}
      <View style={styles.profileSection}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
        <Text style={styles.username}>meherzia</Text>
      </View>

      {/* Section des données */}
      <View style={styles.cont}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Full Name</Text>
          <View style={styles.data} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Phone Number</Text>
          <View style={styles.data} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email</Text>
          <View style={styles.data} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Date Of Birth</Text>
          <View style={styles.data} />
        </View>

        {/* Bouton de mise à jour du profil */}
        <TouchableOpacity style={styles.updateButton} onPress={() => {}}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', // Aligner l'icône et le titre horizontalement
    alignItems: 'center',
    gap:10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
  },
  title: {
    color: "#2260FF",
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cont: {
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical:0,
    borderRadius: 10,
      },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontFamily:"League Spartan",
  },
  data: {
    backgroundColor: "#ECF1FF",
    height: 40,
    borderRadius: 12,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: "#2260FF",
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
    width:150,
    marginLeft:70,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
