import React, { useEffect, useState } from "react";
import { Modal } from 'react-native';
import { Pressable } from "@/component/Pressable";
import { Box } from "@/component/Box";
import { Text } from "@/component/Text";
import { Button } from "@/component/Button";
import { Input } from "@/component/Input";
import { useDispatch, useSelector } from 'react-redux';
import { addCategories, editCategories } from "@/redux/actions/categoriesAction";
import { Category } from "@/Model/Category";
import { fonts } from "@/style";

export interface DeletePhotosModelProps {
  isVisible: boolean;
  onDeletePress:() => void;
  onClose:() => void;
}

export const DeletePhotosModel: React.FC<DeletePhotosModelProps> = (
  { isVisible ,isEdit,onDeletePress,selectedItem,onClose, selectedIndex}
) => {

  return(
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
     <Pressable
        onPress={onClose}
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="blackRgb"
      >
          <Box
            borderRadius={12}
            minHeight={150}
            backgroundColor="white"
            paddingVertical={"r"}
            width="60%"
          >
            <Text marginBottom="r" marginTop={"r"} marginHorizontal={"r"} fontFamily={fonts.semiBold} color={"black"} fontSize={18} textAlign={'center'}>
              {'Delete Photo From inbox ?'}
            </Text>
            {/*<Box height={1} backgroundColor={"gray6"}/>*/}
            <Pressable onPress={onDeletePress} padding={"r"}>
              <Text marginHorizontal={"r"} fontFamily={fonts.medium} color={"red"} fontSize={16} textAlign={'center'}>
                {'Delete'}
              </Text>
            </Pressable>
            <Box height={1} backgroundColor={"gray6"}/>
            <Pressable onPress={onClose} padding={"r"}>
              <Text marginHorizontal={"r"} fontFamily={fonts.medium} color={"black"} fontSize={16} textAlign={'center'}>
                {'Cancel'}
              </Text>
            </Pressable>
          </Box>
      </Pressable>
  </Modal>
);
}
