import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const PhotoGrid = ({source}) => {
  return (
    <View>
      <Image
        style={ss.image}
        source={{
          uri: source,
        }}
      />
    </View>
  );
};

export default PhotoGrid;

const ss = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
});
