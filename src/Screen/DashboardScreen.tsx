import React, { useRef } from "react";
import { Box } from "@/component/Box";
import { Screen } from "@/component/Screen";
import { refSideMenu, showSideMenu, SideMenu } from "@/component/SideMenu/SideMenu";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { stackParamList } from "@/navigation/AppNavigation";
import { connect } from "react-redux";
import { Dashboard } from "@/component/DashBoard/Dashboard";
import { Animated, ScrollView } from "react-native";
import { AnimatedHeader } from "@/component/Header/AnimatedHeader";
import { AddPhotos } from "@/component/DashBoard/AddPhotos";


const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<stackParamList>>();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <Screen flex={1}>
      <Box flex={1}>
        <AnimatedHeader value={scrollOffsetY} label={"camara"} onMenuPress={() => showSideMenu()} />
        <ScrollView
          scrollEventThrottle={50}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
            {
              useNativeDriver: false,
            },
          )}
        >
          <Dashboard/>
        </ScrollView>
        <AddPhotos/>
      </Box>
      <SideMenu ref={refSideMenu} navigation={navigation} />
    </Screen>
  );
};

const mapStateToProps = (state: any) => {
  return {
    categories: state.categoriesReducers?.categoryList || [],
    photos: state.photosReducers?.photosList || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);


