import Order, { OrderShape } from "../../models/Order";
import { ProductShape } from "../../models/Product";
import { ADD_ORDER } from "../actions/orders";

export interface OrdersShape {
  orders: OrderShape[];
}

interface CartAction {
  type: string;
  orderData: {
    items: ProductShape[];
    amount: number;
  };
}

const initialState: OrdersShape = {
  orders: [],
};

export default (state: OrdersShape = initialState, action: CartAction) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
