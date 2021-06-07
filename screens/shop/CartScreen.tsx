import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";

const CartScreen = () => {
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
    return transformedCartItems;
  });

  console.debug(cartItems);

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem item={itemData.item} onRemove={() => {}} />
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Shadow for iOS, Elevation for Android
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: { fontFamily: "open-sans-bold", fontSize: 18 },
  amount: { color: Colors.primary },
});

export default CartScreen;
