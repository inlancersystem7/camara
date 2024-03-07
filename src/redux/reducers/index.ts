import { combineReducers } from 'redux';
import * as notesReducer from "./notesReducers";

// const rootReducer = combineReducers({
//   notesReducer,
//   // Add other reducers here if needed
// });
//
// export default rootReducer;


export default Object.assign(
  notesReducer,
)
