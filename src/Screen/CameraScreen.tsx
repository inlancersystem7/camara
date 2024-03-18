import React, { useState } from "react";
import { Screen, StatusBarType } from "@/component/Screen";
import { Box } from "@/component";
import { CameraComponent } from "@/component/Camera/CameraComponent";
import { connect } from "react-redux";
import { Header } from "@/component/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import { ClientCategoryDropdown } from "@/component/Camera/ClientCategoryDropdown";

export const CameraScreen: React.FC = () => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const [client , setClient] = useState('');
  const [category , setCategory] = useState('');

    return(
        <Screen statusBarType={StatusBarType.Dark} backgroundColor={'white'}>
            <Box flex={1}>
              <CameraComponent client={client} category={category} />
              <Box position={"absolute"} top={0}>
                <ClientCategoryDropdown
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
