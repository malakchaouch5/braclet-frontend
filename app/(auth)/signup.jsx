import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';


export default function SignUp() {
  const router = useRouter();  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [userId, setUserId] = useState(null);

  const API_URL = 'http://192.168.1.12:8080/req';

  const handleSignUp = async () => {
  if (!username || !email || !password || !number) {
    alert("Please fill all fields");
    return false;
  }

  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username: username,
      email: email,
      phoneNumber: number,
      password: password
    });

    console.log(response.data);
    
    if (response.data.message === "User registered successfully!") {
      alert("Registration successful!");
      return true;
    } else {
      alert("Registration failed");
      return false;
    }
    
  } catch (error) {
    console.error("Signup error:", error);
    return false;
  }
};

  
  

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>New Account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            placeholder="Enter your UserName"
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            placeholderTextColor="#809CFF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholderTextColor="#809CFF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={number}
            placeholder="Enter your phone number"
            onChangeText={(text) => setNumber(text)}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={15}
            placeholderTextColor="#809CFF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              placeholder="Enter your password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={secureText}
              autoCapitalize="none"
              textContentType="password"
              placeholderTextColor="#809CFF"
              
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureText(!secureText)}
            >
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={async () => { 
          await handleSignUp(); 
          router.push(`/id?username=${username}`);
          console.log('Navigating to ID page');
          }}>
          <Text style={styles.buttonText}>ADD BRACELET</Text>
      </TouchableOpacity>


        

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
    marginTop:0,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    alignItems:'center',
    marginLeft:80,
    fontFamily: 'LeagueSpartan-VariableFont_wght',
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
});
