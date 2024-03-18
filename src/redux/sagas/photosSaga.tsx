// src/redux/sagas/notesSaga.ts
import { call, put } from "redux-saga/effects";
import { showMessage } from "react-native-flash-message";
import * as photosAction from '../actions/photosAction';
import { dbPhotos } from "@/WaterMelon/DBHelper/DBPhotos";
import { getPhotosFailed } from "../actions/photosAction";

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
  // console.log("sagaresponce=>",response);
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
    console.log("filteredData",filteredData);
    yield put(photosAction.getPhotosListByCategory(filteredData));
  } else {
    yield put(photosAction.getPhotosFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

// export function * noteDataListByVendor (action) {
//   c;
//   const list = yield call(dbNotes.getNotesData);
//   console.log('data_vendroID', vendroID);
//   return list;
// };
