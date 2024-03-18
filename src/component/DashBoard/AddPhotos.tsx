import React from "react";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { Box, Pressable, Text } from "@/component";
import { navigate, Routes } from "@/navigation/AppNavigation";
import { Images } from "@/assets";
import { Image } from "@/component/Image";


export const AddPhotos: React.FC = () => {

  const handleOnAddPress = () => {
    navigate({
      screenName: Routes.Camera,
    });
  }

  return (
    <Pressable
      onPress={handleOnAddPress}
      alignSelf={"center"}
      position={"absolute"}
      bottom={-60}
      elevation={10}
      // borderWidth={2}
      borderColor={"pink"}
      // borderRadius={DeviceHelper.calculateHeightRatio(100)}
      // height={DeviceHelper.calculateHeightRatio(220)}
      // width={DeviceHelper.calculateWidthRatio(200)}
      height={120}
      width={120}
      borderRadius={60}
      // transform= {{ scaleX: 2 }}
      backgroundColor={"pink5"}
      shadowColor={'gray4'}
      shadowOffset= { {width: 0, height: 2} }
      shadowOpacity={0.8}
      alignItems={"center"}
      shadowRadius={4}
      padding={"r"}
    >
      <Image
        marginTop={"s"}
        source={Images.plus}
        resizeMode={'stretch'}
        height={DeviceHelper.calculateHeightRatio(30)}
        width={DeviceHelper.calculateWidthRatio(30)}
      />
    </Pressable>
  );
};
