// app/RegisterForm.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterForm({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Enter a valid email address.');
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters, include 1 uppercase, 1 number, and 1 special character.'
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // ✅ Save user data
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      await AsyncStorage.setItem(
        'userProfileImage',
        'https://via.placeholder.com/120'
      ); // default profile image

      Alert.alert('Success', 'Registered successfully! Logging in...', [
        {
          text: 'OK',
          onPress: () => {
            // Automatically log in after registration
            const user = {
              name: username,
              email,
              profileImage: 'https://via.placeholder.com/120',
            };
            // ✅ Navigate to ProfileScreen (matches App.js name)
            navigation.replace('Login', { user });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#555"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email (e.g. user@example.com)"
        placeholderTextColor="#555"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggleText}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Confirm Password"
          placeholderTextColor="#555"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.toggleText}>
            {showConfirmPassword ? '🙈' : '👁️'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // ✅ Navigate to Login screen (matches App.js name)
          navigation.replace('Login');
        }}
      >
        <Text style={styles.link}>
          Already have an account? <Text style={styles.highlight}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 32, color: '#f5c518', fontWeight: 'bold', marginBottom: 40 },
  input: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '90%', marginBottom: 20 },
  toggleText: { color: '#f5c518', fontSize: 20, marginLeft: 10 },
  button: { width: '90%', backgroundColor: '#f5c518', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  link: { color: '#aaa', marginTop: 20, fontSize: 14 },
  highlight: { color: '#f5c518', fontWeight: '600' },
});
