// app/Settings/AccountSettings.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountSettings() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    username: 'Guest',
    email: 'guest@example.com',
    isSubscribed: false,
    joinDate: '2024-01-01'
  });
  
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    newReleases: true,
    securityAlerts: false,
    
    // Privacy settings
    profilePublic: true,
    showWatchlist: true,
    allowTracking: false,
    
    // Security settings
    twoFactorAuth: false,
    biometricLogin: false,
    
    // Playback settings
    autoPlay: true,
    videoQuality: 'HD',
    downloadQuality: 'Standard',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [editValue, setEditValue] = useState('');

  // Load user data from storage
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const username = await AsyncStorage.getItem('userName') || 'Guest';
      const email = await AsyncStorage.getItem('userEmail') || 'guest@example.com';
      const joinDate = await AsyncStorage.getItem('joinDate') || '2024-01-01';
      const isSubscribed = await AsyncStorage.getItem('isSubscribed') === 'true';
      
      setUserData({
        username,
        email,
        isSubscribed,
        joinDate
      });
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const toggleSwitch = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleEditField = (field, value) => {
    setCurrentField(field);
    setEditValue(value);
    setModalVisible(true);
  };

  const saveField = async () => {
    try {
      if (currentField === 'username') {
        await AsyncStorage.setItem('userName', editValue);
        setUserData(prev => ({ ...prev, username: editValue }));
        Alert.alert('Success', 'Username updated successfully!');
      } else if (currentField === 'email') {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editValue)) {
          Alert.alert('Error', 'Please enter a valid email address');
          return;
        }
        await AsyncStorage.setItem('userEmail', editValue);
        setUserData(prev => ({ ...prev, email: editValue }));
        Alert.alert('Success', 'Email updated successfully!');
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Enjoy exclusive benefits:\n• Ad-free experience\n• 4K streaming quality\n• Early access to new releases\n• Unlimited downloads\n• Priority support',
      [
        { text: 'Not Now', style: 'cancel' },
        { 
          text: 'Upgrade Now', 
          onPress: () => {
            // Simulate subscription
            setUserData(prev => ({ ...prev, isSubscribed: true }));
            AsyncStorage.setItem('isSubscribed', 'true');
            Alert.alert('Success', 'Welcome to VIONIX Premium!');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Clear user data and navigate to login
            AsyncStorage.multiRemove(['userName', 'userEmail', 'isSubscribed']);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Account', 
          style: 'destructive',
          onPress: () => {
            // Simulate account deletion
            AsyncStorage.clear();
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const SettingRow = ({ icon, title, value, type = 'switch', onPress, onValueChange }) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={22} color="#f5c518" style={styles.settingIcon} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {value && <Text style={styles.settingValue}>{value}</Text>}
        </View>
      </View>
      
      {type === 'switch' ? (
        <Switch
          value={settings[onValueChange]}
          onValueChange={() => toggleSwitch(onValueChange)}
          trackColor={{ false: '#767577', true: '#f5c518' }}
          thumbColor={settings[onValueChange] ? '#1a1a1a' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Overview</Text>
          <View style={styles.accountCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.username}>{userData.username}</Text>
              <Text style={styles.email}>{userData.email}</Text>
              <Text style={styles.joinDate}>Member since {formatDate(userData.joinDate)}</Text>
            </View>
            <View style={[styles.statusBadge, userData.isSubscribed && styles.premiumBadge]}>
              <Text style={styles.statusText}>
                {userData.isSubscribed ? 'PREMIUM' : 'FREE'}
              </Text>
            </View>
          </View>
          
          {!userData.isSubscribed && (
            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
              <Ionicons name="star" size={20} color="#1a1a1a" />
              <Text style={styles.upgradeText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              icon="person-outline"
              title="Username"
              value={userData.username}
              type="edit"
              onPress={() => handleEditField('username', userData.username)}
            />
            <View style={styles.separator} />
            <SettingRow
              icon="mail-outline"
              title="Email Address"
              value={userData.email}
              type="edit"
              onPress={() => handleEditField('email', userData.email)}
            />
            <View style={styles.separator} />
            <SettingRow
  icon="lock-closed-outline"
  title="Change Password"
  type="edit"
  onPress={() => navigation.navigate('ChangePassword')} // This should work now
/>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              icon="notifications-outline"
              title="Push Notifications"
              type="switch"
              onValueChange="pushNotifications"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="mail-outline"
              title="Email Notifications"
              type="switch"
              onValueChange="emailNotifications"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="film-outline"
              title="New Releases"
              type="switch"
              onValueChange="newReleases"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="shield-checkmark-outline"
              title="Security Alerts"
              type="switch"
              onValueChange="securityAlerts"
            />
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              icon="globe-outline"
              title="Public Profile"
              type="switch"
              onValueChange="profilePublic"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="eye-outline"
              title="Show Watchlist"
              type="switch"
              onValueChange="showWatchlist"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="key-outline"
              title="Two-Factor Authentication"
              type="switch"
              onValueChange="twoFactorAuth"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="finger-print-outline"
              title="Biometric Login"
              type="switch"
              onValueChange="biometricLogin"
            />
          </View>
        </View>

        {/* Playback Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playback Settings</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              icon="play-circle-outline"
              title="Auto-play Next Episode"
              type="switch"
              onValueChange="autoPlay"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="hardware-chip-outline"
              title="Video Quality"
              value={settings.videoQuality}
              type="edit"
              onPress={() => {/* Navigate to quality settings */}}
            />
            <View style={styles.separator} />
            <SettingRow
              icon="download-outline"
              title="Download Quality"
              value={settings.downloadQuality}
              type="edit"
              onPress={() => {/* Navigate to download settings */}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#ff4444" />
              <Text style={styles.dangerText}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
              <Text style={styles.dangerText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit {currentField === 'username' ? 'Username' : 'Email'}
            </Text>
            <TextInput
              style={styles.textInput}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter new ${currentField}`}
              placeholderTextColor="#666"
              autoCapitalize={currentField === 'username' ? 'words' : 'none'}
              keyboardType={currentField === 'email' ? 'email-address' : 'default'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveField}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    color: '#f5c518',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  accountInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 2,
  },
  joinDate: {
    color: '#888',
    fontSize: 12,
  },
  statusBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  premiumBadge: {
    backgroundColor: '#f5c518',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  premiumBadge: {
    backgroundColor: '#f5c518',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5c518',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  upgradeText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  settingsCard: {
    backgroundColor: '#222',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginLeft: 49, // Align with icon
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  dangerText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    color: '#f5c518',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  saveButton: {
    backgroundColor: '#f5c518',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});