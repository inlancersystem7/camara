import React from 'react';
import {Box} from '@/component/Box';
import { Screen } from "@/component/Screen";
import { Text } from "@/component";

export const HomeScreen: React.FC = () => {
  return (
    <Screen flex={1} backgroundColor={'border2'}>
      <Text>Home Screen</Text>
    </Screen>
  );
};
