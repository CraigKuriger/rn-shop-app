import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Colors from "../../constants/Colors";
import { CartItemShape } from "../../models/Cart";
import { OrderShape } from "../../models/Order";
import Card from "../ui/Card";
import CartItem from "./CartItem";

interface Props {
  item: OrderShape;
}

const OrderItem = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { formattedDate, totalAmount } = props.item;

  if (!totalAmount) {
    return (
      <View>
        <Text>Where has the amount gone?</Text>
      </View>
    );
  }

  return (
    <Card style={styles.orderItem}>
      <>
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>{totalAmount.toFixed(2)}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Button
          title={showDetails ? "Hide Details" : "Show Details"}
          color={Colors.primary}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
        {showDetails && (
          <View style={styles.detailItems}>
            {props.item.items.map((item: CartItemShape) => (
              <CartItem key={item.productId} item={item} onRemove={() => {}} />
            ))}
          </View>
        )}
      </>
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: { fontFamily: "open-sans-bold", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: Colors.neutral },
  detailItems: { width: "100%" },
});

export default OrderItem;
