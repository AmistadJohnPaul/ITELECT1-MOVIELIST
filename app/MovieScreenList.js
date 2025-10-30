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
  },
  {
    id: '2',
    title: 'Curfed Action',
    category: "The Family's Cut",
    image: require('../assets/caction.jpg'),
    description:
      'Explosive action sequences and breathtaking stunts that redefine adrenaline.',
  },
  {
    id: '3',
    title: 'Curfed Thriller',
    category: "The Family's Cut",
    image: require('../assets/acting.jpg'),
    description: 'A psychological rollercoaster where nothing is as it seems.',
  },
  {
    id: '4',
    title: 'The Croads',
    category: "Mookie's Watchlist",
    image: require('../assets/thecroads.jpg'),
    description:
      'A heartwarming animated adventure about family, courage, and discovery.',
  },
  {
    id: '5',
    title: 'Spirited Away',
    category: "Mookie's Watchlist",
    image: require('../assets/spirited.jpg'),
    description:
      'A young girl enters a magical world and must find her way back home.',
  },
  {
    id: '6',
    title: 'Fast and Furious',
    category: "Mookie's Watchlist",
    image: require('../assets/fast.jpg'),
    description:
      'High-speed chases, family bonds, and unforgettable action-packed moments.',
  },
];

const categories = ['Movies', 'Series', 'Safehouse Screenings'];

const MovieScreenList = () => {
  const [selectedTab, setSelectedTab] = useState('Movies');
  const navigation = useNavigation();

  // ✅ Proper navigation handling for bottom buttons
  const handleNavPress = (screen) => {
    if (screen === 'Home') {
      navigation.navigate('Movies');
    } else if (screen === 'Favorites') {
      navigation.navigate('FavoritesScreen');
    } else if (screen === 'Settings') {
      navigation.navigate('SettingScreen');
    } else if (screen === 'Search') {
      navigation.navigate('SearchScreen');
    }
  };

  // ✅ Render movie cards
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  // ✅ Render each movie section
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
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header with title and profile button */}
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

      {/* Movie list sections */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
        {["The Family's Cut", "Mookie's Watchlist"].map((section) =>
          renderSection(section)
        )}
      </ScrollView>

      {/* ✅ Bottom Navigation */}
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
