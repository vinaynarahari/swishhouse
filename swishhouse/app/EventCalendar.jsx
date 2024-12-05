import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useCart } from '../contexts/cartContext'; 

const EventCalendar = ({ refresh }) => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, [refresh]);

  const handleEventPress = (event) => {
    
    router.push({ pathname: '/eventDetail', params: { eventId: event.id } });
  };

  const handleAddToCart = (event) => {
    addToCart(event);
    Alert.alert('Added to Cart', `${event.title} has been added to your cart.`);
  };

  const renderEventCard = ({ item, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100).duration(400)}
      layout={Layout.springify()}
    >
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => handleEventPress(item)} 
      >
        <Image 
          source={{ uri: item.image_url || 'https://via.placeholder.com/300x150' }} 
          style={styles.eventImage} 
        />
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Icon name="event" size={24} color={theme.colors.primary} />
            <Text style={styles.eventTitle}>{item.title}</Text>
          </View>
          <View style={styles.eventBody}>
            <View style={styles.eventTimeContainer}>
              <Icon name="access-time" size={18} color={theme.colors.textLight} />
              <Text style={styles.eventTime}>
                {new Date(item.start_time).toLocaleString()} - {new Date(item.end_time).toLocaleString()}
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={18} color={theme.colors.primary} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)} 
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <Animated.FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        itemLayoutAnimation={Layout.springify()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.dark,
  },
  title: {
    color: theme.colors.textLight,
    fontSize: 28,
    fontWeight: theme.fonts.bold,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 50,
  },
  eventCard: {
    backgroundColor: theme.colors.darkLight,
    borderRadius: theme.radius.md,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    color: theme.colors.textLight,
    fontSize: 20,
    fontWeight: theme.fonts.semibold,
    marginLeft: 12,
  },
  eventBody: {
    marginLeft: 36,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTime: {
    color: theme.colors.gray,
    fontSize: 14,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
    borderRadius: theme.radius.sm,
    padding: 8,
  },
  location: {
    color: theme.colors.textLight,
    fontSize: 14,
    marginLeft: 8,
  },
  addToCartButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    padding: 10,
    marginTop: 10,
  },
  addToCartText: {
    color: theme.colors.textLight,
    textAlign: 'center',
    fontWeight: theme.fonts.semibold,
  },
});

export default EventCalendar;
