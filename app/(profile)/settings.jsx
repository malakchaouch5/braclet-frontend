import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const SettingsScreen = () => {
  const router=useRouter()
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 ">
        <TouchableOpacity onPress={()=>router.back() }>
          <Icon name="chevron-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text className="text-3xl font-LSpartanSB text-primary">Settings</Text>
        <View className="w-6" />
      </View>

      
      <View className="mt-4">
        
        
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-3" onPress={()=> router.push("/notificationsSettings")}>
            <View className="flex-row items-center">
              <Icon name="bulb-outline" size={24} color="#2260FF" className="mr-4" />
              <Text className="text-[20px] font-LSRegular  text-black">Notification Setting</Text>
            </View>
            <View className="ml-auto">
              <Icon name="chevron-forward" size={24} color="#2260FF" />
            </View>
          </TouchableOpacity>
         
        

        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3" onPress={()=> router.push("/passwordManager")}>
          
            <View className="flex-row items-center">
              <Icon name="key-outline" size={24} color="#2260FF" className="mr-4" />
              <Text className="text-[20px] font-LSRegular  text-black">Password Manager</Text>
            </View>
            <View className="ml-auto">
              <Icon name="chevron-forward" size={24} color="#2260FF" />
            </View>
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
