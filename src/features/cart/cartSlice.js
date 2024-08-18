import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: "Meditterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
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
export default cartSlice.reducer;
export const getTotalCartQuatity = (state) =>
  state.cart.cart.reduce((acc, item) => item.quantity + acc, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => item.totalPrice + acc, 0);
