import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import CustomButton from "../components/CustomButton";
// import { useGlobalContext } from "../context/GlobalProvider";
import '../global.css'
const Welcome = () => {
    
  
    // if (!loading && isLogged) return <Redirect href="/home" />;
  
    return (
      <SafeAreaView className="h-full bg-secondary">
        {/* <Loader isLoading={loading} /> */}
  
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="flex items-center justify-center w-full h-full px-4">
            <Image
              source={require("../assets/images/logo.png")} 
              className="w-[130px] h-[130px]"
              resizeMode="contain"
            />
  
            <View className="relative mt-5">
                <Text className="text-3xl text-primary text-[48px] font-LSpartanthin text-center">
                    {'\n'}Caring{'\n'}
                    <Text className="text-secondary-200 text-[12px] font-LSpartanSB">Ensi Student Center</Text>
                </Text>
  
            </View>
  
            <Text className="text-sm text-center text-black font-pregular mt-7">
                Welcome to Your Virtual Supervisor!{'\n'}
                Our innovative app and smart bracelet help you monitor your elderly loved ones' health in real time, ensuring safety, connection, and peace of mind—anytime, anywhere.
            </Text>
  
            <CustomButton
              title="Log In"
              handlePress={() => router.push("/(auth)/signin")}
              containerStyles="w-[207px]  mt-7 bg-primary"
              textStyles="text-secondary text-[24px]"
            />
            
            <CustomButton
              title="Sign Up"
              handlePress={() => router.push("/(auth)/signup")}
              containerStyles="w-[207px] mt-2 bg-primary-LESS "
              textStyles="text-primary  text-[24px]"
            />
          </View>
        </ScrollView>
  
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    );
  };
  
  export default Welcome;
