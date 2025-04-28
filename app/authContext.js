import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token, email, username) => {
    try {
      await AsyncStorage.multiSet([
        ['jwtToken', token],
        ['userEmail', email],
        ['username', username]
      ]);
      setUserToken(token);
      setUserData({ email, username });
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['jwtToken', 'userEmail', 'username', 'id']);
      setUserToken(null);
      setUserData(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('jwtToken');
      const email = await AsyncStorage.getItem('userEmail');
      const id = await AsyncStorage.getItem('id')
      const username = await AsyncStorage.getItem('username');

      setUserToken(token);
      setUserData({ email, username, id });
      setIsLoading(false);
    } catch (error) {
      console.log('isLoggedIn error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, userData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;