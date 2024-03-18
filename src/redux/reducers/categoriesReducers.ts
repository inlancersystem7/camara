
import createReducer from "@/lib/createReducer";
import * as types from '../actions/actionTypes'

const initialState = {
  isLoading:false,
  categoryList: [],
};

export const categoriesReducers = createReducer(initialState, {
  [types.ADD_CATEGORIES](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [types.GET_CATEGORIES](state, action) {
    console.log("action->",action);
    return {
      ...state,
      categoryList: Object.values(action.response),
    };
  },
});
