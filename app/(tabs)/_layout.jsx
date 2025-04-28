import { StatusBar } from "expo-status-bar";
import {  Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


import Icon from "react-native-vector-icons/Ionicons";

const TabLayout = () => {
      
    

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#FFFFFF",
                    tabBarInactiveTintColor: "#CAD6FF",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#2260FF",
                        borderTopWidth: 1,
                        borderTopColor: "#FFFFFF",
                        height: 60,
                    },
                }}
            >
                <Tabs.Screen
                    name="dashbord"
                    options={{
                        title: "Dashboard",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="grid-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="alerte"
                    options={{
                        title: "Alerte",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="notifications-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="mesure"
                    options={{
                        title: "Check",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="checkmark-done-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="chatbubbles-outline" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="myprofile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};



export default TabLayout;