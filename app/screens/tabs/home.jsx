import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, fetchPopularMovies } from "../../api/moviesApi"; 

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollIndex = useRef(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (trendingMovies.length > 1) {
        scrollIndex.current = (scrollIndex.current + 1) % trendingMovies.slice(0, 5).length;
        flatListRef.current?.scrollToIndex({ index: scrollIndex.current, animated: true });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingMovies]);

  const getGenresFromIds = (genreIds) => {
    const genres = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
      99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
      10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    };
    return genreIds.map((id) => genres[id]).filter(Boolean).join(", ");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>iStream</Text>
          <Ionicons name="search" size={24} color="white" />
        </View>

        <FlatList
          ref={flatListRef}
          data={trendingMovies.slice(0, 5)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.featuredContainer}>
              <TouchableOpacity
                onPress={() => {
                  // Navigate to MovieDetailScreen and pass the movie data
                  navigation.navigate('screens/MovieDetailsScreen', { movie: item });
                }}
              >
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.featuredImage} />
              </TouchableOpacity>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.genres}>{getGenresFromIds(item.genre_ids)}</Text>
              <TouchableOpacity
                style={styles.watchButton}
                onPress={() => {
                  // Navigate to MovieDetailScreen and pass the movie data
                  navigation.navigate('screens/MovieDetailsScreen', { movie: item });
                }}
              >
                <Text style={styles.watchButtonText}>WATCH NOW</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {['Trending', 'Popular', 'Recommended'].map((category) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...Array(6)].map((_, idx) => {
                const movie = category === 'Trending' ? trendingMovies[idx] : popularMovies[idx];
                return (
                  movie && (
                    <View key={movie.id} style={styles.movieCard}>
                      <TouchableOpacity
                        onPress={() => {
                          // Navigate to MovieDetailScreen and pass the movie data
                          navigation.navigate('screens/MovieDetailsScreen', { movie });
                        }}
                      >
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.movieImage} />
                        <Text style={styles.movieName} numberOfLines={1} ellipsizeMode="tail">{movie.title}</Text>
                      </TouchableOpacity>
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
  featuredContainer: { alignItems: "center", padding: 20, width: 350 },
  featuredImage: { width: 250, height: 350, borderRadius: 10, backgroundColor: "#ccc" },
  movieTitle: { color: "white", fontSize: 22, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  genres: { color: "gray", fontSize: 14, marginTop: 5, textAlign: "center" },
  watchButton: { backgroundColor: "#b30086", padding: 10, borderRadius: 5, marginTop: 10 },
  watchButtonText: { color: "white", fontWeight: "bold" },
  section: { padding: 15 },
  sectionTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  movieCard: { marginRight: 10, alignItems: "center", padding: 5, borderRadius: 5 },
  movieImage: { width: 100, height: 150, borderRadius: 5 },
  movieName: { color: "lightgray", marginTop: 5, fontSize: 12, textAlign: "center", width: 100 },
});

export default HomeScreen;
