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

const Profile = props => {
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
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={ss.profileActions}>
        <Text style={ss.userName}>{user.email}</Text>
        <TouchableHighlight
          style={ss.highLight}
          onPress={() => {
            handleSignOut();
          }}>
          <View style={ss.btnlogout}>
            <Text style={ss.btnTextLogout}>Log out</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={ss.container}>
        <Image
          style={ss.profileImage}
          source={{
            uri: 'https://source.unsplash.com/random/?men',
          }}
        />
        <View style={ss.overview}>
          <View style={ss.blockView}>
            <Text style={ss.boldText}>1,456</Text>
            <Text style={ss.smText}>Posts</Text>
          </View>
          <TouchableHighlight
            style={ss.touch}
            onPress={() => navigation.navigate('contacts')}>
            <View style={ss.block}>
              <Text style={ss.boldText}>167</Text>
              <Text style={ss.smText}>Followers</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={ss.touch}
            onPress={() =>
              navigation.navigate('contacts', {
                screen: 'following',
              })
            }>
            <View style={ss.block}>
              <Text style={ss.boldText}>80</Text>
              <Text style={ss.smText}>Following</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={ss.infoContainer}>
        <Text style={ss.user}>Akram Mohammed</Text>
        <Text style={ss.bio}>
          On the other hand, we denounce with righteous indignation and dislike
          men
        </Text>
        <TouchableHighlight style={ss.highLight} onPress={() => {}}>
          <View style={ss.button}>
            <Text style={ss.btnText}>Edit profile</Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

const ss = StyleSheet.create({
  container: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    borderColor: '#8437a4',
    borderWidth: 0.7,
  },
  overview: {
    flexBasis: '65%',
    display: 'flex',
    flexDirection: 'row',
  },
  block: {
    backgroundColor: 'white',
  },
  blockView: {
    marginHorizontal: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  touch: {
    borderRadius: 20,
    marginHorizontal: 10,
  },
  smTextx: {
    fontSize: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
  },
  infoContainer: {
    padding: 7,
  },
  user: {
    fontWeight: 'bold',
    marginVertical: 7,
    color: 'black',
    fontSize: 16,
  },
  bio: {
    lineHeight: 20,
  },

  button: {
    borderWidth: 0.2,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 4,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'black',
  },
  highLight: {
    marginVertical: 10,
    borderRadius: 7,
  },
  profileActions: {
    justifyContent: 'space-around',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnlogout: {
    padding: 7,
    backgroundColor: '#8437a4',
    borderRadius: 5,
  },
  btnTextLogout: {
    color: 'white',
  },
});
export default Profile;
