// redux/actions/productActions.js

export const GET_PRODUCTS_BY_QUERY = "GET_PRODUCTS_BY_QUERY";
export const SET_PRODUCTS_BY_QUERY = "SET_PRODUCTS_BY_QUERY";
export const SET_PRODUCTS_ERROR = "SET_PRODUCTS_ERROR";

// 🚀 Action: fetch products by query (category, label)
export const getProductsByQuery = (payload) => ({
  type: GET_PRODUCTS_BY_QUERY,
  payload, // { queryKey: "rice-bestseller", params: { category: "rice", label: "bestseller" }, forceRefresh: false }
});

export const setProductsByQuery = (queryKey, products, lastUpdated) => ({
  type: SET_PRODUCTS_BY_QUERY,
  payload: { queryKey, products, lastUpdated },
});

export const setProductsError = (queryKey, error) => ({
  type: SET_PRODUCTS_ERROR,
  payload: { queryKey, error },
});
