// redux/reducers/productReducer.js
import { SET_PRODUCTS_BY_QUERY, SET_PRODUCTS_ERROR } from "../actions/productActions";

const initialState = {
  productsByQuery: {}, // { "rice-bestseller": { products: [...], lastUpdated, error } }
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS_BY_QUERY:
      return {
        ...state,
        productsByQuery: {
          ...state.productsByQuery,
          [action.payload.queryKey]: {
            products: action.payload.products,
            lastUpdated: action.payload.lastUpdated,
            error: null,
          },
        },
      };

    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        productsByQuery: {
          ...state.productsByQuery,
          [action.payload.queryKey]: {
            ...(state.productsByQuery[action.payload.queryKey] || {}),
            error: action.payload.error,
          },
        },
      };

    default:
      return state;
  }
}
