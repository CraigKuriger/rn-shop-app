import React from "react";
import { Button, Platform, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";

export interface NavigationShape {
  getParam: (param: string) => any;
  goBack: () => void;
  navigate: (path: string, params?: { [Key: string]: any }) => void;
  setParams: (params: { [Key: string]: any }) => void;
  toggleDrawer: () => void;
}

export interface NavigationOptionsShape {
  navigation: NavigationShape;
}

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => {
        return (
          <Ionicons
            name={Platform.OS !== "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => {
        return (
          <Ionicons
            name={Platform.OS !== "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProducts: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => {
        return (
          <Ionicons
            name={Platform.OS !== "android" ? "md-create" : "ios-create"}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
