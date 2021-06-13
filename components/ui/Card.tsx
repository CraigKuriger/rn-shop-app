import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: JSX.Element;
  style: { [key: string]: string | number };
}

const Card = (props: Props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Shadow for iOS, Elevation for Android
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Card;
