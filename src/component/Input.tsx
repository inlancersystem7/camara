import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Box } from './Box';
import { DeviceHelper } from '../helper/DeviceHelper';
import { Text } from './Text';
import { Theme } from '../style/Theme';
import { Pressable } from './Pressable';
import { Image } from './Image';
import { Images } from '../assets';
import { fonts } from '../style/Fonts';
import { FieldError, FieldErrorProps } from './FieldError';

export interface InputHintProps {
  hint?: string;
}

export interface InputImageProps {
  // @ts-ignore
  iconName?: Images;
}

export interface InputProps
  extends InputHintProps,
    InputImageProps,
    TextInputProps {
  onPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  isBottomMargin?: boolean;
  hasError?: boolean;
  isCountry?: boolean;
  countryName?: string;
  isPatternInput?: boolean;
  maxLength?: number;
  isHeight?: boolean;
  height?: number;
  isIcon?: boolean;
  onApply?: () => void;
  disable?: boolean;
}

export const InputHint: React.FC<InputHintProps> = ({ hint }: InputHintProps) => (
  <Box
    position="absolute"
    paddingHorizontal="ss"
    top={-8}
    left={16}
    backgroundColor="white"
  >
    <Text variant="inputHint">{hint}</Text>
  </Box>
);

export const InputImage: React.FC<InputImageProps> = ({
                                                        iconName,
                                                      }: InputImageProps) => (
  <Box>
    <Image
      source={iconName}
      width={DeviceHelper.calculateWidthRatio(20)}
      height={DeviceHelper.calculateHeightRatio(20)}
    />
  </Box>
);

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    onPress,
    leftComponent,
    isBottomMargin = false,
    hasError = false,
    maxLength,
    height,
    disable = false,
    rightComponent,
  } = props;
  const textInputProps = props as TextInputProps;
  const fieldErrorProps = props as FieldErrorProps;
  const { multiline, value, placeholder, keyboardType, autoCapitalize } =		textInputProps;
  const { colors } = useTheme<Theme>();
  const { black } = colors;
  const { gray } = colors;

  return (
    <Box >
      <Pressable
        disabled={!onPress}
        width="100%"
        borderColor={hasError ? 'red' : 'gray5'}
        marginBottom={isBottomMargin ? 'ls' : 'ss'}
        borderWidth={2}
        borderRadius={10}
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        onPress={DeviceHelper.ios() ? undefined : onPress}
        overflow="hidden"
        paddingVertical={multiline ? 'r' : 'none'}
        height={DeviceHelper.calculateHeightRatio(height ?? 55)}
      >
        {leftComponent}
        <TextInput
          editable={!onPress && !disable}
          onTouchEnd={onPress}
          maxLength={maxLength}
          style={{
            fontFamily: fonts.regular,
            fontSize: 16,
            flex: 1,
            height: '100%',
            paddingTop: multiline ? 16 : 0,
            paddingStart: leftComponent ? 0 : 16,
            marginTop:multiline ? 10 : 0,
            color: black,
            paddingVertical: multiline ? 16 : 0,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          {...textInputProps}
          keyboardType={keyboardType}
          value={value}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={gray}
        />
        {rightComponent && rightComponent}
        {onPress && (
          <Image
            source={Images.downArrow}
            resizeMode="stretch"
            marginRight="r"
            width={DeviceHelper.calculateWidthRatio(10)}
            height={DeviceHelper.calculateWidthRatio(6)}
          />
        )}
      </Pressable>
      <Box alignSelf="flex-end">
        <FieldError {...fieldErrorProps} />
      </Box>
    </Box>
  );
};
