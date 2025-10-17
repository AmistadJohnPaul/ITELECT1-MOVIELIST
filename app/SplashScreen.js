// MovieList/app/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function SplashScreen({ onFinish = () => {} }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Sequence: Fade in + scale, wait, fade out
    Animated.sequence([
      // Fade in + zoom
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 1500, // fade in faster
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      // Stay fully visible
      Animated.delay(2000), // stay 2s
      // Fade out
      Animated.timing(fade, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish(); // call parent callback when done
    });
  }, [fade, scale, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity: fade, transform: [{ scale }] }]}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
        <Text style={styles.title}>VIONIX</Text>
        <Text style={styles.subtitle}>Enter the Cinematic Underworld</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: { alignItems: 'center' },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 999,
    borderWidth: 2.5,
    borderColor: '#f5c518',
    marginBottom: 20,
  },
  title: {
    color: '#f5c518',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 8,
    textShadowColor: 'rgba(245,197,24,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
});