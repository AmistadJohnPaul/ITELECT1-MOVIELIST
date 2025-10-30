// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './app/SplashScreen';
import LoginForm from './app/LoginForm';
import SignUpForm from './app/SignUpForm';
import MovieScreenList from './app/MovieScreenList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // hide default headers
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreenWrapper} />
        <Stack.Screen name="Login" component={LoginFormWrapper} />
        <Stack.Screen name="SignUp" component={SignUpFormWrapper} />
        <Stack.Screen name="Movies" component={MovieScreenList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrappers to navigate after splash/login
function SplashScreenWrapper({ navigation }) {
  return <SplashScreen onFinish={() => navigation.replace('Login')} />;
}

function LoginFormWrapper({ navigation }) {
  return (
    <LoginForm
      onSignUpPress={() => navigation.navigate('SignUp')}
      onLoginPress={() => navigation.replace('Movies')}
    />
  );
}

function SignUpFormWrapper({ navigation }) {
  return <SignUpForm onLoginPress={() => navigation.replace('Login')} />;
}