import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload=pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const orderItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      orderItem.quantity++;
      orderItem.totalPrice += orderItem.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId
      const orderItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );

      orderItem.quantity--;
      orderItem.totalPrice -= orderItem.unitPrice;
      if (orderItem.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartQuatity = (state) =>
  state.cart.cart.reduce((acc, item) => item.quantity + acc, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => item.totalPrice + acc, 0);
export const getCart = (state) => state.cart.cart;
export const getCurrenctyQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
export default cartSlice.reducer;
