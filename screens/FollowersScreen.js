import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import User from '../components/User';
import axios from 'axios';
import {Spinner} from 'native-base';

const FollowersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loader, setloader] = useState(false);
  const fetchFollowers = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setloader(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    setloader(true);
    fetchFollowers();
  }, []);

  const renderItem = item => <User key={item.id} user={item} follower={true} />;

  return (
    <View style={ss.container}>
      {loader && <Spinner size={25} color="#8437a4" />}
      {!loader && (
        <FlatList
          data={users}
          renderItem={item => renderItem(item.item)}
          keyExtractor={post => post.id}
        />
      )}
    </View>
  );
};

export default FollowersScreen;

const ss = StyleSheet.create({
  container: {
    margin: 6,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
