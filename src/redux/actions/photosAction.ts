import * as types from '../actions/actionTypes'
import {
  DELETE_PHOTOS,
  GET_DASHBOARD_PHOTO_LIST,
  GET_PHOTOS_BY_CATEGORY, GET_PHOTOS_BY_CATEGORY_AND_CLIENT, GET_PHOTOS_BY_CATEGORY_AND_CLIENT_SUCCESS,
  GET_PHOTOS_BY_CATEGORY_SUCCESS,
} from "../actions/actionTypes";

export function addPhotos (data:any) {
  // console.log("actionData",data);
  return {
    type: types.ADD_PHOTOS,
    data
  };
}

export function deletePhotos (id:any) {
  return {
    type: types.DELETE_PHOTOS,
    id,
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

export function getPhotosListByCategory(category) {
  return {
    type: types.GET_PHOTOS_BY_CATEGORY,
    category,
  };
}

export function photosListByCategorySuccess(filteredData) {
  return {
    type: types.GET_PHOTOS_BY_CATEGORY_SUCCESS,
    filteredData,
  };
}

export function getDashboardPhotosList(response) {
  return {
    type: types.GET_DASHBOARD_PHOTO_LIST,
    response,
  };
}

export const getPhotosListByCategoryAndClient = (category, client) => ({
  type: types.GET_PHOTOS_BY_CATEGORY_AND_CLIENT,
  category,
  client,
});

export const photosListByCategoryAndClientSuccess = (filteredData) => ({
  type: types.GET_PHOTOS_BY_CATEGORY_AND_CLIENT_SUCCESS,
  filteredData,
});

export function failGetPhotosListByCategory() {
  return {
    type: types.GET_CATEGORIES_FAIL,
  };
}
