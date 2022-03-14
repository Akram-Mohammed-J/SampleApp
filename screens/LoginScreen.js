import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import Login from '../components/Login';

export default function LoginScreen() {
  return (
    <View style={ss.wrapper}>
      <ScrollView
        contentContainerStyle={ss.scrollContainer}
        scrollEnabled={true}>
        <View style={ss.componentWrapper}>
          <Login />
        </View>
      </ScrollView>
    </View>
  );
}

const ss = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ddd3ed',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  componentWrapper: {
    alignItems: 'center',
  },
});
