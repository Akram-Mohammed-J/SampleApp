import {StyleSheet, Button, Linking, View, SafeAreaView} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {Spinner} from 'native-base';

const PolicyScreen = () => {
  const handleOpen = async () => {
    try {
      await Linking.openURL('https://reactnative.dev/');
    } catch (error) {}
  };

  return (
    <SafeAreaView style={ss.container}>
      <WebView
        source={{uri: 'https://reactnative.dev/'}}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={ss.content}>
            <Spinner color="#8437a4" size="lg" />
          </View>
        )}
      />

      <Button title="Open in Browser" onPress={handleOpen}></Button>
    </SafeAreaView>
  );
};

export default PolicyScreen;

const ss = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
