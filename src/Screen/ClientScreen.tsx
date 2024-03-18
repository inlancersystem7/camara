import React, {useEffect, useState} from 'react';
import { Box, Text } from "@/component";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { stackParamList } from "@/navigation/AppNavigation";
import { connect } from "react-redux";
import { Screen } from "@/component/Screen";
import { Header } from "@/component/Header/Header";
import { UserDetail } from "@/component/DashBoard/UserDetail";
import { FlatList, ScrollView } from "react-native";
import { CategoryView } from "@/component/DashBoard/CategoryView";
import * as photosAction from "@/redux/actions/photosAction";
import { Photos } from "@/component/DashBoard/Photos";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";

const ClientScreen: React.FC = () => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();

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
  console.log("cCCC",category);

  const data = [1,2,3,4,5,4,5,6,7,8,8,9,4];

  return(
    <Screen>
      <Header onBackPress={goBack} label={'Client'}/>
      <UserDetail/>
      <Box marginTop={"r"}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CategoryView
            onCategorySelected={categories => {
              console.log("categories",categories);
            }}
            categoryListItems={category}/>
        </ScrollView>
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
    </Screen>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ClientScreen);
