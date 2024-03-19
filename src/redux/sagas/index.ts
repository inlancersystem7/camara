import { all, takeLeading } from "redux-saga/effects";
import * as types from '../actions/actionTypes'
import * as categoriesSaga from '../sagas/categoriesSaga'
import * as photosSaga from '../sagas/photosSaga'
import * as clientSaga from '../sagas/clientSaga'
import { getDashboardClientList } from "@/redux/actions/clientAction";
import { dashboardClientList } from "../sagas/clientSaga";

export default function* watch() {
  // yield all([takeLeading(ADD_NOTE, notesSaga.addNoteSaga)]);
  // yield all([
  //   watchNotes(),
  // ]);
  // category
  yield all([takeLeading(types.ADD_CATEGORIES, categoriesSaga.newCategories)]);
  yield all([takeLeading(types.GET_CATEGORIES, categoriesSaga.categoriesList)]);

  // Photos
  yield all([takeLeading(types.ADD_PHOTOS, photosSaga.newPhoto)]);
  yield all([takeLeading(types.GET_PHOTOS, photosSaga.PhotoList)]);
  yield all([takeLeading(types.GET_PHOTOS_BY_CATEGORY, photosSaga.photoListByCategory)]);

  // Client
  yield all([takeLeading(types.ADD_CLIENT, clientSaga.newClient)]);
  yield all([takeLeading(types.GET_CLIENT_LIST, clientSaga.ClientList)]);
  yield all([takeLeading(types.GET_DASHBOARD_CLIENT_LIST, clientSaga.dashboardClientList)]);
}
