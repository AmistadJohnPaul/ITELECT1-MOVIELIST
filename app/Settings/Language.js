// app/Settings/Language.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Language() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.option,
              selectedLanguage === lang && { borderColor: '#f5c518', borderWidth: 2 },
            ]}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text style={styles.optionText}>{lang}</Text>
            {selectedLanguage === lang && (
              <Ionicons name="checkmark-outline" size={22} color="#f5c518" />
            )}
          </TouchableOpacity>
        ))}

        <Text style={styles.infoText}>
          Select your preferred language for the app interface.
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
