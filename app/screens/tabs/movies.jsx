import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar,
  FlatList, Image, TouchableOpacity, ActivityIndicator,
  Modal, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesByGenre
} from '../../api/moviesApi';

export default function Movies() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const [popular, genreList] = await Promise.all([
      fetchPopularMovies(),
      fetchGenres()
    ]);
    setPopularMovies(popular);
    setMovies(popular);
    setGenres(genreList);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setMovies(popularMovies);
    } else {
      loadMoviesByGenres();
    }
  }, [selectedGenres]);

  const loadMoviesByGenres = async () => {
    setLoading(true);
    const allMovies = await Promise.all(
      selectedGenres.map((genreId) => fetchMoviesByGenre(genreId))
    );
    const combined = allMovies.flat();
    const uniqueMovies = Array.from(new Map(combined.map(m => [m.id, m])).values());
    setMovies(uniqueMovies);
    setLoading(false);
  };

  const toggleGenre = (genreId) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('screens/MovieDetailsScreen', { movie: item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movies</Text>
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal visible={showFilter} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.filterTitle}>Filter by Genre</Text>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={styles.genreItem}
                onPress={() => toggleGenre(genre.id)}
              >
                <Ionicons
                  name={selectedGenres.includes(genre.id) ? 'checkbox' : 'square-outline'}
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.genreText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowFilter(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111",
  },
  listContent: {
    padding: 10,
  },
  movieCard: {
    margin: 5,
    width: 100,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  movieTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
  },
  filterTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genreText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    color: '#00f',
    fontSize: 16,
  },
});
