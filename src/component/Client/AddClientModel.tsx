import React, { useEffect, useState } from "react";
import { Modal, PermissionsAndroid } from "react-native";
import { Box } from "@/component/Box";
import { Text } from "@/component/Text";
import { useDispatch } from "react-redux";
import { addCategories, editCategories } from "@/redux/actions/categoriesAction";
import { Header } from "@/component/Header/Header";
import { goBack } from "@/navigation/AppNavigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { fonts } from "@/style";
import { TextInput } from "@/component/TextInput";
import { Controller } from 'react-hook-form';
import { ProfileImage } from "@/component/Client/ProfileImage";
import { Button } from "@/component/Button";
import { CustomModal } from "@/component/Action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addClient, editClient } from "@/redux/actions/clientAction";
import { Category } from "@/Model/Category";
import { Client } from "@/Model/Client";

export interface AddClientModelProps {
  isVisible: boolean;
  onClose:() => void;
  isEdit: boolean;
  onEdit:() => void;
  selectedIndex?: string;
  selectedItem?: Client;
}

export const AddClientModel: React.FC<AddClientModelProps> = (
  { isVisible, onClose,isEdit,onEdit,selectedItem,selectedIndex}
) => {
  const [imagePicker, setImagePicker] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      setValue('clientProfile',selectedItem?.clientProfile);
      setValue('clientName',selectedItem?.clientName);
      setValue('clientBio',selectedItem?.clientBio);
      setValue('clientNumber',selectedItem?.clientNumber);
    }
  }, [isEdit]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentDate.toLocaleTimeString('es-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const dateTimeString = `${formattedDate} ${formattedTime}`;

  const [fields] = useState([
    {
      id: 'clientProfile',
      type: 'Image',
      label: 'Profile',
      isRequired: false,
    },
    {
      id: 'clientName',
      type: 'text',
      label: 'Name',
      isRequired: true,
    },
    {
      id: 'clientBio',
      type: 'text',
      label: 'Bio',
      isRequired: true,
    },
    {
      id: 'clientNumber',
      type: 'text',
      label: 'Contact',
      isRequired: true,
    },
  ]);

  const openImagePicker = () => {
    setImagePicker(true);
  };

  const closeImagePicker = () => {
    setImagePicker(false);
  };

  const imageOption = [
    { label: 'Camera', onPress: () => { takePlacePhotoFromCamera(); } },
    { label: 'Gallery', onPress: () => { takePlacePhotoFromGallery(); } },
    { label: 'Cancel', onPress: closeImagePicker },
  ];

  const takePlacePhotoFromCamera = async () => {
    setImagePicker(false);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app requires access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await launchCamera(
          {
            mediaType: 'photo',
            includeBase64: true,
          },
          (response) => {
            if (!response.didCancel) {
              if (response.assets && response.assets.length > 0) {
                const newImages = response.assets[0].base64;
                // const newImages = response.assets?.map((asset) => asset.base64);
                setValue('clientProfile', newImages);
                // setLogoImage([...logoImage, ...newImages]);
                setImagePicker(false);
              }
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
      // console.log('logo value ==>', getValues().logo);
    } catch (err) {
      console.warn(err);
    }
  };

  const takePlacePhotoFromGallery = async () => {
    setImagePicker(false);
    await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
      // selectionLimit: 5,
    }, (response) => {
      if (!response.didCancel) {
        // console.log("response",response);
        const newImage = response?.assets[0]?.base64;
        // console.log("newImage",newImage);
        setValue('clientProfile', newImage);
        // setLogoImage(newImage);
        setImagePicker(false);
      }
    });
  };

  // console.log("imgV",getValues().user_profile);
  const handleOnAddPress = async () => {
    try {
      console.log("name",getValues().clientName);
      console.log("bio",getValues().clientBio);
      console.log("con",getValues().clientNumber);
      console.log("img",getValues().clientProfile);
      const key = 1;
      const allData = {
        clientName: getValues().clientName,
        clientBio: getValues().clientBio,
        clientNumber: getValues().clientNumber,
        clientProfile: getValues().clientProfile,
      };
      const data = JSON.stringify(allData);
      console.log("data",data);
      const json = {
        key,
        value: data,
      };
      console.log("json",json);
      if (isEdit) {
        const id = selectedIndex.toString();
        console.log("id",id);
        console.log("json",json);
        onEdit();
        dispatch(editClient(id, json));
      } else {
        dispatch(addClient(json));
      }
      onClose();
      setValue('clientName','')
      setValue('clientBio','')
      setValue('clientNumber','')
      setValue('clientProfile','')
    }
    catch (error) {
      console.error('Error saving data: ', error);
    }
  }

  return(
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
      <Box
        // onPress={onClose}
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        backgroundColor="blackRgb"
      >
        <Box
          backgroundColor="white"
          flex={1}
          width="100%"
        >
         <Header label={"Add Client"} onBackPress={onClose}/>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {fields.map(field => (
              <Box key={field.id} marginBottom={'r'} >
                <Controller
                  control={control}
                  name={field.id}
                  defaultValue=""
                  rules={{ require: field.isRequired }}
                  render={({ field: { value, onChange } }) => (
                    <>
                    {field.type === 'Image' && (
                        <ProfileImage
                          label={field.label}
                          logoImage={value}
                          openPlaceImagePicker={() => {
                            openImagePicker()
                          }}
                          errorType={String(errors[`${field.id}`]?.type)}
                          error={errors[`${field.id}`]}
                          placeholderLabel={field.label}
                        />
                      )}
                    {field.type === 'text' && (
                      <TextInput
                        isRequired={field.isRequired}
                        textLabel={field.label}
                        value={value}
                        onChangeText={onChange}
                        errorType={String(errors[`${field.id}`]?.type)}
                        hasError={!!errors[`${field.id}`]}
                        error={errors[`${field.id}`]}
                        placeholderLabel={field.label}
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                    </>
                  )}
                />
              </Box>
            ))}
            <Box marginHorizontal={"r"} marginTop={"s"}>
              <Button label={isEdit ? 'Edit' : 'Add'} onPress={handleSubmit(handleOnAddPress)}/>
            </Box>
            <CustomModal
              isVisible={imagePicker}
              options={imageOption}
              onClose={closeImagePicker}
            />
          </KeyboardAwareScrollView>
        </Box>
      </Box>
    </Modal>
  );
}
