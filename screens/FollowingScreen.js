import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Spinner} from 'native-base';
import axios from 'axios';
import User from '../components/User';

const FollowingScreen = () => {
  const [users, setUsers] = useState([]);
  const [loader, setloader] = useState(false);
  const fetchFollowing = () => {
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
    fetchFollowing();
  }, []);

  const renderItem = item => (
    <User key={item.id} user={item} following={true} />
  );

  return (
    <View style={ss.container}>
      {loader && <Spinner size={25} color="#8437a4" />}
      {!loader && (
        <FlatList
          data={users}
          renderItem={item => renderItem(item.item)}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default FollowingScreen;

const ss = StyleSheet.create({
  container: {
    margin: 6,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
