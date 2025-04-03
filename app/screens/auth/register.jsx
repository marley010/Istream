import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Foutmelding", "Alle velden moeten ingevuld zijn!");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Foutmelding", "Wachtwoord moet minimaal 6 tekens lang zijn!");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Foutmelding", "Wachtwoorden komen niet overeen!");
            return;
        }

        try {
            await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
            const storedUser = await AsyncStorage.getItem('user');
            console.log("Stored user data:", storedUser);  

            Alert.alert("Succes", "Account is aangemaakt!", [
                { text: "OK", onPress: () => router.push('/screens/auth/login') }
            ]);
        } catch (error) {
            console.error("Error during registration:", error);
            Alert.alert("Fout", "Er is iets misgegaan. Probeer het opnieuw.");
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

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Pressable style={styles.pressableCreate} onPress={handleRegister}> 
                <Text style={styles.pressableTextCreate}>Create Account</Text>
            </Pressable>

            <TouchableOpacity onPress={() => router.push('/screens/auth/login')}>
                <Text style={styles.text}>Already have an account? Sign in</Text>
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
        backgroundColor: "#222",  // Zelfde donkere achtergrond als HomeScreen
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
        backgroundColor: "#b30086", // Zelfde kleur als de "WATCH NOW" knop in HomeScreen
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
