import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
const router = useRouter();
const Navbar = ({ onNavigate }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onNavigate('Dashboard')}>
        <Icon name="grid-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onNavigate('Alerts')}>
        <Icon name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onNavigate('Profile')}>
        <Icon name="person-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onNavigate('Chat')}>
        <Icon name="chatbubbles-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onNavigate('Check')}>
        <Icon name="checkmark-done-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2260FF', 
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Navbar;
