import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="forget" />
        <Stack.Screen name="id" />
        <Stack.Screen name="loadingpage" />
        <Stack.Screen name="resetPassword" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="success" />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
