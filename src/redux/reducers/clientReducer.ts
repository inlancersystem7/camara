
import createReducer from "@/lib/createReducer";
import * as types from '../actions/actionTypes'

const initialState = {
  isLoading:false,
  clientList: [],
  dashboardClientList: [],
};

export const clientReducer = createReducer(initialState, {
  [types.ADD_CLIENT](state) {
    console.log("RedusSate", state);
    return {
      ...state,
      isLoading: false
    };
  },
  [types.EDIT_CLIENT](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [types.GET_CLIENT_LIST](state, action) {
    console.log("reducerClientList->",action);
    return {
      ...state,
      clientList: Object.values(action.response),
    };
  },
  [types.GET_DASHBOARD_CLIENT_LIST](state, action) {
    console.log("reducerDashClientList->",action);
    return {
      ...state,
      dashboardClientList: Object.values(action.response),
    };
  },
});
