import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av'; // Assurez-vous d'avoir installé `expo-av`

const AudioPlayer = ({ audioUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // État pour l'enregistrement
  const [sound, setSound] = useState(null);

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            newSound.unloadAsync();
            setSound(null);
          }
        });
        await newSound.playAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(true);
    }
  };

  const startRecording = () => {
    // Simulation d'un enregistrement actif
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false); // Arrêter l'affichage après un certain temps (exemple)
    }, 5000); // 5 secondes d'enregistrement simulé
  };

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity onPress={togglePlayback} style={styles.button}>
        <Icon name={isPlaying ? 'pause' : 'play'} size={24} color="#007bff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={startRecording} style={styles.button}>
        <Icon name="mic" size={24} color="#007bff" />
      </TouchableOpacity>

      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Icon name="mic-circle" size={20} color="red" />
          <Text style={styles.recordingText}>Enregistrement...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  recordingText: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
  },
});

export default AudioPlayer;
