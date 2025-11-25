// app/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase/FirebaseConfig"; // Firestore instance

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params; // User ID passed from Login/Profile

  const [favorites, setFavorites] = useState([]);

  // Firestore references
  const favRef = collection(db, "users", uid, "favorites");

  // Load favorites from Firestore
  const loadFavorites = async () => {
    try {
      const snapshot = await getDocs(favRef);
      setFavorites(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.log("Error loading favorites:", err);
      Alert.alert("Error", "Failed to load favorites.");
    }
  };

  // Add favorite (example function)
  const addFavorite = async (itemType, itemId, note = '') => {
    try {
      if (!itemType || !itemId) {
        Alert.alert("Error", "Item type and ID are required.");
        return;
      }
      await addDoc(favRef, { itemType, itemId, note, createdAt: new Date() });
      loadFavorites();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to add favorite.");
    }
  };

  // Remove favorite
  const removeFavorite = async (favId) => {
    try {
      await deleteDoc(doc(db, "users", uid, "favorites", favId));
      loadFavorites();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to remove favorite.");
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Safe translation functions with fallbacks
  const getFavoritesTitle = () => {
    try {
      return 'Favorites';
    } catch (error) {
      return 'Favorites';
    }
  };

  const getEmptyStateText = () => {
    try {
      return 'No favorites added yet';
    } catch (error) {
      return 'No favorites added yet';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image source={{ uri: item.image || 'https://via.placeholder.com/100x140' }} style={styles.image} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{item.itemType}: {item.itemId}</Text>
        {item.note ? <Text style={styles.category}>{item.note}</Text> : null}
        <TouchableOpacity onPress={() => removeFavorite(item.id)}>
          <Text style={{ color: 'red', marginTop: 5 }}>Remove</Text>
        </TouchableOpacity>
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
            Start adding items to your favorites list
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
