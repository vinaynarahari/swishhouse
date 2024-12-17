import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { theme } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import EventCalendar from './EventCalendar';
import AddEvent from '../components/AddEvents';
import Icon from '../assets/icons';
import { useRouter } from 'expo-router';

import Profile from './profile';
import Community from './community';

const Home = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('calendar'); 
  const [refresh, setRefresh] = useState(false);

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setAuth(null); 
      router.replace('welcome'); 
    } catch (error) {
      Alert.alert('Sign out', 'Error signing out!');
    }
  };

  const handleEventAdded = () => {
    setRefresh(!refresh); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <EventCalendar key={refresh} />;
      case 'profile':
        return <Profile />; 
      case 'notifications':
        return <Text style={styles.content}>Placeholder</Text>;
      case 'community':
        return <Community />;
      default:
        return <EventCalendar key={refresh} />;
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Swish House</Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={onLogout}>
              <Icon name="logout" size={26} strokeWidth={1.6} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.contentContainer, { flex: 1 }]}>
          {renderContent()}
        </View>

        {/* Add Event Button */}
        <AddEvent onEventAdded={handleEventAdded} />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Pressable onPress={() => setActiveTab('calendar')}>
            <Icon name="calender" size={26} strokeWidth={1.6} />
          </Pressable>
          <Pressable onPress={() => setActiveTab('community')}>
            <Icon name="group" size={26} strokeWidth={1.6} />
          </Pressable>
          <Pressable onPress={() => setActiveTab('notifications')}>
            <Icon name="notif" size={26} strokeWidth={1.6} />
          </Pressable>
          <Pressable onPress={() => setActiveTab('profile')}>
            <Icon name="user" size={26} strokeWidth={1.6} />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between', 
  },
  title: {
    color: theme.colors.textLight,
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1, 
    padding: 20,
  },
  content: {
    color: theme.colors.textLight,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default Home;
