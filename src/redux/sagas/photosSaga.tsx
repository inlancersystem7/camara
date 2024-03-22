// src/redux/sagas/notesSaga.ts
import { call, put } from "redux-saga/effects";
import { showMessage } from "react-native-flash-message";
import { dbPhotos } from "@/WaterMelon/DBHelper/DBPhotos";
import * as photosAction from '../actions/photosAction';


export function * newPhoto(action){
  const {
    data
  } =action
  const response = yield call(dbPhotos.savePhotos,{data});
  yield call(PhotoList);
}

export function * PhotoList(action) {
  const response = yield call(dbPhotos.getPhotosData);
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
    const filteredData = response.filter(item => item.category === action.category);
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
    const { category, client} = action;
    const filteredData = response.filter(
      (item) =>
        item.category === category &&
        item.client === client,
    );
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
    const response = yield call(dbPhotos.getFirstPhotosData);
    if (response) {
      // Get the first five entries from the response
      yield put(photosAction.getDashboardPhotosList(response));
      if (action?.resolve) {
        action.resolve(response);
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
