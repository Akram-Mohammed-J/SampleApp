import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import EditPost from '../components/EditPost';
import axios from 'axios';
import {Spinner} from 'native-base';
import {useToast} from 'native-base';
import CustomToast from '../components/CustomToast';
const EditPostScreen = ({route}) => {
  const [Post, setPost] = useState({});
  const [Loader, setLoader] = useState(true);
  const toast = useToast();
  useEffect(() => {
    const {postId} = route.params;
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          id: postId,
        },
      })
      .then(res => {
        setPost(res.data[0]);
      })
      .catch(err => {
        setPost({});
        setLoader(false);
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <CustomToast
                toast={{
                  type: 'error',
                  message: 'post not found',
                }}
              />
            );
          },
        });
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [Post]);

  return (
    <View style={ss.wrapper}>
      <ScrollView
        contentContainerStyle={ss.scrollContainer}
        scrollEnabled={true}>
        <View style={ss.componentWrapper}>
          {Loader && <Spinner color="#8437a4" size="lg" />}
          {!Loader && <EditPost data={Post} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPostScreen;

const ss = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ddd3ed',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  componentWrapper: {
    alignItems: 'center',
  },
});
