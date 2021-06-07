import PRODUCTS from "../../data/dummy-data";
import { ProductShape } from "../../models/Product";

export interface ProductsShape {
  availableProducts: ProductShape[];
  userProducts: ProductShape[];
}

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state: ProductsShape = initialState, action: object) => {
  return state;
};
