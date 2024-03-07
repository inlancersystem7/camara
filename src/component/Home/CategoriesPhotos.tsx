import React from 'react';
import { Box, Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";

export interface CategoriesPhotosProps {
  Categories?: string;
  handleCloseModal?: () => void;
}


export const CategoriesPhotos : React.FC<CategoriesPhotosProps> = ({Categories}: CategoriesPhotosProps) => {

  const data = [1,2,3,4,5,6, 7 , 7 , 7];
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
        <Pressable width={30}>
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
        {data.map(index => (
          <Box key={index} borderRadius={6} marginLeft={"r"}>
            <Image
              source={Images.food2}
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
