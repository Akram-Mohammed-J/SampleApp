import React from 'react';
import {View, ScrollView} from 'react-native';
import SignUp from '../components/SignUp';
export default function SignUpScreen() {
  return (
    <View
      style={{
        backgroundColor: '#ddd3ed',
        height: '100%',
      }}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        scrollEnabled={true}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <SignUp />
        </View>
      </ScrollView>
    </View>
  );
}
