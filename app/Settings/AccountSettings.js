// app/Settings/AccountSettings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AccountSettings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.sectionText}>
          Update your profile information, email, and password.
        </Text>

        <Text style={styles.sectionTitle}>Security</Text>
        <Text style={styles.sectionText}>
          Manage your account security settings and 2FA options.
        </Text>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.sectionText}>
          Customize app preferences and notifications.
        </Text>
      </ScrollView>
    </View>
  );
}

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
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 20,
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});
