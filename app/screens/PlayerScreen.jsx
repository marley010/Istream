import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const PlayerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // ✅ Changed from ttcode to imdb_id

  console.log(id);

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* WebView for Movie */}
      <WebView
        source={{ uri: `https://vidsrc.xyz/embed/movie/${id}` }} // ✅ Updated URL
        style={{ flex: 1 }}
        allowsFullscreenVideo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
});

export default PlayerScreen;
