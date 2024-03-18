import * as types from '../actions/actionTypes'
import { GET_PHOTOS_BY_CATEGORY_SUCCESS } from "../actions/actionTypes";

export function addPhotos (data:any) {
  // console.log("actionData",data);
  return {
    type: types.ADD_PHOTOS,
    data
  };
}

export function getPhotosList(response) {
  // console.log("actionRespose",response);
  return {
    type: types.GET_PHOTOS,
    response,
  };
}

export function getPhotosFailed() {
  return {
    type: types.GET_PHOTOS_FAIL,
  };
}

export function getPhotosListByCategory(response) {
  console.log("ActionRes",response);
  return {
    type: types.GET_PHOTOS_BY_CATEGORY_SUCCESS,
    response,
  };
}

export function failGetPhotosListByCategory() {
  return {
    type: types.GET_CATEGORIES_FAIL,
  };
}
