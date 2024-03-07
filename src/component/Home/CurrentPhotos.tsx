import React from 'react';
import { Box, Text } from "@/component";
import { fonts } from "@/style";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";

export const CurrentPhotos: React.FC = () => {

  const data = [1,2,3,4,5,6];
  return (
    <Box marginTop={"r"}>
      <Text
        marginLeft={"r"}
        fontSize={16}
        color={"black"}
        fontFamily={fonts.medium}
      >
        Current Photos
      </Text>
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
