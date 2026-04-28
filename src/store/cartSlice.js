import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
    },

    removeItem: (state, action) => {
      const id = action.payload;

      const itemToRemove = state.items.find((item) => item.id === id);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
      }

      state.items = state.items.filter((item) => item.id !== id);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) {
        return;
      }

      if (quantity <= 0) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.totalQuantity += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;