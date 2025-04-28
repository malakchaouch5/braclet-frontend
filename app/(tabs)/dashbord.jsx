import React from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../authContext'; // Adjust path as needed

const Dashboard = () => {
    const router = useRouter();
    const { userToken, userData, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <SafeAreaView className="items-center justify-center flex-1 bg-gray-100">
                <Text className="text-lg">Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!userToken) {
        // This will automatically redirect to signin due to the AuthProvider logic
        return null;
    }

    return (
        <SafeAreaView className="flex-1 px-4 bg-gray-100">
            <ScrollView>
                {/* Welcome message with user data */}
                <View className="mb-4">
                    <Text className="font-LSBold text-[40px] text-center text-blue-500">
                        Dashboard
                    </Text>
                    {userData && (
                        <Text className="text-center text-gray-600">
                            Welcome back, {userData.username}!
                        </Text>
                    )}
                </View>

                {/* Heart Rate Measurement */}
                <View className="p-4 mb-4 bg-white shadow-md rounded-xl">
                    <Text className="mb-2 text-xl text-blue-500 font-LSRegular">
                        Heart Rate Measurement
                    </Text>
                    <Image
                        source={{
                            uri: "https://via.placeholder.com/300x200",
                        }}
                        className="w-full rounded-lg h-52"
                    />
                </View>

                {/* Oxygen Level */}
                <View className="p-4 mb-4 bg-white shadow-md rounded-xl">
                    <Text className="mb-2 text-xl text-blue-500 font-LSRegular">
                        Oxygen Level
                    </Text>
                    <Image
                        source={{
                            uri: "https://via.placeholder.com/300x100",
                        }}
                        className="w-full h-24 rounded-lg"
                    />
                </View>

                {/* Temperature Level */}
                <View className="p-4 mb-4 bg-white shadow-md rounded-xl">
                    <Text className="mb-2 text-xl text-blue-500 font-LSRegular">
                        Temperature Level
                    </Text>
                    <Image
                        source={{
                            uri: "https://via.placeholder.com/300x100",
                        }}
                        className="w-full h-24 rounded-lg"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;