import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, searchResult } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchResult.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchResult.toLowerCase()) ||
          product.category.toLowerCase().includes(searchResult.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      const { products, sorts } = action.payload;
      switch (sorts) {
        case "latest":
          state.filteredProducts = products;
          return state;

        case "lowest-price":
          state.filteredProducts = products.slice().sort((a, b) => {
            return a.price - b.price;
          });
          return state;

        case "highest-price":
          state.filteredProducts = products.slice().sort((a, b) => {
            return b.price - a.price;
          });
          return state;

        case "a-z":
          state.filteredProducts = products.slice().sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          return state;

        case "z-a":
          state.filteredProducts = products.slice().sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          return state;

        default:
          return state;
      }
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;

export default filterSlice.reducer;
