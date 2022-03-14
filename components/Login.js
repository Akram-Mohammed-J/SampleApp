import React, {useState, useEffect} from 'react';
import {useValidation} from 'react-native-form-validator';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {email, password},
    });
  const handleInput = (text, name) => {
    setUser({
      ...user,
      [name]: text,
    });
  };
  useEffect(() => {
    setUser({
      email: '',
      password: '',
    });
  }, []);

  const handleSumbit = async () => {
    validate({
      email: {email: true, required: true},
      password: {required: true},
    });
    if (isFormValid()) {
      let formData = {
        email: user.email,
        password: user.password,
      };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(formData));
        navigation.navigate('Welcome');
      } catch (error) {}
    }
  };

  return (
    <View style={ss.loginBox}>
      <Text style={ss.label}>Login</Text>
      <TextInput
        style={ss.inputBox}
        placeholder="Enter your Email"
        onChangeText={text => handleInput(text, 'email')}
        value={user.email}
      />
      {isFieldInError('email') &&
        getErrorsInField('email').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
      <TextInput
        style={ss.inputBox}
        placeholder="Enter your password"
        onChangeText={text => handleInput(text, 'password')}
        value={user.password}
        secureTextEntry={true}
      />
      {isFieldInError('password') &&
        getErrorsInField('password').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
      <TouchableHighlight style={ss.highLight} onPress={handleSumbit}>
        <View style={ss.btn}>
          <Text style={ss.btnLabel}>Login</Text>
        </View>
      </TouchableHighlight>
      <View style={ss.linkBox}>
        <Text style={{marginRight: 4}}>Didn't have an Account ?</Text>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text style={ss.link}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const ss = StyleSheet.create({
  loginBox: {
    padding: 8,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inputBox: {
    borderWidth: 0.2,
    height: 40,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
  },
  label: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  highLight: {
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#ddd3ed',
    height: 40,
    borderRadius: 10,
  },
  btnLabel: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    height: '100%',
  },
  dateBox: {
    borderWidth: 0.2,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    height: 45,
  },
  infoText: {
    color: '#b5b5b5',
    textAlignVertical: 'center',
    height: '100%',
  },
  error: {
    color: 'red',
  },
  linkBox: {
    flex: 1,
    marginVertical: 10,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  link: {
    color: 'blue',
  },
});
