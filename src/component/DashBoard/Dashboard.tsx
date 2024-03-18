import React, { useEffect, useState } from "react";
import { Box } from "@/component/Box";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { ClientList } from "@/component/DashBoard/ClientList";
import { CategoryView } from "@/component/DashBoard/CategoryView";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { FlatList } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";


export const Dashboard: React.FC = () => {

  const [category, setCategory] = useState([])
  useEffect( () => {
    callFactory();
  }, []);

  const callFactory = async () => {
    const data = dbCategories.getCategoriesData();
    console.log("datass",await data);
    // return data;
    setCategory(await data);
  }

  const data = [1,2,3,4,5,4,5,6,7,8,8,9,4];
  return (
      <Box flex={1}>
        <RecentPhotos label={'Resent Photos'}/>
        <ClientList/>
        <Box marginTop={"r"}>
          <CategoryView
            onCategorySelected={categories => {
              console.log("categories",categories);
            }}
            categoryListItems={category}/>
        </Box>
        <Box>
          <FlatList
            data={data}
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
