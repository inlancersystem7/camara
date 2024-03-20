import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@/component/Box";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { ClientList } from "@/component/DashBoard/ClientList";
import { CategoryView } from "@/component/DashBoard/CategoryView";
import { FlatList, ScrollView } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import * as photosAction from "@/redux/actions/photosAction";
import { getDashboardPhotosList } from "@/redux/actions/photosAction";
import { Category } from "@/Model/Category";


export const Dashboard: React.FC = () => {
  const [selectedCategoryForDashboard, setSelectedCategoryForDashboard] =
    useState<Category | null>(null);


  const dispatch = useDispatch();

  const callFactory = async () => {
    dispatch(getCategoriesList([]));
    // dispatch(getDashboardPhotosList([]));
  };

  useEffect(() => {
    callFactory();
  }, []);

  const categoryList = useSelector((state: any) => state.categoriesReducers.categoryList);
  const categoryPhotosList = useSelector((state: any) => state.photosReducers.categoryPhotosList);
  console.log("categoryListt=>",categoryPhotosList);
  useMemo(() => {
    const firstCategoryData = categoryList?.length > 0 ? categoryList[0] : null;
    console.log("firstCategoryData=>",firstCategoryData?.id);
    setSelectedCategoryForDashboard(firstCategoryData);
    dispatch(photosAction.getPhotosListByCategory(firstCategoryData?.id));
  }, []);

  return (
      <Box flex={1}>
        <RecentPhotos label={'Resent Photos'}/>
        <ClientList/>
        <Box marginTop={"r"}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CategoryView
            onCategorySelected={categories => {
              console.log("categories",categories.id);
              setSelectedCategoryForDashboard(categories);
              dispatch(photosAction.getPhotosListByCategory(categories?.id));
            }}
            categoryListItems={categoryList}/>
          </ScrollView>
        </Box>
        <Box>
          <FlatList
            data={categoryPhotosList}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => {
              console.log("item->",item);
              return(
                <Photos photosList={item}/>
              )
            }}
            onEndReachedThreshold={0.1}
          />
        </Box>
      </Box>
  );
};
