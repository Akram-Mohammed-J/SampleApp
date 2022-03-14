import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {banners} from '../mock_response/banners';
import Card from './Card';

const BannerContainer = () => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={banners}
        renderItem={item => <Card data={item.item} />}
        keyExtractor={(banner, index) => index}
      />
    </View>
  );
};

export default BannerContainer;

const styles = StyleSheet.create({});
