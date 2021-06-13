import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { AppStateShape } from "../../App";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import { NavigationOptionsShape } from "../../navigation/ShopNavigation";

interface NavigationShape {
  getParam: (param: any) => any;
}

interface Props {
  navigation: NavigationShape;
}

const ProductDetailScreen = (props: Props) => {
  const productId = props.navigation.getParam("productId");
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

ProductDetailScreen.navigationOptions = (navData: NavigationOptionsShape) => {
  const productTitle = navData.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS !== "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
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
