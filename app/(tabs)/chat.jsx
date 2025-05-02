import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://10.0.2.2:8080";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/messages/1`);
      if (Array.isArray(res.data)) {
        setMessages(res.data.reverse());
      } else {
        console.warn("Expected an array but got:", res.data);
        setMessages([]);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendText = async () => {
    if (!text.trim()) return;
    setIsSending(true);
    try {
      await axios.post(`${API_URL}/api/messages/text`, {
        sender: { id: 1 },
        receiver: { id: 2 },
        content: text,
        type: "TEXT",
      });
      setText("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending text:", err);
      Alert.alert("Error", "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permission to access microphone denied");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "audio.m4a",
        type: "audio/m4a",
      });
      formData.append("senderId", "1");
      formData.append("receiverId", "2");

      await axios.post(`${API_URL}/api/messages/audio`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRecording(null);
      fetchMessages();
    } catch (err) {
      console.error("Failed to stop/upload recording", err);
    }
  };

  const playAudio = async (url) => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: `${API_URL}${url}`,
      });
      await sound.playAsync();
    } catch (err) {
      console.error("Error playing audio", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <Text style={styles.header}>Chat with Us!</Text>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isUser = item.sender.id === 1;
            return item.type === "TEXT" ? (
              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.userMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.content}</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => playAudio(item.audioUrl)}
                style={[
                  styles.messageBubble,
                  isUser ? styles.userMessage : styles.otherMessage,
                ]}
              >
                <FontAwesome name="play-circle" size={30} color="#007BFF" />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.messageList}
          inverted
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            value={text}
            onChangeText={setText}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={sendText}
              disabled={isSending}
              style={styles.sendButton}
            >
              <FontAwesome name="send" size={22} color="white" />
            </TouchableOpacity>

            {recording ? (
              <TouchableOpacity onPress={stopRecording} style={styles.recordButton}>
                <FontAwesome name="stop-circle" size={30} color="#FF0000" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording} style={styles.recordButton}>
                <FontAwesome name="microphone" size={30} color="#007BFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:10,
    marginBottom:0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#007BFF",
  },
  messageList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom:-30,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 25,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 30,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    padding: 10,
    marginLeft: 5,
  },
});
