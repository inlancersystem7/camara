import { Photo } from "@/Model/Photos";
import React, { useEffect, useState } from "react";
import { Box } from "@/component";
import { Header } from "@/component/Header/Header";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import { FlatList } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";
import { getPhotosList } from "@/redux/actions/photosAction";
import moment from "moment";

export interface AllPhotosScreenProps {
  photosList: Photo;
}

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({photosList}:AllPhotosScreenProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const dispatch = useDispatch();
  // const [photoList, setPhotoList] = useState([]);

  const callFactory = async () => {
    dispatch(getPhotosList([]));
    // const photosData =  dbPhotos.getPhotosData();
    // setPhotoList(await photosData)
  };

  useEffect(() => {
    callFactory();
  }, []);
  const photoList = useSelector((state: any) => state.photosReducers.photosList);
  console.log("AllphotoListtt==>",photoList.length);

  return (
    <Box flex={1}>
      <Header onBackPress={goBack} label={"photos"}/>
      <FlatList
        data={photoList}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          return(
            <Box key={`${item.id}_${moment()}`} >
            <Photos photosList={item}/>
            </Box>
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


