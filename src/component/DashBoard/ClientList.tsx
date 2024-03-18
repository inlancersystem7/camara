import React from "react";
import { Box } from "@/component/Box";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { Text } from "@/component";
import { fonts } from "@/style";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { ScrollView } from "react-native";


export const ClientList: React.FC = () => {

  const data = [1,2,3,4,5,6];
  return (
    <Box marginTop={"r"}>
      <Text marginLeft={"r"} fontSize={14} color={"black"} fontFamily={fonts.semiBold}>{'Clients'}</Text>
      <ScrollView style={{marginTop:12}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item,index) => {
          // console.log("item",item);
          return(
            <Box key={index} borderRadius={2} marginHorizontal={"s"}>
              <Image
                source={Images.food2}
                width={DeviceHelper.calculateWidthRatio(80)}
                resizeMode="cover"
                borderRadius={DeviceHelper.calculateHeightRatio(70)}
                height={DeviceHelper.calculateHeightRatio(90)}/>
              <Text textAlign={"center"} fontFamily={fonts.regular} color={"black2"}>{'Name'}</Text>
            </Box>
          )})}
      </ScrollView>
    </Box>
);
};
