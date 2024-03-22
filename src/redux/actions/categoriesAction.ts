import * as types from '../actions/actionTypes'
import { Category } from "@/Model/Category";
import { EDIT_CATEGORIES } from "../actions/actionTypes";

export function addCategories (data:any) {
  return {
    type: types.ADD_CATEGORIES,
    data
  };
}

export function editCategories (id:string , data:any) {
  return {
    type: types.EDIT_CATEGORIES,
    id,
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
