import React, {useEffect} from 'react';
import {reset, Routes} from '@/navigation/AppNavigation';
import {Box} from '@/component/Box';
import {Image} from '@/component/Image';
import {Images} from '@/assets';
import {accountStore} from '@/stores/AccountStore';
import {Screen} from '@/component/Screen';
import {userFactory} from '@/factory/UserFactory';
import { Text } from "@/component";

export const SplashScreen: React.FC = () => {
  useEffect(() => {
    checkAndNavigate();
  }, []);

  const checkAndNavigate = async () => {
        setTimeout(() => {
          reset({
            screenName: Routes.Home,
          });
        }, 2000);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     reset({
  //       screenName: Routes.Login,
  //     });
  //   }, 2000);
  // }, []);

  return (
    <Screen>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text>SplaceScreen</Text>
      </Box>
    </Screen>
  );
};
