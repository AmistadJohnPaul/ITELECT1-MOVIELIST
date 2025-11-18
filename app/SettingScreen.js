// app/SettingScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const navigation = useNavigation();

  const settingsOptions = [
    { id: 1, title: 'Account Settings', icon: 'person-outline', screen: 'AccountSettings' },
    { id: 2, title: 'Notifications', icon: 'notifications-outline', screen: 'Notifications' },
    { id: 3, title: 'Privacy & Security', icon: 'lock-closed-outline', screen: 'PrivacySecurity' },
    { id: 4, title: 'Language', icon: 'language-outline', screen: 'Language' },
    { id: 5, title: 'Help & Support', icon: 'help-circle-outline', screen: 'HelpSupport' },
    { id: 6, title: 'About App', icon: 'information-circle-outline', screen: 'AboutApp' },
  ];

  const handleOptionPress = (screen) => {
    if (screen) {
      // Navigate to the screen if it exists, else show alert
      navigation.navigate(screen);
    } else {
      Alert.alert('Coming Soon', 'This feature is not implemented yet.');
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    Alert.alert('Logout', 'You have been logged out.');
    navigation.replace('Login'); // go back to login after logout
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <View style={{ width: 26 }} /> {/* Spacer for alignment */}
      </View>

      {/* Settings list */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {settingsOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.option}
            onPress={() => handleOptionPress(item.screen)}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={item.icon} size={24} color="#f5c518" />
              <Text style={styles.optionText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color="#777" />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#1a1a1a" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#f5c518',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
  },
  logoutText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
