import {StyleSheet} from 'react-native';
import React from 'react';
import TopBarNavigation from './TopBarNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator();
  let defaultOptions = {
    headerShown: false,
  };
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="user"
        component={ProfileScreen}
        options={defaultOptions}
      />
      <ProfileStack.Screen
        name="contacts"
        component={TopBarNavigation}
        options={defaultOptions}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
