import { CartItemShape } from "../../models/Cart";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems: CartItemShape[], totalAmount: number) => {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  };
};
