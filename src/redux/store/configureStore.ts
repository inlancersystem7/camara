import { applyMiddleware, compose, createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "@/redux/reducers";
import rootSaga from "@/redux/sagas";


const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: false, //to get useful logging
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  //middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducer);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
export const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(rootSaga);

export default configureStore;
