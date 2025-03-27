import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, fetchPopularMovies } from "../../api/moviesApi"; // Make sure the path to your API is correct

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const getMovies = async () => {
      const trending = await fetchTrendingMovies();
      const popular = await fetchPopularMovies();
      setTrendingMovies(trending);
      setPopularMovies(popular);
    };

    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>iStream</Text>
          <Ionicons name="search" size={24} color="white" />
        </View>

        {/* Featured Movie */}
        <View style={styles.featuredContainer}>
          {trendingMovies[0] && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${trendingMovies[0].poster_path}`,
              }}
              style={styles.featuredImage}
            />
          )}
          <Text style={styles.movieTitle}>
            {trendingMovies[0] ? trendingMovies[0].title : "Loading..."}
          </Text>
          <Text style={styles.genres}>GENRES GENRES GENRES</Text> {/* You can dynamically update genres here */}
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.watchButtonText}>WATCH NOW</Text>
          </TouchableOpacity>
        </View>

        {/* Movie Rows */}
        {["Trending", "Popular", "Recommended"].map((category) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <ScrollView horizontal>
              {[...Array(6)].map((_, idx) => {
                const movie =
                  category === "Trending" ? trendingMovies[idx] : popularMovies[idx];
                return (
                  movie && (
                    <View key={movie.id} style={styles.movieCard}>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={styles.movieImage}
                      />
                      <Text style={styles.movieName}>{movie.title}</Text> {/* Movie Name in Light Gray */}
                    </View>
                  )
                );
              })}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#222" },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center", backgroundColor: "#222" },
  logo: { color: "white", fontSize: 24, fontWeight: "bold" },
  featuredContainer: { alignItems: "center", padding: 20 },
  featuredImage: { width: 250, height: 350, borderRadius: 10, backgroundColor: "#ccc" },
  movieTitle: { color: "white", fontSize: 22, fontWeight: "bold", marginTop: 10 },
  genres: { color: "gray", fontSize: 14 },
  watchButton: { backgroundColor: "#b30086", padding: 10, borderRadius: 5, marginTop: 10 },
  watchButtonText: { color: "white", fontWeight: "bold" },
  section: { padding: 15 },
  sectionTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  movieCard: { marginRight: 10, alignItems: "center", padding: 5, borderRadius: 5 },
  movieImage: { width: 100, height: 150, borderRadius: 5, backgroundColor: "#ccc" },
  movieName: { color: "#d3d3d3", marginTop: 5, fontSize: 12 }, // Light gray color for movie name
});

export default HomeScreen;
