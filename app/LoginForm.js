// app/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase/FirebaseConfig"; // Your Firebase config

export default function LoginScreen({ navigation }) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      // Firebase Auth sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) throw new Error("User data not found!");

      const userData = userDoc.data();

      // Navigate to Profile or Favorites screen with UID
      navigation.replace("Movies", { uid, ...userData });

    } catch (err) {
      Alert.alert("Login Failed", err.message);
      console.log("Login error:", err);
    }
  };

  const handleRegister = () => {
    navigation.replace("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>VIONIX</Text>
      <Text style={styles.subtitle}>Welcome back! Log in to continue.</Text>

      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={styles.highlight}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  logo: { 
    fontSize: 42, 
    color: '#f5c518', 
    fontWeight: '900', 
    letterSpacing: 4, 
    textTransform: 'uppercase', 
    textShadowColor: '#f5c51899', 
    textShadowRadius: 15, 
    marginBottom: 10 
  },
  subtitle: { 
    color: '#888', 
    fontSize: 14, 
    marginBottom: 40, 
    letterSpacing: 1 
  },
  formBox: { 
    width: '90%', 
    backgroundColor: '#111', 
    borderRadius: 15, 
    padding: 25, 
    shadowColor: '#f5c518', 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 0 }, 
    shadowRadius: 15, 
    borderWidth: 1, 
    borderColor: '#222' 
  },
  input: { 
    height: 50, 
    backgroundColor: '#1a1a1a', 
    borderRadius: 10, 
    color: '#fff', 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#333', 
    fontSize: 16 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 25 
  },
  toggleText: { 
    color: '#f5c518', 
    fontSize: 20, 
    marginLeft: 10 
  },
  button: { 
    backgroundColor: '#f5c518', 
    borderRadius: 10, 
    paddingVertical: 14, 
    alignItems: 'center', 
    shadowColor: '#f5c518', 
    shadowOpacity: 0.6, 
    shadowRadius: 12 
  },
  buttonText: { 
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  linkText: { 
    color: '#aaa', 
    fontSize: 14, 
    marginTop: 30, 
    textAlign: 'center' 
  },
  highlight: { 
    color: '#f5c518', 
    fontWeight: '600' 
  },
});
