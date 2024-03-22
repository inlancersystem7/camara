import React, { useEffect, useState } from "react";
import { Box, Pressable, Text } from "@/component";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "@/style";
import { Client } from "@/Model/Client";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import { getClientList } from "@/redux/actions/clientAction";
import moment from "moment";
import { Image } from "@/component/Image";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { Images } from "@/assets";
import { CustomModal } from "@/component/Action";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { AddCategoriesModel } from "@/component/Category/AddCategoriesModel";
import { Category } from "@/Model/Category";
import { navigate, Routes } from "@/navigation/AppNavigation";

export interface CategoryListProps {
  client: Client;
  onClose: () => void;
  onEdit: () => void;
  isCategories: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({client,onEdit,onClose,isCategories}:CategoryListProps) => {
  const dispatch = useDispatch();
  const [isVisible,setIsVisible]=useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  console.log("item=>",selectedItem);

  const option = [
    { label: 'Edit', onPress: () => { handleOnPressEdit(); } },
    { label: 'Delete', onPress: () => { showDeleteConfirmation(); } },
    { label: 'Camera', onPress: () => { handleOnPressCamera(); } },
    { label: 'Cancel', onPress: () => { closeListModel(); } },
  ];

  const showDeleteConfirmation = () => {
    setIsDelete(true);
  };

  const handleOnPressCamera = async () => {
    navigate({
      screenName: Routes.Camera,
      params: {
        isCategory: true,
        categoryId: selectedIndex,
      },
    });
  }

  const handleOnPressEdit = async () => {
      setIsEdit(true);
      setIsVisible(false);
      onEdit();
  }

  const handleOnPressDelete = async (id:string) => {
    try {
      await dbCategories.deleteCategoryRecord(id);
      await callFactory();
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  }
  const callFactory = async () => {
    dispatch(getCategoriesList([]));
  };

  const openListModel = (index) => {
    console.log("index",index);
    setSelectedIndex(index);
    setIsVisible(true);
  };

  const closeListModel = () => {
    setIsVisible(false);
    setIsDelete(false);
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
          <Box key={index} flexDirection={"row"} justifyContent={"space-between"} paddingRight={"ss"}  padding={"r"}>
            <Text fontFamily={fonts.medium} fontSize={16} color={"black"}>
              {item.name}
            </Text>
            <Pressable onPress={() => {
              openListModel(item.id.toString());
              setSelectedItem(item);
            }}>
              <Image
                source={Images.vertical_dots}
                // source={{ uri: `data:image/jpeg;base64,${photosList.value}` }}
                resizeMode="cover"
                width={DeviceHelper.calculateWidthRatio(10)}
                height={DeviceHelper.calculateHeightRatio(20)}
              />
            </Pressable>
          </Box>
        )})}
      <CustomModal
        isVisible={isVisible}
        options={option}
        isDelete={isDelete}
        onYesPress={() => {
          handleOnPressDelete(selectedIndex);
          setIsDelete(false);
          setIsVisible(false);
        }}
        onClose={closeListModel}/>
      <AddCategoriesModel
        onEdit={()=> {
          setSelectedItem(null);
          setIsEdit(false);
        }}
        selectedItem={selectedItem}
        selectedIndex={selectedIndex}
        isEdit={isEdit}
        isVisible={isCategories}
        onClose={() => {
          setIsEdit(false);
        onClose()
      }} />
    </Box>
)}
