import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert as RNAlert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AuthContext } from '../authContext'; // Adjust path as needed

function AlertScreen() {
    const router = useRouter();
    const { userData, logout } = useContext(AuthContext);

    const handleEmergencyCall = () => {
        // Implement actual emergency call functionality
        RNAlert.alert(
            "Emergency Call",
            "Are you sure you want to call emergency services?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Call", onPress: () => console.log("Calling emergency services") }
            ]
        );
    };

    const handleDoctorCall = () => {
        // Implement doctor call functionality
        RNAlert.alert(
            "Call Doctor",
            "Are you sure you want to call the doctor?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Call", onPress: () => console.log("Calling doctor") }
            ]
        );
    };

    const handleDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with user info */}
            <View style={styles.header}>
                
                <Text style={styles.titre}>Alert</Text>
            </View>

            <View style={styles.cont}>
                <View style={styles.alert}>
                    <Icon name="alert-circle-outline" size={50} color="red" />
                    <Text style={styles.alertText}>Alert Detected</Text>
                </View>
                
                <View style={styles.description}>
                    <Text style={styles.anomalyText}>🚨 Anomaly Detected: Irregular Heartbeat</Text>
                    <Text style={styles.rateText}>❤️ Current rate: <Text style={styles.boldText}>140 BPM</Text> (Normal: 60-100 BPM)</Text>
                </View>
                
                <View style={styles.callSection}>
                    <TouchableOpacity 
                        style={styles.callButton}
                        onPress={handleEmergencyCall}
                    >
                        <Icon name="call" size={30} color="white" />
                        <Text style={styles.callText}>Emergency Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.callButton}
                        onPress={handleDoctorCall}
                    >
                        <Icon name="medkit-outline" size={30} color="white" />
                        <Text style={styles.callText}>Call Doctor</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.dashboardButton}
                    onPress={handleDashboard}
                >
                    <Text style={styles.dashboardText}>See Dashboard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default AlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop:10,
    gap: 10,
  },
  titre:{
   color:'#2260FF',
   fontSize:25, 
   marginLeft:170,
  fontWeight:'bold', },
  cont: {
    height:'100%',
   
    padding: 35,
    borderRadius: 10,
    alignItems: 'center',
  },
  back:{
   color: '#CAD6FF',

  },
  header: {
    backgroundColor:'#FFFFFF',
    flexDirection: 'row', 
    alignItems: 'center',
    gap:10,
    marginTop:0,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE6E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  alertText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
  },
  description: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  anomalyText: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rateText: {
    fontSize: 16,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  callSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2260FF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    width: '45%',
    justifyContent: 'center',
  },
  callText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dashboardButton: {
    backgroundColor: '#2260FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  dashboardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
    
  
    
});