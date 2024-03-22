import { call, put } from "redux-saga/effects";
import * as categoriesAction from '../actions/categoriesAction';
import { showMessage } from "react-native-flash-message";
import { dbCategories } from "@/WaterMelon/DBHelper/DBCategories";

export function * newCategories(action){
  const {
    data
  } =action
  const response = yield call(dbCategories.saveCategories,{data});
  console.log("response ==>", response);
  yield call(categoriesList);
}

export function * editCategories(action){
  const response = yield call(dbCategories.updateCategoryRecord,action.id,action.data);
  yield call(categoriesList);
}

export function * categoriesList(action) {
  console.log("actionCSaga",action);
  const response = yield call(dbCategories.getCategoriesData);
  if (response) {
    console.log('RESPONSE_CLINICIAN_LIST', response);
    yield put(categoriesAction.getCategoriesList(response));
    if (action?.resolve) {
      action?.resolve(response);
    }
  } else {
    yield put(categoriesAction.requestCategoriesFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}
