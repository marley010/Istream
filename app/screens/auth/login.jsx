import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Foutmelding", "Vul alle velden in!");
            return;
        }

        try {
            const userData = await AsyncStorage.getItem('user');
            if (!userData) {
                Alert.alert("Foutmelding", "Geen account gevonden. Registreer eerst!");
                return;
            }

            const { email: storedEmail, password: storedPassword } = JSON.parse(userData);

            if (email === storedEmail && password === storedPassword) {
                Alert.alert("Succes", "Inloggen gelukt!");
                router.push('/screens/tabs/home');
            } else {
                Alert.alert("Foutmelding", "Onjuiste e-mail of wachtwoord!");
            }
        } catch (error) {
            Alert.alert("Fout", "Er is iets misgegaan. Probeer opnieuw.");
        }
    };

    return (
        <View style={styles.overlay}>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable style={styles.pressableCreate} onPress={handleLogin}> 
                <Text style={styles.pressableTextCreate}>LOGIN</Text>
            </Pressable>

            <TouchableOpacity onPress={() => router.push('/screens/auth/register')}>
                <Text style={styles.text}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 350,
        backgroundColor: "#222",  // Zelfde donkere achtergrond als HomeScreen en Register
    },
    text: {
        paddingTop: 30,
        fontSize: 14,
        color: "white",  // Wit voor betere zichtbaarheid
        textAlign: "center",
        textDecorationLine: "underline",
    },
    input: {
        backgroundColor: "#333",  // Donkere invoervelden
        width: 300,
        paddingVertical: 10,
        borderRadius: 20, 
        marginVertical: 10,
        textAlign: "center",
        fontSize: 16,
        color: "white",  // Witte tekst voor contrast
        borderWidth: 1,
        borderColor: "#555",  // Lichte rand voor betere zichtbaarheid
    },
    pressableCreate: {
        backgroundColor: "#b30086", // Zelfde paarse kleur als Register en HomeScreen
        width: 300, 
        paddingVertical: 10,
        borderRadius: 20, 
        marginVertical: 10,
        alignItems: "center",
    },
    pressableTextCreate: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
