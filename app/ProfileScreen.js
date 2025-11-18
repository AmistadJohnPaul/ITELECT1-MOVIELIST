// app/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    profileImage: 'https://via.placeholder.com/120',
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const profileImage = await AsyncStorage.getItem('userProfileImage');

      setUser({
        name: name || 'Guest User',
        email: email || 'guest@example.com',
        profileImage: profileImage || 'https://via.placeholder.com/120',
      });
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  // Request Android permissions
  const requestAndroidPermission = async (permissionType) => {
    try {
      let permission;
      if (permissionType === 'camera') {
        permission = PermissionsAndroid.PERMISSIONS.CAMERA;
      } else if (permissionType === 'storage') {
        permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const granted = await PermissionsAndroid.request(permission, {
        title: `${permissionType === 'camera' ? 'Camera' : 'Storage'} Permission`,
        message: `This app needs access to your ${permissionType} to function properly.`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openEditModal = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    });
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleSaveProfile = async () => {
    try {
      if (!editForm.name.trim() || !editForm.email.trim()) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editForm.email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      setIsLoading(true);

      await AsyncStorage.setItem('userName', editForm.name);
      await AsyncStorage.setItem('userEmail', editForm.email);
      await AsyncStorage.setItem('userProfileImage', editForm.profileImage);

      setUser({
        name: editForm.name,
        email: editForm.email,
        profileImage: editForm.profileImage,
      });

      closeEditModal();
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save user data', error);
      Alert.alert('Error', 'Failed to save profile changes');
    } finally {
      setIsLoading(false);
    }
  };

  const selectImageFromGallery = async () => {
    console.log('Opening gallery...');
    
    // Request permission for Android
    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermission('storage');
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Need storage permission to access gallery');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      console.log('Gallery Response:', response);
      
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error Code: ', response.errorCode);
        console.log('ImagePicker Error Message: ', response.errorMessage);
        Alert.alert('Error', `Failed to pick image: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Selected image URI:', imageUri);
        
        setImageLoading(true);
        setEditForm({
          ...editForm,
          profileImage: imageUri,
        });
        
        setTimeout(() => {
          setImageLoading(false);
          Alert.alert('Success', 'Profile picture updated from gallery!');
        }, 500);
      } else {
        console.log('Unexpected response:', response);
      }
    });
  };

  const takePhoto = async () => {
    console.log('Opening camera...');
    
    // Request permission for Android
    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermission('camera');
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Need camera permission to take photos');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
      saveToPhotos: true,
      cameraType: 'back',
    };

    launchCamera(options, (response) => {
      console.log('Camera Response:', response);
      
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error Code: ', response.errorCode);
        console.log('Camera Error Message: ', response.errorMessage);
        Alert.alert('Error', `Failed to take photo: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Camera image URI:', imageUri);
        
        setImageLoading(true);
        setEditForm({
          ...editForm,
          profileImage: imageUri,
        });
        
        setTimeout(() => {
          setImageLoading(false);
          Alert.alert('Success', 'Photo taken successfully!');
        }, 500);
      } else {
        console.log('Unexpected camera response:', response);
      }
    });
  };

  const handleImageOption = () => {
    Alert.alert(
      'Choose Profile Picture',
      'Select an option to set your profile picture',
      [
        {
          text: '📷 Take Photo',
          onPress: takePhoto,
        },
        {
          text: '🖼️ Choose from Gallery',
          onPress: selectImageFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const useDefaultImage = () => {
    setEditForm({
      ...editForm,
      profileImage: 'https://via.placeholder.com/120',
    });
    Alert.alert('Success', 'Default profile picture set!');
  };

  const handleImageError = (error) => {
    console.log('Image loading error:', error);
    setEditForm({
      ...editForm,
      profileImage: 'https://via.placeholder.com/120',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>👤 Hello, {user.name}!</Text>

      <Image 
        source={{ uri: user.profileImage }} 
        style={styles.profileImage}
        onError={() => console.log('Main profile image failed to load')}
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openEditModal}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              
              {/* Profile Image Section */}
              <View style={styles.imageSection}>
                <View style={styles.imageWrapper}>
                  {imageLoading ? (
                    <View style={[styles.previewImage, styles.loadingImage]}>
                      <ActivityIndicator size="large" color="#f5c518" />
                      <Text style={styles.loadingText}>Loading Image...</Text>
                    </View>
                  ) : (
                    <Image 
                      source={{ uri: editForm.profileImage }} 
                      style={styles.previewImage}
                      onError={handleImageError}
                    />
                  )}
                </View>
                
                <View style={styles.imageButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.imageButton, styles.primaryImageButton]} 
                    onPress={handleImageOption}
                    disabled={imageLoading}
                  >
                    <Text style={styles.primaryImageButtonText}>
                      {imageLoading ? 'Loading...' : '📷 Choose Photo'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.imageButton, styles.secondaryImageButton]} 
                    onPress={useDefaultImage}
                    disabled={imageLoading}
                  >
                    <Text style={styles.secondaryImageButtonText}>🔄 Default</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.imageHelpText}>
                  Tap "Choose Photo" to take a picture or select from gallery
                </Text>
              </View>
              
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={styles.input}
                value={editForm.name}
                onChangeText={(text) => setEditForm({...editForm, name: text})}
                placeholder="Enter your name"
                placeholderTextColor="#888"
              />
              
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={editForm.email}
                onChangeText={(text) => setEditForm({...editForm, email: text})}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={styles.label}>Profile Image URL</Text>
              <TextInput
                style={styles.input}
                value={editForm.profileImage}
                onChangeText={(text) => setEditForm({...editForm, profileImage: text})}
                placeholder="Or enter image URL manually"
                placeholderTextColor="#888"
                autoCapitalize="none"
              />

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={closeEditModal}
                  disabled={isLoading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]} 
                  onPress={handleSaveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#1a1a1a" size="small" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    color: '#f5c518',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#f5c518',
    marginBottom: 20,
  },
  name: {
    color: '#f5c518',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#f5c518',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    color: '#f5c518',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#f5c518',
    marginBottom: 15,
  },
  loadingImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
  },
  loadingText: {
    color: '#f5c518',
    marginTop: 8,
    fontSize: 12,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  imageButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryImageButton: {
    backgroundColor: '#f5c518',
    borderColor: '#f5c518',
  },
  secondaryImageButton: {
    backgroundColor: 'transparent',
    borderColor: '#f5c518',
  },
  primaryImageButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryImageButtonText: {
    color: '#f5c518',
    fontWeight: '600',
    fontSize: 14,
  },
  imageHelpText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  label: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  saveButton: {
    backgroundColor: '#f5c518',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});