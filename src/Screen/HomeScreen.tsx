import React, { useEffect, useMemo, useState } from "react";
import { Screen } from "@/component/Screen";
import { Header } from "@/component/Header/Header";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { Categories } from "@/component/Home/Categories";
import { ScrollView } from "react-native";
import { Box, Pressable, Text } from "@/component";
import { AddCategoriesModel } from "@/component/Home/AddCategoriesModel";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { connect, useSelector } from "react-redux";
import { categoriesReducers } from "@/redux/reducers/categoriesReducers";
import { photosReducers } from "@/redux/reducers/photosReducers";

const HomeScreen: React.FC = () => {
  const [isCategories, setIsCategories] = useState(false);
  const [category, setCategory] = useState([]);
  const categoriesList = useSelector((state: any) => state.categoriesReducers.categoryList);
  console.log("clinicianList=>",categoriesList);

  useEffect( () => {
    callFactory();
  }, []);

  const callFactory = async () => {
    const data = dbCategories.getCategoriesData();
    console.log("datass",await data);
    // return data;
    setCategory(await data);
  }
  console.log("cCCC",category);

  return (
    <Screen flex={1} backgroundColor={'border2'}>
      <Header label={'HomeScreen'} isMenu />
      <ScrollView>
        <Box>
          <Pressable
            onPress={()=>setIsCategories(true)}
            alignItems={"center"}
            justifyContent={"center"}
            alignSelf={"flex-end"}
            marginTop={"r"}
            height={20}
            width={20}
            borderRadius={10}
            marginRight={"r"}
            borderWidth={1}
            borderColor={"black"}>
            <Text>+</Text>
          </Pressable>
        </Box>
        <RecentPhotos/>
        <Categories dateView={category}/>
        <Box height={15}/>
      </ScrollView>
      <AddCategoriesModel isVisible={isCategories} onClose={()=>setIsCategories(false)} />
    </Screen>
  );
};

const mapStateToProps = (state: any) => {
  return {
    categories: state.categoriesReducers?.categoryList || [],
    photos: state.photosReducers?.photosList || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
