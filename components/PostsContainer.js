import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';
import {Spinner, useToast} from 'native-base';
import CustomToast from './CustomToast';
const PostsContainer = () => {
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setPosts([]);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <CustomToast
                toast={{
                  type: 'error',
                  message: 'Something went wrong please try again',
                }}
              />
            );
          },
        });
      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [posts]);
  return (
    <View style={ss.container}>
      {loading && <Spinner color="#8437a4" size="lg" />}
      {!loading && posts.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={item => <Post post={item.item} />}
          keyExtractor={post => post.id}
        />
      )}
    </View>
  );
};

export default PostsContainer;

const ss = StyleSheet.create({
  container: {
    height: '100%',
  },
});
