import React, { useEffect } from "react";
import { Box } from "@/component/Box";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { ScrollView } from "react-native";
import { navigate, Routes } from "@/navigation/AppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getClientList, getDashboardClientList } from "@/redux/actions/clientAction";
import { Category } from "@/Model/Category";
import { Client } from "@/Model/Client";

export interface ClientListProps {
  onClientAdd: () => void;
  clientList: Client[];
}

export const ClientList: React.FC<ClientListProps> = ({onClientAdd,clientList}:ClientListProps) => {

   // console.log("dashboardClientList=>",clientList);

  const handleOnMorePress = () => {
    navigate({
      screenName: Routes.Client,
    });
  }

  return (
    <Box marginTop={"r"}>
      {clientList.length > 0 && (
       <Box flexDirection={"row"} justifyContent={"space-between"}>
        <Text marginLeft={"r"} fontSize={14} color={"black"} fontFamily={fonts.semiBold}>{'Clients'}</Text>
         <Pressable onPress={onClientAdd} position={"absolute"} marginTop={'mES'} backgroundColor={"white"} alignItems={"center"} right={12} height={35} width={30}>
           <Text color={"black"} fontSize={22} fontFamily={fonts.bold}>+</Text>
         </Pressable>
       </Box>
      )}
      <Box flexDirection={"row"} marginTop={"s"} marginLeft={"s"} width={'100%'} flexWrap={"wrap"}>
        {clientList.map((item,index) => {
          // console.log("item",item);
          return(
            <Box marginTop={"s"} marginHorizontal={"s"}>
              <Box
                width={DeviceHelper.calculateWidthRatio(80)}
                height={DeviceHelper.calculateHeightRatio(90)}
                borderRadius={DeviceHelper.calculateHeightRatio(70)}
                overflow={"hidden"}
              >

                {item.clientProfile ? (
                  <Image
                    source={Images.food2}
                    width={DeviceHelper.calculateWidthRatio(80)}
                    resizeMode="cover"
                    borderRadius={DeviceHelper.calculateHeightRatio(70)}
                    height={DeviceHelper.calculateHeightRatio(90)}/>
                ):(
                  <Image
                    position={"absolute"}
                    source={Images.placeholder}
                    width={DeviceHelper.calculateWidthRatio(70)}
                    resizeMode="cover"
                    borderRadius={DeviceHelper.calculateHeightRatio(60)}
                    height={DeviceHelper.calculateHeightRatio(80)}/>
                )}
              </Box>
              <Text textAlign={"center"} fontFamily={fonts.regular} color={"black2"}>{item?.clientName}</Text>
            </Box>
          )})}
        {clientList.length > 6 && (
          <Pressable
            marginTop={"s"}
            marginLeft={"s"}
            onPress={handleOnMorePress}
            justifyContent={"center"}
            alignItems={"center"}
            borderWidth={1}
            borderColor={"black"}
            width={DeviceHelper.calculateWidthRatio(80)}
            borderRadius={DeviceHelper.calculateHeightRatio(70)}
            height={DeviceHelper.calculateHeightRatio(90)}>
            <Text fontSize={10} fontFamily={fonts.medium} color={"black"}>view</Text>
            <Text fontSize={10} fontFamily={fonts.medium} color={"black"}>more</Text>
          </Pressable>
        )}
      </Box>
    </Box>
);
};
