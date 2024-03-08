import React from "react";
import { CategoriesPhotos } from "@/component/Home/CategoriesPhotos";
import { Box } from "@/component";
import {navigate, reset, Routes} from "@/navigation/AppNavigation";

export const Categories : React.FC = () => {
  const data = [
    {
      label: 'a',
      data: [1,2,3,4]
    },
    {
      label: 'b',
      data: [1,2,3,4]
    },
  ]

  const handleOnCamaraPress = () => {
    navigate({
      screenName: Routes.Camera,
    });
  }
  return (
    <Box>
      {data.map((value, index) => (
        <CategoriesPhotos onCamaraPress={handleOnCamaraPress} key={index} Categories={value.label} />
      ))}
    </Box>
  );
};
