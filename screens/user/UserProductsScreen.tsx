import React from "react";
import { Button, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";
import {
  NavigationOptionsShape,
  NavigationShape,
} from "../../navigation/ShopNavigation";
import * as productsActions from "../../store/actions/products";

interface Props {
  navigation: NavigationShape;
}

const UserProductsScreen = (props: Props) => {
  const userProducts = useSelector(
    (state: AppStateShape) => state.products.userProducts
  );

  const dispatch = useDispatch();

  console.debug(props);

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProducts", { productId: id });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem {...itemData.item} onSelect={() => {}}>
          <>
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => editProductHandler(itemData.item.id)}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() =>
                dispatch(productsActions.deleteProduct(itemData.item.id))
              }
            />
          </>
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData: NavigationOptionsShape) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS !== "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS !== "android" ? "md-create" : "ios-create"}
          onPress={() => navData.navigation.navigate("EditProducts")}
        />
      </HeaderButtons>
    ),
  };
};
export default UserProductsScreen;
