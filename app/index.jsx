import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.text}>Welcome to Istream</Text>
      <Pressable style={styles.pressable} onPress={() => router.push("/screens/tabs/home")}>
        <Text style={styles.pressableText}>Go to the app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  text: {
    paddingTop: 150,
    fontSize: 40,
    color: "white",
    marginBottom: 150,
    width: "80%",
    alignSelf: "flex-start",
    paddingLeft: 60,
    fontWeight: "bold",
    letterSpacing: 2
  },
  pressable: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 125, 
    borderRadius: 8, 
    marginVertical: 10,
    alignItems: "center",
  },
  pressableText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
