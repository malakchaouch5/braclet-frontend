import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PassManager() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextCurrent, setSecureTextCurrent] = useState(true);
  const [secureTextNew, setSecureTextNew] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Password Manager</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              placeholder="**********"
              onChangeText={setCurrentPassword}
              secureTextEntry={secureTextCurrent}
              autoCapitalize="none"
              textContentType="password"
              placeholderTextColor="#809CFF"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextCurrent(!secureTextCurrent)}
            >
              <Ionicons
                name={secureTextCurrent ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.set} onPress={() => router.push('/forget')}>Forgot Password?</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              placeholder="**********"
              onChangeText={setNewPassword}
              secureTextEntry={secureTextNew}
              autoCapitalize="none"
              textContentType="password"
              placeholderTextColor="#809CFF"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextNew(!secureTextNew)}
            >
              <Ionicons
                name={secureTextNew ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              placeholder="**********"
              onChangeText={setConfirmPassword}
              secureTextEntry={secureTextConfirm}
              autoCapitalize="none"
              textContentType="password"
              placeholderTextColor="#809CFF"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setSecureTextConfirm(!secureTextConfirm)}
            >
              <Ionicons
                name={secureTextConfirm ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
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
  set: {
    fontSize: 11,
    color: "#2260FF",
    fontWeight: "500",
    alignSelf: "flex-end",
    marginTop: 5,
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
    marginLeft: 70,
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
    marginTop: 20,
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
