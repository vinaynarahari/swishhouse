import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { supabase } from '../lib/supabase';

const Community = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Hot');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase.from('posts').select('*');
      if (searchText) {
        query = query.ilike('title', `%${searchText}%`);
      }
      const { data, error } = await query;
      if (error) {
        console.log('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [searchText]);

  const TopNav = () => (
    <View style={styles.topNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="flame" size={20} color={theme.colors.primary} />
        <Text style={styles.navText}>Hot</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.locationButton}>
        <Text style={styles.locationText}>United States</Text>
        <Ionicons name="chevron-down" size={16} color={theme.colors.textLight} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="time-outline" size={20} color={theme.colors.textLight} />
        <Text style={styles.navText}>New</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="trophy-outline" size={20} color={theme.colors.textLight} />
        <Text style={styles.navText}>Top</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPostItem = ({ item }) => (
  
    <View style={styles.postCard}>
      <View style={styles.voteContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-up" size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.voteCount}>{Number(item.votes) || '10'}</Text>

        <TouchableOpacity>
          <Ionicons name="arrow-down" size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Image 
            source={{ uri: item.subredditIcon }} 
            style={styles.subredditIcon} 
          />
         
          <Text style={styles.postInfo}>Posted by {item.name} {console.log(item.name)} {item.timeAgo}</Text>
        
        </View>
        
        <Text style={styles.postTitle}>{item.title}</Text>
        
        <View style={styles.awardsContainer}>
          {item.awards?.map((award, index) => (
            <View key={index} style={styles.awardBadge}>
              <Ionicons name="star" size={16} color={theme.colors.primary} />
              <Text style={styles.awardCount}>{award.count}</Text>
            </View>
          ))}
        </View>

        {item.file && (
          <Image source={{ uri: item.file }} style={styles.postImage} />
        )}
        
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="comment-outline" size={20} color={theme.colors.alternateBlue} />
            <Text style={styles.actionText}>{item.comments || '4'} Comments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="share-outline" size={20} color={theme.colors.alternateBlue} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={20} color={theme.colors.alternateBlue} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.alternateBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />
      <TopNav />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.postsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.darkLight,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  navText: {
    color: theme.colors.textLight,
    marginLeft: 4,
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    marginHorizontal: 8,
  },
  locationText: {
    color: theme.colors.textLight,
    marginRight: 4,
    fontSize: 14,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkLight,
    marginVertical: 4,
    borderRadius: theme.radius.sm,
  },
  voteContainer: {
    padding: 8,
    alignItems: 'center',
    minWidth: 40,
  },
  voteCount: {
    color: theme.colors.textLight,
    fontSize: 12,
    fontWeight: theme.fonts.bold,
    marginVertical: 4,
  },
  postContent: {
    flex: 1,
    padding: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subredditIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  subredditName: {
    color: theme.colors.textLight,
    fontSize: 12,
    fontWeight: theme.fonts.bold,
  },
  postInfo: {
    color: theme.colors.gray,
    fontSize: 12,
    marginLeft: 4,
  },

  postTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: theme.fonts.medium,
    marginBottom: 8,
  },
  awardsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  awardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
    padding: 4,
    borderRadius: theme.radius.sm,
    marginRight: 6,
  },
  awardCount: {
    color: theme.colors.textLight,
    fontSize: 12,
    marginLeft: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.sm,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 12,
  },
  actionText: {
    color: theme.colors.textLight,
    fontSize: 12,
    marginLeft: 4,
  },
  moreButton: {
    marginLeft: 'auto',
    padding: 4,
  },
});

export default Community;