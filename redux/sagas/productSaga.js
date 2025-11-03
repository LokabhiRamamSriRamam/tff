// redux/sagas/productSaga.js
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import { GET_PRODUCTS_BY_QUERY, setProductsByQuery, setProductsError } from "../actions/productActions";
import api from "../../services/api";

function* workerGetProductsByQuery(action) {
  const { queryKey, params, forceRefresh } = action.payload;
  const state = yield select((state) => state.products);
  const cacheEntry = state.productsByQuery[queryKey];

  const now = Date.now();
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  try {
    // 🧠 Skip fetch if recent cache exists
    if (
      !forceRefresh &&
      cacheEntry &&
      cacheEntry.lastUpdated &&
      now - cacheEntry.lastUpdated < FIFTEEN_MINUTES
    ) {
      console.log(`✅ Using cached data for ${queryKey}`);
      return;
    }

    console.log(`📦 Fetching data for ${queryKey}`);
    const response = yield call(api.fetchProductsByQuery, params);
    yield put(setProductsByQuery(queryKey, response.data, now));
  } catch (error) {
    console.error(`❌ Error fetching ${queryKey}:`, error);
    yield put(setProductsError(queryKey, error.message));
  }
}

// 👀 Watcher Saga
export function* watcherGetProductsByQuery() {
  yield takeEvery(GET_PRODUCTS_BY_QUERY, workerGetProductsByQuery);
}

// 🧩 Optional: batch multiple requests (for simultaneous fetching)
export function* fetchMultipleProductQueries(action) {
  const { queries } = action.payload;
  yield all(
    queries.map((q) =>
      call(workerGetProductsByQuery, { payload: q })
    )
  );
}
