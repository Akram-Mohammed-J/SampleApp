import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const Card = ({data}) => {
  return (
    <View>
      <Image
        style={ss.status}
        source={{
          uri: data.image,
        }}
      />
    </View>
  );
};

export default Card;

const ss = StyleSheet.create({
  status: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginHorizontal: 6,
    marginVertical: 7,
    borderWidth: 2,
    borderColor: '#B287A3',
  },
});
