import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Reset() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordSubmit = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
    } else {
      setErrorMessage("");
      console.log("Password is valid.");
      router.push("/signin");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Set Password</Text>
      </View>

      <Text style={styles.welcomeText}>
        Create a new password to secure your account. Make sure your password contains at least 8 characters, one uppercase letter, and one number.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              placeholder="**********"
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              placeholder="**********"
              onChangeText={(text) => setConfirmPassword(text)}
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

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
          <Text style={styles.buttonText}>Create New Password</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 80,
  },
  welcomeText: {
    fontSize: 14,
    color: "#000000",
    marginTop: 40,
  },
  form: {
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF1FF",
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
});
