// app/Settings/ChangePasswordScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert('Error', 'New password must be different from current password');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success', 
        'Your password has been changed successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              });
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#f5c518" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>
        
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Info */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#f5c518" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Secure Password Update</Text>
            <Text style={styles.infoDescription}>
              Ensure your new password is strong and unique. Use a combination of letters, numbers, and symbols.
            </Text>
          </View>
        </View>

        {/* Password Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Change Your Password</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your current password"
              placeholderTextColor="#666"
              secureTextEntry
              value={passwords.currentPassword}
              onChangeText={(value) => updatePassword('currentPassword', value)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#666"
              secureTextEntry
              value={passwords.newPassword}
              onChangeText={(value) => updatePassword('newPassword', value)}
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Must be at least 6 characters long
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              placeholderTextColor="#666"
              secureTextEntry
              value={passwords.confirmPassword}
              onChangeText={(value) => updatePassword('confirmPassword', value)}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.saveButton, 
              isLoading && styles.saveButtonDisabled
            ]}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.saveButtonText}>Changing Password...</Text>
            ) : (
              <>
                <Ionicons name="lock-closed" size={20} color="#1a1a1a" />
                <Text style={styles.saveButtonText}>Change Password</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Password Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Password Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Use at least 8 characters</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Include numbers and symbols</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Avoid common words or phrases</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Don't reuse old passwords</Text>
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
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: '#f5c518',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 18,
  },
  formSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  helperText: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: '#f5c518',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#666',
  },
  saveButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tipsSection: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
  },
  tipsTitle: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
});