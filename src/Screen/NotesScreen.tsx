import React, {useEffect, useState} from 'react';
import { Box, Text } from "@/component";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { stackParamList } from "@/navigation/AppNavigation";
import { connect } from "react-redux";

const NotesScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<stackParamList>>();

  return(
    <Box flex={1} backgroundColor={"black"}>
     <Text>abbvc</Text>
    </Box>
  )
}

const mapStateToProps = (state: any) => {
  return {
    notes: state.notesReducer?.notes || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen);
