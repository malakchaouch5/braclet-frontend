import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Forget() {
  const router = useRouter();  
  const [email, setEmail] = useState("");  
  const [loading, setLoading] = useState(false);
  const handleResetPassword = () => {
    setLoading(true);
    console.log('Reset password request for:', email);

   
    setTimeout(() => {
      setLoading(false);
      alert("If the email exists, a password reset link has been sent.");
      router.push('/signin'); 
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Forget Password?</Text>
      </View>

      <Text style={styles.wel}>Enter your email to reset your password</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            placeholderTextColor="#809CFF"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleResetPassword} 
          disabled={loading} 
        >
          {loading ? (
            <Text style={styles.buttonText}>Sending...</Text>
          ) : (
            <Text style={styles.buttonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.t22}>Back to 
        <Text style={styles.signupText} onPress={() => router.push('/signin')}> Sign In</Text>
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
    marginTop: 0,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    alignItems: 'center',
    marginLeft: 80,
    fontFamily: 'LeagueSpartan-VariableFont_wght',
  },
  wel: {
    fontSize: 15,
    color: "#000000",
    marginTop: 80,
    marginLeft:45,
  },
  form: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    backgroundColor: "#ECF1FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 10,
    width: 150,
    marginLeft: 100,
    marginTop: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  t22: {
    marginTop: 20,
    fontSize: 11,
    fontWeight: "regular",
    marginLeft: 140,
  },
  signupText: {
    fontSize: 11,
    fontWeight: "regular",
    color: '#2260FF',
  },
});
