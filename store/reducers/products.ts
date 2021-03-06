import PRODUCTS from "../../data/dummy-data";
import Product, { ProductShape } from "../../models/Product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

export interface ProductsShape {
  availableProducts: ProductShape[];
  userProducts: ProductShape[];
}

interface ProductsAction {
  type: string;
  productId?: string;
  productData?: ProductShape;
  products?: ProductShape[];
  userProducts?: ProductShape[];
}

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (
  state: ProductsShape = initialState,
  action: ProductsAction
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      if (!action.productData) {
        return state;
      }
      const { id, title, description, imageUrl, price, ownerId } =
        action.productData;
      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      if (!action.productId || !action.productData) {
        return state;
      }
      // const { title, description, imageUrl, price } = action.productData;
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
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
