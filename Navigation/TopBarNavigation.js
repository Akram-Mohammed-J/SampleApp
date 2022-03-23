import {StyleSheet, Text, View, StatusBar, NativeModules} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';

const TopBarNavigation = () => {
  const Tab = createMaterialTopTabNavigator();
  const {StatusBarManager} = NativeModules;

  return (
    <Tab.Navigator style={{paddingTop: StatusBarManager.HEIGHT}}>
      <Tab.Screen
        options={{
          title: 'Followers',
        }}
        component={FollowersScreen}
        name="followers"
      />
      <Tab.Screen
        options={{
          title: 'Following',
        }}
        component={FollowingScreen}
        name="following"
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigation;

const styles = StyleSheet.create({});
