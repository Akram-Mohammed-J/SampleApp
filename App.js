/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Navigation from './Navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
          ],
    ).then(result => {
      console.log(result);
    });
  }, []);

  return <Navigation />;
};

export default App;
