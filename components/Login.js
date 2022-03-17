import React, {useState, useEffect} from 'react';
import {useValidation} from 'react-native-form-validator';
import gIcon from '../assets/google-icon.png';
import fbIcon from '../assets/facebook-icon.webp';
import auth from '@react-native-firebase/auth';
import {useToast} from 'native-base';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  Image,
} from 'react-native';
import {Spinner} from 'native-base';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomToast from './CustomToast';
export default function Login() {
  const navigation = useNavigation();
  const toast = useToast();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;
  const [Loader, setLoader] = useState(false);
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
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '638166155676-3iers6kdfmsava6338s7canumehlcjnn.apps.googleusercontent.com',
      offlineAccess: true,
    });
    return () => {
      setLoader(false);
    };
  }, []);

  const saveUser = async data => {
    let formData = {
      email: data.user.email,
    };
    try {
      setLoader(false);
      await AsyncStorage.setItem('user', JSON.stringify(formData));
      navigation.navigate('Welcome');
    } catch (error) {}
  };

  const handleSumbit = async () => {
    validate({
      email: {email: true, required: true},
      password: {required: true},
    });
    if (isFormValid()) {
      let formData = {
        email: user.email,
      };
      try {
        await AsyncStorage.setItem('user', JSON.stringify(formData));
        navigation.navigate('Welcome');
      } catch (error) {}
    }
  };

  async function onGoogleButtonPress() {
    setLoader(true);
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // console.log(accessToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log({err: error});
    }
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    setLoader(true);
    try {
      const result = await LoginManager.logInWithPermissions(['email']);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      setLoader(false);
    }
  }
  return (
    <>
      <View pointerEvents={Loader ? 'none' : 'auto'} style={ss.loginBox}>
        {Loader && <Spinner style={[ss.overlay]} color="#8437a4" size="lg" />}
        <Text style={ss.label}>Login</Text>
        <View style={ss.socialAuth}>
          <TouchableHighlight
            style={ss.highLightSocial}
            onPress={() =>
              onGoogleButtonPress()
                .then(res => {
                  if (res !== undefined) saveUser(res);
                  else throw new Error('Operation Cancelled');
                })
                .catch(error => {
                  setLoader(false);
                  toast.show({
                    placement: 'bottom',
                    duration: 5000,
                    render: () => {
                      return (
                        <CustomToast
                          toast={{
                            type: 'error',
                            message: `${
                              error.userInfo
                                ? error.userInfo.code
                                : error.message
                            }`,
                          }}
                        />
                      );
                    },
                  });
                })
            }>
            <Image source={gIcon} style={ss.googleBtn} />
          </TouchableHighlight>
          <TouchableHighlight
            style={ss.highLightSocial}
            onPress={() =>
              onFacebookButtonPress()
                .then(res => {
                  if (res !== undefined) saveUser(res);
                  else throw new Error('Operation Cancelled');
                })
                .catch(error => {
                  setLoader(false);
                  toast.show({
                    placement: 'bottom',
                    duration: 5000,
                    render: () => {
                      return (
                        <CustomToast
                          toast={{
                            type: 'error',
                            message: `${
                              error.userInfo
                                ? error.userInfo.code
                                : error.message
                            }`,
                          }}
                        />
                      );
                    },
                  });
                })
            }>
            <Image source={fbIcon} style={ss.googleBtn} />
          </TouchableHighlight>
        </View>

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
            <Text
              style={[
                ss.btnLabel,
                {
                  lineHeight: Platform.OS == 'ios' ? 40 : 20,
                },
              ]}>
              Login
            </Text>
          </View>
        </TouchableHighlight>
        <View style={ss.linkBox}>
          <Text style={{marginRight: 4}}>Didn't have an Account ?</Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={ss.link}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const ss = StyleSheet.create({
  loginBox: {
    position: 'relative',
    padding: 8,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    zIndex: 1000,
  },
  highLightSocial: {
    borderRadius: 40,
  },
  googleBtn: {
    width: 30,
    height: 30,
    marginHorizontal: 19,
    borderRadius: 40,
  },
  socialAuth: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 7,
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
