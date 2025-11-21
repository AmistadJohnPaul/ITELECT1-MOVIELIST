// app/Settings/PrivacySecurity.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PrivacySecurity() {
  const navigation = useNavigation();
  const [settings, setSettings] = React.useState({
    lockApp: false,
    dataSharing: true,
    biometricLogin: false,
    twoFactorAuth: false,
    personalizedAds: true,
    activityTracking: true,
    locationSharing: false,
  });

  const handleToggle = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Show confirmation for important toggles
    if (key === 'twoFactorAuth' && value) {
      Alert.alert(
        "Two-Factor Authentication",
        "For security reasons, you'll need to verify your email address to enable two-factor authentication.",
        [
          { text: "Cancel", onPress: () => setSettings(prev => ({ ...prev, twoFactorAuth: false })) },
          { text: "Continue", style: "default" }
        ]
      );
    }
  };

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "You will be redirected to our secure password change portal.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Continue", 
          onPress: () => {
            // Navigate to change password screen
            navigation.navigate('ChangePassword');
          }
        }
      ]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      "Export Data",
      "This will generate a file containing all your personal data. It may take a few minutes.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Export", 
          onPress: () => {
            // Simulate data export process
            setTimeout(() => {
              Alert.alert("Success", "Your data export has been started. You'll receive an email when it's ready.");
            }, 1000);
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. All your data will be erased.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Account", 
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirm Deletion",
              "Type 'DELETE' to confirm account deletion:",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: () => {
                    // Handle account deletion
                    navigation.navigate('Login');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://yourapp.com/privacy-policy');
  };

  const SecurityOption = ({ label, value, onValueChange, description, icon }) => (
    <View style={styles.option}>
      <View style={styles.optionLeft}>
        {icon && <Ionicons name={icon} size={20} color="#f5c518" style={styles.optionIcon} />}
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
          {description && <Text style={styles.optionDescription}>{description}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#f5c518' : '#ccc'}
        trackColor={{ false: '#555', true: '#f5c51820' }}
      />
    </View>
  );

  const ActionButton = ({ label, onPress, icon, isDestructive = false }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionLeft}>
        {icon && <Ionicons name={icon} size={20} color={isDestructive ? '#ff4444' : '#f5c518'} style={styles.actionIcon} />}
        <Text style={[styles.actionText, isDestructive && styles.destructiveText]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color={isDestructive ? '#ff4444' : '#777'} />
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Section */}
        <Text style={styles.sectionTitle}>Security</Text>
        <SecurityOption
          label="App Lock"
          value={settings.lockApp}
          onValueChange={(val) => handleToggle('lockApp', val)}
          description="Require PIN or biometric to open app"
          icon="lock-closed"
        />
        
        <SecurityOption
          label="Biometric Login"
          value={settings.biometricLogin}
          onValueChange={(val) => handleToggle('biometricLogin', val)}
          description="Use fingerprint or face recognition"
          icon="finger-print"
        />
        
        <SecurityOption
          label="Two-Factor Authentication"
          value={settings.twoFactorAuth}
          onValueChange={(val) => handleToggle('twoFactorAuth', val)}
          description="Extra layer of security for your account"
          icon="shield-checkmark"
        />

        {/* Privacy Section */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <SecurityOption
          label="Share Usage Data"
          value={settings.dataSharing}
          onValueChange={(val) => handleToggle('dataSharing', val)}
          description="Help us improve by sharing anonymous data"
          icon="analytics"
        />
        
        <SecurityOption
          label="Personalized Ads"
          value={settings.personalizedAds}
          onValueChange={(val) => handleToggle('personalizedAds', val)}
          description="See ads relevant to your interests"
          icon="megaphone"
        />
        
        <SecurityOption
          label="Activity Tracking"
          value={settings.activityTracking}
          onValueChange={(val) => handleToggle('activityTracking', val)}
          description="Track your watch history for recommendations"
          icon="time"
        />
        
        <SecurityOption
          label="Location Services"
          value={settings.locationSharing}
          onValueChange={(val) => handleToggle('locationSharing', val)}
          description="Personalize content based on location"
          icon="location"
        />

        {/* Account Actions */}
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <ActionButton
          label="Change Password"
          onPress={handleChangePassword}
          icon="key"
        />
        
        <ActionButton
          label="Export Data"
          onPress={handleDataExport}
          icon="download"
        />
        
        <ActionButton
          label="Privacy Policy"
          onPress={openPrivacyPolicy}
          icon="document-text"
        />

        {/* Danger Zone */}
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.dangerZone}>
          <ActionButton
            label="Delete Account"
            onPress={handleDeleteAccount}
            icon="trash"
            isDestructive={true}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color="#f5c518" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Your Privacy Matters</Text>
            <Text style={styles.infoText}>
              We take your privacy seriously. All data is encrypted and we never share 
              your personal information with third parties without your consent.
            </Text>
          </View>
        </View>
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
    marginTop: 20,
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
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
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
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: { 
    color: '#f5c518', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  destructiveText: {
    color: '#ff4444',
  },
  dangerZone: {
    borderLeftWidth: 2,
    borderLeftColor: '#ff4444',
    paddingLeft: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
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
});