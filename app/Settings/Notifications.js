// app/Settings/Notifications.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Notifications() {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Push Notifications</Text>
          <Switch
            value={pushEnabled}
            onValueChange={(val) => setPushEnabled(val)}
            thumbColor={pushEnabled ? '#f5c518' : '#ccc'}
            trackColor={{ false: '#555', true: '#333' }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>Email Notifications</Text>
          <Switch
            value={emailEnabled}
            onValueChange={(val) => setEmailEnabled(val)}
            thumbColor={emailEnabled ? '#f5c518' : '#ccc'}
            trackColor={{ false: '#555', true: '#333' }}
          />
        </View>

        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Text style={styles.sectionText}>
          Customize which notifications you want to receive, including promotions, updates, and reminders.
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
  content: { paddingBottom: 40 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  optionText: { color: '#fff', fontSize: 16 },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 20,
  },
  sectionText: { color: '#fff', fontSize: 16, lineHeight: 22 },
});
