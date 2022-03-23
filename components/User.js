import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import React from 'react';

const User = ({user, follower, following}) => {
  return (
    <View style={ss.container}>
      <Image
        style={ss.profilepic}
        source={{
          uri: `https://source.unsplash.com/random/${user.id}`,
        }}
      />
      <Text style={ss.userName}>{user.name}</Text>
      {follower && (
        <TouchableHighlight style={ss.highLight} onPress={() => {}}>
          <View style={ss.btnlogout}>
            <Text style={ss.btnTextLogout}>Block</Text>
          </View>
        </TouchableHighlight>
      )}
      {following && (
        <TouchableHighlight style={ss.highLight} onPress={() => {}}>
          <View style={ss.btnlogout}>
            <Text style={ss.btnTextLogout}>unfollow</Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default User;

const ss = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 7,
  },
  profilepic: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnlogout: {
    padding: 7,
    backgroundColor: '#39A0ED',
    borderRadius: 5,
  },
  btnTextLogout: {
    color: 'white',
  },
  highLight: {
    marginVertical: 10,
    borderRadius: 7,
  },
});
