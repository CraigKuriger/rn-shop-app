import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { AppStateShape } from "../../App";
import * as cartActions from "../../store/actions/cart";
import { NavigationShape, RouteShape } from "../../navigation/ShopNavigation";

interface Props {
  navigation: NavigationShape;
  route: RouteShape;
}

const ProductDetailScreen = (props: Props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state: AppStateShape) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  if (!selectedProduct) {
    return <Text>D'oh!</Text>;
  }

  const dispatch = useDispatch();

  const { imageUrl, price, description } = selectedProduct;
  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
            Alert.alert("Added To Cart");
          }}
        />
      </View>
      <Text style={styles.price}>{price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.neutral,
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
