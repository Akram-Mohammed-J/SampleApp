import React from 'react';
import {View, Image, StyleSheet, Text, Platform} from 'react-native';
const User = props => {
  const {user} = props;
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
    </View>
  );
};

const ss = StyleSheet.create({
  card: {
    position: 'relative',
    alignItems: 'stretch',
    backgroundColor: 'white',
    padding: 7,
    marginHorizontal: 7,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 10,
    width: 300,
    height: 150,
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
    height: '100%',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
export default User;
