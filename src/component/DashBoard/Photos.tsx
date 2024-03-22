import React from "react";
import { Box } from "@/component/Box";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { Photo } from "@/Model/Photos";
import { Pressable } from "@/component";
import { Category } from "@/Model/Category";

export interface PhotosProps {
  photosList: Photo;
  onLongPress?: () => void;
  onImgPress?: () => void;
}

export const Photos: React.FC<PhotosProps> = ({photosList,onImgPress,onLongPress}:PhotosProps) => {
  // console.log("photoListtt=>",photosList.value);
  return (
    <Pressable
      onPress={onImgPress}
      onLongPress={onLongPress}
      flex={1} margin={"ss"}>
      <Image
        // source={photosList.value}
        source={{ uri: `data:image/jpeg;base64,${photosList.value}` }}
        resizeMode="cover"
        width={DeviceHelper.calculateWidthRatio(133)}
        height={DeviceHelper.calculateHeightRatio(140)}
      />
    </Pressable>
);
};
