import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import Colors from "../../constants/Colors";

interface Props {
  imageUrl: string;
  title: string;
  price: number;
  onViewDetail: () => void;
  onAddToCart: () => void;
}

const ProductItem = (props: Props) => {
  const { imageUrl, title, price, onViewDetail, onAddToCart } = props;

  let TouchableComponent: any = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  //   useForeground is for Android only
  //   Only have one child item inside a Touchable Component
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="Go To Cart"
                onPress={onAddToCart}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Shadow for iOS, Elevation for Android
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // The image is like an overlay and has no rounded corners
    // Images need their own parent with a border radius and then set the overflow to hidden to hide the image corners
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: { fontFamily: "open-sans-bold", fontSize: 18, marginVertical: 2 },
  price: { fontFamily: "open-sans", fontSize: 14, color: "#888" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
