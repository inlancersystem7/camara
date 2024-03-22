import { all, takeLeading } from "redux-saga/effects";
import * as types from '../actions/actionTypes'
import * as categoriesSaga from '../sagas/categoriesSaga'
import * as photosSaga from '../sagas/photosSaga'
import * as clientSaga from '../sagas/clientSaga'
import { editCategories } from "../sagas/categoriesSaga";
import { deleteClient, editClient } from "../sagas/clientSaga";
import { deletePhotos } from "../sagas/photosSaga";

export default function* watch() {

  // category
  yield all([takeLeading(types.ADD_CATEGORIES, categoriesSaga.newCategories)]);
  yield all([takeLeading(types.EDIT_CATEGORIES, categoriesSaga.editCategories)]);
  yield all([takeLeading(types.GET_CATEGORIES, categoriesSaga.categoriesList)]);

  // Photos
  yield all([takeLeading(types.ADD_PHOTOS, photosSaga.newPhoto)]);
  yield all([takeLeading(types.DELETE_PHOTOS, photosSaga.deletePhotos)]);
  yield all([takeLeading(types.GET_PHOTOS, photosSaga.PhotoList)]);
  yield all([takeLeading(types.GET_PHOTOS_BY_CATEGORY, photosSaga.photoListByCategory)]);
  yield all([takeLeading(types.GET_PHOTOS_BY_CATEGORY_AND_CLIENT, photosSaga.photoListByClientAndCategory)]);
  yield all([takeLeading(types.GET_DASHBOARD_PHOTO_LIST, photosSaga.dashboardPhotoList)]);

  // Client
  yield all([takeLeading(types.ADD_CLIENT, clientSaga.newClient)]);
  yield all([takeLeading(types.EDIT_CLIENT, clientSaga.editClient)]);
  yield all([takeLeading(types.DELETE_CLIENT, clientSaga.deleteClient)]);
  yield all([takeLeading(types.GET_CLIENT_LIST, clientSaga.ClientList)]);
  yield all([takeLeading(types.GET_DASHBOARD_CLIENT_LIST, clientSaga.dashboardClientList)]);
}
