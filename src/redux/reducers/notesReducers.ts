// notesReducer.ts

import createReducer from "@/lib/createReducer";
import * as types from '../actions/actionTypes'

const initialState = {
 isLoading:false,
  notesDetails: [],
};

export const notesReducer = createReducer(initialState, {
  [types.ADD_NOTE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [types.EDIT_NOTE](state) {
    console.log("state.", state);
    return {
      ...state,
      isLoading: false
    };
  },
  [types.GET_NOTE_LIST](state, action) {
    return {
      ...state,
      notesDetails: Object.values(action.response),
    };
  },
  [types.DELETE_NOTE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
});

