import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';

function MessageInput({ onSendText, onSendAudio, isSending }) {
  const [recording, setRecording] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      onSendAudio({ content: uri });
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const handleSendText = () => {
    if (message.trim() && !isSending) {
      onSendText({ content: message });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
          editable={!isSending}
        />
        <TouchableOpacity 
          onPress={recording ? stopRecording : startRecording}
          style={styles.recordButton}
          disabled={isSending}
        >
          <Icon 
            name={recording ? 'stop-circle' : 'mic'} 
            size={28} 
            color={recording ? '#FF3B30' : (isSending ? '#CCC' : '#007BFF')} 
          />
        </TouchableOpacity>
        {isSending ? (
          <ActivityIndicator style={styles.sendButton} color="#007BFF" />
        ) : (
          <TouchableOpacity 
            onPress={handleSendText}
            style={styles.sendButton}
            disabled={!message.trim() || isSending}
          >
            <Icon 
              name="send" 
              size={24} 
              color={message.trim() ? '#007BFF' : '#CCC'} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: Platform.OS === 'ios' ? 8 : 4,
  },
  recordButton: {
    marginLeft: 10,
    padding: 5,
  },
  sendButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default MessageInput;