import React from "react";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { Box, Pressable, Text } from "@/component";
import { navigate, Routes } from "@/navigation/AppNavigation";
import { Category } from "@/Model/Category";
import { Modal, ScrollView } from "react-native";
import { fonts } from "@/style";
import moment from "moment";

export interface SelectClientCategoryModelProps {
  visible: boolean
  onClose: ()=> void
  onItemPress: () => void
}

export const SelectClientCategoryModel: React.FC<SelectClientCategoryModelProps> = ({visible,onClose,onItemPress}:SelectClientCategoryModelProps) => {

  const handleOnListPress = (item,name) => {
    console.log("item",item);
    console.log("name",name);
  }

  const option = [
    {
      name: 'General Form',
      formType: 'type',
    },
    {
      name: 'Pressure Vessel',
      formType: 'type2',
    },
  ];

  return (
    <Box>
      <Modal animationType="fade" visible={visible} transparent onRequestClose={onClose}>
        <Pressable
          onPress={onClose}
          flex={0.4}
          justifyContent="flex-end"
          backgroundColor="blackRgb"
        />
        <Box
          paddingHorizontal="r"
          flex={0.6}
          borderTopRightRadius={12}
          borderTopLeftRadius={12}
          width="100%"
          backgroundColor="white"
        >
          <Text
            marginTop="s"
            fontFamily={fonts.bold}
            fontSize={18}
            color="black"
          >
            Select Equipment Type
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box marginTop="r">
              {option.map((item, index) => (
                <Box key={`${item.formType}_${moment()}`}>
                  <Box flexDirection="row" alignItems="center">
                    <Pressable
                      flex={1}
                      // onPress={onOptionStart}
                      onPress={() => {
                        handleOnListPress(item.formType, item.name);
                      }}
                      // alignItems="center"
                      // minHeight={40}
                      justifyContent="center"
                    >
                      <Text fontFamily={fonts.regular} fontSize={16} color="black">{item.name}</Text>
                    </Pressable>
                  </Box>
                  {
                    index + 1 < option?.length && (
                      <Box marginVertical="sr" height={2} backgroundColor="gray2" />
                    )
                  }
                </Box>
              ))}
            </Box>
            <Box height={12} />
          </ScrollView>
        </Box>
      </Modal>
    </Box>
  );
};
