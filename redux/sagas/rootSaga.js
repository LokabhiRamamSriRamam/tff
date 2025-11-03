// redux/sagas/rootSaga.js
import { all } from "redux-saga/effects";
import { watcherGetProductsByQuery } from "./productSaga";

export default function* rootSaga() {
  yield all([
    watcherGetProductsByQuery(),
  ]);
}
