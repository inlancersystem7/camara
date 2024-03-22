import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from "@/component/Image";
import { Images } from "@/assets";
import { DeviceHelper } from "@/helper/DeviceHelper";
import { Pressable } from "@/component";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackParamList } from "@/navigation/AppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "@/redux/actions/categoriesAction";
import { getClientList } from "@/redux/actions/clientAction";

export interface CameraComponentProps {
  value: string;
  clientValue: string;
  isClient: boolean;
  isCategory:boolean;
  onClientChange: (client) => void;
  onCategoryChange: (category) => void;
}

export const ClientCategoryDropdown : React.FC<CameraComponentProps> = ({isClient,isCategory,value,clientValue, onClientChange, onCategoryChange}:CameraComponentProps) => {
  const { goBack } = useNavigation<StackNavigationProp<stackParamList>>();
  const [isClientFocus, setIsClientFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const callFactory = async () => {
    dispatch(getCategoriesList([]));
    dispatch(getClientList([]));
  };

  useEffect(() => {
    callFactory();
  }, []);

  const categoryList = useSelector((state: any) => state.categoriesReducers.categoryList);
  const clientList = useSelector((state: any) => state.clientReducer.clientList);

  const renderClientDropdown = () => {
    return(
       <View style={styles.container}>
         {/*{renderLabel()}*/}
         <Dropdown
           style={[styles.dropdown]}
           placeholderStyle={styles.placeholderStyle}
           selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
           iconStyle={styles.iconStyle}
           data={clientList}
           search
           maxHeight={300}
           minHeight={100}
           labelField="clientName"
           valueField="id"
           searchField="clientName"
           placeholder={!isClientFocus ? 'Select Client' : '...'}
           searchPlaceholder="Search..."
           value={clientValue}
           onFocus={() => setIsClientFocus(true)}
           onBlur={() => setIsClientFocus(false)}
           onChange={(item) => {
             onClientChange(item.id)
             // setClientValue(item.value);
             setIsClientFocus(false);
           }}
         />
       </View>
      );
  };

  const renderDropdown = () => {
    return(
      <View style={styles.container}>
        {/*{renderLabel()}*/}
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categoryList}
          search
          maxHeight={300}
          minHeight={100}
          labelField="name"
          valueField="id"
          searchField="name"
          placeholder={!isFocus ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            // console.log("cett",item);
            onCategoryChange(item.id)
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Pressable onPress={goBack} width={"8%"} alignItems={"center"} justifyContent={"center"}>
        <Image
          source={Images.wBack_arrow}
          resizeMode={'stretch'}
          marginLeft={"ss"}
          height={DeviceHelper.calculateHeightRatio(25)}
          width={DeviceHelper.calculateWidthRatio(25)}
        />
      </Pressable>
      {isClient ? (
        <View style={{width:'90%'}}>
          {renderDropdown()}
        </View>
      ) : isCategory ? (
        <View style={{width:'90%'}}>
          {renderClientDropdown()}
        </View>
      ) : (
        <>
          <View style={{width:'45%'}}>
            {renderClientDropdown()}
          </View>
          <View style={{width:'47%'}}>
            {renderDropdown()}
          </View>
        </>
      )}
    </View>
  );
};

// export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    padding: 6,
  },
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color:'white',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: -2,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
