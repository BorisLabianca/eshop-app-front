import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one.`, {
          position: "top-left",
        });
      } else {
        const newProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(newProduct);
        toast.success(`${action.payload.name} added to cart.`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
