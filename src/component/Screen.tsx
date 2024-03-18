import React from 'react';
import {Box} from './Box';
import {ColorValue, StatusBar, StatusBarStyle} from 'react-native';
import {ResponsiveValue, useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';

export enum StatusBarType {
  Light,
  Dark = 1,
}

export interface ScreenProps {
  children: React.ReactNode;
  statusBarType?: StatusBarType;
  backgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
  hideStatusBar?: boolean;
  translucent?: boolean;
}

export const Screen: React.FC<ScreenProps> = (props: ScreenProps) => {
  const {
    children,
    statusBarType,
    backgroundColor,
    hideStatusBar = false,
    translucent = false,
  } = props;
  const {colors} = useTheme<Theme>();

  /**
   * Return the color
   * of statusbar based on the type
   * of statusbar
   */
  const statusBarColor = (): ColorValue => {
    switch (statusBarType) {
      case StatusBarType.Light:
        return colors.white;
      case StatusBarType.Dark:
        return colors.black;
      default:
        return colors.white;
    }
  };

  const statusBarStyle = (): StatusBarStyle => {
    switch (statusBarType) {
      case StatusBarType.Light:
        return 'dark-content';
      case StatusBarType.Dark:
        return 'light-content';
      default:
        return 'dark-content';
    }
  };

  return (
    <Box
      flex={1}
      style={{
        paddingTop: translucent ? StatusBar.currentHeight : 0,
      }}
      backgroundColor={backgroundColor ?? 'white'}>
      <StatusBar animated backgroundColor={statusBarColor()} barStyle={statusBarStyle()} />
      {children}
    </Box>
  );
};
