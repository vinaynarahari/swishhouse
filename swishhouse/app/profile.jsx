import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchUserData();
    })();
  }, [supabase.auth]);

  const fetchUserData = async () => {
    setError(null);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, image, bio, email, address, phoneNumber')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (!data) setError('No user data found');
      else setUserData(data);
    } catch (error) {
      setError(`Error fetching user data: ${error.message}`);
      console.error('Error:', error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userData.image || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="person-outline" title="Bio" content={userData.bio || 'No bio available'} />
        <InfoItem icon="location-outline" title="Address" content={userData.address || 'No address provided'} />
        <InfoItem icon="call-outline" title="Phone" content={userData.phoneNumber || 'No phone number available'} />
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoItem = ({ icon, title, content }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoHeader}>
      <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.infoIcon} />
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
    <Text style={styles.infoContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: theme.colors.primaryDark,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  name: {
    color: theme.colors.textLight,
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    marginTop: 10,
  },
  email: {
    color: theme.colors.gray,
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
  },
  infoItem: {
    backgroundColor: theme.colors.darkLight,
    borderRadius: theme.radius.lg,
    padding: 15,
    marginBottom: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: theme.fonts.semibold,
  },
  infoContent: {
    color: theme.colors.textLight,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: theme.colors.textDark,
    fontSize: 18,
    fontWeight: theme.fonts.bold,
  },
  loadingText: {
    color: theme.colors.textLight,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    color: theme.colors.primary,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Profile;