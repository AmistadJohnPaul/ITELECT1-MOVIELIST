// app/FavoritesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from './Context/FavoritesContext';
import { useLanguage } from './Context/LanguageContext';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  // Safe translation functions with fallbacks
  const getFavoritesTitle = () => {
    try {
      return t.favorites || 'Favorites';
    } catch (error) {
      return 'Favorites';
    }
  };

  const getEmptyStateText = () => {
    try {
      return t.noFavorites || 'No favorites added yet';
    } catch (error) {
      return 'No favorites added yet';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Ionicons name="heart" size={24} color="#f5c518" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>
            {getFavoritesTitle()}
          </Text>
        </View>
        
        <View style={{ width: 26 }} />
      </View>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons name="heart-dislike-outline" size={60} color="#555" />
          <Text style={styles.emptyText}>
            {getEmptyStateText()}
          </Text>
          <Text style={styles.emptySubtext}>
            Start adding movies to your favorites list
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a', 
    paddingTop: 50, 
    paddingHorizontal: 15 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: '#f5c518',
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: { 
    width: 100, 
    height: 140,
    resizeMode: 'cover',
  },
  infoBox: { 
    flex: 1, 
    padding: 15, 
    justifyContent: 'center' 
  },
  title: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 6 
  },
  category: { 
    color: '#f5c518', 
    fontSize: 13,
    fontWeight: '500',
  },
  listContainer: { 
    paddingBottom: 20 
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});