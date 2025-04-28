import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from './authContext';

export default function ProtectedRoute({ children }) {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!userToken) {
    return <Redirect href="/signin" />;
  }

  return children;
}