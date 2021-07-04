import { CartItemShape } from "../../models/Cart";
import Order, { OrderShape } from "../../models/Order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

export interface OrdersShape {
  orders: OrderShape[];
}

interface CartAction {
  type: string;
  orderData: {
    id: string;
    items: CartItemShape[];
    amount: number;
    date: Date;
  };
  orders: OrderShape[];
}

const initialState: OrdersShape = {
  orders: [],
};

export default (state: OrdersShape = initialState, action: CartAction) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
