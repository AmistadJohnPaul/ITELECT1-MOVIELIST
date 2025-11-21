// app/Settings/AboutApp.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking, 
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AboutApp() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState('');

  const developers = [
    { name: 'Krishia Mae M. Raro', role: 'Lead Developer' },
    { name: 'John Paul Amistad', role: 'Frontend Developer' },
    { name: 'Dyrow Rave Pinero', role: 'UI/UX Designer' },
    { name: 'Antonett Pracullos', role: 'Backend Developer' },
    { name: 'James Palatan', role: 'Project Manager' },
    { name: 'Ghinserge Garcia', role: 'QA Engineer' },
    { name: 'Ronel Gajelan', role: 'DevOps Engineer' },
    { name: 'Paula Faye Vallecera', role: 'Content Strategist' },
    { name: 'Rhea Mae Lachica', role: 'Mobile Developer' },
  ];

  const features = [
    'Discover trending movies and series',
    'Personalized watchlist management',
    'Multi-language support',
    'Safehouse exclusive content',
    'User-friendly interface',
    'Regular content updates'
  ];

  const safeOpenURL = async (url, fallbackMessage) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', fallbackMessage);
      }
    } catch (error) {
      Alert.alert('Error', fallbackMessage);
    }
  };

  const openWebsite = () => {
    safeOpenURL('https://vionix.com', 'Cannot open website. Please visit vionix.com manually.');
  };

  const showPrivacyPolicy = () => {
    setCurrentModal('privacy');
    setModalVisible(true);
  };

  const showTerms = () => {
    setCurrentModal('terms');
    setModalVisible(true);
  };

  const contactSupport = () => {
    safeOpenURL(
      'mailto:support@vionix.com?subject=VIONIX Support', 
      'Cannot open email client. Please email support@vionix.com directly.'
    );
  };

  const privacyContent = `VIONIX PRIVACY POLICY

1. Information We Collect
- Account information (email, username)
- Watch history and preferences
- Device information for optimization

2. How We Use Your Data
- To personalize your experience
- To improve our services
- To provide customer support

3. Data Protection
- We implement security measures to protect your data
- We don't sell your personal information to third parties
- Your data is stored securely on our servers

4. Your Rights
- Access your personal data
- Request data deletion
- Opt-out of marketing communications

5. Contact Us
For privacy concerns, contact: privacy@vionix.com

Last Updated: ${new Date().toLocaleDateString()}`;

  const termsContent = `VIONIX TERMS & CONDITIONS

1. Acceptance of Terms
By using Vionix, you agree to these terms and conditions.

2. User Accounts
- You must be at least 13 years old to use this service
- You are responsible for maintaining account security
- One account per user is permitted

3. Content Usage
- All content is for personal, non-commercial use only
- No redistribution or public screening of content
- Respect all copyright laws

4. Subscription & Payments
- Free tier includes basic access
- Premium features may require subscription
- Payments are non-refundable unless required by law

5. Termination
We reserve the right to terminate accounts that violate these terms.

Last Updated: ${new Date().toLocaleDateString()}`;

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {currentModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.modalText}>
              {currentModal === 'privacy' ? privacyContent : termsContent}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#f5c518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About VIONIX</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo and Basic Info */}
        <View style={styles.appHeader}>
          <View style={styles.logoContainer}>
            <Ionicons name="film" size={50} color="#f5c518" />
          </View>
          <Text style={styles.title}>VIONIX</Text>
          <Text style={styles.tagline}>Your Cinematic Universe</Text>
          <Text style={styles.version}>Version 1.2.0 • Build 2024.01</Text>
        </View>

        {/* App Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About VIONIX</Text>
          <Text style={styles.description}>
            VIONIX is a premium mobile streaming platform that brings the cinematic experience 
            directly to your fingertips. Our mission is to provide exceptional entertainment 
            through curated content, intuitive design, and cutting-edge technology.
          </Text>
          <Text style={styles.description}>
            Experience the future of mobile entertainment with personalized recommendations, 
            exclusive Safehouse screenings, and a seamless viewing experience across all your devices.
          </Text>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color="#f5c518" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Development Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Development Team</Text>
          <Text style={styles.teamDescription}>
            VIONIX was brought to life by a dedicated team of professionals committed to 
            delivering exceptional user experiences:
          </Text>
          <View style={styles.teamList}>
            {developers.map((dev, index) => (
              <View key={index} style={styles.teamMember}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{dev.name}</Text>
                  <Text style={styles.memberRole}>{dev.role}</Text>
                </View>
                <View style={styles.roleIndicator} />
              </View>
            ))}
          </View>
        </View>

        {/* Technical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Information</Text>
          <View style={styles.techGrid}>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Platform</Text>
              <Text style={styles.techValue}>React Native</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Framework</Text>
              <Text style={styles.techValue}>Expo SDK 49+</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Last Updated</Text>
              <Text style={styles.techValue}>December 2024</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Compatibility</Text>
              <Text style={styles.techValue}>iOS & Android</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            onPress={contactSupport}
            style={[styles.actionBtn, styles.primaryBtn]}
          >
            <Ionicons name="mail-outline" size={20} color="#1a1a1a" style={styles.btnIcon} />
            <Text style={[styles.actionText, styles.primaryText]}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openWebsite}
            style={[styles.actionBtn, styles.secondaryBtn]}
          >
            <Ionicons name="globe-outline" size={20} color="#f5c518" style={styles.btnIcon} />
            <Text style={[styles.actionText, styles.secondaryText]}>Visit Website</Text>
          </TouchableOpacity>

          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={showPrivacyPolicy}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.legalSeparator}>•</Text>
            <TouchableOpacity onPress={showTerms}>
              <Text style={styles.legalLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            © 2024 VIONIX Studios.{'\n'}
            All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {renderModal()}
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
    marginBottom: 20 
  },
  headerTitle: { 
    color: '#f5c518', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  content: { 
    paddingBottom: 40 
  },
  appHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 25,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f5c518',
  },
  title: { 
    color: '#f5c518', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 5,
    letterSpacing: 2,
  },
  tagline: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  version: { 
    color: '#888', 
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: { 
    color: '#f5c518', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15,
  },
  description: { 
    color: '#fff', 
    fontSize: 15, 
    lineHeight: 22, 
    marginBottom: 12,
  },
  teamDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  featuresList: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  teamList: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 15,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  memberRole: {
    color: '#f5c518',
    fontSize: 13,
  },
  roleIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f5c518',
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  techItem: {
    width: '48%',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  techLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  techValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#f5c518',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#f5c518',
  },
  btnIcon: {
    marginRight: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#1a1a1a',
  },
  secondaryText: {
    color: '#f5c518',
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  legalLink: {
    color: '#f5c518',
    fontSize: 14,
    fontWeight: '500',
  },
  legalSeparator: {
    color: '#f5c518',
    marginHorizontal: 15,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  copyright: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
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
    padding: 0,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    color: '#f5c518',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
});