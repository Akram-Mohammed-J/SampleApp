import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UsersScreen from '../screens/UsersScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import PolicyStack from './PolicyStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Policy') {
            iconName = focused ? 'information' : 'information-outline';
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#8437a4',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        tab
        options={{headerShown: false}}
        component={HomeStack}
      />
      <Tab.Screen
        name="profile"
        options={{headerShown: false}}
        component={UsersScreen}
      />
      <Tab.Screen
        name="Policy"
        options={{headerShown: false}}
        component={PolicyStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
