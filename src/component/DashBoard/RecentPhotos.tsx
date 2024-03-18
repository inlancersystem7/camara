import React from 'react';
import { Box, Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { useSelector } from "react-redux";
import { navigate, Routes } from "@/navigation/AppNavigation";


export interface RecentPhotosProps {
  label: string;
  onDateViewClose? : () => void;
}

export const RecentPhotos: React.FC<RecentPhotosProps> = ({label}:RecentPhotosProps) => {

  const photoList = useSelector((state: any) => state.photosReducers.photosList);
  console.log("photoList=>",photoList);

  const data = [1,2,3,4,5];

  const handleOnMorePress = () => {
    navigate({
      screenName: Routes.AllPhotos,
    });
  }

  return (
    <Box marginTop={"s"}>
      <Text
        marginLeft={"r"}
        fontSize={16}
        color={"black"}
        fontFamily={fonts.semiBold}
      >
        {label}
      </Text>
      <ScrollView style={{marginTop:12}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item,index) => {
          // console.log("item",item);
          return(
          <Box key={index} borderRadius={2} margin={"ss"}>
            <Image
              source={Images.food2}
              width={DeviceHelper.calculateWidthRatio(120)}
              resizeMode="cover"
              borderRadius={6}
              height={DeviceHelper.calculateHeightRatio(120)}/>
          </Box>
        )})}
        <Pressable
          onPress={handleOnMorePress}
          margin={"ss"}
          borderRadius={6}
          justifyContent={"center"}
          alignItems={"center"}
          borderWidth={2}
          borderColor={"pink7"}
          height={DeviceHelper.calculateHeightRatio(120)}
          width={DeviceHelper.calculateWidthRatio(120)}>
          <Text fontSize={14} fontFamily={fonts.semiBold} color={"pink7"}>view more</Text>
        </Pressable>
      </ScrollView>
    </Box>
  );
};
