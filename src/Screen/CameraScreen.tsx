import React, { useEffect, useState } from "react";
import { Screen, StatusBarType } from "@/component/Screen";
import { Box } from "@/component";
import { CameraComponent } from "@/component/Camera/CameraComponent";
import { connect } from "react-redux";
import { ClientCategoryDropdown } from "@/component/Camera/ClientCategoryDropdown";
import { RouteProp, useRoute } from "@react-navigation/native";
import { stackParamList } from "@/navigation/AppNavigation";

export const CameraScreen: React.FC = () => {
  const route = useRoute<RouteProp<stackParamList, 'CameraScreen'>>();
  const {isClient , clientId, isCategory , categoryId} = route.params;
  const [client , setClient] = useState('');
  const [category , setCategory] = useState('');

  useEffect(() => {
    if (isClient){
      setClient(clientId);
    }
    if (isCategory){
      setCategory(categoryId)
    }
  }, [isClient]);

  // console.log("isClient",isClient);
  // console.log("clintId",clientId);
  // console.log("clint",client,"cate",category);
    return(
        <Screen statusBarType={StatusBarType.Dark} backgroundColor={'white'}>
            <Box flex={1}>
              <CameraComponent client={client} category={category} />
              <Box position={"absolute"} top={0}>
                <ClientCategoryDropdown
                  isClient={isClient}
                  isCategory={isCategory}
                  clientValue={client}
                  value={category}
                  onClientChange={(item)=>setClient(item)}
                  onCategoryChange={(category)=>setCategory(category)}
                />
              </Box>
            </Box>
        </Screen>
    )
}

const mapStateToProps = (state: any) => {
  return {
    notes: state.photosReducers?.photosList || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
