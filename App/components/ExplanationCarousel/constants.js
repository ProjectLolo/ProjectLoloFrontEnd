import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import images from "@assets/images";

export const carouselData = [
  {
    title: "Explanation 1 of 3:",
    description:
      "Peekaboo helps families to create bonds regardless of age, time and location.",
    renderImage: () => (
      <Image style={styles.image} source={images.instruction1} />
    ),
  },
  {
    title: "Explanation 2 of 3",
    description:
      "Choose which content you want to personalize. It's hassle free and super easy. Choose how often you want to be in touch.",
    renderImage: () => (
      <Image style={styles.image} source={images.instruction2} />
    ),
  },
  {
    title: "Explanation 3 of 3",
    description:
      "Create magical personalized videos and share with friends & family. Each activity results in a cute video that you can save on your device or securely store within the Love Bank section of Peekaboo.",
    renderImage: () => (
      <Image style={styles.image} source={images.instruction3} />
    ),
  },
];

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CAROUSEL_VERTICAL_OUTPUT = 56;
export const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

const styles = StyleSheet.create({
  image: {
    width: "200%",
    height: "100%",
  },
});
