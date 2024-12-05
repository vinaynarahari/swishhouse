import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import Loading from '../components/Loading';

const Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Loading />
      <Text>Loading</Text>
    </View>
  );
};

export default Index;
