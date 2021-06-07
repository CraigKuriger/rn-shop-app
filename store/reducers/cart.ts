import CartItem, { CartItemShape } from "../../models/Cart";
import { ProductShape } from "../../models/Product";
import { ADD_TO_CART } from "../actions/cart";

export interface CartShape {
  items: { [key: string]: CartItemShape };
  totalAmount: number;
}

interface CartAction {
  type: string;
  product: ProductShape;
}

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state: CartShape = initialState, action: CartAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem: CartItemShape;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    default:
      return state;
  }
};
