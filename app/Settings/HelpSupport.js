// app/Settings/HelpSupport.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking, 
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupport() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState({ title: '', content: '' });
  const [reportDescription, setReportDescription] = useState('');

  const faqContent = [
    {
      question: "How do I create an account?",
      answer: "Go to the Profile screen and tap on 'Login'. You can create a new account using your email address."
    },
    {
      question: "How can I add movies to my watchlist?",
      answer: "Simply tap on any movie in your watchlist section and use the 'Add to Watchlist' button."
    },
    {
      question: "What are Safehouse Screenings?",
      answer: "Safehouse Screenings are exclusive content available only to registered users with full account access."
    },
    {
      question: "Can I download movies for offline viewing?",
      answer: "Currently, we don't support offline downloads. All content is streamed online."
    },
    {
      question: "How do I change the app language?",
      answer: "Go to Settings > Language and select your preferred language from the available options."
    }
  ];

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

  const supportOptions = [
    { 
      id: 1, 
      title: 'FAQ', 
      action: () => {
        setCurrentContent({
          title: 'Frequently Asked Questions',
          content: ''
        });
        setModalVisible(true);
      } 
    },
    { 
      id: 2, 
      title: 'Contact Us', 
      action: async () => {
        try {
          await Linking.openURL('mailto:support@vionix.com?subject=VIONIX Support Request&body=Please describe your issue:');
        } catch (err) {
          Alert.alert('Error', 'Could not open email client. Please email us directly at support@vionix.com');
        }
      } 
    },
    { 
      id: 3, 
      title: 'Report a Problem', 
      action: () => {
        // Always use custom modal for reporting - no Alert.prompt
        setReportDescription('');
        setReportModalVisible(true);
      } 
    },
    { 
      id: 4, 
      title: 'Terms & Conditions', 
      action: () => {
        setCurrentContent({
          title: 'Terms & Conditions',
          content: termsContent
        });
        setModalVisible(true);
      } 
    },
    { 
      id: 5, 
      title: 'Privacy Policy', 
      action: () => {
        setCurrentContent({
          title: 'Privacy Policy',
          content: privacyContent
        });
        setModalVisible(true);
      } 
    },
  ];

  const submitReport = () => {
    if (reportDescription && reportDescription.length > 10) {
      Alert.alert(
        'Thank You!',
        'Your report has been submitted. We will review it and get back to you soon.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setReportModalVisible(false);
              setReportDescription('');
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Please provide a detailed description of the problem (at least 10 characters).');
    }
  };

  const handleCallSupport = async () => {
    try {
      await Linking.openURL('tel:+18005551234');
    } catch (err) {
      Alert.alert('Error', 'Could not make a phone call. Please call 1-800-555-1234');
    }
  };

  const handleLiveChat = () => {
    Alert.alert(
      'Live Chat',
      'Our live chat service is available Monday-Friday, 9AM-6PM EST.\n\nWould you like to be notified when an agent is available?',
      [
        { text: 'No Thanks', style: 'cancel' },
        { 
          text: 'Notify Me', 
          onPress: () => {
            Alert.alert('Success', 'We will notify you when live chat becomes available.');
          }
        }
      ]
    );
  };

  const renderContentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{currentContent.title}</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {currentContent.title === 'Frequently Asked Questions' ? (
              faqContent.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: {faq.question}</Text>
                  <Text style={styles.faqAnswer}>A: {faq.answer}</Text>
                  {index < faqContent.length - 1 && <View style={styles.separator} />}
                </View>
              ))
            ) : (
              <Text style={styles.modalText}>{currentContent.content}</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderReportModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={reportModalVisible}
      onRequestClose={() => setReportModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Report a Problem</Text>
            <TouchableOpacity 
              onPress={() => setReportModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <Text style={styles.reportDescription}>
              Please describe the issue you're experiencing in detail:
            </Text>
            <TextInput
              style={styles.reportInput}
              multiline
              numberOfLines={6}
              placeholder="Describe the problem here..."
              placeholderTextColor="#666"
              value={reportDescription}
              onChangeText={setReportDescription}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>
              {reportDescription.length}/500 characters
            </Text>
            <TouchableOpacity 
              style={[
                styles.submitButton,
                reportDescription.length < 10 && styles.submitButtonDisabled
              ]}
              onPress={submitReport}
              disabled={reportDescription.length < 10}
            >
              <Text style={styles.submitButtonText}>
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Support Options</Text>
        {supportOptions.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.option} 
            onPress={item.action}
          >
            <Text style={styles.optionText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#777" />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Quick Support</Text>
        <View style={styles.quickSupportRow}>
          <TouchableOpacity style={styles.quickOption} onPress={handleCallSupport}>
            <Ionicons name="call-outline" size={24} color="#f5c518" />
            <Text style={styles.quickOptionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickOption} onPress={handleLiveChat}>
            <Ionicons name="chatbubble-outline" size={24} color="#f5c518" />
            <Text style={styles.quickOptionText}>Live Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickOption}
            onPress={() => Linking.openURL('https://help.vionix.com')}
          >
            <Ionicons name="globe-outline" size={24} color="#f5c518" />
            <Text style={styles.quickOptionText}>Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#f5c518" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Need Immediate Help?</Text>
            <Text style={styles.infoText}>
              Our support team is available 24/7 via email. For urgent matters, use the call option during business hours.
            </Text>
            <Text style={styles.infoDetail}>
              Email: support@vionix.com{'\n'}
              Phone: 1-800-555-1234{'\n'}
              Hours: Mon-Fri, 9AM-6PM EST
            </Text>
          </View>
        </View>
      </ScrollView>

      {renderContentModal()}
      {renderReportModal()}
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
    marginBottom: 20,
  },
  headerTitle: { 
    color: '#f5c518', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  content: { 
    paddingBottom: 40 
  },
  sectionTitle: {
    color: '#f5c518',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  optionText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  quickSupportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  quickOptionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  infoDetail: {
    color: '#888',
    fontSize: 12,
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
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqAnswer: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  // Report Modal Styles
  reportDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  reportInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#444',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  charCount: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#f5c518',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#666',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});