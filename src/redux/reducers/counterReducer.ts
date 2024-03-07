// src/redux/reducers/counterReducer.ts
// import { CounterActionTypes, INCREMENT, DECREMENT } from '../actions/types';
//
// export interface CounterState {
//   count: number;
// }
//
// const initialState: CounterState = {
//   count: 0,
// };
//
// const counterReducer = (state = initialState, action: CounterActionTypes): CounterState => {
//   switch (action.type) {
//     case INCREMENT:
//       return { ...state, count: state.count + 1 };
//     case DECREMENT:
//       return { ...state, count: state.count - 1 };
//     default:
//       return state;
//   }
// };

// export default counterReducer;

// src/reducers/counterReducer.ts
// import createReducer from "app/lib/createReducer";
import * as types from "../actions/types";
import createReducer from "@/lib/createReducer";

export interface CounterState {
  count: number;
  isLoading: boolean;
}

const initialState: CounterState = {
  count: 0,
  isLoading: false,
};

export const counterReducer = createReducer(initialState, {
  [types.INCREMENT](state) {
    return {
      ...state,
      count: state.count + 1,
    };
  },
  [types.DECREMENT](state) {
    return {
      ...state,
      count: state.count - 1,
    };
  },
  // Add other actions if needed
});
