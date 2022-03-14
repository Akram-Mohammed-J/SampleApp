import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect} from 'react';
import {CheckIcon, Select} from 'native-base';
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

export default function SignUp() {
  var DateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),
    age: '18-35',
    password: '',
    confirmPassword: '',
  });
  const [users, setUsers] = useState([]);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const {name, email, phone, password, confirmPassword} = user;
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {name, email, phone, password, confirmPassword},
    });
  const handleInput = (text, name) => {
    setUser({
      ...user,
      [name]: text,
    });
  };
  useEffect(() => {
    setUser({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: new Date(),
      age: '18-35',
      password: '',
      confirmPassword: '',
    });
    setSelected(false);
  }, []);

  const handleSumbit = async () => {
    validate({
      name: {maxlength: 7, required: true},
      email: {email: true, required: true},
      phone: {numbers: true, minlength: 10, maxlength: 10},
      password: {
        hasNumber: true,
        hasUpperCase: true,
        hasSpecialCharacter: true,
        minlength: 6,
        maxlength: 12,
        required: true,
      },
      confirmPassword: {
        equalPassword: password,
        required: true,
      },
    });
    if (isFormValid()) {
      let formData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        date_of_birth: selected
          ? user.dateOfBirth.toLocaleDateString('en-GB', DateOptions)
          : '',
        age: user.age,
      };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(formData));
        navigation.navigate('Welcome');
      } catch (error) {}
    }
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    if (!value) return;
    setUser({
      ...user,
      dateOfBirth: value,
    });
    setSelected(true);

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <View style={ss.loginBox}>
      <Text style={ss.label}>Sign Up</Text>
      <TextInput
        style={ss.inputBox}
        placeholder="Enter your Name"
        onChangeText={text => handleInput(text, 'name')}
        value={user.name}
      />
      {isFieldInError('name') &&
        getErrorsInField('name').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
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
        placeholder="Enter your Phone"
        onChangeText={text => handleInput(text, 'phone')}
        value={user.phone}
      />
      {isFieldInError('phone') &&
        getErrorsInField('phone').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
      <Pressable onPress={showPicker}>
        <View style={ss.dateBox}>
          {!selected ? (
            <Text style={ss.infoText}>Enter your Date of Birth </Text>
          ) : (
            <Text style={ss.infoText}>
              {user.dateOfBirth.toLocaleDateString('en-GB', DateOptions)}{' '}
            </Text>
          )}
        </View>
      </Pressable>

      <Select
        selectedValue={user.age}
        minWidth="200"
        height={10}
        accessibilityLabel="Enter your Age"
        placeholder="Enter your Age"
        _selectedItem={{
          bg: 'brand.primary',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        mb={1}
        onValueChange={itemValue => handleInput(itemValue, 'age')}>
        <Select.Item label="< 18" value="< 18" />
        <Select.Item label="18-35" value="18-35" />
        <Select.Item label="36-50" value="36-50" />
        <Select.Item label="> 50​" value="> 50" />
      </Select>
      <TextInput
        style={ss.inputBox}
        secureTextEntry={true}
        placeholder="new password"
        onChangeText={text => handleInput(text, 'password')}
        value={user.password}
      />
      {isFieldInError('password') &&
        getErrorsInField('password').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
      <TextInput
        style={ss.inputBox}
        secureTextEntry={true}
        placeholder="Confirm password"
        onChangeText={text => handleInput(text, 'confirmPassword')}
        value={user.confirmPassword}
      />
      {isFieldInError('confirmPassword') &&
        getErrorsInField('confirmPassword').map((errorMessage, index) => (
          <Text key={index} style={ss.error}>
            {errorMessage}
          </Text>
        ))}
      <TouchableHighlight style={ss.highLight} onPress={handleSumbit}>
        <View style={ss.btn}>
          <Text style={ss.btnLabel}>Sign Up</Text>
        </View>
      </TouchableHighlight>

      <View style={ss.linkBox}>
        <Text style={{marginRight: 4}}>Already have an Account ?</Text>
        <Pressable onPress={() => navigation.navigate('login')}>
          <Text style={ss.link}>Login</Text>
        </Pressable>
      </View>

      {isPickerShow && (
        <DateTimePicker
          value={user.dateOfBirth}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
const ss = StyleSheet.create({
  loginBox: {
    padding: 5,
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
