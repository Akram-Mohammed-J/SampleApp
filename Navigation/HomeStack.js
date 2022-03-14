import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import EditPostScreen from '../screens/EditPostScreen';
const HomeStack = () => {
  const HomeStack = createNativeStackNavigator();
  let defaultOptions = {
    headerShown: false,
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="main"
        component={HomeScreen}
        options={defaultOptions}
      />
      <HomeStack.Screen
        name="edit"
        options={defaultOptions}
        component={EditPostScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
