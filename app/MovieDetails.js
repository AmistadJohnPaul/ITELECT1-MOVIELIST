// app/MovieDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFavorites } from './Context/FavoritesContext';
import { Video } from 'expo-av';

const MovieDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  const [showTrailer, setShowTrailer] = useState(false);

  const toggleFavorite = () => {
    fav ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const shareMovie = async () => {
    try {
      await Share.share({
        message: `${movie.title}\n\n${movie.description}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleWatchNow = () => {
    setShowTrailer(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#f5c518" />
      </TouchableOpacity>

      {/* Movie Poster */}
      <Image source={movie.image} style={styles.poster} />

      {/* Movie Info */}
      <View style={styles.detailsBox}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.category}>{movie.category}</Text>

        <Text style={styles.description}>
          {movie.description ||
            `This is a thrilling film titled "${movie.title}" under the category "${movie.category}". 
            Experience top-notch storytelling, amazing visuals, and an unforgettable cinematic journey.`}
        </Text>

        {/* Favorite + Share Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={toggleFavorite}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={24}
              color={fav ? 'red' : '#f5c518'}
            />
            <Text style={styles.actionText}>{fav ? 'Favorited' : 'Favorite'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={shareMovie}>
            <Ionicons name="share-social-outline" size={24} color="#f5c518" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Watch Now Button */}
        <TouchableOpacity style={styles.watchButton} onPress={handleWatchNow}>
          <Text style={styles.watchText}>▶ Watch Now</Text>
        </TouchableOpacity>

        {/* Movie Trailer */}
        {showTrailer && movie.trailer && (
          <Video
            source={typeof movie.trailer === 'number' ? movie.trailer : { uri: movie.trailer }}
            style={styles.trailer}
            useNativeControls
            resizeMode="contain"
            shouldPlay
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#00000080',
    padding: 8,
    borderRadius: 30,
  },
  poster: { width: '100%', height: 450, resizeMode: 'cover' },
  detailsBox: { padding: 20 },
  title: { fontSize: 28, color: '#f5c518', fontWeight: 'bold', marginBottom: 10 },
  category: { fontSize: 16, color: '#aaa', marginBottom: 20 },
  description: { color: '#ddd', fontSize: 16, lineHeight: 22, marginBottom: 20 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  actionButton: { flexDirection: 'row', alignItems: 'center' },
  actionText: { color: '#f5c518', marginLeft: 6, fontWeight: 'bold' },
  watchButton: { backgroundColor: '#f5c518', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  watchText: { color: '#000', fontWeight: 'bold', fontSize: 18 },
  trailer: { width: '100%', height: 250, borderRadius: 10, marginTop: 20 },
});

export default MovieDetails;
