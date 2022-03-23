import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from './TabNavigation';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import TopBarNavigation from './TopBarNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const newColorTheme = {
    brand: {
      primary: '#ddd3ed',
    },
  };
  async function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      let formData = {
        email: user.email,
      };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(formData));
      } catch (error) {
        console.log(error);
      }
    }
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
