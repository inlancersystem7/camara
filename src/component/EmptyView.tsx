import React from 'react';
import {Box} from './Box';
import {Image} from './Image';
import {Images} from '../assets';
import {Text} from './Text';
import {fonts} from "@/style";

export const EmptyView: React.FC = () => {
  return (
    <Box
      justifyContent={'center'}
      alignItems={'center'}
      alignSelf={'center'}
      top={'45%'}
      position={'absolute'}>
      <Box opacity={0.2} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={Images.no_data}
          width={80}
          height={80}
          marginBottom={'r'}
        />
        <Text color={'black'} fontSize={15} fontFamily={fonts.semiBold}>
          No data found
        </Text>
      </Box>
    </Box>
  );
};
