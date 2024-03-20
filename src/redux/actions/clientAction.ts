import * as types from '../actions/actionTypes'
import { ADD_CLIENT, GET_DASHBOARD_CLIENT_LIST, GET_PHOTOS_BY_CATEGORY_SUCCESS } from "../actions/actionTypes";

export function addClient (data:any) {
  console.log("actionCData",data);
  return {
    type: types.ADD_CLIENT,
    data,
  };
}

export function getClientList(response) {
  console.log("actionRespose",response);
  return {
    type: types.GET_CLIENT_LIST,
    response,
  };
}

export function getDashboardClientList(response) {
  console.log("actionDashRespose",response);
  return {
    type: types.GET_DASHBOARD_CLIENT_LIST,
    response,
  };
}

export function getClientFailed() {
  return {
    type: types.GET_CLIENT_LIST_FAIL,
  };
}
