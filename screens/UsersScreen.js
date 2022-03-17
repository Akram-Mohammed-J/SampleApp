import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import User from '../components/User';

function UsersScreen() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let users = await AsyncStorage.getItem('user');
        users = JSON.parse(users);
        setUser(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  //  {
  //    !loading && (
  //      <SafeAreaView style={ss.container}>
  //        <FlatList
  //          data={users}
  //          renderItem={item => <User user={item.item} />}
  //          keyExtractor={(user, index) => index}
  //        />
  //      </SafeAreaView>
  //    );
  //  }
  return (
    <View style={ss.container}>
      <View style={ss.content}>{!loading && <User user={user} />}</View>
    </View>
  );
}
const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd3ed',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UsersScreen;
