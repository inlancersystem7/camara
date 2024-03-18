import React, {useEffect} from 'react';
import {reset, Routes} from '@/navigation/AppNavigation';
import {Box} from '@/component/Box';
import {Screen} from '@/component/Screen';
import {Text} from "@/component";

export const SplashScreen: React.FC = () => {
  useEffect(() => {
    checkAndNavigate();
  }, []);

  const checkAndNavigate = async () => {
        setTimeout(() => {
          reset({
            screenName: Routes.Dashboard,
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
