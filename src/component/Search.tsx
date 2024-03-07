import React from 'react';
import {Box} from './Box';
import {DeviceHelper} from '../helper/DeviceHelper';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';
import {SvgIcon} from '../assets/SvgIcon';
import {Pressable} from './Pressable';
import {Image} from './Image';
import {Images} from '../assets';
import {fonts} from '../style/Fonts';

export interface SearchProps {
  onChangeText?: (text: string) => void;
  onPress: () => void;
  searchCloseApiCall?: () => void;
  placeholder: string;
  isEditable?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  onChangeText,
  onPress,
  searchCloseApiCall,
  placeholder,
  isEditable,
}: SearchProps) => {
  const {colors} = useTheme<Theme>();
  const [searchData, setSearchData] = React.useState('');

  return (
    <Pressable
      height={DeviceHelper.calculateHeightRatio(56)}
      onPress={onPress}
      disabled={isEditable}
      backgroundColor={'white'}
      shadowColor={'black'}
      shadowOffset={{width: 0, height: 1}}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={4}
      borderRadius={20}
      flexDirection={'row'}
      paddingHorizontal={'r'}
      marginTop={'es'}
      alignItems={'center'}
      marginHorizontal={'m'}>
      {/*<SvgIcon*/}
      {/*  name={'search'}*/}
      {/*  width={DeviceHelper.calculateWidthRatio(18)}*/}
      {/*  height={DeviceHelper.calculateHeightRatio(18)}*/}
      {/*/>*/}
      <Box
        flex={1}
        height={DeviceHelper.calculateHeightRatio(45)}
        flexDirection={'row'}
        alignItems={'center'}
        overflow={'hidden'}>
        <Image source={Images.Search} height={23} width={23} />
        <TextInput
          style={{
            marginStart: 12,
            minWidth: 200,
            color: colors.gray,
            fontSize: 15,
            fontFamily: fonts.regular,
            alignItems: 'center',
            lineHeight: 15,
            padding: 0,
            fontWeight: '700',
          }}
          editable={isEditable}
          placeholder="Search restaurants"
          placeholderTextColor={colors.gray6}
          onChangeText={text => {
            setSearchData(text);
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          value={searchData}
        />
      </Box>
    </Pressable>
  );
};
