import { Photo } from "@/Model/Photos";
import React from "react";
import { Box } from "@/component";
import { Header } from "@/component/Header/Header";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import { FlatList } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";

export interface AllPhotosScreenProps {
  photosList: Photo;
}

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({photosList}:AllPhotosScreenProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();

  const data = [1,2,3,4,5,4,5,6,7,8,8,9,4,3,3,4,3,2,1,1,3,4,2,1,1,3,4,2];
  return (
    <Box flex={1}>
      <Header onBackPress={goBack} label={"photos"}/>
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
  )
}


const mapStateToProps = (state: any) => {
  return {

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotosScreen);


