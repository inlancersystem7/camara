import React, { useState } from "react";
import { Box, Pressable, Text } from "@/component";
import { Header } from "@/component/Header/Header";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import Categories from "@/WaterMelon/Model/Categories";
import { Screen } from "@/component/Screen";
import { CategoryList } from "@/component/Category/CategoryList";
import { ScrollView } from "react-native";
import { AddCategoriesModel } from "@/component/Category/AddCategoriesModel";
import { fonts } from "@/style";
import { categoriesReducers } from "@/redux/reducers/categoriesReducers";

export interface CategoryScreenProps {
  photosList: Categories;
}

const CategoryScreen : React.FC<CategoryScreenProps> = ({photosList}:CategoryScreenProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const [isCategories, setIsCategories] = useState(false);

  const handleOnClose = () => {
    setIsCategories(false);
  }
  return (
    <Screen flex={1}>
      <Header
        rightComponent={
          <Pressable onPress={()=>setIsCategories(true)} marginRight={"r"}>
            <Text textAlign={"right"} color={"black"} fontSize={22} fontFamily={fonts.bold}>
              +
            </Text>
          </Pressable>
        }
        onBackPress={goBack}
        label={"Categories"}/>
      <ScrollView>
        <CategoryList onEdit={() => {setIsCategories(true)}} onClose={handleOnClose} isCategories={isCategories} />
      </ScrollView>
      {/*<AddCategoriesModel isEdit={isEdit} isVisible={isCategories} onClose={()=>setIsCategories(false)} />*/}
    </Screen>
  )
}


const mapStateToProps = (state: any) => {
  return {
    categories : state.categoriesReducers.category || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);


