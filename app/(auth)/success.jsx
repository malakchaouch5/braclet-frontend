import React from "react";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ou vous pouvez utiliser un autre jeu d'icônes
import { StyleSheet, Text, Button, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
const SuccessPage = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Icon name="check-circle" size={100} color="#2260FF" style={styles.successIcon} />
            <Text style={styles.successText}>Connection Successful!</Text>
            <Button title="Sign In" onPress={() => router.push('/(auth)/signin')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:0,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 240 ,
        backgroundColor: '#fff',
    },
    successIcon: {
        marginBottom: 20,
    },
    successText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#2260FF',
        marginBottom: 30,
        textAlign: 'center',
    },
});

export default SuccessPage;
