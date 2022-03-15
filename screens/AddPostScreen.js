import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PhotoGrid from '../components/PhotoGrid';
import {photos} from '../mock_response/photos';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Actionsheet, useDisclose, useToast} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {openSettings} from 'react-native-permissions';
import CustomToast from '../components/CustomToast';
const AddPostScreen = () => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [settings, setSettings] = useState(false);
  const [Images, setImages] = useState([]);

  useEffect(() => {
    setImages(photos);
  }, []);

  const renderItem = item => (
    <View style={{marginHorizontal: 3, marginVertical: 3}}>
      <PhotoGrid source={item.image} />
    </View>
  );

  const validateImage = image => {
    setSettings(false);
    if (image.height > 300 || image.width > 300) {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <CustomToast
              toast={{
                type: 'error',
                message: 'image must be in 300 x 300',
              }}
            />
          );
        },
      });
    } else if (image.size > 3000000) {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <CustomToast
              toast={{
                type: 'error',
                message: 'Size must be less than 3mbz',
              }}
            />
          );
        },
      });
    } else {
      setImages(oldArray => [
        ...oldArray,
        {
          id: Math.random() * 100,
          image: image.path,
        },
      ]);
    }
  };

  const handleUpload = feature => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    if (feature === 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          validateImage(image);
        })
        .catch(err => {
          if (err.code === 'E_NO_CAMERA_PERMISSION') {
            onOpen();
            setSettings(true);
            return toast.show({
              placement: 'top',
              render: () => {
                return (
                  <CustomToast
                    toast={{
                      type: 'error',
                      message: "can't open camera please try again",
                    }}
                  />
                );
              },
            });
          }
        });
    } else if (feature === 'albums') {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          validateImage(image);
        })
        .catch(err => {
          if (err.code === 'E_NO_LIBRARY_PERMISSION') {
            onOpen();
            setSettings(true);
            return toast.show({
              placement: 'top',
              render: () => {
                return (
                  <CustomToast
                    toast={{
                      type: 'error',
                      message: "can't open gallery please try again",
                    }}
                  />
                );
              },
            });
          }
        });
    }
  };

  const HandleOpenCamera = () => {
    onClose();
    handleUpload('camera');
  };

  const HandleOpenPhotos = () => {
    onClose();
    handleUpload('albums');
  };
  const handleSettings = () => {
    openSettings().catch(err =>
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <CustomToast
              toast={{
                type: 'error',
                message: "Can't open settings grant permission manually ",
              }}
            />
          );
        },
      }),
    );
  };
  return (
    <SafeAreaView style={ss.photoContainer}>
      <FlatList
        numColumns={2}
        contentContainerStyle={ss.photoContainer}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={Images}
        renderItem={item => renderItem(item.item)}
      />
      <View style={ss.btnContainer}>
        <TouchableHighlight
          style={ss.highLight}
          onPress={() => {
            setSettings(false);
            onOpen();
          }}>
          <View style={ss.btn}>
            <IonIcons name="camera-outline" style={ss.cameraIcon} size={25} />
            <Text
              style={[
                ss.btnLabel,
                {lineHeight: Platform.OS === 'ios' ? 30 : 20},
              ]}>
              Add a photo
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={HandleOpenCamera}>
            <View style={ss.optionWrapper}>
              <IonIcons
                style={ss.iconStyle}
                name="camera-outline"
                size={25}
                color="black"
              />
              <Text>Take a Shot</Text>
            </View>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={HandleOpenPhotos}>
            <View style={ss.optionWrapper}>
              <IonIcons
                style={ss.iconStyle}
                name="albums"
                size={25}
                color="black"
              />
              <Text>Choose from gallery</Text>
            </View>
          </Actionsheet.Item>
          {settings && (
            <Actionsheet.Item onPress={handleSettings}>
              <View style={ss.optionWrapper}>
                <Text>Open Settings and grant permissions</Text>
                <IonIcons
                  name="settings-sharp"
                  style={ss.iconStyle}
                  size={25}
                  color="black"
                />
              </View>
            </Actionsheet.Item>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const ss = StyleSheet.create({
  photoContainer: {
    position: 'relative',
  },
  highLight: {
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    padding: 5,
    backgroundColor: '#704893',
    height: 40,
    borderRadius: 10,
  },
  btnLabel: {
    height: '100%',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 12000,
    bottom: 0,
    marginVertical: 10,
  },
  cameraIcon: {
    marginRight: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
});
