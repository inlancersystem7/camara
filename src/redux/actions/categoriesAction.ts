import * as types from '../actions/actionTypes'

export function addCategories (data:any) {
  return {
    type: types.ADD_CATEGORIES,
    data
  };
}

export function getCategoriesList(response) {
  console.log("actionRespose",response);
  return {
    type: types.GET_CATEGORIES,
    response,
  };
}

export function requestCategoriesFailed() {
  return {
    type: types.GET_CATEGORIES_FAIL,
  };
}
