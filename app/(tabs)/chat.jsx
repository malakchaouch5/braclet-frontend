import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import ChatMessage from '@/components/chatMessage';
import MessageInput from '@/components/messageInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../authContext';
import { useRouter } from 'expo-router';
import api from '../api';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const { userToken, userData, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const API_URL = 'http://10.0.2.2:8080/req';


  const handleSendText = useCallback(async ({ content }) => {
    if (!userData || !userData.email) {
      Alert.alert("Error", "User information incomplete");
      return;
    }
  
    setIsSending(true);
    
    try {
      // 1. Fetch braceletId
      let braceletId = "0";
      try {
        const braceletResponse = await api.get(`/req/users/bracelet?email=${userData.email}`, {
          headers: { 'Authorization': `Bearer ${userToken}` }
        });
        braceletId = braceletResponse.data?.braceletId || "0";
        console.log('Fetched braceletId:', braceletId);
      } catch (fetchError) {
        console.error('Failed to fetch bracelet ID:', fetchError);
        braceletId = "0";
      }
  
      // 2. Validate braceletId
      if (braceletId === "0") {
        Alert.alert(
          "Bracelet Not Linked",
          "Please link a bracelet before sending messages",
          [{ text: "OK" }]
        );
        setIsSending(false);
        return;
      }
  
      // 3. Prepare and send message
      const newMessage = {
        text: content,
        vocal: '',
        anomalyDetected: false,
        type: 'TEXT',
        isTextMessage: true,
        braceletId: Number(braceletId),
        senderUserId: userData.id,
      };
  
      // Create temporary message
      const tempMessage = {
        ...newMessage,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        isTemp: true
      };
      setMessages(prev => [tempMessage, ...prev]);
  
      // Send to server
      const response = await api.post('/messages/mess', newMessage, {
        headers: { 
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (response.status === 200) {
        setMessages(prev => [
          {
            ...response.data,
            id: response.data.id || Date.now().toString(),
            senderUserId: userData.email
          },
          ...prev.filter(msg => msg.id !== tempMessage.id)
        ]);
      }
    } catch (error) {
      console.error('Error sending text:', error);
      setMessages(prev => prev.filter(msg => !msg.isTemp));
      Alert.alert(
        "Message Failed",
        error.response?.data?.message || "Failed to send message"
      );
    } finally {
      setIsSending(false);
    }
  }, [userToken, userData]);
  

  const handleSendAudio = useCallback(async ({ content }) => {
    if (!userData) return;
    
    setIsSending(true);
    try {
      let braceletId = "0";
      const braceletResponse = await api.get(`/req/users/bracelet?email=${userData.email}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      braceletId = braceletResponse.data?.braceletId || "0";
      console.log('Fetched braceletId:', braceletId);

      // Create temporary message for instant UI update
      const tempMessage = {
        id: Date.now().toString(),
        vocal: content,
        type: 'VOCAL',
        isTextMessage: false,
        senderUserId: userData.email,
        createdAt: new Date().toISOString(),
        isTemp: true
      };
      
      setMessages(prev => [tempMessage, ...prev]);

      const newMessage = {
        text: '',
        vocal: content,
        anomalyDetected: false,
        type: 'VOCAL',
        isTextMessage: false,
        braceletId: Number(braceletId),
        senderUserId: userData.id,
      };

      const response = await api.post('/messages/mess', newMessage, {
        headers: { 'Authorization': `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        // Replace temp message with server response
        setMessages(prev => [
          {
            ...response.data,
            id: response.data.id || Date.now().toString(),
            senderUserId: userData.email
          },
          ...prev.filter(msg => msg.id !== tempMessage.id)
        ]);
      }
    } catch (error) {
      console.error('Error sending audio:', error.response?.data || error.message);
      // Remove temp message if error occurs
      setMessages(prev => prev.filter(msg => !msg.isTemp));
    } finally {
      setIsSending(false);
    }
  }, [userToken, userData]);

  const renderMessage = useCallback(({ item }) => (
    <ChatMessage message={item} userData={userData} />
  ), [userData]);

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.replace('/login');
    }
  }, [isLoading, userToken]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat with Us!</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          inverted
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0
          }}
        />
        <MessageInput 
          onSendText={handleSendText} 
          onSendAudio={handleSendAudio} 
          isSending={isSending}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChatPage;