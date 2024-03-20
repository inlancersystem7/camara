// src/redux/sagas/notesSaga.ts
import { call, put } from "redux-saga/effects";
import { showMessage } from "react-native-flash-message";
import { dbPhotos } from "@/WaterMelon/DBHelper/DBPhotos";
import * as photosAction from '../actions/photosAction';


export function * newPhoto(action){
  const {
    data
  } =action
  console.log("sagaData",data);
  const response = yield call(dbPhotos.savePhotos,{data});
  console.log("response ==>", response);
  yield call(PhotoList);
}

export function * PhotoList(action) {
  // console.log("saga=>",action);
  const response = yield call(dbPhotos.getPhotosData);
  console.log("sagaresponce=>",response);
  if (response) {
    yield put(photosAction.getPhotosList(response));
    if (action?.resolve) {
      action?.resolve(response);
    }
  } else {
    yield put(photosAction.getPhotosFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

export function * photoListByCategory(action) {
  // const response = yield call(dbMilkCan.getMilkDataByVendorId,action);
  const response = yield call(dbPhotos.getPhotosData);
  if (response) {
    console.log("response",response);
    const filteredData = response.filter(item => item.category === action.category);
    console.log("CatafilteredData",filteredData);
    yield put(photosAction.photosListByCategorySuccess(filteredData));
  } else {
    yield put(photosAction.getPhotosFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

export function * photoListByClientAndCategory(action) {
  // const response = yield call(dbMilkCan.getMilkDataByVendorId,action);
  const response = yield call(dbPhotos.getPhotosData);
  if (response) {
    console.log("response",response);
    const { category, client} = action;
    const filteredData = response.filter(
      (item) =>
        item.category === category &&
        item.client === client,
    );
    console.log("filteredData",filteredData);
    yield put(photosAction.photosListByCategoryAndClientSuccess(filteredData));
  } else {
    yield put(photosAction.getPhotosFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

export function * dashboardPhotoList(action) {
  try {
    const response = yield call(dbPhotos.getPhotosData);
    if (response) {
      // Get the first five entries from the response
      const firstFivePhotos = response.slice(0, 7);
      console.log("firstFivePhotos",firstFivePhotos);
      yield put(photosAction.getDashboardPhotosList(firstFivePhotos));
      if (action?.resolve) {
        action.resolve(firstFivePhotos);
      }
    } else {
      yield put(photosAction.getPhotosFailed());
      showMessage({
        message: 'Failed',
        description: 'Error fetching PHOTO data',
        type: 'danger',
      });
    }
  } catch (error) {
    yield put(photosAction.getPhotosFailed());
    showMessage({
      message: 'Failed',
      description: error.message,
      type: 'danger',
    });
  }
}
