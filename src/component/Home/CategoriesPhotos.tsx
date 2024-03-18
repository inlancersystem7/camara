import React from 'react';
import { Box, Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { useSelector } from "react-redux";

export interface CategoriesPhotosProps {
  Categories?: string;
  onCamaraPress?: () => void;
}


export const CategoriesPhotos : React.FC<CategoriesPhotosProps> = ({Categories,onCamaraPress}: CategoriesPhotosProps) => {

  const photoList = useSelector((state: any) => state.photosReducers.photosList);

  return (
    <Box marginTop={"r"}>
      <Box
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}>
        <Text
          marginLeft={"r"}
          fontSize={16}
          color={"black"}
          fontFamily={fonts.medium}
        >
          {Categories}
        </Text>
        <Pressable onPress={onCamaraPress} width={30}>
          <Image
            source={Images.camera}
            width={DeviceHelper.calculateWidthRatio(20)}
            resizeMode="cover"
            borderRadius={6}
            marginRight={"r"}
            height={DeviceHelper.calculateHeightRatio(20)}/>
        </Pressable>
      </Box>
      <ScrollView style={{marginTop:12}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {photoList.map((item,index) => (
          <Box key={index} borderRadius={6} marginLeft={"r"}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.value}` }}
              width={DeviceHelper.calculateWidthRatio(120)}
              resizeMode="cover"
              borderRadius={6}
              height={DeviceHelper.calculateHeightRatio(100)}/>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};
