// app/Settings/AboutApp.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AboutApp() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About App</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>MovieApp</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <Text style={styles.description}>
          MovieApp is a modern mobile application for discovering, watching, and managing your favorite movies. 
          Browse trending movies, save your favorites, and stay up-to-date with new releases.
        </Text>

        <Text style={styles.sectionTitle}>Developer Info</Text>
        <Text style={styles.description}>
          Developed by Mookie Devs. For inquiries, feedback, or support, please reach out via email.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:support@movieapp.com')}
          style={styles.contactBtn}
        >
          <Ionicons name="mail-outline" size={20} color="#1a1a1a" />
          <Text style={styles.contactText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingTop: 50, paddingHorizontal: 15 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { color: '#f5c518', fontSize: 22, fontWeight: 'bold' },
  content: { paddingBottom: 40 },
  title: { color: '#f5c518', fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  version: { color: '#aaa', fontSize: 14, marginBottom: 15 },
  description: { color: '#fff', fontSize: 16, lineHeight: 22, marginBottom: 20 },
  sectionTitle: { color: '#f5c518', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  contactBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5c518', padding: 12, borderRadius: 10, gap: 10 },
  contactText: { color: '#1a1a1a', fontSize: 16, fontWeight: 'bold' },
});
