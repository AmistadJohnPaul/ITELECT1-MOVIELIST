// app/Settings/Notifications.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Notifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = React.useState({
    pushEnabled: true,
    emailEnabled: false,
    marketingEmails: false,
    newReleases: true,
    priceAlerts: true,
    securityAlerts: true,
  });

  const handleToggle = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Optional: Add haptic feedback here
    // ReactNativeHapticFeedback.trigger("impactLight");
  };

  const handleResetPreferences = () => {
    Alert.alert(
      "Reset Preferences",
      "Are you sure you want to reset all notification preferences to default?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: () => setNotifications({
            pushEnabled: true,
            emailEnabled: false,
            marketingEmails: false,
            newReleases: true,
            priceAlerts: true,
            securityAlerts: true,
          })
        }
      ]
    );
  };

  const NotificationOption = ({ label, value, onValueChange, description }) => (
    <View style={styles.option}>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionText}>{label}</Text>
        {description && <Text style={styles.optionDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#f5c518' : '#ccc'}
        trackColor={{ false: '#555', true: '#f5c51820' }}
      />
    </View>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Push Notifications Section */}
        <Text style={styles.sectionTitle}>Notification Methods</Text>
        <NotificationOption
          label="Push Notifications"
          value={notifications.pushEnabled}
          onValueChange={(val) => handleToggle('pushEnabled', val)}
          description="Receive notifications on your device"
        />
        
        <NotificationOption
          label="Email Notifications"
          value={notifications.emailEnabled}
          onValueChange={(val) => handleToggle('emailEnabled', val)}
          description="Receive notifications via email"
        />

        {/* Notification Types Section */}
        <Text style={styles.sectionTitle}>What to Receive</Text>
        <NotificationOption
          label="New Releases"
          value={notifications.newReleases}
          onValueChange={(val) => handleToggle('newReleases', val)}
          description="Updates about new movie releases"
        />
        
        <NotificationOption
          label="Price Alerts"
          value={notifications.priceAlerts}
          onValueChange={(val) => handleToggle('priceAlerts', val)}
          description="Notifications about price changes"
        />
        
        <NotificationOption
          label="Security Alerts"
          value={notifications.securityAlerts}
          onValueChange={(val) => handleToggle('securityAlerts', val)}
          description="Important security updates"
        />
        
        <NotificationOption
          label="Marketing Emails"
          value={notifications.marketingEmails}
          onValueChange={(val) => handleToggle('marketingEmails', val)}
          description="Promotional offers and updates"
        />

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#f5c518" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Notification Preferences</Text>
            <Text style={styles.infoText}>
              Customize which notifications you want to receive, including promotions, 
              updates, and reminders. Changes may take a few minutes to apply.
            </Text>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleResetPreferences}
        >
          <Text style={styles.resetButtonText}>Reset to Default</Text>
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
    fontWeight: 'bold',
  },
  content: { 
    paddingBottom: 40 
  },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 18,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: { 
    color: '#fff', 
    fontSize: 14, 
    lineHeight: 20 
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});