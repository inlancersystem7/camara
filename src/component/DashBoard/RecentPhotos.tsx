import React, { useEffect, useState } from "react";
import { Box, Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { FlatList, ScrollView } from "react-native";
import { Images } from "@/assets";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { useDispatch, useSelector } from "react-redux";
import { navigate, Routes } from "@/navigation/AppNavigation";
import { Photos } from "@/component/DashBoard/Photos";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { dbPhotos } from "@/WaterMelon/DBHelper/DBPhotos";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import { getDashboardPhotosList } from "@/redux/actions/photosAction";
import { photosReducers } from "@/redux/reducers/photosReducers";


export interface RecentPhotosProps {
  label: string;
  onDateViewClose? : () => void;
}

export const RecentPhotos: React.FC<RecentPhotosProps> = ({label}:RecentPhotosProps) => {

  const dispatch = useDispatch();
  const [photoList, setPhotoList] = useState([]);
  const callFactory = async () => {
    dispatch(getDashboardPhotosList([]));
    const photosData =  dbPhotos.getFirstPhotosData();
    setPhotoList(await photosData)
  };

  useEffect(() => {
    callFactory();
  }, []);

  const photosList = useSelector((state: any) => state.photosReducers.dashboardPhotosList);

  const handleOnMorePress = () => {
    navigate({
      screenName: Routes.AllPhotos,
    });
  }
  // console.log("resent",photosList.length);

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
          {photosList.map((item,index) => {
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
                source={{ uri: `data:image/jpeg;base64,${item.value}` }}
                // source={Images.food2}
                width={DeviceHelper.calculateWidthRatio(90)}
                resizeMode="cover"
                borderRadius={6}
                height={DeviceHelper.calculateHeightRatio(95)}/>
            </Box>
          )})}
        {photosList.length > 6 && (
        <Pressable
          marginTop={"s"}
          onPress={handleOnMorePress}
          margin={"ss"}
          borderRadius={6}
          justifyContent={"center"}
          alignItems={"center"}
          borderWidth={1}
          borderColor={"black"}
          height={DeviceHelper.calculateHeightRatio(95)}
          width={DeviceHelper.calculateWidthRatio(90)}>
          <Text fontSize={12} fontFamily={fonts.medium} color={"black"}>view</Text>
          <Text fontSize={12} fontFamily={fonts.medium} color={"black"}>more</Text>
        </Pressable>
        )}
      </Box>
    </Box>
  );
};
