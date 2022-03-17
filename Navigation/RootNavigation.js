import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const newColorTheme = {
    brand: {
      primary: '#ddd3ed',
    },
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const theme = extendTheme({colors: newColorTheme});
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={TabNavigation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : (
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
