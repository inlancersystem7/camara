import React, {useEffect, useState} from 'react';
import { Box, Pressable, Text } from "@/component";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { stackParamList } from "@/navigation/AppNavigation";
import { connect } from "react-redux";
import { Screen } from "@/component/Screen";
import { Header } from "@/component/Header/Header";
import { UserDetail } from "@/component/Client/UserDetail";
import { FlatList, ScrollView } from "react-native";
import { CategoryView } from "@/component/DashBoard/CategoryView";
import * as photosAction from "@/redux/actions/photosAction";
import { Photos } from "@/component/DashBoard/Photos";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { fonts } from "@/style";
import { Category } from "@/Model/Category";
import { Client } from "@/Model/Client";

export interface ClientViewProps {
  client: Client;
  onDetailPress: () => void;
  onDotPress: () => void;
}

export const ClientView: React.FC<ClientViewProps> = ({client,onDetailPress,onDotPress}:ClientViewProps) => {
  return(
   <Pressable
     onPress={onDetailPress}
     padding={"s"}
     flexDirection={"row"}
     alignItems={"center"}
     marginHorizontal={"s"}>
    <Box
      width={DeviceHelper.calculateWidthRatio(70)}
      height={DeviceHelper.calculateHeightRatio(80)}
      borderRadius={DeviceHelper.calculateHeightRatio(60)}
      overflow={"hidden"}
    >

      {client.clientProfile ? (
        <Image
          source={Images.food2}
          width={DeviceHelper.calculateWidthRatio(70)}
          resizeMode="cover"
          borderRadius={DeviceHelper.calculateHeightRatio(60)}
          height={DeviceHelper.calculateHeightRatio(80)}/>
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
     <Box flex={1} marginLeft={"r"}>
       <Text fontFamily={fonts.semiBold} color={"fontBlack"} fontSize={14}>{client?.clientName}</Text>
       <Text fontFamily={fonts.medium} color={"gray"} fontSize={14}>{client?.clientBio}</Text>
     </Box>
     <Pressable onPress={onDotPress} width={50} height={20} alignItems={"flex-end"}>
       <Image
         source={Images.vertical_dots}
         // source={{ uri: `data:image/jpeg;base64,${photosList.value}` }}
         resizeMode="cover"
         width={DeviceHelper.calculateWidthRatio(10)}
         height={DeviceHelper.calculateHeightRatio(20)}
       />
     </Pressable>
   </Pressable>
)
}
