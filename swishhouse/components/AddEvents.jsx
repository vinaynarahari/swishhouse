import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Text, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

const AddEvent = ({ onEventAdded }) => {
  const { user } = useAuth(); // Get the authenticated user's info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');

  // Check if the user is an admin
  if (user?.role !== 'admin') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}></Text>
      </View>
    );
  }

  const addEvent = async () => {
    if (!title || !description || !startTime || !endTime || !imageUrl || !location) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const { error } = await supabase.from('events').insert([
      {
        title,
        description,
        start_time: new Date(startTime),
        end_time: new Date(endTime),
        user_id: user.id,
        image_url: imageUrl,
        location: location,
        
      },
    ]);

    if (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'Failed to add event. Check console for details.');
    } else {
      Alert.alert('Success', 'Event added!');
      if (onEventAdded) onEventAdded();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <TextInput
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <TextInput
        placeholder="Location"
        onChangeText={setLocation}
        value={location}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <TextInput
        placeholder="Start Time (YYYY-MM-DDTHH:MM:SS)"
        onChangeText={setStartTime}
        value={startTime}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <TextInput
        placeholder="End Time (YYYY-MM-DDTHH:MM:SS)"
        onChangeText={setEndTime}
        value={endTime}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <TextInput
        placeholder="Image URL (from Supabase)"
        onChangeText={setImageUrl}
        value={imageUrl}
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
      />
      <Button title="Add Event" onPress={addEvent} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    color: theme.colors.textLight,
    borderColor: theme.colors.textLight,
  },
  text: {
    color: theme.colors.textLight,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddEvent;