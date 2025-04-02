import React, { useLayoutEffect } from "react";
import { 
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const MovieDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const movie = route.params?.movie;

  // Hide the navigation bar when this screen is active
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movie data is missing.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back & Fullscreen Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="expand" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Movie Poster */}
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} 
        style={styles.movieImage} 
      />

      {/* Movie Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <View style={styles.subInfo}>
          <Text style={styles.stars}>⭐ {movie.vote_average?.toFixed(1)}</Text>
          <Text style={styles.year}>{new Date(movie.release_date).getFullYear()}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.watchButtonText}>Watch</Text>
            <Ionicons name="play" size={18} color="white" style={styles.playIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Download</Text>
            <Ionicons name="download" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Trailer Button */}
        <TouchableOpacity style={styles.trailerButton}>
          <Ionicons name="videocam" size={24} color="white" />
          <Text style={styles.trailerText}>Trailer</Text>
        </TouchableOpacity>

        {/* Overview */}
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>

        {/* Genres */}
        <Text style={styles.genreTitle}>Genre</Text>
        <Text style={styles.genreText}>
          {movie.genre_ids?.map(id => genres[id]).join(", ") || "N/A"}
        </Text>
      </View>
    </ScrollView>
  );
};

const genres = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  topButtons: { 
    position: "absolute", top: 40, left: 15, right: 15, 
    flexDirection: "row", justifyContent: "space-between", zIndex: 2 
  },
  movieImage: { width: "100%", height: 250, resizeMode: "cover" },
  infoContainer: { padding: 15 },
  movieTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
  subInfo: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  stars: { color: "#FFD700", fontSize: 16, fontWeight: "bold", marginRight: 10 },
  year: { color: "gray", fontSize: 16 },

  buttonRow: { flexDirection: "row", marginTop: 15 },
  watchButton: { 
    backgroundColor: "#b30086", flexDirection: "row", alignItems: "center", 
    padding: 10, borderRadius: 5, marginRight: 10 
  },
  watchButtonText: { color: "white", fontWeight: "bold", marginRight: 5 },
  playIcon: { marginLeft: 5 },
  
  downloadButton: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 5, backgroundColor: "#333" },
  downloadButtonText: { color: "white", fontWeight: "bold", marginRight: 5 },

  trailerButton: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  trailerText: { color: "white", fontSize: 16, marginLeft: 5 },

  overviewTitle: { color: "#b30086", fontSize: 18, fontWeight: "bold", marginTop: 20 },
  overviewText: { color: "lightgray", fontSize: 14, marginTop: 5 },

  genreTitle: { color: "white", fontSize: 16, fontWeight: "bold", marginTop: 15 },
  genreText: { color: "gray", fontSize: 14, marginTop: 5 }
});

export default MovieDetailScreen;
