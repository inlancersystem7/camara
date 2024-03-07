import React from 'react';
import { Screen } from "@/component/Screen";
import { Header } from "@/component/Header/Header";
import { CurrentPhotos } from "@/component/Home/CurrentPhotos";
import { Categories } from "@/component/Home/Categories";
import { ScrollView } from "react-native";
import { Box } from "@/component";

export const HomeScreen: React.FC = () => {
  return (
    <Screen flex={1} backgroundColor={'border2'}>
      <Header label={'HomeScreen'} isMenu />
      <ScrollView>
        <CurrentPhotos/>
        <Categories/>
        <Box height={15}/>
      </ScrollView>
    </Screen>
  );
};
