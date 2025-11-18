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

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const allMovies = [
    { id: '1', title: 'Fast and Furious', image: require('../assets/acting.jpg'), category: 'Action' },
    { id: '2', title: 'The Croads', image: require('../assets/thecroads.jpg'), category: 'Sci-Fi' },
    { id: '3', title: 'Spirited Away', image: require('../assets/spirited.jpg'), category: 'Animation' },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
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

        {/* Wrap emoji and text separately */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>🔍</Text>
          <Text style={[styles.headerTitle, { marginLeft: 5 }]}>Search</Text>
        </View>

        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons name="film-outline" size={60} color="#555" />
          <Text style={styles.emptyText}>
            {searchQuery.trim().length > 0
              ? 'No results found'
              : 'Search for your favorite movies'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingTop: 50, paddingHorizontal: 15 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: { width: 100, height: 140 },
  infoBox: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  category: { color: '#aaa', fontSize: 13 },

  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SearchScreen;
