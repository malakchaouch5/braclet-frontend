import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

const NotificationSettingScreen = () => {
  const router=useRouter()
  const [generalNotification, setGeneralNotification] = useState(false);
  const [vocal, setVocal] = useState(false);
  const [alert, setAlert] = useState(false);



  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 ">
        <TouchableOpacity onPress={()=>router.push("/settings")}>
          <Feather name="chevron-left" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text className="text-3xl font-LSpartanSB text-primary">Notification Setting</Text>
        <View className="w-6" /> 
      </View>

      {/* Notification Settings */}
      <View className="mt-4">
        {/* General Notification */}
        <View className="flex-row items-center justify-between px-4 py-3 ">
          <Text className="text-[20px] font-LSRegular  text-black">General Notification</Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#2260FF" }}
            thumbColor={generalNotification ? "#ffffff" : "#CAD6FF"}
            onValueChange={setGeneralNotification}
            value={generalNotification}
          />
        </View>

        {/* Vocal */}
        <View className="flex-row items-center justify-between px-4 py-3 ">
          <Text className="text-[20px] font-LSRegular  text-black">Vocal</Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#3b82f6" }}
            thumbColor={vocal ? "#ffffff" : "#CAD6FF"}
            onValueChange={setVocal}
            value={vocal}
          />
        </View>

        {/* Alert */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="text-[20px] font-LSRegular  text-black">Alert</Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#3b82f6" }}
            thumbColor={alert ? "#ffffff" : "#CAD6FF"}
            onValueChange={setAlert}
            value={alert}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettingScreen;
