// permissionUtils.js

import {Platform} from 'react-native';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';

const getPermission = Platform.select({
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});

export const requestLocationPermission = async () => {
  try {
    const result = await request(getPermission);
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true; // Permission granted or limited
    } else {
      console.log('Location permission denied');
      return false; // Permission denied
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false; // Permission request error
  }
};

export const checkLocationPermission = async () => {
  try {
    const result = await check(getPermission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false; // Permission check error
  }
};
