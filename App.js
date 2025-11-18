// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './app/SplashScreen';
import LoginForm from './app/LoginForm';
import RegisterForm from './app/RegisterForm';
import MovieScreenList from './app/MovieScreenList';
import MovieDetails from './app/MovieDetails';  
import ProfileScreen from './app/ProfileScreen';
import SearchScreen from './app/SearchScreen';
import FavoritesScreen from './app/FavoriteScreen';
import SettingScreen from './app/SettingScreen';
import AboutApp from './app/Settings/AboutApp';
import AccountSettings from './app/Settings/AccountSettings';
import Notifications from './app/Settings/Notifications';
import PrivacySecurity from './app/Settings/PrivacySecurity';
import Language from './app/Settings/Language';
import HelpSupport from './app/Settings/HelpSupport';
// ✅ Import FavoritesProvider
import { FavoritesProvider } from './app/Context/FavoritesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  // Development-only global error catcher to surface full stacks in Metro
  useEffect(() => {
    if (!__DEV__) return;

    try {
      const defaultHandler = global?.ErrorUtils?.getGlobalHandler && global.ErrorUtils.getGlobalHandler();

      if (global?.ErrorUtils?.setGlobalHandler) {
        global.ErrorUtils.setGlobalHandler((error, isFatal) => {
          try {
            console.log('[GlobalErrorHandler] Caught error:', {
              message: error?.message,
              name: error?.name,
              isFatal,
            });
            console.log('[GlobalErrorHandler] Stack:', error?.stack);
          } catch (logErr) {
            console.log('[GlobalErrorHandler] Logging failed', logErr);
          }

          if (typeof defaultHandler === 'function') {
            defaultHandler(error, isFatal);
          }
        });
      }
    } catch (e) {
      console.log('[GlobalErrorHandler] Setup failed', e);
    }

    // Attempt to catch unhandled promise rejections where available
    try {
      const onRejection = (ev) => {
        console.log('[GlobalErrorHandler] UnhandledRejection:', ev?.reason ?? ev);
      };

      if (typeof globalThis?.addEventListener === 'function') {
        globalThis.addEventListener('unhandledrejection', onRejection);
      } else if (typeof process !== 'undefined' && typeof process.on === 'function') {
        process.on('unhandledRejection', (reason) => console.log('[GlobalErrorHandler] unhandledRejection:', reason));
      }
    } catch (e) {
      console.log('[GlobalErrorHandler] unhandledRejection setup failed', e);
    }
  }, []);
  return (
    // ⭐ Wrap the app with FavoritesProvider
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          {/* ✅ Splash wrapped to handle auto-navigation */}
          <Stack.Screen name="Splash" component={SplashScreenWrapper} />

          {/* ✅ Login wrapped to handle navigation to Register or Movies */}
          <Stack.Screen name="Login" component={LoginWrapper} />

          {/* ✅ Register wrapped to navigate back to Login */}
          <Stack.Screen name="Register" component={RegisterFormWrapper} />
          

          <Stack.Screen name="Movies" component={MovieScreenList} />

          <Stack.Screen name="MovieDetails" component={MovieDetails} />

          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

          <Stack.Screen name="SearchScreen" component={SearchScreen} />

          <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />

          <Stack.Screen name="SettingScreen" component={SettingScreen} />

          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          
<Stack.Screen name="Notifications" component={Notifications} />
<Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
<Stack.Screen name="Language" component={Language} />
<Stack.Screen name="HelpSupport" component={HelpSupport} />
<Stack.Screen name="AboutApp" component={AboutApp} />


        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

// ✅ Wrapper for Splash — goes to Login after animation
function SplashScreenWrapper({ navigation }) {
  return <SplashScreen onFinish={() => navigation.replace('Login')} />;
}

// ✅ Wrapper for Login — can navigate to Register or Movies
function LoginWrapper({ navigation }) {
  return (
    <LoginForm
      navigation={navigation}  // ✅ pass navigation here too
      onRegisterPress={() => navigation.navigate('Register')}
      onLoginPress={() => navigation.replace('Movies')}
    />
  );
}


// ✅ Wrapper for Register — can navigate back to Login
function RegisterFormWrapper({ navigation }) {
  return (
    <RegisterForm
      navigation={navigation}    // ✅ pass navigation here
      onLoginPress={() => navigation.replace('Login')}
    />
  );
}

