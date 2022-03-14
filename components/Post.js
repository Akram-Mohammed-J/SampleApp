import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Post = ({post}) => {
  const navigation = useNavigation();
  const handleRedirect = id => {
    navigation.navigate('edit', {
      postId: id,
    });
  };
  return (
    <View style={ss.container}>
      <View style={ss.topBar}>
        <View style={ss.topBarContent}>
          <Image
            source={{
              uri: `https://source.unsplash.com/random/?city/${post.id}sdg`,
            }}
            style={ss.avatar}
          />
          <Text style={ss.user}>Akram</Text>
          <Text style={ss.link}>Follow</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="black" />
      </View>
      <Image
        source={{
          uri: `https://source.unsplash.com/random/?city/${post.id}`,
        }}
        style={ss.postImage}
      />

      <View style={ss.postContent}>
        <View style={ss.postActions}>
          <Ionicons name="heart-outline" size={25} color="black" />
          <Ionicons name="chatbubble-outline" size={25} color="black" />
          <TouchableHighlight
            underlayColor="#ccc"
            style={ss.highLight}
            onPress={() => handleRedirect(post.id)}>
            <FeatherIcon name="edit-2" size={25} color="black" />
          </TouchableHighlight>
        </View>
        <Ionicons name="bookmark-outline" size={25} color="black" />
      </View>
      <View style={ss.postText}>
        <Text style={ss.postTitle}>{post.title}</Text>
        <Text style={ss.postDescription}>{post.body}</Text>
      </View>
    </View>
  );
};

export default Post;

const ss = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 10,

    marginBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#C2C2C2',
    borderBottomWidth: 0.2,
    paddingHorizontal: 10,
    height: 55,
  },
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 35,
    height: 35,
    marginHorizontal: 4,
    borderRadius: 40,
  },
  user: {
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#088BE2',
    marginHorizontal: 4,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  postContent: {
    marginVertical: 5,
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postActions: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highLight: {
    borderRadius: 70,
  },
  postText: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginVertical: 6,
  },
  postDescription: {
    fontSize: 15,
    marginBottom: 5,
  },
});
