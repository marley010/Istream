import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity, Image } from 'react-native';
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
            {/* Logo at the top */}
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

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
        paddingTop: 100,
        backgroundColor: "#222",
    },
    logo: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    text: {
        paddingTop: 30,
        fontSize: 14,
        color: "white",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    input: {
        backgroundColor: "#333",
        width: 300,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10,
        textAlign: "center",
        fontSize: 16,
        color: "white",
        borderWidth: 1,
        borderColor: "#555",
    },
    pressableCreate: {
        backgroundColor: "#b30086",
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
