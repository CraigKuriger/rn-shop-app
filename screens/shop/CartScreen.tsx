import React, { useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import Card from "../../components/ui/Card";

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(
    (state: AppStateShape) => state.cart.totalAmount
  );

  const cartItems = useSelector((state: AppStateShape) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        ...state.cart.items[key],
        productId: key,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <>
          <Text style={styles.summaryText}>
            Total:{" "}
            <Text style={styles.amount}>
              $
              {Math.round((parseFloat(cartTotalAmount.toFixed(2)) * 100) / 100)}
            </Text>
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              color={Colors.accent}
              title="Order Now"
              onPress={() => {
                dispatch(sendOrderHandler);
              }}
              disabled={cartItems.length === 0}
            />
          )}
        </>
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            item={itemData.item}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: { fontFamily: "open-sans-bold", fontSize: 18 },
  amount: { color: Colors.primary },
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

export default CartScreen;
