import { Photo } from "@/Model/Photos";
import React, { useEffect } from "react";
import { Box } from "@/component";
import { Header } from "@/component/Header/Header";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import { FlatList } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";
import { getDashboardPhotosList, getPhotosList } from "@/redux/actions/photosAction";

export interface AllPhotosScreenProps {
  photosList: Photo;
}

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({photosList}:AllPhotosScreenProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const dispatch = useDispatch();

  const callFactory = async () => {
    dispatch(getPhotosList([]));
  };

  useEffect(() => {
    callFactory();
  }, []);
  const photoList = useSelector((state: any) => state.photosReducers.photosList);
  console.log("AllphotoListtt==>",photoList.length);

  const data = [1,2,3,4,5,4,5,6,7,8,8,9,4,3,3,4,3,2,1,1,3,4,2,1,1,3,4,2];
  return (
    <Box flex={1}>
      <Header onBackPress={goBack} label={"photos"}/>
      <FlatList
        data={photoList}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          console.log("item->",item);
          return(
            <Photos key={index} photosList={item}/>
          )
        }}
        onEndReachedThreshold={0.1}
      />
    </Box>
  )
}


const mapStateToProps = (state: any) => {
  return {
    photos: state.photosReducers?.photosList || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotosScreen);


