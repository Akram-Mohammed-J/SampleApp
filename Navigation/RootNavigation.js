import * as React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import LoginScreen from '../screens/LoginScreen';

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const newColorTheme = {
    brand: {
      primary: '#ddd3ed',
    },
  };
  const theme = extendTheme({colors: newColorTheme});

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="signup"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={TabNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
