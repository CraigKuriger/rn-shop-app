import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ProductsShape } from "../../store/reducers/products";
import { ProductShape } from "../../models/Product";
import ProductItem from "../../components/shop/ProductItem";

export interface AppStateShape {
  products: ProductsShape;
}

const ProductsOverviewScreen = (props) => {
  const products: ProductShape[] = useSelector(
    (state: AppStateShape) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          onViewDetail={() =>
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;
