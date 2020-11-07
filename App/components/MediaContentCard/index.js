import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";

export default function MediaContentCard() {
  return (
    <View style={styles.cardContainer}>
      <Text>I'm a card!</Text>
      <View style={{ backgroundColor: "red" }}>
        <Image style={styles.cardImage} source={images.videoCameraPurple} />
      </View>
    </View>
  );
}
