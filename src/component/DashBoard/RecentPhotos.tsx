import React from 'react';
import { Box, Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { FlatList, ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { useSelector } from "react-redux";
import { navigate, Routes } from "@/navigation/AppNavigation";
import { Photos } from "@/component/DashBoard/Photos";


export interface RecentPhotosProps {
  label: string;
  onDateViewClose? : () => void;
}

export const RecentPhotos: React.FC<RecentPhotosProps> = ({label}:RecentPhotosProps) => {

  const photoList = useSelector((state: any) => state.photosReducers.photosList);
  console.log("photoList=>",photoList);

  const data = [1,2,3,4,5,6,7];

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
      <Box flexDirection={"row"} marginTop={"s"} marginLeft={"s"} width={'100%'} flexWrap={"wrap"}>
          {data.map((item,index) => {
            // console.log("item",item);
            return(
            <Box
              key={index}
              marginTop={"s"}
              borderRadius={2}
              height={DeviceHelper.calculateHeightRatio(90)}
              width={DeviceHelper.calculateWidthRatio(95)}
              margin={"ss"}>
              <Image
                source={Images.food2}
                width={DeviceHelper.calculateWidthRatio(90)}
                resizeMode="cover"
                borderRadius={6}
                height={DeviceHelper.calculateHeightRatio(95)}/>
            </Box>
          )})}
        <Pressable
          marginTop={"s"}
          onPress={handleOnMorePress}
          margin={"ss"}
          borderRadius={6}
          justifyContent={"center"}
          alignItems={"center"}
          borderWidth={1}
          borderColor={"black"}
          height={DeviceHelper.calculateHeightRatio(90)}
          width={DeviceHelper.calculateWidthRatio(95)}>
          <Text fontSize={12} fontFamily={fonts.medium} color={"black"}>view</Text>
          <Text fontSize={12} fontFamily={fonts.medium} color={"black"}>more</Text>
        </Pressable>
      </Box>
    </Box>
  );
};
