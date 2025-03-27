import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AboutUs() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Over Ons</Text>
          <Text style={styles.description}>
            Onze app biedt gebruikers een platform om de nieuwste films en video's te ontdekken en bekijken, waar en wanneer ze maar willen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textBox: {
    backgroundColor: "#1E1E1E",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    maxWidth: "90%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: "#B0B0B0",
    textAlign: "center",
    lineHeight: 26,
  },
});
