
import createReducer from "@/lib/createReducer";
import * as types from '../actions/actionTypes'

const initialState = {
  isLoading:false,
  photosList: [],
  dashboardPhotosList: [],
  categoryPhotosList: [],
  clientCategoryPhotosList: [],
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
      photosList: Object.values(action.response),
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
      categoryPhotosList: Object.values(action.filteredData),
    };
  },
  [types.GET_DASHBOARD_PHOTO_LIST](state, action) {
    return {
      ...state,
      dashboardPhotosList: Object.values(action.response),
    };
  },
  [types.GET_PHOTOS_BY_CATEGORY_AND_CLIENT](state) {
    return {
      ...state,
    };
  },
  [types.GET_PHOTOS_BY_CATEGORY_AND_CLIENT_SUCCESS](state, action) {
    // console.log("Reducer Rescponce",Object.values(action.filteredData));
    return {
      ...state,
      clientCategoryPhotosList: Object.values(action.filteredData),
    };
  },
});
