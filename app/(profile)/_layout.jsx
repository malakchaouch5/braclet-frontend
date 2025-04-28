import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

//import { Loader } from "../../components";
//import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  //const { loading, isLogged } = useGlobalContext();

//  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="notificationsSettings" options={{ headerShown: false }} />
  <Stack.Screen name="passwordManager" options={{ headerShown: false }} />
  <Stack.Screen name="profile" options={{ headerShown: false }} />
  <Stack.Screen name="settings" options={{ headerShown: false }} />


</Stack>

  
      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;