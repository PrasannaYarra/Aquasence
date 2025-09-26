import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Phone, Globe, Palette, Sun, Moon, Monitor, HelpCircle, MessageCircle, LogOut, Save, Edit3 } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [themePreference, setThemePreference] = useState('system');
  
  // User profile data (editable)
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Rajesh Kumar',
    designation: 'Senior Hydrogeologist',
    governmentId: 'GW2024001', // Non-editable
    phoneNumber: '+91 98765 43210' // Non-editable
  });

  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleLanguageChange = () => {
    const newLang = language === 'English' ? 'Hindi' : 'English';
    setLanguage(newLang);
    Alert.alert('Success', `Language changed to ${newLang}`);
  };

  const handleThemeChange = (theme) => {
    setThemePreference(theme);
    if (theme === 'dark') {
      setIsDarkMode(true);
    } else if (theme === 'light') {
      setIsDarkMode(false);
    }
    Alert.alert('Success', `Theme changed to ${theme} mode`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Logged out successfully', [
              {
                text: 'OK',
                onPress: () => router.replace('/auth')
              }
            ]);
          }
        }
      ]
    );
  };

  const showContactInfo = () => {
    Alert.alert(
      'Support Contact',
      'For technical support and assistance:\n\nPhone: +91 11 2611 2345\nEmail: support@aquasense.gov.in\n\nAvailable: Mon-Fri, 9:00 AM - 6:00 PM IST'
    );
  };

  const showHelpContent = (section) => {
    const helpContent = {
      'general': {
        title: 'General App Info',
        content: 'AquaSense is a comprehensive groundwater monitoring system that collects real-time data from DWLR (Data Water Level Recorder) stations across India. The app provides:\n\n• Real-time groundwater level monitoring\n• Comprehensive reporting and analytics\n• Alert systems for critical water levels\n• Historical data analysis\n\nThis system helps government officials make informed decisions about water resource management.'
      },
      'data': {
        title: 'Data & Measurements',
        content: 'Key Terms:\n\n• DWLR: Data Water Level Recorder - automated monitoring equipment\n• BGL: Below Ground Level - depth measurement from surface\n• Recharge Rate: Speed at which groundwater is replenished\n• Status Classifications:\n  - Normal: <5m BGL (Green)\n  - Caution: 5-10m BGL (Yellow)\n  - Critical: >10m BGL (Red)\n\nData Updates: Every 6 hours from monitoring stations\nReport Formats: PDF, CSV, Excel supported'
      },
      'usage': {
        title: 'App Usage Guide',
        content: 'Navigation:\n\n• Dashboard: Overview of national groundwater status\n• Stations: Browse and filter monitoring stations\n• Reports: Generate custom reports and analysis\n• Settings: Manage preferences and profile\n\nFeatures:\n• Interactive map with station pins\n• Filter by state, district, or status\n• Export data in multiple formats\n• Schedule automated reports\n• Real-time alerts and notifications'
      },
      'troubleshooting': {
        title: 'Troubleshooting',
        content: 'Common Issues & Solutions:\n\n• App not loading:\n  - Check internet connection\n  - Force close and reopen app\n  - Restart device if needed\n\n• Data appears incorrect:\n  - Data is updated every 6 hours\n  - Check "Last Updated" timestamp\n  - Contact support if persistent\n\n• Export not working:\n  - Ensure sufficient storage space\n  - Check app permissions\n  - Try smaller date ranges\n\n• Login issues:\n  - Verify Government ID and password\n  - Check OTP delivery\n  - Use "Forgot Password" if needed'
      }
    };

    const content = helpContent[section];
    Alert.alert(content.title, content.content);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ 
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor: '#E5E7EB'
        }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>
            Settings
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Manage your profile and app preferences
          </Text>
        </View>

        {/* Edit Profile Section */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
              Profile Information
            </Text>
            {!isEditing ? (
              <TouchableOpacity
                style={{
                  backgroundColor: '#3B82F6',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => setIsEditing(true)}
              >
                <Edit3 size={16} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                  Edit
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#10B981',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 8
                  }}
                  onPress={handleSaveProfile}
                >
                  <Save size={16} color="#FFFFFF" />
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EF4444',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8
                  }}
                  onPress={handleCancelEdit}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB'
          }}>
            {/* Name Field */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Full Name
              </Text>
              {isEditing ? (
                <TextInput
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: '#1F2937'
                  }}
                  value={editedProfile.name}
                  onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
                  placeholder="Enter your full name"
                />
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <User size={16} color="#6B7280" />
                  <Text style={{ fontSize: 14, color: '#1F2937', marginLeft: 8 }}>
                    {userProfile.name}
                  </Text>
                </View>
              )}
            </View>

            {/* Designation Field */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Designation
              </Text>
              {isEditing ? (
                <TextInput
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: '#1F2937'
                  }}
                  value={editedProfile.designation}
                  onChangeText={(text) => setEditedProfile({...editedProfile, designation: text})}
                  placeholder="Enter your designation"
                />
              ) : (
                <Text style={{ fontSize: 14, color: '#1F2937' }}>
                  {userProfile.designation}
                </Text>
              )}
            </View>

            {/* Government ID (Non-editable) */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Government ID (Cannot be changed)
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>
                {userProfile.governmentId}
              </Text>
            </View>

            {/* Phone Number (Non-editable) */}
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Phone Number (Cannot be changed)
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Phone size={16} color="#6B7280" />
                <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 8 }}>
                  {userProfile.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>
            Support
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={showContactInfo}
          >
            <MessageCircle size={20} color="#3B82F6" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#1F2937' }}>
                Contact Support
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>
                Get help with technical issues
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help Center */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>
            Help Center
          </Text>
          
          {[
            { key: 'general', title: 'General App Info', desc: 'Learn about AquaSense features' },
            { key: 'data', title: 'Data & Measurements', desc: 'Understanding DWLR and water metrics' },
            { key: 'usage', title: 'App Usage', desc: 'Navigate and use core features' },
            { key: 'troubleshooting', title: 'Troubleshooting', desc: 'Common issues and solutions' }
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                padding: 16,
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => showHelpContent(item.key)}
            >
              <HelpCircle size={20} color="#6B7280" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937' }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  {item.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* User Preferences */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>
            Preferences
          </Text>
          
          {/* Language Toggle */}
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 16,
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Globe size={20} color="#6B7280" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937' }}>
                  Language
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>
                  Current: {language}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#3B82F6',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6
              }}
              onPress={handleLanguageChange}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500' }}>
                Switch to {language === 'English' ? 'Hindi' : 'English'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Theme Selection */}
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Palette size={20} color="#6B7280" />
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937', marginLeft: 12 }}>
                Theme Preference
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[
                { key: 'light', label: 'Light', icon: Sun },
                { key: 'dark', label: 'Dark', icon: Moon },
                { key: 'system', label: 'System', icon: Monitor }
              ].map((theme) => (
                <TouchableOpacity
                  key={theme.key}
                  style={{
                    flex: 1,
                    backgroundColor: themePreference === theme.key ? '#3B82F6' : '#F9FAFB',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginHorizontal: 2,
                    borderWidth: 1,
                    borderColor: themePreference === theme.key ? '#3B82F6' : '#E5E7EB'
                  }}
                  onPress={() => handleThemeChange(theme.key)}
                >
                  <theme.icon 
                    size={20} 
                    color={themePreference === theme.key ? '#FFFFFF' : '#6B7280'} 
                  />
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: themePreference === theme.key ? '#FFFFFF' : '#6B7280',
                    marginTop: 4
                  }}>
                    {theme.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#EF4444',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#FFFFFF" />
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}