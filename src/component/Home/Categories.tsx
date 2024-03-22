import React from "react";
import { CategoriesPhotos } from "@/component/Home/CategoriesPhotos";
import { Box } from "@/component";
import {navigate, reset, Routes} from "@/navigation/AppNavigation";
import { useSelector } from "react-redux";
import { categoriesReducers } from "@/redux/reducers/categoriesReducers";
import { CategoriesDto } from "@/Dtos/CategoriesDto";

export interface CategoriesProps {
  dateView: CategoriesDto[];
  onDateViewClose : () => void;
}

export const Categories : React.FC<CategoriesProps> = ({dateView}:CategoriesProps) => {
  // const categoriesList = useSelector((state: any) => state.categoriesReducers.categoryList);
  // console.log("clinicianList=>",categoriesList);

  // const data = [
  //   {
  //     label: 'a',
  //     data: [1,2,3,4]
  //   },
  //   {
  //     label: 'b',
  //     data: [1,2,3,4]
  //   },
  // ]

  const handleOnCamaraPress = () => {
    navigate({
      screenName: Routes.Camera,
      params: {
        isClient: false,
      }
    });
  }
  return (
    <Box>
      {dateView.map((value, index) => (
        <CategoriesPhotos onCamaraPress={handleOnCamaraPress} key={index} Categories={value.name} />
      ))}
    </Box>
  );
};
