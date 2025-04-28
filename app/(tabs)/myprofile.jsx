import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur'; // Import de BlurView
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../authContext'; // Import AuthContext


const Myprofile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false); // Etat pour la visibilité du modal
  const { logout } = useContext(AuthContext); // Access the logout function from AuthContext

  const handleLogoutPress = () => {
    setModalVisible(true); // Afficher le modal de confirmation de déconnexion
  };

  const handleLogout = async () => {
    try {
      // Use the logout function from context
      logout();
      
      // Redirect to the sign-in page after logout
      router.replace('/signin');
      
      // Optionally, show an alert for confirmation
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      // Handle any errors that occur during logout
      Alert.alert("Error", "An error occurred while logging out.");
    }
    setModalVisible(false); // Close the modal after logout
  };

  const cancelLogout = () => {
    setModalVisible(false); // Close the modal without logging out
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
        <Text style={styles.username}>meherzia</Text>
      </View>

      {/* Profile Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile')}>
        <Icon name="person-circle" size={30} color="#2260FF" style={styles.icon} />
        <Text style={styles.text}>Profile</Text>
        <Icon name="arrow-forward" size={30} color="#2260FF" />
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
        <Icon name="settings-outline" size={30} color="#2260FF" style={styles.icon} />
        <Text style={styles.text}>Settings</Text>
        <Icon name="arrow-forward" size={30} color="#2260FF" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
        <Icon name="log-out" size={30} color="#2260FF" style={styles.icon} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      {/* Modal de confirmation */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelLogout}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelLogout}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: "#2260FF",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 125,
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  modalButton: {
    backgroundColor: '#2260FF',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Myprofile;
