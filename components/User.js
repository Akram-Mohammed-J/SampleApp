import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = props => {
  const {user} = props;
  const navigation = useNavigation();
  const handleSignOut = async () => {
    try {
      const user = auth().currentUser;

      let provider = user.providerData.map(userInfo => {
        return userInfo.providerId;
      });

      if (provider[0] == 'google.com') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      await auth().signOut();
      await AsyncStorage.clear();
      navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={ss.card}>
      <Image
        style={ss.profileImage}
        source={{
          uri: `https://source.unsplash.com/random/?men`,
        }}
      />
      <Text
        style={[
          ss.userDetails,
          {
            lineHeight: Platform.OS == 'ios' ? 100 : 20,
          },
        ]}>
        Email : {user.email}
      </Text>
      <TouchableHighlight
        style={ss.highLight}
        onPress={() => {
          handleSignOut();
        }}>
        <View style={ss.btn}>
          <Text
            style={[
              ss.btnLabel,
              {
                lineHeight: Platform.OS == 'ios' ? 40 : 20,
              },
            ]}>
            Logout
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const ss = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 7,
    marginHorizontal: 7,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 10,
    width: 300,
    maxHeight: 500,
  },
  profileImage: {
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    top: '-20%',
    left: '41%',
    width: 65,
    height: 65,
    borderRadius: 40,
  },
  userDetails: {
    fontSize: 17,
    marginVertical: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
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
});
export default User;
