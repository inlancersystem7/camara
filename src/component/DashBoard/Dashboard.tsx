import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@/component/Box";
import { RecentPhotos } from "@/component/DashBoard/RecentPhotos";
import { ClientList } from "@/component/DashBoard/ClientList";
import { CategoryView } from "@/component/DashBoard/CategoryView";
import { ScrollView } from "react-native";
import { Photos } from "@/component/DashBoard/Photos";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import * as photosAction from "@/redux/actions/photosAction";
import { Category } from "@/Model/Category";
import { Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { AddCategoriesModel } from "@/component/Category/AddCategoriesModel";
import { AddClientModel } from "@/component/Client/AddClientModel";
import moment from 'moment';
import { observer } from "mobx-react-lite";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { getDashboardClientList } from "@/redux/actions/clientAction";
import { getDashboardPhotosList } from "@/redux/actions/photosAction";


export const Dashboard: React.FC = observer(() => {
  const dispatch = useDispatch();
  const [selectedCategoryForDashboard, setSelectedCategoryForDashboard] =
    useState<Category | null>(null);
  const [isCategory, setIsCategory] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesList([]));
    dispatch(getDashboardClientList([]));
    dispatch(getDashboardPhotosList([]));
  }, []);

  const categoryList = useSelector((state: any) => state.categoriesReducers.categoryList);
  const categoryPhotosList = useSelector((state: any) => state.photosReducers.categoryPhotosList);
  const clientList = useSelector((state: any) => state.clientReducer.dashboardClientList);


  // setSelectedCategoryForDashboard(firstCategoryData);

  useMemo(() => {
    const firstCategoryData = categoryList?.length > 0 ? categoryList[0] : null;
    console.log("firstCategoryData=>",firstCategoryData?.id);
    console.log("firstCategoryDataInLoop=>",firstCategoryData?.id);
    setSelectedCategoryForDashboard(firstCategoryData);
    dispatch(photosAction.getPhotosListByCategory(firstCategoryData?.id));
  }, []);

  return (
      <Box flex={1}>
        <RecentPhotos label={'Resent Photos'}/>
        <ClientList clientList={clientList} onClientAdd={()=>setIsClient(true)}/>
        <Box marginTop={"r"}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CategoryView
            onCategorySelected={categories => {
              // console.log("categories",categories.id);
              setSelectedCategoryForDashboard(categories);
              dispatch(photosAction.getPhotosListByCategory(categories?.id));
            }}
            categoryListItems={categoryList}/>
          </ScrollView>
          <Pressable onPress={() => setIsCategory(true)} position={"absolute"} marginTop={'mES'} backgroundColor={"white"} alignItems={"center"} right={12} height={35} width={30}>
            <Text color={"black"} fontSize={22} fontFamily={fonts.bold}>+</Text>
          </Pressable>
        </Box>
        <Box flexDirection={"row"} width={'100%'} flexWrap={"wrap"}>
          {categoryPhotosList.map((item,index) => {
            return(
              <Box
                key={`${item.id}_${moment()}`}
                margin={"ss"}
                height={DeviceHelper.calculateHeightRatio(140)}
                width={DeviceHelper.calculateWidthRatio(133)}>
              <Photos photosList={item}/>
              </Box>
            )})
          }
        </Box>
        <Box height={100}/>
         <AddCategoriesModel
          isVisible={isCategory}
          onClose={() => {
            setIsCategory(false)
          }} />
        <AddClientModel
          isVisible={isClient}
          onClose={()=>setIsClient(false)}
        />
      </Box>
  );
});
