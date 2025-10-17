// app/MovieDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params; // ✅ movie object from previous screen

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

        {/* Watch Now Button */}
        <TouchableOpacity style={styles.watchButton}>
          <Text style={styles.watchText}>▶ Watch Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#00000080',
    padding: 8,
    borderRadius: 30,
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  detailsBox: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#f5c518',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  description: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
  },
  watchButton: {
    backgroundColor: '#f5c518',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  watchText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MovieDetailsScreen;