import React, {useRef} from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import {RNCamera} from 'react-native-camera';
import {Pressable} from "@/component";
import {DeviceHelper} from "@/helper/DeviceHelper";
import RNFS from 'react-native-fs';
import moment from "moment";
import { useDispatch } from "react-redux";
import { addPhotos } from "@/redux/actions/photosAction";
import { generateImageFolder, localPath, saveImageToFolder } from "@/utils/SaveImagesUtils";
import { dbPhotos } from "@/WaterMelon/DBHelper/DBPhotos";
// import { ImageManipulator } from 'expo-image-manipulator';

export interface CameraComponentProps {
    category: string;
    client: string;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({category,client}:CameraComponentProps) => {
    const cameraRef = useRef<RNCamera>(null);
    const currentDate = new Date();
    const dispatch = useDispatch();

    const saveImageToGallery = async (imageUri: string) => {
        try {
            const date = moment().format('YYYYMMDDhhmmss');
            const filePath = RNFS.PicturesDirectoryPath + `/${date}camera.jpg`;
            await RNFS.moveFile(imageUri, filePath);
            // await saveImageGallery(imageUri,  `/${date}camera.jpg`);
            // console.log('Image saved to gallery:', filePath);
        } catch (error) {
            console.error('Failed to save image:', error);
        }
    };

    const saveImageToDatabase = async (imageUrl: string) => {
        try {
            const key = currentDate.toString();
            const json = {
                key,
                value: imageUrl,
                category: category,
                client: client,
            };
            // console.log("json",json);
            // dispatch(addPhotos(json));
            await dbPhotos.savePhotos(json);
            console.log('Image saved to gallery:');
        } catch (error) {
            console.error('Failed to save image:', error);
        }
    };

    // const localPath = async (image) => {
    //     console.log('Cache directory path is ', image)
    //     const fileName = image.split('/').pop();
    //     console.log('Filename is ', fileName)
    //     const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // You don't really need the `'file://` prefix
    //     console.log(newPath);
    //
    //     try {
    //         await RNFS.writeFile(image, newPath, 'utf8');
    //         console.log('File saved successfully:', image);
    //     } catch (error) {
    //         console.error('Error saving file:', error);
    //     }
    //     // COPY the file
    //     // RNFS.writeFile(image, newPath, 'utf8')
    //     //   .then((success) => {
    //     //       console.log('IMG saved!');
    //     //       console.log(newPath);
    //     //   })
    //     //   .catch((err) => {
    //     //       console.log(err.message);
    //     //   });
    //
    //     return newPath
    // }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 0.2,
                base64: true,
                doNotSave: false,
                pauseAfterCapture:true
            };
            const data = await cameraRef.current.takePictureAsync(options);
            cameraRef.current.resumePreview()
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Your app needs permission.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // await saveImageToGallery(data.uri)
                    await saveImageToDatabase(data.base64)
                    return true;
                } else {
                    console.log("Camera permission denied");
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                captureAudio={false}
            />
            <Pressable
                onPress={takePicture}
                height={DeviceHelper.calculateWidthRatio(80)}
                width={DeviceHelper.calculateWidthRatio(80)}
                borderColor={'white'}
                borderWidth={4}
                position={'absolute'}
                alignSelf={'center'}
                bottom={10}
                borderRadius={DeviceHelper.calculateWidthRatio(40)}
                disabled={client === '' || category === ''}
            >

            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
});
