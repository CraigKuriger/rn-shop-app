import React, { useState } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import ShopNavigation from "./navigation/ShopNavigation";
import productsReducer, { ProductsShape } from "./store/reducers/products";
import cartReducer, { CartShape } from "./store/reducers/cart";
import { composeWithDevTools } from "redux-devtools-extension";
// REMOVE FOR PRODUCTION

export interface AppStateShape {
  products: ProductsShape;
  cart: CartShape;
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

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
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}
