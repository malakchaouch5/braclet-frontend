import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../authContext';
import api from '../api';

export default function SignIn() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await api.post('/req/signin', {
        usernameOrEmail,
        password,
      });

      if (response.data?.token) {
        // Save token and user info
        await AsyncStorage.setItem('jwtToken', response.data.token);
        await AsyncStorage.setItem('userEmail', response.data.email);
        await AsyncStorage.setItem('username', response.data.username);

        // Use login context to update global state
        await login(response.data.token, response.data.email, response.data.username);

        router.push('/dashbord');  // Redirect to dashboard after successful login
      } else {
        Alert.alert("Login failed", "Token not received.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Login failed. Please try again.";
      Alert.alert("Login Error", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Log In</Text>
      </View>

      <Text style={styles.text1}>Welcome!</Text>
      <Text style={styles.wel}>Log in to monitor the health of your elderly loved one in real-time.</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email or Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={usernameOrEmail}
            placeholder="Enter your email or phone"
            onChangeText={setUsernameOrEmail}
            autoCapitalize="none"
            placeholderTextColor="#809CFF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              placeholder="**********"
              onChangeText={setPassword}
              secureTextEntry={secureText}
              autoCapitalize="none"
              textContentType="password"
              placeholderTextColor="#809CFF"
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.set} onPress={() => router.push('/forget')}>Forgot Password</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.t2}>or sign up with</Text>
      <Image source={require('../../assets/images/google.png')} style={styles.googleImage} />

      <Text style={styles.t22}>
        Don't have an account? 
        <Text style={styles.signupText} onPress={() => router.push('/signup')}>Sign up</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#FFFFFF", 
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    fontFamily: 'LeagueSpartan-VariableFont_wght',
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop:30,
    fontFamily: 'LeagueSpartan-VariableFont_wght',
  },
  wel: {
    fontSize: 15,
    color: "#000000",
    marginTop:10,
  },
  set: {
    fontSize: 11,
    color: "#2260FF",
    fontWeight: "medium",
    marginLeft:260,
    fontFamily: 'LeagueSpartan-VariableFont_wght',
  },
  t2: {
    marginLeft:138,
    marginTop:20,
    fontSize:11,
    fontWeight: "regular",
  },
  t22: {
    marginTop:20,
    fontSize:11,
    fontWeight: "regular",
    marginLeft:96,
  },
  signupText: {
    fontSize:11,
    fontWeight: "regular",
    color:'#2260FF',
  },
  form: {
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    fontFamily: 'LeagueSpartan-VariableFont_wght',
    fontWeight: "bold",
  },
  input: {
    height: 40,
    backgroundColor: "#ECF1FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF1FF",
    borderRadius: 5,
    height: 40,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 10,
    width:150,
    marginLeft:100,
    marginTop:60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'LeagueSpartan-VariableFont_wght',
  },
  googleImage: {
    width: 30,
    height: 30,
    marginTop: 10,
    alignSelf: 'center',
  },
});
