import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatMessage = ({ message, userData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playAudio = async () => {
    if (isPlaying && sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (!sound && message.vocal) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: message.vocal });
        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            newSound.unloadAsync();
            setSound(null);
          }
        });

        await newSound.playAsync();
      } else if (sound) {
        await sound.playAsync();
      }
      setIsPlaying(true);
    }
  };

  const isCurrentUser = userData && message.senderUserId === userData.email;

  return (
    <View style={[
      styles.messageContainer, 
      isCurrentUser ? styles.sentMessage : styles.receivedMessage
    ]}>
      {message.type === 'TEXT' ? (
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.sentText : styles.receivedText
        ]}>
          {message.text}
        </Text>
      ) : (
        <TouchableOpacity onPress={playAudio} style={styles.audioMessage}>
          <Icon 
            name={isPlaying ? 'pause-circle' : 'play-circle'} 
            size={30} 
            color={isCurrentUser ? '#FFFFFF' : '#4A90E2'} 
          />
          <Text style={[
            styles.audioLabel,
            { color: isCurrentUser ? '#FFFFFF' : '#4A90E2' }
          ]}>
            Voice Message
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    borderBottomRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#333333',
  },
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioLabel: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default ChatMessage;
