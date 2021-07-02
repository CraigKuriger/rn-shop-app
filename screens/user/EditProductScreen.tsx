import React, { useCallback, useEffect, useReducer } from "react";
import { StyleSheet, View, Text, Platform, Alert } from "react-native";
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

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

interface formShape {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
}

type formKey = "title" | "imageUrl" | "description" | "price";

interface formAction {
  type: string;
  input: string;
  value: string;
  isValid: boolean;
}

const formReducer = (state: formShape, action: formAction) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid && updatedValidities[key as formKey];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

interface Props {
  navigation: NavigationShape;
}

const EditProductScreen = (props: Props) => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state: AppStateShape) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct?.title || "",
      imageUrl: editedProduct?.imageUrl || "",
      description: editedProduct?.description || "",
      price: editedProduct?.price.toString() || "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const { title, description, imageUrl, price } = formState.inputValues;

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Please complete the form");
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          productId,
          title,
          description,
          imageUrl,
          +price
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);
  //   This ensures the function isn't recreated every time the component is re-rendered and we avoid creating an infinite loop

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  //   useEffects dependency is submitHandler which doen't change so it only executes once

  const textChangeHandler = (inputIdentifier: string, text: string) => {
    // Bound argument + React native default argument
    // let isValid = false;

    // if (text.trim().length !== 0) {
    //   isValid: true;
    // }

    let isValid = text.trim().length !== 0 ? true : false;

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={textChangeHandler.bind(this, "title")}
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.title && (
            <Text style={{ color: "red" }}>Please enter a title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={textChangeHandler.bind(this, "price")}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={textChangeHandler.bind(this, "description")}
            autoCapitalize="sentences"
            autoCorrect
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
