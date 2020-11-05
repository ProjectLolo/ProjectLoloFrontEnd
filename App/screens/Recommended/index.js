import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";

export default function Recommended({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      <Text style={styles.titleText}>What do you want to share today?</Text>
    </View>
  );
}
