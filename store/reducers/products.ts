import PRODUCTS from "../../data/dummy-data";
import { ProductShape } from "../../models/Product";
import { DELETE_PRODUCT } from "../actions/products";

export interface ProductsShape {
  availableProducts: ProductShape[];
  userProducts: ProductShape[];
}

interface ProductsAction {
  type: string;
  productId: string;
}

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (
  state: ProductsShape = initialState,
  action: ProductsAction
) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};
