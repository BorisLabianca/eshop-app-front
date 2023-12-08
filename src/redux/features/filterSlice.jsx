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
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;

      let productByCategory = [];

      if (category === "All") {
        productByCategory = products;
      } else {
        productByCategory = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = productByCategory;
    },
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;

      let productByBrand = [];

      if (brand === "All") {
        productByBrand = products;
      } else {
        productByBrand = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = productByBrand;
    },
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let productByPrice = [];
      productByPrice = products.filter((product) => product.price <= price);
      state.filteredProducts = productByPrice;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export default filterSlice.reducer;
