import {StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import PostsContainer from '../components/PostsContainer';
import BannerContainer from '../components/BannerContainer';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={ss.container}>
      <BannerContainer />
      <PostsContainer />
    </SafeAreaView>
  );
};

export default HomeScreen;

const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
