import { CartItemShape } from "../../models/Cart";
import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://react-native-c0dc8-default-rtdb.firebaseio.com/orders/${userId}.json` // .json is for Firebase only
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        const { cartItems, totalAmount, date } = resData[key];
        loadedOrders.push(
          new Order(key, cartItems, totalAmount, new Date(date))
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems: CartItemShape[], totalAmount: number) => {
  return async (dispatch, getState) => {
    console.debug("Orders", getState().auth);
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://react-native-c0dc8-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: resData.items,
        amount: resData.amount,
        date,
      },
    });
  };
};
