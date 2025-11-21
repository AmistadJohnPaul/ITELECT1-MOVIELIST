// app/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from './Context/LanguageContext';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const allMovies = [
    {
      id: '1',
      title: 'Demon Hunters',
      category: "The Family's Cut",
      image: require('../assets/hunter.webp'),
      description: "A dark, thrilling journey through loyalty, betrayal, and the dangerous paths of the criminal underworld.",
      trailer: require('../assets/hunter.mp4'),
    },
    {
      id: '2',
      title: 'How to Train Your Dragon',
      category: "The Family's Cut",
      image: require('../assets/traine.jpg'),
      description: "Epic adventures, soaring flight, and heartwarming bonds that take you on a thrilling ride through the skies.",
      trailer: require('../assets/traine.mp4'),
    },
    {
      id: '3',
      title: 'Fast and Furious',
      category: "The Family's Cut",
      image: require('../assets/fast.jpg'),
      description: 'High-speed chases, family bonds, and unforgettable action-packed moments.',
      trailer: require('../assets/fast.mp4'),
    },
    {
      id: '4',
      title: 'The Croads',
      category: "Guest's Watchlist",
      image: require('../assets/thecroads.jpg'),
      description: 'A heartwarming animated adventure about family, courage, and discovery.',
      trailer: require('../assets/croads.mp4'),
    },
    {
      id: '5',
      title: 'Spirited Away',
      category: "Guest's Watchlist",
      image: require('../assets/spirited.jpg'),
      description: 'A young girl enters a magical world and must find her way back home.',
      trailer: require('../assets/spirited.mp4'),
    },
    {
      id: '6',
      title: 'Demon Slayer',
      category: "Guest's Watchlist",
      image: require('../assets/demon1.jpg'),
      description: 'In a world plagued by demons, a determined boy joins the Demon Slayer Corps to fight evil and save his sister.',
      trailer: require('../assets/demon.mp4'),
    },
    {
      id: '7',
      title: 'Lovely Runner',
      category: 'Series',
      image: require('../assets/lovely.jpg'),
      description: "An inspiring tale of passion and perseverance, where dreams, love, and unexpected connections collide on the track and beyond.",
      trailer: require('../assets/lovely.mp4'),
    },
    {
      id: '8',
      title: 'When Life Gives You Tangerine',
      category: 'Series',
      image: require('../assets/tangerine.webp'),
      description: "A heartfelt story of resilience, unexpected friendships, and chasing dreams in modern-day Korea.",
      trailer: require('../assets/tangerine.mp4'),
    },
    {
      id: '9',
      title: 'Squid Game',
      category: 'Series',
      image: require('../assets/squid.jpg'),
      description: "A gripping story of survival, desperation, and unexpected alliances in the high-stakes world of modern-day Korea.",
      trailer: require('../assets/squid.mp4'),
    },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  const getPlaceholderText = () => {
    // Safe translation with fallback
    try {
      return t.searchPlaceholder || "Search movies...";
    } catch (error) {
      return "Search movies...";
    }
  };

  const getHeaderTitle = () => {
    // Safe translation with fallback
    try {
      return t.search || 'Search';
    } catch (error) {
      return 'Search';
    }
  };

  const getEmptyStateText = () => {
    // Safe translation with fallback
    try {
      if (searchQuery.trim().length > 0) {
        return t.noResults || 'No results found';
      } else {
        return t.searchPrompt || 'Search for your favorite movies';
      }
    } catch (error) {
      if (searchQuery.trim().length > 0) {
        return 'No results found';
      } else {
        return 'Search for your favorite movies';
      }
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
          <Ionicons name="search" size={24} color="#f5c518" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>
            {getHeaderTitle()}
          </Text>
        </View>

        <View style={{ width: 26 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={getPlaceholderText()}
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons 
            name={searchQuery.trim().length > 0 ? "search-outline" : "film-outline"} 
            size={60} 
            color="#555" 
          />
          <Text style={styles.emptyText}>
            {getEmptyStateText()}
          </Text>
        </View>
      )}
    </View>
  );
};

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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
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
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
});

export default SearchScreen;