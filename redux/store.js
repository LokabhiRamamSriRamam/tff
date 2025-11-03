// redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import productReducer from "./reducers/productReducer";
import rootSaga from "./sagas/rootSaga";

const rootReducer = combineReducers({
  products: productReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
