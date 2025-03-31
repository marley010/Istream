import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AboutUs() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Kan link niet openen:", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>

        {/* About Us Card */}
        <View style={styles.textBox}>
          <Text style={styles.title}>About us </Text>
          <Text style={styles.description}>
          Our app provides users with a platform to discover and watch the latest movies and videos, anytime and anywhere they want.
          </Text>
        </View>

        {/* Small Cards for Team Members */}
        <View style={styles.smallCardsContainer}>
          {/* Team Member 1 */}
          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>Marley</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/marley-de-kijsser-5820ab2b5/')}>
                <Icon name="linkedin-square" size={30} color="#0A66C2" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink('https://github.com/marley010')}>
                <Icon name="github" size={30} color="white" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Team Member 2 */}
          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>Nikay</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/nikay-van-der-linden-b863b6250/')}>
                <Icon name="linkedin-square" size={30} color="#0A66C2" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink('https://github.com/Nikayvdl')}>
                <Icon name="github" size={30} color="white" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
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
    maxWidth: "100%",
    alignItems: "center",
    marginBottom: 20, // Space between "About Us" and team member cards
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8A2BE2",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: "#B0B0B0",
    textAlign: "center",
    lineHeight: 26,
  },

  // Styles for the small team member cards
  smallCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  smallCard: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    width: "45%", // Each small card takes 45% of the screen width
    alignItems: "center",
    marginBottom: 20, // Space between small cards
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
});
