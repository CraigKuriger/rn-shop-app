import React from "react";
import { FlatList, Platform, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/ui/HeaderButton";

interface Props {}

const OrdersScreen = (props: Props) => {
  const orders = useSelector((state: AppStateShape) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem item={itemData.item} />}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS !== "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
