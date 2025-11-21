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
  PermissionsAndroid,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    profileImage: 'https://via.placeholder.com/120',
    joinDate: new Date().toISOString(),
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const profileImage = await AsyncStorage.getItem('userProfileImage');
      const joinDate = await AsyncStorage.getItem('userJoinDate') || new Date().toISOString();

      setUser({
        name: name || 'Guest User',
        email: email || 'guest@example.com',
        profileImage: profileImage || 'https://via.placeholder.com/120',
        joinDate: joinDate,
      });

      // Store join date if not exists
      if (!await AsyncStorage.getItem('userJoinDate')) {
        await AsyncStorage.setItem('userJoinDate', joinDate);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completion = 0;
    if (user.name !== 'Guest User') completion += 40;
    if (user.email !== 'guest@example.com') completion += 30;
    if (user.profileImage !== 'https://via.placeholder.com/120') completion += 30;
    return completion;
  };

  // Format join date
  const formatJoinDate = () => {
    const date = new Date(user.joinDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
        ...user,
        name: editForm.name,
        email: editForm.email,
        profileImage: editForm.profileImage,
      });

      closeEditModal();
      
      // Success animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      Alert.alert('🎉 Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save user data', error);
      Alert.alert('Error', 'Failed to save profile changes');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced image selection with better error handling
  const selectImageFromGallery = async () => {
    try {
      setImageLoading(true);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Needed", "Please allow gallery access in settings to choose photos.");
        setImageLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true,
        aspect: [1, 1],
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setEditForm(prev => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (err) {
      console.error("Gallery error:", err);
      Alert.alert("Error", "Unable to access gallery. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setImageLoading(true);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Needed", "Please allow camera access in settings to take photos.");
        setImageLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.9,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setEditForm(prev => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (err) {
      console.error("Camera error:", err);
      Alert.alert("Error", "Unable to access camera. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleImageOption = () => {
    Alert.alert(
      'Choose Profile Picture',
      'How would you like to set your profile picture?',
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
          text: '🎨 Use Default',
          onPress: useDefaultImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const useDefaultImage = () => {
    setEditForm(prev => ({
      ...prev,
      profileImage: 'https://via.placeholder.com/120',
    }));
  };

  const handleImageError = () => {
    setEditForm(prev => ({
      ...prev,
      profileImage: 'https://via.placeholder.com/120',
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove(['userName', 'userEmail', 'userProfileImage']);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Replace with your actual login screen name
            });
          },
        },
      ]
    );
  };

  const ProfileStat = ({ icon, label, value }) => (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={26} color="#f5c518" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Profile Completion */}
        <View style={styles.completionContainer}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercentage}>{calculateProfileCompletion()}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${calculateProfileCompletion()}%` }
              ]} 
            />
          </View>
          <Text style={styles.completionHint}>
            Complete your profile by adding a photo and personal details
          </Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.profileImage}
              onError={() => console.log('Profile image load failed')}
            />
            <View style={styles.onlineIndicator} />
          </View>
          
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          
          <View style={styles.statsContainer}>
            <ProfileStat icon="📅" label="Member since" value={formatJoinDate()} />
            <ProfileStat icon="⭐" label="Status" value="Premium" />
            <ProfileStat icon="🎬" label="Movies watched" value="24" />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={openEditModal}>
            <Ionicons name="create-outline" size={20} color="#1a1a1a" />
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#f5c518" />
            <Text style={styles.secondaryButtonText}>Logout</Text>
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
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Edit Profile</Text>
                  <TouchableOpacity onPress={closeEditModal} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                
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
                  
                  <TouchableOpacity 
                    style={styles.imageChangeButton} 
                    onPress={handleImageOption}
                    disabled={imageLoading}
                  >
                    <Ionicons name="camera" size={20} color="#fff" />
                    <Text style={styles.imageChangeButtonText}>
                      {imageLoading ? 'Loading...' : 'Change Photo'}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.label}>Display Name *</Text>
                <TextInput
                  style={styles.input}
                  value={editForm.name}
                  onChangeText={(text) => setEditForm({...editForm, name: text})}
                  placeholder="Enter your name"
                  placeholderTextColor="#888"
                />
                
                <Text style={styles.label}>Email Address *</Text>
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
                      <>
                        <Ionicons name="checkmark" size={18} color="#1a1a1a" />
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a',
  },
  animatedContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#00000080',
    marginTop:35,
  },
  headerTitle: {
    color: '#f5c518',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:35,
  },
  headerPlaceholder: {
    width: 40,
  },
  completionContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  completionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  completionPercentage: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#3a3a3a',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f5c518',
    borderRadius: 3,
  },
  completionHint: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  profileCard: {
    backgroundColor: '#2a2a2a',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f5c518',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2a2a2a',
  },
  name: {
    color: '#f5c518',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#f5c518',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    gap: 8,
  },
  primaryButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f5c518',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#f5c518',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#f5c518',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f5c518',
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
  imageChangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  imageChangeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  label: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#3a3a3a',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
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