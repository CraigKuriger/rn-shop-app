import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/ui/HeaderButton";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

interface Props {}

const OrdersScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state: AppStateShape) => state.orders.orders);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem item={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
