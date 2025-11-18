// app/Settings/HelpSupport.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupport() {
  const navigation = useNavigation();

  const supportOptions = [
    { id: 1, title: 'FAQ', action: () => Alert.alert('FAQ', 'Coming Soon!') },
    { id: 2, title: 'Contact Us', action: () => Linking.openURL('mailto:support@yourapp.com') },
    { id: 3, title: 'Report a Problem', action: () => Alert.alert('Report', 'Coming Soon!') },
    { id: 4, title: 'Terms & Conditions', action: () => Alert.alert('Terms & Conditions', 'Coming Soon!') },
    { id: 5, title: 'Privacy Policy', action: () => Alert.alert('Privacy Policy', 'Coming Soon!') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {supportOptions.map((item) => (
          <TouchableOpacity key={item.id} style={styles.option} onPress={item.action}>
            <Text style={styles.optionText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#777" />
          </TouchableOpacity>
        ))}

        <Text style={styles.infoText}>
          Need assistance? You can contact our support team or check FAQs for guidance.
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
  headerTitle: { color: '#f5c518', fontSize: 22, fontWeight: 'bold' },
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
  infoText: { color: '#fff', fontSize: 16, marginTop: 10, lineHeight: 22 },
});
