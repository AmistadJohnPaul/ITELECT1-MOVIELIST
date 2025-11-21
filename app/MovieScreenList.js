// app/MovieScreenList.js
import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from './Context/LanguageContext';

const MovieScreenList = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Guest');
  const [moviesWithUsername, setMoviesWithUsername] = useState([]);
  const { t } = useLanguage();

  // Load username from AsyncStorage
  useEffect(() => {
    const loadUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('userName');
      if (storedUsername) setUsername(storedUsername);
    };
    loadUsername();
  }, []);

  // Original movie data
  const movies = [
    {
      id: '1',
      title: 'Demon Hunters',
      category: "The Family's Cut",
      image: require('../assets/hunter.webp'),
      description:
        "A dark, thrilling journey through loyalty, betrayal, and the dangerous paths of the criminal underworld.",
      trailer: require('../assets/hunter.mp4'),
    },
    {
      id: '2',
      title: 'How to Train Your Dragon',
      category: "The Family's Cut",
      image: require('../assets/traine.jpg'),
      description:
        "Epic adventures, soaring flight, and heartwarming bonds that take you on a thrilling ride through the skies.",
      trailer: require('../assets/traine.mp4'),
    },
    {
      id: '3',
      title: 'Fast and Furious',
      category: "The Family's Cut",
      image: require('../assets/fast.jpg'),
      description:
        'High-speed chases, family bonds, and unforgettable action-packed moments.',
      trailer: require('../assets/fast.mp4'),
    },
    {
      id: '4',
      title: 'The Croads',
      category: "Guest's Watchlist",
      image: require('../assets/thecroads.jpg'),
      description:
        'A heartwarming animated adventure about family, courage, and discovery.',
      trailer: require('../assets/croads.mp4'),
    },
    {
      id: '5',
      title: 'Spirited Away',
      category: "Guest's Watchlist",
      image: require('../assets/spirited.jpg'),
      description:
        'A young girl enters a magical world and must find her way back home.',
      trailer: require('../assets/spirited.mp4'),
    },
    {
      id: '6',
      title: 'Demon Slayer',
      category: "Guest's Watchlist",
      image: require('../assets/demon1.jpg'),
      description:
        'In a world plagued by demons, a determined boy joins the Demon Slayer Corps to fight evil and save his sister.',
      trailer: require('../assets/demon.mp4'),
    },
    {
      id: '7',
      title: 'Lovely Runner',
      category: 'Series',
      image: require('../assets/lovely.jpg'),
      description: 
        "An inspiring tale of passion and perseverance, where dreams, love, and unexpected connections collide on the track and beyond.",
      trailer: require('../assets/lovely.mp4'),
    },
    {
      id: '8',
      title: 'When Life Gives You Tangerine',
      category: 'Series',
      image: require('../assets/tangerine.webp'),
      description:
        "A heartfelt story of resilience, unexpected friendships, and chasing dreams in modern-day Korea.",
      trailer: require('../assets/tangerine.mp4'),
    },
    {
      id: '9',
      title: 'Squid Game',
      category: 'Series',
      image: require('../assets/squid.jpg'),
      description:
        "A gripping story of survival, desperation, and unexpected alliances in the high-stakes world of modern-day Korea.",
      trailer: require('../assets/squid.mp4'),
    },
    {
      id: '10',
      title: 'Secret Screening 1',
      category: 'Safehouse Screenings',
      image: require('../assets/keeper.jpg'),
      description:
        'Another thrilling hidden movie.',
      trailer: require('../assets/Keeper.mp4'),
    },
    {
      id: '11',
      title: 'Secret Screening 2',
      category: 'Safehouse Screenings',
      image: require('../assets/meteor.jpg'),
      description: 
        'Exclusive content only for Safehouse members.',
      trailer: require('../assets/meteor.mp4'),
    },
  ];

  // Update movies with dynamic username in watchlist
  useEffect(() => {
    const updatedMovies = movies.map(movie => {
      if (movie.category.includes("Guest's Watchlist")) {
        return { ...movie, category: `${username}'s ${t.watchlist || 'Watchlist'}` };
      }
      return movie;
    });
    setMoviesWithUsername(updatedMovies);
  }, [username, t]);

  // Use translated categories
  const categories = [
    t.movies || 'Movies', 
    t.series || 'Series', 
    t.safehouseScreenings || 'Safehouse Screenings'
  ];

  const [selectedTab, setSelectedTab] = useState(categories[0]);

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
    const sectionMovies = moviesWithUsername.filter((movie) => {
      // Handle dynamic watchlist section name
      if (sectionName === `${username}'s ${t.watchlist || 'Watchlist'}`) {
        return movie.category === `${username}'s ${t.watchlist || 'Watchlist'}`;
      }
      return movie.category === sectionName;
    });

    // Example: hide Safehouse if username is Guest
    if (sectionName === (t.safehouseScreenings || 'Safehouse Screenings') && username === 'Guest') {
      return (
        <View key={sectionName} style={{ marginBottom: 20 }}>
          <Text style={styles.sectionHeader}>{t.safehouseScreenings || 'Safehouse Screenings'}</Text>
          <Text style={{ color: '#fff', fontStyle: 'italic' }}>
            {t.loginToAccess || 'Login to access Safehouse Screenings!'}
          </Text>
        </View>
      );
    }

    if (sectionMovies.length === 0) return null;
    
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

  // PROPER FIX: Render each section individually and check for null
  const renderMovieSections = () => {
    const sections = ["The Family's Cut", `${username}'s ${t.watchlist || 'Watchlist'}`, t.series || 'Series'];
    
    return sections.map(section => {
      const sectionContent = renderSection(section);
      return sectionContent ? <View key={section}>{sectionContent}</View> : null;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header - FIXED: Remove emoji and use proper structure */}
    {/* Header */}
<View style={styles.header}>
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>
      🎬 {t.vionix || 'Vionix'}
    </Text>
  </View>
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

      {/* Movie Sections - PROPERLY FIXED */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
        {selectedTab === (t.movies || 'Movies') && renderMovieSections()}
        {selectedTab === (t.series || 'Series') && renderSection('Series')}
        {selectedTab === (t.safehouseScreenings || 'Safehouse Screenings') && renderSection('Safehouse Screenings')}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingTop: 50, paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { 
    color: '#f5c518', 
    fontSize: 22, 
    fontWeight: 'bold',
    // You can add margin if needed for spacing
    marginLeft: 8,
  },
  // ... rest of your styles remain the same
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