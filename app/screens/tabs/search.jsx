import React, { useState, useEffect } from "react";
import {
  View, TextInput, StyleSheet, Text, FlatList,
  TouchableOpacity, Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch popular movies on mount
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Live search with debounce
  useEffect(() => {
    if (searchQuery.trim()) {
      const delayDebounce = setTimeout(() => {
        searchMovies();
      }, 500); // Wait 500ms after user stops typing

      return () => clearTimeout(delayDebounce); // Cleanup on next keystroke
    }
  }, [searchQuery]);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=bd25169e7ba6c2fe28a0e995bc6ed497&page=1`
      );
      const data = await response.json();
      setPopularMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bd25169e7ba6c2fe28a0e995bc6ed497&query=${searchQuery}&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToMovieDetail = (movie) => {
    navigation.navigate("screens/MovieDetailsScreen", { movie });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToMovieDetail(item)} style={styles.movieItem}>
      {item.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={styles.moviePoster}
        />
      ) : (
        <View style={styles.noPoster}></View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieReleaseDate}>
          {item.release_date ? new Date(item.release_date).getFullYear() : "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const moviesToShow = searchQuery.trim() ? movies : popularMovies;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchMovies}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {!loading && searchQuery && movies.length === 0 && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      <FlatList
        data={moviesToShow}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
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
    paddingHorizontal: 10,
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
  },
  movieReleaseDate: {
    color: "gray",
    fontSize: 14,
  },
});

export default SearchScreen;
