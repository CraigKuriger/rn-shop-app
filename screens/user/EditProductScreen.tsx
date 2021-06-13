import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateShape } from "../../App";
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

const EditProductScreen = (props: Props) => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state: AppStateShape) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(editedProduct?.title || "");
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl || "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct?.description || ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(productId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);
  //   This ensures the function isn't recreated every time the component is re-rendered and we avoid creating an infinite loop

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  //   useEffects dependency is submitHandler which doen't change so it only executes once

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData: NavigationOptionsShape) => {
  const submitFunction = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS !== "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 },
  formControl: { width: "100%" },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.neutral,
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
