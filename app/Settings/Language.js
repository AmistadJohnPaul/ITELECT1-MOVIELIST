// app/Settings/Language.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../Context/LanguageContext';

export default function Language() {
  const navigation = useNavigation();
  const { language, setLanguage, t } = useLanguage();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Map language keys to display names
  const languages = [
    { key: 'English', name: t.english, flag: '🇺🇸' },
    { key: 'Spanish', name: t.spanish, flag: '🇪🇸' },
    { key: 'French', name: t.french, flag: '🇫🇷' },
    { key: 'German', name: t.german, flag: '🇩🇪' },
    { key: 'Chinese', name: t.chinese, flag: '🇨🇳' },
    { key: 'Japanese', name: t.japanese, flag: '🇯🇵' },
  ];

  const handleLanguageSelect = (langKey) => {
    // Add haptic feedback here if available
    // ReactNativeHapticFeedback.trigger("impactLight");
    
    setLanguage(langKey);
    
    // Show confirmation feedback
    Alert.alert(
      "Language Changed",
      `App language has been set to ${languages.find(lang => lang.key === langKey)?.name}`,
      [{ text: "OK" }]
    );
  };

  const LanguageOption = ({ lang, isSelected }) => (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.selectedOption,
      ]}
      onPress={() => handleLanguageSelect(lang.key)}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <Text style={styles.flag}>{lang.flag}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>{lang.name}</Text>
          <Text style={styles.languageKey}>{lang.key}</Text>
        </View>
      </View>
      
      {isSelected ? (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color="#f5c518" />
        </View>
      ) : (
        <View style={styles.unselectedIndicator}>
          <Ionicons name="ellipse-outline" size={20} color="#555" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Current Language Display */}
          <View style={styles.currentLanguageCard}>
            <Ionicons name="language" size={20} color="#f5c518" />
            <View style={styles.currentLanguageText}>
              <Text style={styles.currentLanguageLabel}>Current Language</Text>
              <Text style={styles.currentLanguageValue}>
                {languages.find(lang => lang.key === language)?.name}
              </Text>
            </View>
          </View>

          {/* Language Options */}
          <View style={styles.languageList}>
            {languages.map((lang) => (
              <LanguageOption
                key={lang.key}
                lang={lang}
                isSelected={language === lang.key}
              />
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color="#f5c518" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Language Settings</Text>
              <Text style={styles.infoText}>
                Select your preferred language for the app interface.
              </Text>
            </View>
          </View>

          {/* App Restart Notice */}
          <View style={styles.restartNotice}>
            <Ionicons name="refresh" size={16} color="#f5c518" />
            <Text style={styles.restartText}>
              Some changes may require restarting the app
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

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
  backButton: {
    padding: 4,
  },
  headerTitle: { 
    color: '#f5c518', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  content: { 
    paddingBottom: 40 
  },
  currentLanguageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  currentLanguageText: {
    marginLeft: 12,
  },
  currentLanguageLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 2,
  },
  currentLanguageValue: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: '600',
  },
  languageList: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#f5c518',
    backgroundColor: '#2a2a2a',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  optionText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  languageKey: {
    color: '#888',
    fontSize: 12,
  },
  selectedIndicator: {
    padding: 4,
  },
  unselectedIndicator: {
    padding: 4,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#f5c518',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: { 
    color: '#fff', 
    fontSize: 14, 
    lineHeight: 20 
  },
  restartNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
  },
  restartText: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 6,
    fontStyle: 'italic',
  },
});