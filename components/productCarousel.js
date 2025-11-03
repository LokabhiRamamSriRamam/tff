// components/ProductCarousel.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByQuery } from "../redux/actions/productActions";
import { FlatList, Text, View } from "react-native";

export default function ProductCarousel({ category, label }) {
  const queryKey = `${category}-${label}`;
  const dispatch = useDispatch();
  const productEntry = useSelector((state) => state.products.productsByQuery[queryKey]);
  const products = productEntry?.products || [];

  useEffect(() => {
    dispatch(getProductsByQuery({ queryKey, params: { category, label } }));
  }, [category, label]);

  return (
    <View>
      <Text>{label} - {category}</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
