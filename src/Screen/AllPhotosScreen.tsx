import { Photo } from "@/Model/Photos";
import React, { useEffect, useState } from "react";
import { Box } from "@/component";
import { Header } from "@/component/Header/Header";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { navigate, Routes, stackParamList } from "@/navigation/AppNavigation";
import { FlatList } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";
import { deletePhotos, getPhotosList } from "@/redux/actions/photosAction";
import moment from "moment";
import { Screen } from "@/component/Screen";
import { DeletePhotosModel } from "@/component/Photos/DeletePhotoModel";

export interface AllPhotosScreenProps {
  photosList: Photo;
}

const AllPhotosScreen: React.FC<AllPhotosScreenProps> = ({photosList}:AllPhotosScreenProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const callFactory = async () => {
    dispatch(getPhotosList([]));
  };

  useEffect(() => {
    callFactory();
  }, []);
  const photoList = useSelector((state: any) => state.photosReducers.photosList);
  console.log("AllphotoListtt==>",photoList.length);

  const handleOnDeletePress = async () => {
    console.log("idd",selectedId);
    try {
      dispatch(deletePhotos(selectedId));
      // await dbPhotos.deletePhotos(selectedId);
      setIsVisible(false);
    }
    catch (error) {
      console.error('Error saving data: ', error);
    }
  }

  const handelImagePress = (index: number) => {
    navigate({ screenName: Routes.ImageView, params: { index } });
  };

  return (
    <Screen flex={1}>
      <Header onBackPress={goBack} label={"photos"}/>
      <FlatList
        data={photoList}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          return(
            <Box key={`${item.id}_${moment()}`} >
            <Photos
              onLongPress={() => {
                setSelectedId(item.id)
                setIsVisible(true);
              }}
              onImgPress={() => handelImagePress(index)}
              photosList={item}/>
            </Box>
          )
        }}
        onEndReachedThreshold={0.1}
      />
      <DeletePhotosModel
        isVisible={isVisible}
        onDeletePress={handleOnDeletePress}
        onClose={()=>setIsVisible(false)}/>
    </Screen>
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


