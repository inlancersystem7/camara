import React, { useEffect } from "react";
import { Box, Text } from "@/component";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "@/style";
import { Client } from "@/Model/Client";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import { getClientList } from "@/redux/actions/clientAction";
import moment from "moment";

export interface CategoryListProps {
  client: Client;
  onDetailPress: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({client,onDetailPress}:CategoryListProps) => {
  const dispatch = useDispatch();

  const callFactory = async () => {
    dispatch(getCategoriesList([]));
  };

  useEffect(() => {
    callFactory();
  }, []);

  const categoryList = useSelector((state: any) => state.categoriesReducers.categoryList);
  console.log("categoryListt=>",categoryList);

  return(
    <Box marginHorizontal={"r"}>
      {categoryList.map((item,index) => {
        // console.log("item",item);
        return(
          <Box key={index}  padding={"r"}>
            <Text fontFamily={fonts.medium} fontSize={16} color={"black"}>
              {item.name}
            </Text>
          </Box>
        )})}
    </Box>
)}
