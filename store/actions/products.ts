import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://react-native-c0dc8-default-rtdb.firebaseio.com/products.json" // .json is for Firebase only
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const { title, description, imageUrl, price } = resData[key];
        loadedProducts.push(
          new Product(key, "u1", title, imageUrl, description, price)
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-c0dc8-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (
    dispatch: (arg0: {
      type: string;
      productData: {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
      };
    }) => void
  ) => {
    // Any async code you want!
    const response = await fetch(
      "https://react-native-c0dc8-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: resData.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-c0dc8-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: { id, title, description, imageUrl, price },
    });
  };
};
