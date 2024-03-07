import React from "react";
import { CategoriesPhotos } from "@/component/Home/CategoriesPhotos";
import { Box } from "@/component";

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
  return (
    <Box>
      {data.map((value, index) => (
        <CategoriesPhotos key={index} Categories={value.label}/>
      ))}
    </Box>
  );
};
