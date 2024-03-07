import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "@/redux/reducers";
import rootSaga from "@/redux/sagas";

// Middleware
const sagaMiddleware = createSagaMiddleware();

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware /* Add other middlewares here if needed */)
);

// Run sagas
sagaMiddleware.run(rootSaga);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
