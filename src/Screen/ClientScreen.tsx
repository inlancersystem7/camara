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
import { deleteClient, getClientList } from "@/redux/actions/clientAction";
import { Client } from "@/Model/Client";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";
import { dbClient } from "@/WaterMelon/DBHelper/DBClient";
import { CustomModal } from "@/component/Action";
import { Category } from "@/Model/Category";

const ClientScreen: React.FC = () => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const [isVisible,setIsVisible]=useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  console.log("seleIn",selectedIndex);

  const option = [
    { label: 'Edit', onPress: () => { handleOnPressEdit(); } },
    { label: 'Delete', onPress: () => { showDeleteConfirmation(); } },
    { label: 'Cancel', onPress: () => { closeListModel(); } },
  ];

  const handleOnPressEdit = () => {
    setIsEdit(true);
    setIsVisible(false);
    setIsClient(true);
  }
  const showDeleteConfirmation = () => {
    setIsDelete(true);
  };

  const handleOnPressDelete = async (id:string) => {
    try {
      dispatch(deleteClient(id));
      // await callFactory();
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  }

  const openListModel = (index) => {
    console.log("index",index);
    setSelectedIndex(index);
    setIsVisible(true);
  };

  const closeListModel = () => {
    setIsVisible(false);
    setIsDelete(false);
  };

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
            <ClientView
              client={item}
              onDotPress={() => {
              openListModel(item.id.toString());
              setSelectedItem(item);
              }}
              onDetailPress={() => handleOnDetailPress(item)}/>
          )
        })}
      </ScrollView>
      <AddClientModel
        onEdit={()=> {
          setSelectedItem(null);
          setIsEdit(false);
        }}
        selectedItem={selectedItem}
        selectedIndex={selectedIndex}
        isEdit={isEdit}
        isVisible={isClient}
        onClose={()=>setIsClient(false)} />
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
