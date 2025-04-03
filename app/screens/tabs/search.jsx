import React, { useState } from "react";
import { 
  View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, Image 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle movie search
  const searchMovies = async () => {
    if (!searchQuery.trim()) return;  // Don't search if input is empty
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bd25169e7ba6c2fe28a0e995bc6ed497&query=${searchQuery}&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to movie detail screen
  const goToMovieDetail = (movie) => {
    navigation.navigate("screens/MovieDetailsScreen", { movie });
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchMovies} // Trigger search on return key press
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchMovies}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <Text style={styles.loadingText}>Searching...</Text>}

      {/* Display Movies */}
      {!loading && movies.length === 0 && searchQuery && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToMovieDetail(item)} style={styles.movieItem}>
            {/* Movie Poster */}
            {item.poster_path ? (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                style={styles.moviePoster}
              />
            ) : (
              <View style={styles.noPoster}></View> // Fallback when no poster is available
            )}
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieReleaseDate}>{new Date(item.release_date).getFullYear()}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "white",
    fontSize: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    padding: 8,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  noResultsText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  movieItem: {
    backgroundColor: "#333",
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  moviePoster: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  noPoster: {
    width: 60,
    height: 90,
    backgroundColor: "#555",
    borderRadius: 5,
    marginRight: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  movieReleaseDate: {
    color: "gray",
    fontSize: 14,
  },
});

export default SearchScreen;
