import React, { useState } from "react";
import { Modal } from 'react-native';
import { Pressable } from "@/component/Pressable";
import { Box } from "@/component/Box";
import { Text } from "@/component/Text";
import { Button } from "@/component/Button";
import { Input } from "@/component/Input";
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from "@/redux/actions/categoriesAction";

export interface AddCategoriesModelProps {
  isVisible: boolean;
  onClose:() => void;
}

export const AddCategoriesModel: React.FC<AddCategoriesModelProps> = (
  { isVisible, onClose}
) => {
  const [name, setName] = useState('');
  console.log("name=>",name);
  const dispatch = useDispatch();

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

  const handleOnAddPress = async () => {
    try {
      const key = 1;
      const allData = {
        name: name,
        date: dateTimeString,
      };
      const data = JSON.stringify(allData);
      const json = {
        key,
        value: data,
      };
      dispatch(addCategories(json));
      onClose();
      setName('');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }

  return(
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        backgroundColor="blackRgb"
      >
        <Box
          borderTopRightRadius={12}
          borderTopLeftRadius={12}
          padding="m"
          minHeight={150}
          backgroundColor="white"
          width="100%"
        >
          <Text marginBottom="r" marginTop="s" color={"primary"} fontSize={18} textAlign={'center'}>
            {'Add Categories'}
          </Text>
          <Input
            placeholder={'Add Categories'}
            keyboardType={'default'}
            value={name}
            onChangeText={(text)=>setName(text)}
          />
          <Box marginTop={"mS"}>
            <Button onPress={handleOnAddPress} label={"Add"}/>
          </Box>
        </Box>
      </Pressable>
    </Modal>
  );
}
