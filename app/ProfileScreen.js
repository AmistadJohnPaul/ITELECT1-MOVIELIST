// app/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    profileImage: 'https://via.placeholder.com/120',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const profileImage = await AsyncStorage.getItem('userProfileImage');

        setUser({
          name: name || 'Guest User',
          email: email || 'guest@example.com',
          profileImage: profileImage || 'https://via.placeholder.com/120',
        });
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>👤 Hello, {user.name}!</Text>

      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.settingsButton]}>
          <Text style={[styles.buttonText, styles.settingsButtonText]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    color: '#f5c518',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#f5c518',
    marginBottom: 20,
  },
  name: {
    color: '#f5c518',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#f5c518',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  settingsButton: {
    backgroundColor: '#333',
  },
  settingsButtonText: {
    color: '#f5c518',
  },
});