import { createStackNavigator } from "@react-navigation/stack";
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from "@react-navigation/native";
import React from "react";
import { observer } from "mobx-react-lite";
import { SplashScreen } from "@/Screen/SplashScreen";
import HomeScreen from "@/Screen/HomeScreen";

import CameraScreen from "@/Screen/CameraScreen";
import NotesScreen from "@/Screen/NotesScreen";
import DashboardScreen from "@/Screen/DashboardScreen";
import ClientScreen from "@/Screen/ClientScreen";
import AllPhotosScreen from "@/Screen/AllPhotosScreen";
import ClientDetailScreen from "@/Screen/ClientDetailScreen";
import CategoryScreen from "@/Screen/CategoryScreen";
import { Client } from "@/Model/Client";

export type stackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  CameraScreen:undefined;
  DashboardScreen:undefined;
  ClientScreen:undefined;
  AllPhotosScreen:undefined;
  ClientDetailScreen:{detail: Client};
  CategoryScreen:undefined;
};

const navigationRef = createNavigationContainerRef<stackParamList>();

export enum Routes {
  Dashboard = 'DashboardScreen',
  Splash = 'SplashScreen',
  Home = 'HomeScreen',
  Camera = 'CameraScreen',
  Notes = 'NotesScreen',
  Client = 'ClientScreen',
  AllPhotos = 'AllPhotosScreen',
  ClientDetail = 'ClientDetailScreen',
  Category = 'CategoryScreen',
}
interface NavigationProps {
  screenName: Routes;
  params?: any;
}

export function navigate({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
}

export function replace({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      ...StackActions.replace(screenName, params),
    });
  }
}

export function reset({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName, params}],
      }),
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}

export const safeNavigate = (route: Routes, params?: Record<string, any>) => {
  navigate({screenName: route, params: params});
};

export interface AppNavigationProps {
  onRouteChange: (route: string) => void;
}

export const AppNavigator: React.FC<AppNavigationProps> = observer(
  ({onRouteChange}: AppNavigationProps) => {
    const Stack = createStackNavigator();


    return (
      <NavigationContainer
        ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={Routes.Splash}>
          <Stack.Screen name={Routes.Splash} component={SplashScreen} />
          <Stack.Screen name={Routes.Dashboard} component={DashboardScreen} />
          <Stack.Screen name={Routes.Home} component={HomeScreen} />
          <Stack.Screen name={Routes.Camera} component={CameraScreen} />
          <Stack.Screen name={Routes.Notes} component={NotesScreen} />
          <Stack.Screen name={Routes.Client} component={ClientScreen} />
          <Stack.Screen name={Routes.AllPhotos} component={AllPhotosScreen} />
          <Stack.Screen name={Routes.ClientDetail} component={ClientDetailScreen} />
          <Stack.Screen name={Routes.Category} component={CategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);
