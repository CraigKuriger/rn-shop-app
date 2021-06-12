import React from "react";
import { Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import { NavigationOptionsShape } from "../../navigation/ShopNavigation";

const UserProductsScreen = () => {
  const userProducts = useSelector(
    (state: AppStateShape) => state.products.userProducts
  );

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <ProductItem {...itemData.item} />}
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
  };
};
export default UserProductsScreen;
