import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomToast = ({toast}) => {
  return (
    <View style={toast.type === 'error' ? ss.error : ss.success}>
      <Text style={ss.message}>{toast.message}</Text>
    </View>
  );
};

export default CustomToast;

const ss = StyleSheet.create({
  error: {
    paddingHorizontal: 5,
    width: '100%',
    height: 40,
    backgroundColor: '#D32211',
    borderRadius: 5,
    textAlignVertical: 'center',
  },
  success: {
    width: '100%',
    height: 40,
    backgroundColor: '#704893',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  message: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
});
