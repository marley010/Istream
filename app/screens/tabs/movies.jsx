import {
  StyleSheet, Text, View, SafeAreaView, StatusBar,
  FlatList, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchPopularMovies } from '../../api/moviesApi';

export default function Movies() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState("popular"); // 'popular' of 'extended'

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const loadMovies = async (pageToLoad = 1, selectedFilter = filter) => {
    if (pageToLoad === 1) setLoading(true);
    else setLoadingMore(true);

    let data = [];

    if (selectedFilter === "extended") {
      // Laad bijv. 3 pagina's per keer voor meer films
      const page1 = await fetchPopularMovies(pageToLoad);
      const page2 = await fetchPopularMovies(pageToLoad + 1);
      const page3 = await fetchPopularMovies(pageToLoad + 2);
      data = [...page1, ...page2, ...page3];
    } else {
      data = await fetchPopularMovies(pageToLoad);
    }

    setMovies((prev) => {
      const existingIds = new Set(prev.map((movie) => movie.id));
      const filtered = data.filter((movie) => !existingIds.has(movie.id));
      return pageToLoad === 1 ? data : [...prev, ...filtered];
    });

    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1, filter);
  }, [filter]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      const nextPage = filter === "extended" ? page + 3 : page + 1;
      setPage(nextPage);
      loadMovies(nextPage);
    }
  };

  const toggleFilter = () => {
    const newFilter = filter === 'popular' ? 'extended' : 'popular';
    setMovies([]);
    setPage(1);
    setFilter(newFilter);
  };

  const renderFooter = () =>
    loadingMore ? (
      <ActivityIndicator size="small" color="#fff" style={{ margin: 10 }} />
    ) : null;

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
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
      
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Text style={styles.filterText}>
            {filter === 'popular' ? 'toon veel films' : 'toon populaire films'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `movie-${index}`
          }
          renderItem={renderMovie}
          numColumns={3}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
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
  filterContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  filterText: {
    color: "white",
    fontSize: 14,
  },
});
