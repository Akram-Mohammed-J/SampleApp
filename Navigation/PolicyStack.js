import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PolicyScreen from '../screens/PolicyScreen';

const PolicyStack = () => {
  const PolicyStack = createNativeStackNavigator();
  let defaultOptions = {
    headerShown: false,
  };
  return (
    <PolicyStack.Navigator>
      <PolicyStack.Screen
        name="policy"
        component={PolicyScreen}
        options={defaultOptions}
      />
    </PolicyStack.Navigator>
  );
};

export default PolicyStack;
