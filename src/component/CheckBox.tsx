import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from './Box';
import {Image} from './Image';
import {Pressable} from './Pressable';
import {DeviceHelper} from '../helper/DeviceHelper';
import {fonts} from '../style/Fonts';
import {Images} from '../assets';
import {Text} from './Text';

export interface CheckBoxProps {
  label: string;
  label2: string;
  onSelected: () => void;
  isSelect: boolean;
  onPressLabel2?: () => void;
}
export const CheckBox: React.FC<CheckBoxProps> = observer(
  ({label, onSelected, isSelect, label2, onPressLabel2}: CheckBoxProps) => {
    return (
      <Pressable
        onPress={onSelected}
        flexDirection={'row'}
        marginTop={'m'}
        flexWrap={'wrap'}>
        <Box
          width={DeviceHelper.calculateWidthRatio(20)}
          height={DeviceHelper.calculateWidthRatio(20)}
          borderRadius={2}
          backgroundColor={'primary'}
          borderColor={isSelect ? 'primary2' : 'gray12'}
          alignItems={'center'}
          justifyContent={'center'}
          borderWidth={1}>
          {isSelect && (
            <Image
              width={DeviceHelper.calculateWidthRatio(16)}
              height={DeviceHelper.calculateHeightRatio(16)}
              borderRadius={7}
              source={isSelect && Images.rightArrow}
              alignSelf={'center'}
            />
          )}
        </Box>
        <Box flex={1}>
          <Text
            marginStart={'s'}
            color={'black'}
            fontFamily={fonts.light}
            fontSize={14}>
            {label}{' '}
            <Text
              onPress={onPressLabel2}
              color={'minLightBlue'}
              fontFamily={fonts.medium}
              fontSize={14}>
              {label2}
            </Text>
          </Text>
        </Box>
      </Pressable>
    );
  },
);
