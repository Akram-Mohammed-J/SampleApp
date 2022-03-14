import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useValidation} from 'react-native-form-validator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import CustomToast from './CustomToast';
const EditPost = ({data}) => {
  const navigation = useNavigation();
  const [btnLoader, setbtnLoader] = useState(false);
  const toast = useToast();
  const [Post, setPost] = useState({
    id: '',
    postTitle: '',
    postDescription: '',
  });
  const [loading, setLoading] = useState(true);
  const {postTitle, postDescription} = Post;
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {postTitle, postDescription},
    });
  const handleInput = (value, name) => {
    setPost({
      ...Post,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setPost({
        id: data.id,
        postTitle: data.title,
        postDescription: data.body,
      });
    }
  }, [data]);

  useEffect(() => {
    setLoading(false);
  }, [Post]);

  const handleSumbit = () => {
    validate({
      postTitle: {required: true},
      postDescription: {required: true},
    });
    if (isFormValid()) {
      let post = {
        title: postTitle,
        body: postDescription,
      };

      if (!toast.isActive((id = Post.id))) {
        toast.show({
          id,
          placement: 'bottom',
          duration: 150,
          render: () => {
            setbtnLoader(true);
            return (
              <CustomToast
                toast={{
                  type: 'success',
                  message: 'post updated successfully',
                }}
              />
            );
          },
          onCloseComplete: () => {
            navigation.navigate('main');
          },
        });
      }
    }
  };
  return (
    <>
      {!loading && (
        <View style={ss.EditPostContainer}>
          <View style={ss.imageWrapper}>
            <TouchableHighlight
              style={ss.uploadbtn}
              activeOpacity={0.5}
              onPress={() => {}}>
              <Ionicons style={ss.cameraIcon} name="camera-outline" />
            </TouchableHighlight>
            <Image
              style={ss.postImage}
              source={{
                uri: `https://source.unsplash.com/random/?city/${Post.id}`,
              }}
            />
          </View>
          <TextInput
            style={ss.inputBox}
            placeholder="Enter Post Title"
            onChangeText={text => handleInput(text, 'postTitle')}
            value={Post.postTitle}
          />
          {isFieldInError('postTitle') &&
            getErrorsInField('postTitle').map((errorMessage, index) => (
              <Text key={index} style={ss.error}>
                {errorMessage}
              </Text>
            ))}
          <TextInput
            style={ss.inputBoxMultiLine}
            multiline={true}
            numberOfLines={10}
            placeholder="Enter your thoughts ...."
            onChangeText={text => handleInput(text, 'postDescription')}
            value={Post.postDescription}
          />
          {isFieldInError('postDescription') &&
            getErrorsInField('postDescription').map((errorMessage, index) => (
              <Text key={index} style={ss.error}>
                {errorMessage}
              </Text>
            ))}

          <TouchableHighlight
            disabled={btnLoader}
            style={ss.highLight}
            onPress={() => handleSumbit()}>
            <View style={btnLoader ? ss.highLightDisabled : ss.btn}>
              <Text style={ss.btnLabel}>Edit Post</Text>
            </View>
          </TouchableHighlight>

          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={ss.btnCancel}>
              <Text style={ss.btnLabelCancel}> cancel</Text>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default EditPost;

const ss = StyleSheet.create({
  EditPostContainer: {
    padding: 8,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageWrapper: {
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: '#A9A9B6',
    position: 'relative',
    width: '100%',
    height: 200,
  },
  uploadbtn: {
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
    right: 0,
  },
  cameraIcon: {
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    color: 'black',
  },
  postImage: {
    borderRadius: 6,
    width: '100%',
    height: 200,
  },
  inputBox: {
    borderWidth: 0.2,
    height: 40,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
  },
  inputBoxMultiLine: {
    borderWidth: 0.2,
    paddingTop: 10,
    height: 80,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    borderColor: 'gray',
    marginBottom: 10,
  },
  label: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  highLight: {
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#ddd3ed',
    height: 40,
    borderRadius: 10,
  },
  highLightDisabled: {
    backgroundColor: '#ccc',
    height: 40,
    borderRadius: 10,
  },
  btnCancel: {
    color: '#088BE2',
    height: 40,
  },
  btnLabelCancel: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#704893',
    fontWeight: 'bold',
    height: '100%',
  },
  btnLabel: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    height: '100%',
  },
  dateBox: {
    borderWidth: 0.2,
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    height: 45,
  },
  infoText: {
    color: '#b5b5b5',
    textAlignVertical: 'center',
    height: '100%',
  },
  error: {
    color: 'red',
  },
  linkBox: {
    flex: 1,
    marginVertical: 10,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  link: {
    color: 'blue',
  },
});
