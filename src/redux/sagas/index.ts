import { all, takeLeading } from "redux-saga/effects";
import * as types from '../actions/actionTypes'
import * as categoriesSaga from '../sagas/categoriesSaga'
import * as photosSaga from '../sagas/photosSaga'

export default function* watch() {
  // yield all([takeLeading(ADD_NOTE, notesSaga.addNoteSaga)]);
  // yield all([
  //   watchNotes(),
  // ]);

  yield all([takeLeading(types.ADD_CATEGORIES, categoriesSaga.newCategories)]);
  yield all([takeLeading(types.GET_CATEGORIES_FAIL, categoriesSaga.categoriesList)]);
  yield all([takeLeading(types.ADD_PHOTOS, photosSaga.newPhoto)]);
  yield all([takeLeading(types.GET_PHOTOS, photosSaga.PhotoList)]);
  yield all([takeLeading(types.GET_PHOTOS_BY_CATEGORY, photosSaga.photoListByCategory)]);
}
