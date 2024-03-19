import * as categoriesReducers from "./categoriesReducers";
import * as photosReducers from "./photosReducers";
import * as clientReducer from "./clientReducer";

export default Object.assign(
  categoriesReducers,
  photosReducers,
  clientReducer,
)
