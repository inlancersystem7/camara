import React from "react";
import { Box } from "@/component/Box";
import { Text } from "@/component";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { fonts } from "@/style";
import { Client } from "@/Model/Client";
import { DeviceHelper } from "@/helper/DeviceHelper";

export interface UserDetailProps {
  client: Client;
}

export const UserDetail: React.FC<UserDetailProps> = ({client}:UserDetailProps) => {
  return (
    <Box>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Box
          marginTop={"r"}
          marginLeft={"r"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
          backgroundColor={"red"}
          height={90}
          width={90}
          borderRadius={45}>
          <Image
            source={Images.food2}
            width={90}
            resizeMode="cover"
            borderRadius={45}
            height={90}/>
          {client.clientProfile ? (
            <Image
              source={Images.food2}
              width={90}
              resizeMode="cover"
              borderRadius={45}
              height={90}/>
          ):(
            <Image
              position={"absolute"}
              source={Images.placeholder}
              width={90}
              resizeMode="cover"
              borderRadius={45}
              height={90}/>
          )}
        </Box>
        <Box marginLeft={"l"}>
          <Text
            color={"black"}
            fontFamily={fonts.bold}
            fontSize={16}>10</Text>
          <Text
            color={"fontBlack"}
            fontFamily={fonts.regular}
            fontSize={14}>Post</Text>
        </Box>
      </Box>
      <Box marginLeft={"r"} marginTop={"es"}>
        <Text
          color={"fontBlack2"}
          fontFamily={fonts.medium}
          fontSize={14}>
          {client.clientName}
        </Text>
        <Text
          color={"fontBlack2"}
          fontFamily={fonts.regular}
          fontSize={14}>
          {client.clientBio}
        </Text>
        <Text
          color={"fontBlue2"}
          fontFamily={fonts.medium}
          fontSize={14}>
          {client.clientNumber}
        </Text>
      </Box>
    </Box>
  );
};
