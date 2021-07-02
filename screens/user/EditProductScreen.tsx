import React, { useCallback, useEffect, useReducer } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateShape } from "../../App";
import HeaderButton from "../../components/ui/HeaderButton";
import Input from "../../components/ui/Input";
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

  // Performance: Wrap in useCallback to prevent so this function isn't rebuilt unnessesarily
  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
    // Performance: This will never rebuild because the dependency doesn't change
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText={"Please enter a valid title"}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct?.title || ""}
            initiallyValid={!!editedProduct}
            required
          ></Input>
          <Input
            id="imageUrl"
            label="Image URL"
            errorText={"Please enter a valid image URL"}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct?.imageUrl || ""}
            initiallyValid={!!editedProduct}
            required
          ></Input>
          <Input
            id="price"
            label="Price"
            errorText={"Please enter a valid price"}
            keyboardType="decimal-pad"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct?.price.toString() || ""}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          ></Input>
          <Input
            id="description"
            label="Description"
            errorText={"Please enter a valid description"}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3} //Android only
            onInputChange={inputChangeHandler}
            initialValue={editedProduct?.description || ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          ></Input>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
});

export default EditProductScreen;
