
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
import * as ScreenOrientation from 'expo-screen-orientation'; 

const MovieDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const movie = route?.params?.movie;

  const favoritesCtx = useFavorites();
  const addFavorite = favoritesCtx?.addFavorite;
  const removeFavorite = favoritesCtx?.removeFavorite;
  const isFavorite = favoritesCtx?.isFavorite;
  const fav = isFavorite && movie ? isFavorite(movie.id) : false;

  const [showTrailer, setShowTrailer] = useState(false);

  const toggleFavorite = () => {
    if (!movie) return;
    if (fav) {
      if (typeof removeFavorite === 'function') removeFavorite(movie.id);
    } else {
      if (typeof addFavorite === 'function') addFavorite(movie);
    }
  };

  const shareMovie = async () => {
    if (!movie) return;
    try {
      await Share.share({
        message: `${movie.title ?? 'Movie'}\n\n${movie.description ?? ''}`,
      });
    } catch (error) {
      console.log(error?.message ?? error);
    }
  };

  // ✅ Lock orientation to portrait when opening trailer
  const handleWatchNow = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setShowTrailer(true);
  };

  // ✅ Unlock orientation when closing trailer
  const closeTrailer = async () => {
    await ScreenOrientation.unlockAsync(); 
    setShowTrailer(false);
  };

  // If showTrailer is true, render ONLY the video
  if (showTrailer && movie.trailer) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: '#00000080', padding: 8, borderRadius: 30 }}
          onPress={closeTrailer} // ✅ use new close function
        >
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Video
          source={typeof movie.trailer === 'number' ? movie.trailer : { uri: movie.trailer }}
          style={{ width: '100%', height: '100%' }}
          useNativeControls
          resizeMode="contain"
          shouldPlay
        />
      </View>
    );
  }

  // Otherwise, show normal movie details
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
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
