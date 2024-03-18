import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import { Box, Pressable, Text } from "@/component";
import React from "react";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { HEADER_HEIGHT } from "@/component/Header/Header";
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { fonts } from "@/style";

export interface AnimatedHeaderProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  isMenu?: boolean;
  label?: string;
  // value?: Animated.Value;
  rightComponent?: React.ReactNode;
}

export const AnimatedHeader:  React.FC<AnimatedHeaderProps> = ({value,onMenuPress, label}: AnimatedHeaderProps) => {
  const Header_Max_Height = 52;
  const Header_Min_Height = 0;
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;


  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  //
  // const animatedHeaderColor = value.interpolate({
  //   inputRange: [0, Scroll_Distance],
  //   outputRange: ['#ffffff', '#ffffff'],
  //   extrapolate: 'clamp',
  // });

  // const animatedHeaderHeight = value.interpolate({
  //   inputRange: [-Scroll_Distance, 0],
  //   outputRange: [Header_Max_Height, 0],
  //   extrapolate: 'clamp',
  // });

  const animatedHeaderColor = value.interpolate({
    inputRange: [-Scroll_Distance, 0],
    outputRange: ['#ffffff', '#ffffff'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}>
      <Box
        flexDirection={'row'}
        backgroundColor={'white'}
        justifyContent={'center'}
        width={DeviceHelper.width()}
        >
        <Box flexDirection={'row'} flex={1}>
          <Box
            marginStart={'r'}
            // flex={0.3}
            justifyContent={'center'}
            marginTop={'sr'}>
            <Pressable
              onPress={onMenuPress}
              height={DeviceHelper.calculateHeightRatio(40)}
              width={DeviceHelper.calculateWidthRatio(40)}>
              <Image
                source={Images.menu}
                resizeMode={'stretch'}
                height={DeviceHelper.calculateHeightRatio(25)}
                width={DeviceHelper.calculateWidthRatio(25)}
              />
            </Pressable>
          </Box>
          <Box
            flex={1}
            // marginHorizontal={'s'}
            justifyContent={'center'}
            // alignItems={'center'}
          >
            <Text
              fontSize={18}
              // textAlign={'center'}
              fontFamily={fonts.bold}
              color={'black'}>
              {label}
            </Text>
          </Box>
        </Box>
      </Box>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    // paddingTop: 25,
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});
