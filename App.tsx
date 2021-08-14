import React, { useState } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import ShopNavigation from "./navigation/ShopNavigation";
import productsReducer, { ProductsShape } from "./store/reducers/products";
import cartReducer, { CartShape } from "./store/reducers/cart";
import ordersReducer, { OrdersShape } from "./store/reducers/orders";
import authReducer, { AuthShape } from "./store/reducers/auth";

import { composeWithDevTools } from "redux-devtools-extension";
import { StatusBar } from "react-native";
import NavigationContainer from "./navigation/NavigationContainer";
// REMOVE FOR PRODUCTION

export interface AppStateShape {
  products: ProductsShape;
  cart: CartShape;
  orders: OrdersShape;
  auth: AuthShape;
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // composeWithDevTools()
);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <NavigationContainer />
    </Provider>
  );
}
