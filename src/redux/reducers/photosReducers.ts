
import createReducer from "@/lib/createReducer";
import * as types from '../actions/actionTypes'

const initialState = {
  isLoading:false,
  photosList: [],
};

export const photosReducers = createReducer(initialState, {
  [types.ADD_PHOTOS](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [types.GET_PHOTOS](state, action) {
    // console.log("actionPhoto->",action);
    return {
      ...state,
      // photosList: Object.values(action.response),
    };
  },
  [types.GET_PHOTOS_BY_CATEGORY](state) {
    return {
      ...state,
    };
  },
  [types.GET_PHOTOS_BY_CATEGORY_SUCCESS](state, action) {
    return {
      ...state,
      photosList: Object.values(action.response),
    };
  },
});
