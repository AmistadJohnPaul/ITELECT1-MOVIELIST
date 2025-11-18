// app/Settings/PrivacySecurity.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PrivacySecurity() {
  const navigation = useNavigation();
  const [lockApp, setLockApp] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(true);

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will allow you to change your password.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Lock App with Passcode</Text>
          <Switch
            value={lockApp}
            onValueChange={(val) => setLockApp(val)}
            thumbColor={lockApp ? '#f5c518' : '#ccc'}
            trackColor={{ false: '#555', true: '#333' }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>Share Usage Data</Text>
          <Switch
            value={dataSharing}
            onValueChange={(val) => setDataSharing(val)}
            thumbColor={dataSharing ? '#f5c518' : '#ccc'}
            trackColor={{ false: '#555', true: '#333' }}
          />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
          <Text style={styles.actionText}>Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={22} color="#777" />
        </TouchableOpacity>

        <Text style={styles.sectionText}>
          Manage your privacy settings, data sharing, and security features to protect your account.
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
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  actionText: { color: '#f5c518', fontSize: 16, fontWeight: '500' },
  sectionText: { color: '#fff', fontSize: 16, lineHeight: 22, marginTop: 10 },
});
