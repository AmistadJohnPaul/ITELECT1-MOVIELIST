// app/MovieScreenList.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const movies = [
  {
    id: '1',
    title: 'Classic Gangster',
    category: "The Family's Cut",
    image: require('../assets/acting.jpg'),
    description:
      'A gripping tale of loyalty, betrayal, and power in the criminal underworld.',
    trailer: require('../assets/demon.mp4'),
  },
  {
    id: '2',
    title: 'Curfed Action',
    category: "The Family's Cut",
    image: require('../assets/caction.jpg'),
    description:
      'Explosive action sequences and breathtaking stunts that redefine adrenaline.',
    trailer: require('../assets/demon.mp4'),
  },
  {
    id: '3',
    title: 'Demon Slayer',
    category: "The Family's Cut",
    image: require('../assets/demon.jpg'),
    description: 'A psychological rollercoaster where nothing is as it seems.',
    trailer: require('../assets/demon.mp4'),
  },
  {
    id: '4',
    title: 'The Croads',
    category: "Mookie's Watchlist",
    image: require('../assets/thecroads.jpg'),
    description:
      'A heartwarming animated adventure about family, courage, and discovery.',
    trailer: require('../assets/croads.mp4'),
  },
  {
    id: '5',
    title: 'Spirited Away',
    category: "Mookie's Watchlist",
    image: require('../assets/spirited.jpg'),
    description:
      'A young girl enters a magical world and must find her way back home.',
    trailer: require('../assets/spirited.mp4'),
  },
  {
    id: '6',
    title: 'Fast and Furious',
    category: "Mookie's Watchlist",
    image: require('../assets/fast.jpg'),
    description:
      'High-speed chases, family bonds, and unforgettable action-packed moments.',
    trailer: require('../assets/croads.mp4'),
  },
];

const categories = ['Movies', 'Series', 'Safehouse Screenings'];

const MovieScreenList = () => {
  const [selectedTab, setSelectedTab] = useState('Movies');
  const navigation = useNavigation();

  const handleNavPress = (screen) => {
    if (screen === 'Home') navigation.navigate('Movies');
    else if (screen === 'Favorites') navigation.navigate('FavoritesScreen');
    else if (screen === 'Settings') navigation.navigate('SettingScreen');
    else if (screen === 'Search') navigation.navigate('SearchScreen');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderSection = (sectionName) => {
    const sectionMovies = movies.filter((movie) => movie.category === sectionName);
    return (
      <View key={sectionName} style={{ marginBottom: 20 }}>
        <Text style={styles.sectionHeader}>{sectionName}</Text>
        <FlatList
          data={sectionMovies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Vionix</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-circle-outline" size={36} color="#f5c518" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedTab(cat)}
            style={[styles.tabItem, selectedTab === cat && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, selectedTab === cat && styles.activeTabText]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Movie Sections */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
        {["The Family's Cut", "Mookie's Watchlist"].map((section) =>
          <View key={section}>{renderSection(section)}</View>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => handleNavPress('Home')}>
          <Ionicons name="home" size={24} color="#f5c518" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavPress('Search')}>
          <Ionicons name="search" size={24} color="#f5c518" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavPress('Favorites')}>
          <Ionicons name="heart" size={24} color="#f5c518" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavPress('Settings')}>
          <Ionicons name="settings" size={24} color="#f5c518" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingTop: 50, paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: { color: '#f5c518', fontSize: 22, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  tabItem: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  activeTab: { backgroundColor: '#f5c518' },
  tabText: { color: '#fff', fontWeight: '600' },
  activeTabText: { color: '#1a1a1a' },
  sectionHeader: { color: '#f5c518', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 5 },
  title: { color: '#fff', fontSize: 14, textAlign: 'center' },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default MovieScreenList;
