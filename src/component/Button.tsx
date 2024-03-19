import React from 'react';
import {Pressable} from './Pressable';
import {fonts} from "@/style";
import {Text} from './Text';
import {DeviceHelper} from "@/helper/DeviceHelper";
import {ActivityIndicator} from 'react-native';
import {Theme} from "@/style";

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  marginHorizontal?: keyof Theme['spacing'];
  isActive?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled,
  isLoading,
  marginHorizontal,
  isActive = true,
}: ButtonProps) => {
  const isShowLoader = (): boolean => {
    return !!isLoading;
  };
  return (
    <Pressable
      onPress={onPress}
      shadowColor={'gray'}
      // disabled={isDisabled}
      // marginHorizontal={marginHorizontal ?? 'r'}
      shadowOffset={{width: 0, height: 1}}
      shadowOpacity={0.3}
      shadowRadius={2}
      borderRadius={12}
      paddingHorizontal={'r'}
      justifyContent={'center'}
      disabled={disabled}
      height={DeviceHelper.calculateHeightRatio(62)}
      borderWidth={1}
      borderColor={"black"}
      // backgroundColor={disabled || !isActive ? 'white5' : 'orange'}
      >
      {isShowLoader() ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          color={'black'}
          fontSize={18}
          textAlign={'center'}
          fontFamily={fonts.medium}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};
