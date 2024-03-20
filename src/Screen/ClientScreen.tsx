import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { navigate, Routes, stackParamList } from "@/navigation/AppNavigation";
import { connect, useDispatch, useSelector } from "react-redux";
import { Screen } from "@/component/Screen";
import { Header } from "@/component/Header/Header";
import { ScrollView } from "react-native";
import { ClientView } from "@/component/Client/ClientView";
import { Pressable, Text } from "@/component";
import { fonts } from "@/style";
import { AddClientModel } from "@/component/Client/AddClientModel";
import { getClientList } from "@/redux/actions/clientAction";
import { Client } from "@/Model/Client";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { dbClient } from "@/WaterMelon/DBHelper/DBClient";

const ClientScreen: React.FC = () => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();



  const handleOnDetailPress = (selectedItem : Client) => {
    navigate({
      screenName: Routes.ClientDetail,
      params: {
        detail: selectedItem,
      },
    });
  }

  const callFactory = async () => {
    dispatch(getClientList([]));
    const data = dbClient.getClientData();
    console.log("Cdatass",await data);
  };

  useEffect(() => {
    callFactory();
  }, []);

  const clientList = useSelector((state: any) => state.clientReducer.clientList);
  console.log("clientList=>",clientList);

  return(
    <Screen>
      <Header
        rightComponent={
        <Pressable onPress={()=>setIsClient(true)} marginRight={"r"}>
          <Text textAlign={"right"} color={"black"} fontSize={22} fontFamily={fonts.bold}>
            +
          </Text>
        </Pressable>
        }
        onBackPress={goBack}
        label={'Client'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {clientList?.map((item, index) => {
          console.log("item=>",item);
          return(
            <ClientView client={item} onDetailPress={() => handleOnDetailPress(item)}/>
          )
        })}
      </ScrollView>
      <AddClientModel isVisible={isClient} onClose={()=>setIsClient(false)} />
    </Screen>
  )
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.clientReducer.client || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientScreen);
