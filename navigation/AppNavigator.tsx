import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { ShopNavigator, AuthNavigator } from "./ShopNavigation";
import { AppStateShape } from "../App";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state: AppStateShape) => !!state.auth.token);
  const didTryAutoLogin = useSelector(
    (state: AppStateShape) => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
